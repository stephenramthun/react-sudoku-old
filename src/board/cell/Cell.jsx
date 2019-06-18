import React, { useEffect, useRef, useState } from 'react';
import { Constants } from '../../constants';
import { connect } from 'react-redux';
import { setActiveTileIndex } from '../../store/board/actions';
import './Cell.less';
import Notes from './notes/Notes';

const Cell = React.memo(
    ({
        activeTileIndex,
        children,
        error,
        index,
        isEditingNotes,
        originalValue,
        setActiveTileIndex,
        solved
    }) => {
        const [editable, setEditable] = useState(true);
        const [active, setActive] = useState(false);
        const ref = useRef(null);

        useEffect(() => {
            setEditable(originalValue === Constants.EDITABLE);
        }, [originalValue]);

        useEffect(() => {
            if (activeTileIndex === index) {
                ref.current.focus();
                setActive(true);
            } else if (active) {
                setActive(false);
            }
        }, [active, activeTileIndex]);

        const onInteractedWith = e => {
            e.preventDefault();
            setActiveTileIndex(index);
        };

        const className = () =>
            'Cell' +
            (editable ? '' : ' non-editable') +
            (active ? ' active' : '') +
            (error ? ' error' : '') +
            (solved ? ' solved' : '');

        return (
            <div className="CellContainer">
                <input
                    className={className()}
                    onFocus={onInteractedWith}
                    onTouchStart={onInteractedWith}
                    onTouchMove={e => e.preventDefault()}
                    onChange={(e) => e.preventDefault()}
                    ref={ref}
                    type="tel"
                    value={
                        children === Constants.EDITABLE
                            ? ''
                            : children
                    }
                />
                {children === Constants.EDITABLE && editable && <Notes index={index} />}
            </div>
        );
    }
);

const mapStateToProps = (state, ownProps) => ({
    activeTileIndex: state.board.activeTileIndex,
    error: state.board.errors[ownProps.index],
    isEditingNotes: state.board.isEditingNotes,
    originalValue: state.board.original[ownProps.index],
    solved: state.board.solved
});

const mapDispatchToProps = dispatch => ({
    setActiveTileIndex: index => dispatch(setActiveTileIndex(index))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cell);
