import React from 'react';
import { connect } from 'react-redux';
import './Notes.less';

const Notes = ({ index, notes }) => {
    return (
        <div className="Notes">
            {notes.map((visible, i) => {
                return (
                    <div key={`note${i}${index}`} className={`note ${visible ? '' : 'hidden'}`}>
                        {visible ? i + 1 : '_'}
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    notes: state.board.notes[ownProps.index]
});

export default connect(mapStateToProps)(Notes);
