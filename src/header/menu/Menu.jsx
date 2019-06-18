import React from 'react';
import './Menu.less';
import SettingsButton from './buttons/SettingsButton';
import ToggleNotesButton from './buttons/ToggleNotesButton';
import HelpButton from './buttons/HelpButton';

const Menu = () => (
    <span className="Menu">
        <SettingsButton />
        <HelpButton />
        <ToggleNotesButton />
    </span>
);

export default Menu;
