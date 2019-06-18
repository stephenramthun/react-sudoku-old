import React, { useEffect, useMemo, useState } from 'react';
import Row from './row/Row';
import KeyHandler from '../containers/KeyHandler';
import { Constants } from '../constants';
import { connect } from 'react-redux';
import { fetchBoard } from '../store/board/actions';
import './Board.less';
import LoadingIndicator from './loadingIndicator/LoadingIndicator';

const distributeCells = (cells, size) => {
    return new Array(size).fill([]).map((_, i) => {
        const start = i * size;
        const end = start + size;
        return cells.slice(start, end);
    });
};

const Board = ({ board, fetchBoard, solved }) => {
    console.log(process.env.SUDOKU_API_URL);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetchBoard();
    }, []);

    useMemo(() => {
        board && setRows(distributeCells(board, Constants.NUMBER_OF_ROWS));
    }, [board]);

    if (!board) {
        return <LoadingIndicator />;
    }

    return (
        <KeyHandler>
            <div className={`Board${solved ? ' solved' : ''}`}>
                {rows.map((values, i) => {
                    return <Row key={`Row${i}`} index={i} values={values} />;
                })}
            </div>
        </KeyHandler>
    );
};

const mapStateToProps = state => ({
    board: state.board.current,
    solved: state.board.solved
});

const mapDispatchToProps = dispatch => ({
    fetchBoard: () => dispatch(fetchBoard())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
