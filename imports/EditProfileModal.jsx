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

    this.props.handleEdit(obj);
    this.close(e);
  }

  handleAddTag(e) {
    e.preventDefault();

    const tagField = ReactDOM.findDOMNode(this.refs.tagField).value.trim();
    
    if (!tagField)
      return

    this.props.tags.push(tagField);
    this.forceUpdate();

    this.props.handleAddTag(this.props.tags);
  }

  renderTags() {
    return this.props.tags.map((tag) => (
      <span key={tag}>{tag}</span>
    ));
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
          <br />
          <label>Tags</label>
          <br />
          <div className="modalTagsContainer">
            {this.renderTags()}
          </div>
          <input type="text" ref="tagField"/>
          <button onClick={this.handleAddTag.bind(this)}>Add Tag</button>
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