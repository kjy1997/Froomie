import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EditProfileModal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    this.setState({
      tags: JSON.parse(JSON.stringify(this.props.tags)),
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const fNameField  = ReactDOM.findDOMNode(this.refs.firstNameField).value.trim();
    const lNameField  = ReactDOM.findDOMNode(this.refs.lastNameField).value.trim();
    const aboutField  = ReactDOM.findDOMNode(this.refs.aboutField).value.trim();
    const streetField = ReactDOM.findDOMNode(this.refs.streetField).value.trim();
    const cityField   = ReactDOM.findDOMNode(this.refs.cityField).value.trim();
    const zipField    = ReactDOM.findDOMNode(this.refs.zipField).value.trim();
    const suiteField  = ReactDOM.findDOMNode(this.refs.suiteField).value.trim();

    if (!fNameField || !lNameField || !aboutField || !streetField || !cityField || !zipField) {
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
      name: fNameField + " " + lNameField,
      about: aboutField,
      address: address,
    }

    let tags = JSON.parse(JSON.stringify(this.state.tags));

    this.props.handleEdit(obj);
    this.props.handleTagEdit(tags);

    this.close(e);
  }

  handleAddTag(e) {
    e.preventDefault();

    const tagField = ReactDOM.findDOMNode(this.refs.tagField).value.trim();
    
    // check if input is empty or if tag already exists in the list
    let tempArr = this.state.tags.map(tag => tag.toLowerCase());
    if (!tagField || tempArr.indexOf(tagField.toLowerCase()) != -1)
      return

    this.state.tags.push(tagField);
    this.forceUpdate();

    ReactDOM.findDOMNode(this.refs.tagField).value = "";
    ReactDOM.findDOMNode(this.refs.tagField).focus();
  }

  handleRemoveTag(e) {
    e.preventDefault();

    const tagValue = $(e.target).text();
    const tagIndex = this.state.tags.indexOf(tagValue);

    // do nothing if tag doesn't exist or if there is only one tag left
    if (tagIndex === -1 || this.state.tags.length === 1)
      return;

    this.state.tags.splice(tagIndex, 1);
    this.forceUpdate();
  }

  renderTags() {
    return this.state.tags.map((tag) => (
      <span onClick={this.handleRemoveTag.bind(this)} key={tag}>{tag}</span>
    ));
  }

  getEditTools() {
    // temporary name split
    let nameSplit = this.props.name.split(" ");
    let firstName = nameSplit[0];
    let lastName = nameSplit[1];
    let address = this.props.address;

    return(
      <div className="editProfile">
        <h2>Editing Profile</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Name</label>
          <br />
          <input className="nameInput" type="text" ref="firstNameField" placeholder="first name *" defaultValue={firstName}/>
          <input className="nameInput" type="text" ref="lastNameField" placeholder="last name *" defaultValue={lastName}/>
          <br />

          <label>About</label>
          <br />
          <textarea ref="aboutField" placeholder="tell us about yourself! *" defaultValue={this.props.about}></textarea>
          <br />

          <label>Tags</label>
          <p>Click tag to remove</p>
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
          <input type="submit" value="Save"/>
        </form>
      </div>
    );
  }

  render() {
    if (this.props.isOpen === false)
      return null;

    return(
      <div>
        <div className="backdrop" onClick={e => this.close(e)}>
          <div className="profileModal" onClick={e => e.stopPropagation()}>
          {this.getEditTools()}
          </div>
        </div>
      </div>
    );
  }

  close(e) {
    e.preventDefault();
    this.props.onClose();
  }
}


