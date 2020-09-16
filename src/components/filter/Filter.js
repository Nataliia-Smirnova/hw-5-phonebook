import React from 'react';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={styles.phonebook__label}>
      Find contacts by name:
      <input
        className={styles.phonebook__input}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </label>
  );
};
export default Filter;
