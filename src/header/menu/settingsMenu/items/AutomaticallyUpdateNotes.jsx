import React from 'react';
import { connect } from 'react-redux';
import SettingsItem from '../settingsItem/SettingsItem';
import { toggleAutomaticallyUpdateNotes } from '../../../../store/settings/actions';

const AutomaticallyUpdateNotes = ({ automaticallyUpdateNotes, toggleAutomaticallyUpdateNotes }) => (
    <SettingsItem
        label="Automatically update notes"
        onChange={toggleAutomaticallyUpdateNotes}
        checkedOverride={automaticallyUpdateNotes}
    />
);

const mapStateToProps = state => ({
    automaticallyUpdateNotes: state.settings.automaticallyUpdateNotes
});

const mapDispatchToProps = dispatch => ({
    toggleAutomaticallyUpdateNotes: () => dispatch(toggleAutomaticallyUpdateNotes())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AutomaticallyUpdateNotes);
