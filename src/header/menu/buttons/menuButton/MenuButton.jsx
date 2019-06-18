import React from 'react';
import './MenuButton.less';
import Button from '../../../../common/Button';

const MenuButton = ({ children, className, onClick }) => (
    <Button
        className={`MenuButton ${className ? className : ''}`}
        onClick={e => {
            e.preventDefault();
            onClick();
        }}
    >
        {children}
    </Button>
);

export default MenuButton;
