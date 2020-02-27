import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle }) => {
  return (
    <span>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        style={{ background: isOn && '#ebde8f' }}
      >
        <span className={`react-switch-button`} />
      </label>
    </span>
  );
};

export default Switch;