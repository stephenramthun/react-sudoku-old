import React from 'react';
import Modal from 'react-modal';
import './SettingsMenu.less';
import AlwaysCheckForErrors from './items/AlwaysCheckForErrors';
import AutomaticallyUpdateNotes from './items/AutomaticallyUpdateNotes';
import CloseButton from '../../../common/CloseButton';

Modal.setAppElement('#root');

const SettingsMenu = ({ closeSettingsMenu }) => (
    <Modal
        isOpen={true}
        onRequestClose={closeSettingsMenu}
        shouldCloseOnOverlayClick={true}
    >
        <div className="SettingsMenu">
            <div className="SettingsHeader">
                <h1>Settings</h1>
                <CloseButton onClose={closeSettingsMenu} />
            </div>
            <ul>
                <AlwaysCheckForErrors />
                <AutomaticallyUpdateNotes />
            </ul>
        </div>
    </Modal>
);

export default SettingsMenu;
