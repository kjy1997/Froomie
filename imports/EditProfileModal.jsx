import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EditProfileModal extends Component {

  handleEdit(e) {
    e.preventDefault();

    const nameField = ReactDOM.findDOMNode(this.refs.nameField).value.trim();
    const aboutField = ReactDOM.findDOMNode(this.refs.aboutField).value.trim();

    let obj = {
      name: nameField,
      about: aboutField
    }

    console.log(nameField);
    console.log(aboutField);

    this.props.handleEdit(obj);
    this.close(e);
  }

  getEditTools() {
    return(
      <div className="editProfile">
        <h2>Editing Profile</h2>
        <form onSubmit={this.handleEdit.bind(this)}>
          <label>Name</label>
          <br />
          <input type="text" ref="nameField" defaultValue={this.props.name}/>
          <br />
          <label>About</label>
          <br />
          <textarea ref="aboutField" defaultValue={this.props.about}></textarea>
          <input type="submit"/>
        </form>
      </div>
    );
  }

  render() {
    if (this.props.isOpen === false)
      return null;

    return(
      <div>
        <div className="backdrop" onClick={e => this.close(e)}></div>
        <div className="profileModal">{this.getEditTools()}</div>
      </div>
    );
  }

  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}