import Type from './types';

const initialState = {
    alwaysCheckForErrors: false,
    automaticallyUpdateNotes: true,
    showHelpMenu: false,
    showSettingsMenu: false,
    showInput: false
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Type.TOGGLE_ALWAYS_CHECK_FOR_ERRORS:
            return {
                ...state,
                alwaysCheckForErrors: !state.alwaysCheckForErrors
            };
        case Type.TOGGLE_AUTOMATICALLY_UPDATE_NOTES:
            return {
                ...state,
                automaticallyUpdateNotes: !state.automaticallyUpdateNotes
            };
        case Type.TOGGLE_HELP_MENU:
            return {
                ...state,
                showHelpMenu: !state.showHelpMenu
            };
        case Type.TOGGLE_SETTINGS_MENU:
            return {
                ...state,
                showSettingsMenu: !state.showSettingsMenu
            };
        case Type.TOGGLE_INPUT:
            return {
                ...state,
                showInput: !state.showInput
            };
        default:
            return state;
    }
};
