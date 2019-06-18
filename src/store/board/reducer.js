import {
    checkIfSolved,
    clearActiveTileNote,
    clearActiveTileValue,
    fetchBoardSuccess,
    fetchBoardFailure,
    setActiveTileNote,
    setActiveTileValue, checkForErrors
} from './actions';
import {
    activeTileIsEditable,
    currentBoardWithNewActiveTileValue,
    removeInvalidNotes,
    sanitizedActiveTileIndex,
    updatedErrorsForActiveTile
} from './operations';
import Type from './types';
import * as BoardApi from '../../api/boardApi';
import { Constants, Difficulty } from '../../constants';
import { put, select, takeLatest } from 'redux-saga/effects';

const initialState = {
    solved: false,
    current: undefined,
    original: undefined,
    solution: undefined,
    difficulty: undefined,
    activeTileIndex: undefined,
    errors: new Array(Constants.NUMBER_OF_CELLS).fill(false),
    notes: new Array(Constants.NUMBER_OF_CELLS).fill(
        new Array(Constants.NUMBER_OF_ROWS).fill(false)
    ),
    isEditingNotes: false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Type.CHECK_FOR_ERRORS:
            return {
                ...state,
                errors: state.current.map((value, i) => {
                    return (
                        value !== Constants.EDITABLE &&
                        value !== state.original[i] &&
                        value !== state.solution[i]
                    );
                })
            };
        case Type.CHECK_IF_SOLVED:
            return {
                ...state,
                solved:
                    state.current
                        .map((value, i) => value === state.solution[i])
                        .find(value => !value) === undefined
            };
        case Type.CLEAR_ACTIVE_TILE_INDEX:
            return {
                ...state,
                activeTileIndex: initialState.activeTileIndex
            };
        case Type.CLEAR_ACTIVE_TILE_NOTE:
            return {
                ...state,
                notes: state.notes.map((notes, i) => {
                    if (i === state.activeTileIndex) {
                        let lastNoteIndex = notes.lastIndexOf(true);
                        if (lastNoteIndex === -1) {
                            return notes;
                        }
                        return [
                            ...notes.slice(0, lastNoteIndex),
                            false,
                            ...notes.slice(lastNoteIndex + 1)
                        ];
                    } else {
                        return notes;
                    }
                })
            };
        case Type.CLEAR_ACTIVE_TILE_VALUE:
            return {
                ...state,
                current: currentBoardWithNewActiveTileValue(
                    state,
                    Constants.EDITABLE
                ),
                errors: updatedErrorsForActiveTile(state)
            };
        case Type.FETCH_BOARD_SUCCESS:
            return {
                ...initialState,
                current: action.current,
                original: action.current,
                solution: action.solution,
                difficulty: action.difficulty
            };
        case Type.FETCH_BOARD_FAILURE:
            return {
                ...state,
                current: undefined,
                original: undefined,
                solution: undefined
            };
        case Type.RESET_BOARD:
            return {
                ...state,
                solved: initialState.solved,
                current: [...state.original],
                notes: [...initialState.notes],
                errors: [...initialState.errors],
                activeTileIndex: initialState.activeTileIndex
            };
        case Type.SET_ACTIVE_TILE_INDEX:
            return {
                ...state,
                activeTileIndex: sanitizedActiveTileIndex(action.index)
            };
        case Type.SET_ACTIVE_TILE_NOTE:
            return {
                ...state,
                notes: state.notes.map((notes, i) => {
                    if (i === state.activeTileIndex) {
                        return [
                            ...notes.slice(0, action.note - 1),
                            !notes[action.note - 1],
                            ...notes.slice(action.note)
                        ];
                    } else {
                        return notes;
                    }
                })
            };
        case Type.SET_ACTIVE_TILE_VALUE:
            return {
                ...state,
                current: state.current.map((value, i) => {
                    return i === state.activeTileIndex ? action.value : value;
                }),
                errors: updatedErrorsForActiveTile(state),
                notes: action.shouldClearInvalidNotes
                    ? removeInvalidNotes(state, action.value)
                    : state.notes
            };
        case Type.SOLVE:
            return {
                ...state,
                current: [...state.solution],
                solved: true
            };
        case Type.TOGGLE_IS_EDITING_NOTES:
            return {
                ...state,
                isEditingNotes: !state.isEditingNotes
            };
        default:
            return state;
    }
};

function* fetchBoard({ difficulty = Difficulty.EASY }) {
    try {
        const board = yield BoardApi.fetchBoard(difficulty);
        yield put(fetchBoardSuccess(board, difficulty));
    } catch (error) {
        yield put(fetchBoardFailure(error));
    }
}

function* removeFromActiveTile() {
    const board = yield select(state => state.board);
    if (activeTileIsEditable(board) && !board.solved) {
        if (board.isEditingNotes) {
            yield put(clearActiveTileNote());
        } else {
            yield put(clearActiveTileValue());
        }
    }
}

function* updateActiveTile({ updatedValue }) {
    const board = yield select(state => state.board);
    if (activeTileIsEditable(board) && !board.solved) {
        if (board.isEditingNotes) {
            yield put(setActiveTileNote(updatedValue.toString()));
        } else {
            const settings = yield select(state => state.settings);
            const shouldClearInvalidNotes = settings.automaticallyUpdateNotes;
            yield put(setActiveTileValue(updatedValue.toString(), shouldClearInvalidNotes));
            yield put(checkIfSolved());
            if (settings.alwaysCheckForErrors) {
                yield put(checkForErrors());
            }
        }
    }
}

export function* boardSaga() {
    yield takeLatest(Type.FETCH_BOARD, fetchBoard);
    yield takeLatest(Type.REMOVE_FROM_ACTIVE_TILE, removeFromActiveTile);
    yield takeLatest(Type.UPDATE_ACTIVE_TILE, updateActiveTile);
}
