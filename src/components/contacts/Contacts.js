import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { v4 as uuidv4 } from 'uuid';

import styles from './Contacts.module.css';

const Contacts = ({ contacts, onDeleteBtnClick }) => {
  return (
    <TransitionGroup component="ul" className={styles.contacts}>
      {contacts.map(({ name, number, id }) => (
        <CSSTransition key={id} timeout={300} classNames="contactItem-fade">
          <li key={id} className={styles.contacts__item}>
            <p className={styles.contact__text}>
              <span className={styles.contact__part}>{name}: </span>
              <span>{number}</span>
            </p>
            <button className={styles.btn} onClick={() => onDeleteBtnClick(id)}>
              Удалить
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Contacts;
