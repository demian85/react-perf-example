import React from 'react';

import styles from './Controls.module.css';

export default function Controls(props) {
  return (
    <div className={styles.root}>
      <label>
        User language:
        <select onChange={(e) => props.onLanguageChange(e.target.value)} value={props.userLanguage}>
          <option value="es-AR">es-AR</option>
          <option value="en-US">en-US</option>
        </select>
      </label>
    </div>
  );
}
