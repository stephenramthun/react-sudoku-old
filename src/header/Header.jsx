import React from 'react';
import DifficultySelector from './difficultySelector/DifficultySelector';
import Menu from './menu/Menu';
import './Header.less';
import SettingsMenu from './menu/settingsMenu/SettingsMenu';
import { connect } from 'react-redux';

const Header = ({ showHelpMenu, showSettingsMenu }) => (
    <>
        <div className="Header">
            <div className="content">
                <Menu />
                <DifficultySelector />
            </div>
        </div>
        {showSettingsMenu && (
            <SettingsMenu />
        )}
    </>
);

const mapStateToProps = state => ({
    showHelpMenu: state.settings.showHelpMenu,
    showSettingsMenu: state.settings.showSettingsMenu
});

export default connect(mapStateToProps)(Header);
