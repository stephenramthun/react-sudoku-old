import Type from './types';

export const checkForErrors = () => ({
    type: Type.CHECK_FOR_ERRORS
});

export const checkIfSolved = () => ({
    type: Type.CHECK_IF_SOLVED
});

export const clearActiveTileIndex = () => ({
    type: Type.CLEAR_ACTIVE_TILE_INDEX
});

export const clearActiveTileNote = () => ({
    type: Type.CLEAR_ACTIVE_TILE_NOTE
});

export const clearActiveTileValue = () => ({
    type: Type.CLEAR_ACTIVE_TILE_VALUE
});

export const fetchBoard = difficulty => ({
    type: Type.FETCH_BOARD,
    difficulty
});

export const fetchBoardSuccess = (board, difficulty) => ({
    type: Type.FETCH_BOARD_SUCCESS,
    current: board.current,
    solution: board.solution,
    difficulty
});

export const fetchBoardFailure = error => ({
    type: Type.FETCH_BOARD_FAILURE,
    error
});

export const resetBoard = () => ({
    type: Type.RESET_BOARD
});

export const removeFromActiveTile = () => ({
    type: Type.REMOVE_FROM_ACTIVE_TILE
});

export const setActiveTileIndex = index => ({
    type: Type.SET_ACTIVE_TILE_INDEX,
    index
});

export const setActiveTileNote = note => ({
    type: Type.SET_ACTIVE_TILE_NOTE,
    note
});

export const setActiveTileValue = (value, shouldClearInvalidNotes = true) => ({
    type: Type.SET_ACTIVE_TILE_VALUE,
    value,
    shouldClearInvalidNotes
});

export const toggleIsEditingNotes = () => ({
    type: Type.TOGGLE_IS_EDITING_NOTES
});

export const updateActiveTile = updatedValue => ({
    type: Type.UPDATE_ACTIVE_TILE,
    updatedValue
});
