import React from 'react';
import './SettingsItem.less';

const SettingsItem = ({ checkedOverride, label, onChange }) => (
    <li className="SettingsItem">
        <input
            type="checkbox"
            onChange={onChange}
            checked={checkedOverride}
        />
        {label}
    </li>
);

export default SettingsItem;
