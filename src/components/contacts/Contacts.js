import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './Contacts.module.css';

const Contacts = ({ contacts, onDeleteBtnClick }) => {
  return (
    <ul className={styles.contacts}>
      {contacts.map(({ name, number, id }) => (
        <li key={uuidv4()} className={styles.contacts__item}>
          <p>
            <span>{name}: </span>
            <span>{number}</span>
          </p>
          <button className={styles.btn} onClick={() => onDeleteBtnClick(id)}>
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
