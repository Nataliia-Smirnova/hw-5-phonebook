import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';

import Contacts from './contacts/Contacts';
import Form from './form/Form';
import Filter from './filter/Filter';
import '../styles.css';

class App extends React.Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    showAlert: false,
    showInfo: false,
    isMounted: false,
    cMounted: false,
  };

  componentDidMount() {
    const lsContacts = localStorage.getItem('contacts');
    if (lsContacts) {
      const parsedContacts = JSON.parse(lsContacts);
      this.setState({ contacts: parsedContacts });
      if (parsedContacts.length > 1) {
        this.setState({ isMounted: true });
      }
    }

    this.setState({ cMounted: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      this.setState({ isMounted: false, cMounted: false });
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = { id: uuidv4(), name, number };
    const sameContact = contacts.find(contact => contact.name === name);

    if (!name || !number) {
      this.setState({ showInfo: true });
      setTimeout(() => this.setState({ showInfo: false }), 1500);
    } else if (sameContact) {
      this.setState({ showAlert: true });
      setTimeout(() => this.setState({ showAlert: false }), 1500);
    } else if (name && number) {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter, cMounted } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div id="content">
        <CSSTransition
          in={true}
          appear={true}
          classNames="title"
          timeout={750}
          // unmountOnExit
        >
          <h1 id="title">Phonebook</h1>
        </CSSTransition>
        <Form
          onSubmit={this.addContact}
          alert={this.state.showAlert}
          info={this.state.showInfo}
        />
        <h2 id="text">Contacts</h2>
        <CSSTransition
          in={this.state.contacts.length > 1}
          classNames={this.state.isMounted ? 'filter-appear' : 'filter'}
          // appear={this.state.isMounted}
          timeout={500}
          unmountOnExit
        >
          <Filter value={filter} onChange={this.changeFilter} />
        </CSSTransition>
        <Contacts
          contacts={filteredContacts}
          onDeleteBtnClick={this.deleteContact}
          mounted={cMounted}
        />
      </div>
    );
  }
}

export default App;
