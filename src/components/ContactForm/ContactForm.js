import React, { Component } from 'react';
import s from './ContactForm.module.css';
import shortid from 'shortid';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <div className={s.block}>
          <div className={s.label}>
            <label htmlFor={this.nameInputId}>Name</label>
          </div>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}
            className={s.input}
          />
        </div>
        <div className={s.block}>
          <div className={s.label}>
            <label htmlFor={this.telInputId}>Number</label>
          </div>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            placeholder="+380 (00) 000-00-00"
            id={this.nameInputId}
            className={s.input}
          />
        </div>
        <div className={s.btnBlock}>
          <div>
            <button className={s.btn} type="submit">
              Add contact
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ContactForm;
