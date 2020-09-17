import React from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Form.module.css';

class Form extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.phonebook__form} onSubmit={this.handleFormSubmit}>
        <label className={styles.phonebook__label}>
          Name
          <input
            className={styles.phonebook__input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </label>
        <label className={styles.phonebook__label}>
          Number
          <input
            className={styles.phonebook__input}
            type="text"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit" className={styles.btn}>
          Add contact
        </button>
        <CSSTransition
          in={this.props.alert}
          classNames="alert"
          timeout={500}
          unmountOnExit
        >
          <p className={styles.alert}>Contact already exists!</p>
        </CSSTransition>
        <CSSTransition
          in={this.props.info}
          classNames="info"
          timeout={500}
          unmountOnExit
        >
          <p className={styles.info}>Fill both fields please</p>
        </CSSTransition>
      </form>
    );
  }
}

export default Form;
