import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Contacts from './contacts/Contacts';
import Form from './form/Form';
import Filter from './filter/Filter';

class App extends React.Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = { id: uuidv4(), name, number };
    const sameContact = contacts.find(contact => contact.name === name);

    sameContact
      ? alert(`${name} is already in contacts`)
      : name && number
      ? this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }))
      : alert('Fill both fields please');
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
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div id="content">
        <h1 id="title">Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2 id="text">Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <Contacts
          contacts={filteredContacts}
          onDeleteBtnClick={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
