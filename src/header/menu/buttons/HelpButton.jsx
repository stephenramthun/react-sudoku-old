import React, { useRef, useState } from 'react';
import PushButton from './PushButton';
import HelpMenu from '../helpMenu/HelpMenu';
import { useClickOutside } from '../../../hooks';

const HelpButton = () => {
    const ref = useRef();
    const [showHelpMenu, setShowHelpMenu] = useState(false);

    useClickOutside(() => {
        setShowHelpMenu(false);
    }, ref);

    return (
        <div ref={ref}>
            <PushButton
                onClick={() => setShowHelpMenu(!showHelpMenu)}
                overridePushed={showHelpMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M17.16 6.42a8.03 8.03 0 0 0-3.58-3.58l-1.34 2.69a5.02 5.02 0 0 1 2.23 2.23l2.69-1.34zm0 7.16l-2.69-1.34a5.02 5.02 0 0 1-2.23 2.23l1.34 2.69a8.03 8.03 0 0 0 3.58-3.58zM6.42 2.84a8.03 8.03 0 0 0-3.58 3.58l2.69 1.34a5.02 5.02 0 0 1 2.23-2.23L6.42 2.84zM2.84 13.58a8.03 8.03 0 0 0 3.58 3.58l1.34-2.69a5.02 5.02 0 0 1-2.23-2.23l-2.69 1.34zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                {showHelpMenu && (
                    <HelpMenu />
                )}
            </PushButton>
        </div>
    );
};

export default HelpButton;
