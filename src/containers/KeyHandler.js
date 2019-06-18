import React, { useEffect } from 'react';
import { Constants } from '../constants';
import { connect } from 'react-redux';
import {
    removeFromActiveTile,
    setActiveTileIndex,
    toggleIsEditingNotes,
    updateActiveTile
} from '../store/board/actions';
import Type from '../store/board/types';

const Keys = {
    BACKSPACE: 8,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    D: 68,
    S: 83,
    W: 87,
    SOLVE: 188,
    EDIT: 69
};

const KeyHandler = ({
    activeTileIndex,
    children,
    removeFromActiveTile,
    setActiveTileIndex,
    solve,
    toggleIsEditingNotes,
    updateActiveTile
}) => {
    const handleKeyDown = e => {
        if ('123456789'.includes(e.key)) {
            updateActiveTile(e.key);
        } else {
            switch (e.keyCode) {
                case Keys.BACKSPACE:
                    removeFromActiveTile();
                    break;
                case Keys.LEFT:
                case Keys.A:
                    setActiveTileIndex(activeTileIndex - 1);
                    break;
                case Keys.UP:
                case Keys.W:
                    setActiveTileIndex(
                        activeTileIndex - Constants.NUMBER_OF_ROWS
                    );
                    break;
                case Keys.RIGHT:
                case Keys.D:
                    setActiveTileIndex(activeTileIndex + 1);
                    break;
                case Keys.DOWN:
                case Keys.S:
                    setActiveTileIndex(
                        activeTileIndex + Constants.NUMBER_OF_ROWS
                    );
                    break;
                case Keys.SOLVE:
                    solve();
                    break;
                case Keys.EDIT:
                    toggleIsEditingNotes();
                    break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTileIndex]);

    return <>{children}</>;
};

const mapStateToProps = state => ({
    activeTileIndex: state.board.activeTileIndex
});

const mapDispatchToProps = dispatch => ({
    removeFromActiveTile: () => dispatch(removeFromActiveTile()),
    setActiveTileIndex: index => dispatch(setActiveTileIndex(index)),
    solve: () => dispatch({ type: Type.SOLVE }),
    toggleIsEditingNotes: () => dispatch(toggleIsEditingNotes()),
    updateActiveTile: value => dispatch(updateActiveTile(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KeyHandler);
