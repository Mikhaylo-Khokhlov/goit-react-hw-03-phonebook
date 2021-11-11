import React, { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Section from './components/Section';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    const identicalName = this.findForbiddenName(name);

    if (identicalName === false) {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    } else {
      alert(name + ' ' + 'is already in contacts');
    }
  };

  findForbiddenName = name => {
    const { contacts } = this.state;
    let forbiddenName = false;
    for (let i = 0; i < contacts.length; i += 1) {
      const normalizeContactsName = contacts[i].name.toLowerCase();
      const normalizeName = name.toLowerCase();
      if (normalizeContactsName === normalizeName) {
        return (forbiddenName = true);
      } else {
        forbiddenName = false;
      }
    }
    return forbiddenName;
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFindContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const findContact = this.getFindContact();
    return (
      <Section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={findContact}
          onDeleteContact={this.deleteContact}
        />
      </Section>
    );
  }
}

export default App;
