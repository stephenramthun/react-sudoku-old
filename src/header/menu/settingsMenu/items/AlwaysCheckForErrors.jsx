import React from 'react';
import { connect } from 'react-redux';
import SettingsItem from '../settingsItem/SettingsItem';
import { toggleAlwaysCheckForErrors } from '../../../../store/settings/actions';

const AlwaysCheckForErrors = ({ alwaysCheckForErrors, toggleAlwaysCheckForErrors }) => (
    <SettingsItem
        label="Always check for errors"
        onChange={toggleAlwaysCheckForErrors}
        checkedOverride={alwaysCheckForErrors}
    />
);

const mapStateToProps = state => ({
    alwaysCheckForErrors: state.settings.alwaysCheckForErrors
});

const mapDispatchToProps = dispatch => ({
    toggleAlwaysCheckForErrors: () => dispatch(toggleAlwaysCheckForErrors())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlwaysCheckForErrors);
