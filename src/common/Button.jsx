import React, { useState } from 'react';
import './Button.less';

const Button = ({ children, className, onClick }) => {
    const [pressed, setPressed] = useState(false);

    const classNames = () =>
        'Button'
        + (pressed ? ' pressed' : '')
        + (className ? ` ${className}` : '');

    return (
        <button
            className={classNames()}
            onClick={onClick}
            onMouseDown={() => setPressed(true)}
            onTouchStart={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onTouchEnd={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            onTouchCancel={() => setPressed(false)}
        >
            {children}
        </button>
    );
};

export default Button;
