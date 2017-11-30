import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EditProfileModalNoPlace extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    // deep copy to prevent reference modification
    this.setState({
      tags: JSON.parse(JSON.stringify(this.props.profile.tags))
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const fNameField    = ReactDOM.findDOMNode(this.refs.firstNameField).value.trim();
    const lNameField    = ReactDOM.findDOMNode(this.refs.lastNameField).value.trim();
	const mailField     = ReactDOM.findDOMNode(this.refs.emailField).value.trim();
    const aboutField    = ReactDOM.findDOMNode(this.refs.aboutField).value.trim();
    const ageField      = ReactDOM.findDOMNode(this.refs.ageField).value.trim();
    const genderField   = ReactDOM.findDOMNode(this.refs.genderField).value.trim();
    const socialField   = ReactDOM.findDOMNode(this.refs.socialField).value.trim();
    const budgetField   = ReactDOM.findDOMNode(this.refs.budgetField).value.trim();
    const moveInField   = ReactDOM.findDOMNode(this.refs.moveInField).value.trim();
    const stayLenField  = ReactDOM.findDOMNode(this.refs.stayLengthField).value.trim();
    
    if (!fNameField || !lNameField || !aboutField || !mailField) {
      alert("Missing information!");
      return;
    }

    let obj = {
      fname: fNameField,
      lname: lNameField,
      about: aboutField,
      age: parseInt(ageField),
      gender: genderField,
	  mail: mailField,
      tags: this.state.tags,
      social: socialField,
      budget: parseInt(budgetField),
      moveInDate: moveInField,
      stayLength: stayLenField
    }

    this.props.handleEdit(obj);
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
    let firstName = this.props.profile.firstName;
    let lastName = this.props.profile.lastName;
	let email = this.props.profile.email;
    let stay = this.props.stay;

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
          <div className="aboutBar">
          <input className="ageInput" type="number" ref="ageField" placeholder="age" defaultValue={this.props.profile.age}/>
          <select className="genderInput" ref="genderField" defaultValue={this.props.profile.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          </div>
          <br />
		  <input className="nameInput" type="text" ref="emailField" placeholder="email *" defaultValue={email}/>
		  <br />
          <textarea ref="aboutField" placeholder="tell us about yourself! *" defaultValue={this.props.profile.about}></textarea>
          <br />

          <label>Tags</label>
          <p>Click tag to remove</p>
          <div className="modalTagsContainer">
            {this.renderTags()}
          </div>
          <input type="text" ref="tagField" placeholder="enter tag here"/>
          <button onClick={this.handleAddTag.bind(this)}>Add Tag</button>
          <br />

          <input className="nameInput" type="text" ref="socialField" placeholder="social media link" defaultValue={this.props.profile.social}/>
          <br />

          <label>Stay Info</label>
          <br />

          <div className="housingInfo">
            <div className="housingColumn stayInfo">
              <label className="housingColumnName">About My Stay</label>
              <input type="number" ref="budgetField" placeholder="budget" defaultValue={stay.budget}/>
              <input type="text" ref="moveInField" placeholder="move in date" defaultValue={stay.moveInDate}/>
              <input type="text" ref="stayLengthField" placeholder="length of stay" defaultValue={stay.stayLength}/>
            </div>
          </div>
          
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