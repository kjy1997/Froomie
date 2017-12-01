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
    const emailField    = ReactDOM.findDOMNode(this.refs.emailField).value.trim();
    const aboutField    = ReactDOM.findDOMNode(this.refs.aboutField).value.trim();
    const ageField      = ReactDOM.findDOMNode(this.refs.ageField).value.trim();
    const genderField   = ReactDOM.findDOMNode(this.refs.genderField).value.trim();
    const socialField   = ReactDOM.findDOMNode(this.refs.socialField).value.trim();
    const budgetField   = ReactDOM.findDOMNode(this.refs.budgetField).value.trim();
    const moveInField   = ReactDOM.findDOMNode(this.refs.moveInField).value.trim();
    const stayLenField  = ReactDOM.findDOMNode(this.refs.stayLengthField).value.trim();

    // Hidden info
    const hideAgeField      = ReactDOM.findDOMNode(this.refs.hideAge).value.trim();
    const hideGenderField   = ReactDOM.findDOMNode(this.refs.hideGender).value.trim();
    const hideSocialField   = ReactDOM.findDOMNode(this.refs.hideSocial).value.trim();
    const hideTagsField     = ReactDOM.findDOMNode(this.refs.hideTags).value.trim();
    const hideBudgetField   = ReactDOM.findDOMNode(this.refs.hideBudget).value.trim();
    const hideMoveInDateField  = ReactDOM.findDOMNode(this.refs.hideMoveInDate).value.trim();
    const hideStayLengthField  = ReactDOM.findDOMNode(this.refs.hideStayLength).value.trim();
    
    if (!fNameField || !lNameField || !ageField || !emailField 
      || !aboutField || !budgetField || !moveInField || !stayLenField) {
      alert("Missing information!");
      return;
    }

    if (budgetField < 0) {
      alert("Budget cannot be negative!");
      return;
    }

    let hidden = {
      hideAge: hideAgeField,
      hideGender: hideGenderField,
      hideSocial: hideSocialField,
      hideTags: hideTagsField,
      hideBudget: hideBudgetField,
      hideMoveInDate: hideMoveInDateField,
      hideStayLength: hideStayLengthField
    }

    let obj = {
      fname: fNameField,
      lname: lNameField,
      about: aboutField,
      age: parseInt(ageField),
      gender: genderField,
      email: emailField,
      tags: this.state.tags,
      social: socialField,
      budget: parseInt(budgetField),
      moveInDate: moveInField,
      stayLength: stayLenField,

      hidden: hidden
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
              <label>Budget</label>
              <input type="number" ref="budgetField" placeholder="budget" defaultValue={stay.budget}/>
              <label>Move In Date</label>
              <input type="text" ref="moveInField" placeholder="move in date" defaultValue={stay.moveInDate}/>
              <label>Stay Length</label>
              <input type="text" ref="stayLengthField" placeholder="length of stay" defaultValue={stay.stayLength}/>
            </div>
          </div>
          
          <h6>* indicates required fields</h6>
          <input type="submit" value="Save"/>
        </form>
      </div>
    );
  }

  getHideTools() {
    let hidden = this.props.profile.hidden;
    return (
      <div className="hideTools">
        <div className="hideSection">
          <label>Profile Visibility</label>
          <select>
            <option>public</option>
            <option>matches only</option>
          </select>
        </div>
        <div className="hideSection">
          <label>Age</label>
          <select ref="hideAge" defaultValue={hidden.hideAge}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
          <label>Gender</label>
          <select ref="hideGender" defaultValue={hidden.hideGender}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
          <label>Social Media</label>
          <select ref="hideSocial" defaultValue={hidden.hideSocial}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
          <label>Tags</label>
          <select ref="hideTags" defaultValue={hidden.hideTags}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
          <label>Budget</label>
          <select ref="hideBudget" defaultValue={hidden.hideBudget}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
          <label>Move In Date</label>
          <select ref="hideMoveInDate" defaultValue={hidden.hideMoveInDate}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
          <label>Stay Length</label>
          <select ref="hideStayLength" defaultValue={hidden.hideStayLength}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.isOpen)
      return null;

    return(
      <div>
        <div className="backdrop" onClick={this.close.bind(this)}>
          <div className="profileModal" onClick={e => e.stopPropagation()}>
          {this.getEditTools()}
          {this.getHideTools()}
          </div>
        </div>
      </div>
    );
  }

  close() {
    this.props.onClose();
  }
}


