import React from 'react';
import { connect } from 'react-redux';
import { fetchBoard } from '../../store/board/actions';
import './DifficultySelector.less';
import DropdownMenu from '../../common/dropdownMenu/DropdownMenu';

const DifficultySelector = ({ difficulty, fetchBoard }) => (
    <div className="DifficultySelector">
        <DropdownMenu
            items={['easy', 'medium', 'hard']}
            onClick={difficulty => fetchBoard(difficulty)}
        />
    </div>
);

const mapStateToProps = state => ({
    difficulty: state.board.difficulty
});

const mapDispatchToProps = dispatch => ({
    fetchBoard: difficulty => dispatch(fetchBoard(difficulty))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DifficultySelector);
