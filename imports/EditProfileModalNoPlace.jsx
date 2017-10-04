import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EditProfileModalNoPlace extends Component {

  handleSubmit(e) {
    e.preventDefault();

    const nameField   = ReactDOM.findDOMNode(this.refs.nameField).value.trim();
    const aboutField  = ReactDOM.findDOMNode(this.refs.aboutField).value.trim();
    
    if (!nameField || !aboutField) {
      alert("Missing information!");
      return;
    }

    let obj = {
      name: nameField,
      about: aboutField
    }

    this.props.handleEdit(obj);
    this.props.handleAddTag(this.props.tags);
    this.props.handleRemoveTag(this.props.tags);

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
  }

  renderTags() {
    return this.props.tags.map((tag) => (
      <span onClick={this.handleRemoveTag.bind(this)} key={tag}>{tag}</span>
    ));
  }

  getEditTools() {
    return(
      <div className="editProfile">
        <h2>Editing Profile</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
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

    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}