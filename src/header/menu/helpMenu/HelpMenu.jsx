import React from 'react';
import { connect } from 'react-redux';
import { checkForErrors, resetBoard } from '../../../store/board/actions';
import './HelpMenu.less';

const HelpMenu = ({ checkForErrors, resetBoard }) => (
    <div className="HelpMenu">
        <ul>
            <li onClick={checkForErrors} tabIndex="0">
                Check for errors
            </li>
            <li onClick={resetBoard} tabIndex="0">
                Clear board
            </li>
        </ul>
    </div>
);

const mapDispatchToProps = dispatch => ({
    checkForErrors: () => dispatch(checkForErrors()),
    resetBoard: () => dispatch(resetBoard())
});

export default connect(
    null,
    mapDispatchToProps
)(HelpMenu);
