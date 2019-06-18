import React, { useState } from 'react';
import MenuButton from './menuButton/MenuButton';

const PushButton = ({ children, onClick, overridePushed }) => {
    const [pushed, setPushed] = useState(false);

    const onButtonPush = () => {
        if (onClick) {
            onClick();
        }
        setPushed(state => !state);
    };

    const className = () => {
        const isPushed = overridePushed !== undefined ? overridePushed : pushed;
        return isPushed ? ' pushed' : '';
    };

    return (
        <MenuButton className={className()} onClick={onButtonPush}>
            {children}
        </MenuButton>
    );
};

export default PushButton;
