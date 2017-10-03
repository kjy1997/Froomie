import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EditProfileModal extends Component {

  handleEdit(e) {
    e.preventDefault();

    const nameField   = ReactDOM.findDOMNode(this.refs.nameField).value.trim();
    const aboutField  = ReactDOM.findDOMNode(this.refs.aboutField).value.trim();
    const streetField = ReactDOM.findDOMNode(this.refs.streetField).value.trim();
    const cityField   = ReactDOM.findDOMNode(this.refs.cityField).value.trim();
    const zipField    = ReactDOM.findDOMNode(this.refs.zipField).value.trim();
    const suiteField  = ReactDOM.findDOMNode(this.refs.suiteField).value.trim();

    if (!nameField || !aboutField || !streetField || !cityField || !zipField) {
      alert("Missing information!");
      return;
    }

    let address = {
      street: streetField,
      city: cityField,
      zipcode: zipField,
      suite: suiteField
    }

    let obj = {
      name: nameField,
      about: aboutField,
      address: address,
    }

    this.props.handleEdit(obj);
    this.close(e);
  }

  handleAddTag(e) {
    e.preventDefault();

    const tagField = ReactDOM.findDOMNode(this.refs.tagField).value.trim();
    
    let tempArr = this.props.tags.map(function(tag) {return tag.toLowerCase();});
    if (!tagField || tempArr.indexOf(tagField.toLowerCase()) != -1)
      return

    this.props.tags.push(tagField);
    this.forceUpdate();

    this.props.handleAddTag(this.props.tags);

    ReactDOM.findDOMNode(this.refs.tagField).value = "";
    ReactDOM.findDOMNode(this.refs.tagField).focus();
  }

  handleRemoveTag(e) {
    e.preventDefault();

    const tagValue = $(e.target).text();
    const tagIndex = this.props.tags.indexOf(tagValue);

    if (tagIndex === -1 || this.props.tags.length === 1)
      return;

    this.props.tags.splice(tagIndex, 1);
    this.forceUpdate();

    this.props.handleRemoveTag(this.props.tags);
  }

  renderTags() {
    return this.props.tags.map((tag) => (
      <span onClick={this.handleRemoveTag.bind(this)} key={tag}>{tag}</span>
    ));
  }

  getEditTools() {
    let address = this.props.address;

    return(
      <div className="editProfile">
        <h2>Editing Profile</h2>
        <form onSubmit={this.handleEdit.bind(this)}>
          <label>Name</label>
          <br />
          <input type="text" ref="nameField" placeholder="your name here *" defaultValue={this.props.name}/>
          <br />

          <label>About</label>
          <br />
          <textarea ref="aboutField" placeholder="tell us about yourself! *" defaultValue={this.props.about}></textarea>
          <br />

          <label>Tags</label>
          <br />
          <div className="modalTagsContainer">
            {this.renderTags()}
          </div>
          <input type="text" ref="tagField" placeholder="enter tag here"/>
          <button onClick={this.handleAddTag.bind(this)}>Add Tag</button>
          <br />

          <label>Address</label>
          <br />
          <input type="text" ref="streetField" placeholder="street *" defaultValue={address.street}/>
          <input type="text" ref="cityField" placeholder="city *" defaultValue={address.city}/>
          <input type="text" ref="zipField" placeholder="zipcode *" defaultValue={address.zipcode}/>
          <input type="text" ref="suiteField" placeholder="suite" defaultValue={address.suite}/>

          <h6>* indicates required fields</h6>
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