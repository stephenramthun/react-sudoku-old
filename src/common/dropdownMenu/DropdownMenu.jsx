import React, { useEffect, useRef, useState } from 'react';
import './DropdownMenu.less';
import { useClickOutside } from '../../hooks';

const simulateOnClick = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
        callback();
    }
};

const DropdownMenu = ({ className, id, items, onClick }) => {
    const ref = useRef();
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState({ value: items[0], index: 0 });

    const onExpandClick = () => {
        setExpanded(!expanded);
    };

    useClickOutside(() => {
        setExpanded(false);
    }, ref);

    useEffect(() => {
        onClick(selected.value);
    }, [selected]);

    return (
        <div
            id={id}
            className={`DropdownMenu ${className ? className : ''}`}
            onClick={onExpandClick}
            ref={ref}
        >
            {items && items.length > 0 && (
                <div
                    className="selected"
                    tabIndex="0"
                    onKeyPress={(e) => simulateOnClick(e, () => setExpanded(!expanded)) }
                >
                    <div>{selected.value}</div>
                    <svg
                        className={expanded ? 'up' : 'down'}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            )}
            {expanded && (
                <ul>
                    {items && items.map((item, i) => (
                        <li
                            key={`item-${item}`}
                            tabIndex="0"
                            onClick={() => {
                                setSelected({
                                    value: item,
                                    index: i
                                })
                            }}
                            onKeyPress={(e) => simulateOnClick(e, () => {
                                setSelected({
                                    value: item,
                                    index: i
                                });
                                setExpanded(false);
                            })}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
