import { Constants } from '../../constants';

const toRowIndex = tileIndex => {
    return Math.floor(tileIndex / Constants.NUMBER_OF_ROWS);
};

const toColIndex = tileIndex => {
    return tileIndex % Constants.NUMBER_OF_COLUMNS;
};

const toRegionIndex = tileIndex => {
    const rowIndex = toRowIndex(tileIndex);
    const colIndex = toColIndex(tileIndex);

    if (rowIndex < 3) {
        return Math.floor(colIndex / 3);
    } else if (rowIndex < 6) {
        return Math.floor(colIndex / 3) + 3;
    } else {
        return Math.floor(colIndex / 3) + 6;
    }
};

const areVisibleToEachOther = (indexA, indexB) => {
    return (
        toRowIndex(indexA) === toRowIndex(indexB) ||
        toColIndex(indexA) === toColIndex(indexB) ||
        toRegionIndex(indexA) === toRegionIndex(indexB)
    );
};

export const removeInvalidNotes = (state, value) => {
    const currentActiveIndex = state.activeTileIndex;
    const currentActiveValue = parseInt(value);

    return state.notes.map((notes, i) => {
        return areVisibleToEachOther(i, currentActiveIndex)
            ? notes.map((note, i) =>
                  i + 1 === currentActiveValue ? false : note
              )
            : notes;
    });
};

export const currentBoardWithNewActiveTileValue = (state, newValue) => {
    return state.current.map((oldValue, i) => {
        return i === state.activeTileIndex ? newValue : oldValue;
    });
};

export const updatedErrorsForActiveTile = state => {
    return state.errors.map((value, i) => {
        return i === state.activeTileIndex ? false : value;
    });
};

export const activeTileIsEditable = state => {
    return state.original[state.activeTileIndex] === Constants.EDITABLE;
};

export const sanitizedActiveTileIndex = index => {
    return index < 0
        ? index + Constants.NUMBER_OF_CELLS
        : index % Constants.NUMBER_OF_CELLS;
};
