import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EditProfileModal extends Component {
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
    const addressField  = ReactDOM.findDOMNode(this.refs.addressField).value.trim();
    const propertyField = ReactDOM.findDOMNode(this.refs.propertyField).value.trim();
    const roomField     = ReactDOM.findDOMNode(this.refs.roomCountField).value.trim();
    const bathroomField = ReactDOM.findDOMNode(this.refs.bathroomCountField).value.trim();
    const internetField = ReactDOM.findDOMNode(this.refs.internetField).checked ? 'yes' : 'no';
    const parkingField  = ReactDOM.findDOMNode(this.refs.parkingField).checked ? 'yes' : 'no';
    const acField       = ReactDOM.findDOMNode(this.refs.acField).checked ? 'yes' : 'no';
    const rentField     = ReactDOM.findDOMNode(this.refs.rentField).value.trim();
    const depositField  = ReactDOM.findDOMNode(this.refs.depositField).value.trim();
    const roomTypeField = ReactDOM.findDOMNode(this.refs.roomTypeField).value.trim();
    const bathroomTypeField = ReactDOM.findDOMNode(this.refs.bathroomTypeField).value.trim();
    const furnishingField   = ReactDOM.findDOMNode(this.refs.furnishingField).value.trim();
    const genderPrefField   = ReactDOM.findDOMNode(this.refs.genderPrefField).value.trim();

    // Hidden info
    const visibilityField   = ReactDOM.findDOMNode(this.refs.visibility).value.trim();
    const hideAgeField      = ReactDOM.findDOMNode(this.refs.hideAge).value.trim();
    const hideGenderField   = ReactDOM.findDOMNode(this.refs.hideGender).value.trim();
    const hideSocialField   = ReactDOM.findDOMNode(this.refs.hideSocial).value.trim();
    const hideTagsField     = ReactDOM.findDOMNode(this.refs.hideTags).value.trim();
    const hideAddressField  = ReactDOM.findDOMNode(this.refs.hideAddress).value.trim();
    const hideRentField     = ReactDOM.findDOMNode(this.refs.hideRent).value.trim();
    const hideDepositField  = ReactDOM.findDOMNode(this.refs.hideDeposit).value.trim();

    if (!fNameField || !lNameField || !ageField 
      || !emailField || !aboutField || !roomField
      || !bathroomField || !rentField || !depositField) {
      alert("Missing information!");
      return;
    }
    if (roomField < 0 || bathroomField < 0) {
      alert("Rooms cannot be negative!");
      return;
    }
    if (rentField < 0 || depositField < 0) {
      alert("Prices cannot be negative!");
      return;
    }

    let hidden = {
      hideAge: hideAgeField,
      hideGender: hideGenderField,
      hideSocial: hideSocialField,
      hideTags: hideTagsField,
      hideAddress: hideAddressField,
      hideRent: hideRentField,
      hideDeposit: hideDepositField
    }

    let obj = {
      fname: fNameField,
      lname: lNameField,
      about: aboutField,
      age: parseInt(ageField),
      gender: genderField,
      tags: this.state.tags,
      social: socialField,
      email: emailField,
      address: addressField,
      property: propertyField,
      roomCount: roomField,
      bathroomCount: bathroomField,
      internet: internetField,
      parking: parkingField,
      ac: acField,
      rent: parseInt(rentField),
      deposit: parseInt(depositField),
      roomType: roomTypeField,
      bathroomType: bathroomTypeField,
      furnishing: furnishingField,
      preferGender: genderPrefField,
      visibility: visibilityField,

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
    let address = this.props.address;
    let property = this.props.property;
    let amenities = this.props.amenities;
    let room = this.props.room;

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

		      <input className="nameInput" type="text" ref="emailField" placeholder="email *" defaultValue={email} />
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

          <label>Housing Info</label>
          <br />

          <div className="housingInfo">
            <div className="housingColumn propertyInfo">
              <label className="housingColumnName">Property</label>
              <label>Address</label>
              <input type="text" ref="addressField" placeholder="address" defaultValue={address}/>
              <label>Property Type</label>
              <select className="modalSelect" ref="propertyField" defaultValue={property.propertyType}>
                <option value="apartment">Apartment</option>
                <option value="coop">Co-op</option>
                <option value="house">House</option>
                <option value="townhouse">Townhouse</option>
              </select>
              <label>Room Count</label>
              <input type="number" ref="roomCountField" placeholder="# of rooms" defaultValue={property.roomCount}/>
              <label>Bathroom Count</label>
              <input type="number" ref="bathroomCountField" placeholder="# of bathrooms" defaultValue={property.bathroomCount}/>
            </div>
            <div className="housingColumn amenitiesInfo">
              <label className="housingColumnName">Amenities</label>
              <label><input type="checkbox" ref="internetField" defaultChecked={amenities.internet === 'yes'}/>internet</label>
              <label><input type="checkbox" ref="parkingField" defaultChecked={amenities.parking === 'yes'}/>parking</label>
              <label><input type="checkbox" ref="acField" defaultChecked={amenities.ac === 'yes'}/>air conditioning</label>
            </div>
            <div className="housingColumn roomInfo">
              <label className="housingColumnName">Room</label>
              <label>Rent</label>
              <input type="number" ref="rentField" placeholder="monthly rent" defaultValue={room.rent}/>
              <label>Deposit</label>
              <input type="number" ref="depositField" placeholder="security deposit" defaultValue={room.deposit}/>
              <label>Room Type</label>
              <select className="modalSelect" ref="roomTypeField" defaultValue={room.roomType}>
                <option value="private">Private</option>
                <option value="shared">Shared</option>
              </select>
              <label>Bathroom Type</label>
              <select className="modalSelect" ref="bathroomTypeField" defaultValue={room.bathroomType}>
                <option value="private">Private</option>
                <option value="shared">Shared</option>
              </select>
              <label>Furnishing</label>
              <select className="modalSelect" ref="furnishingField" defaultValue={room.furnishing}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>Preferred Gender</label>
              <select className="modalSelect" ref="genderPrefField" defaultValue={room.preferGender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="undecided">No Preference</option>
              </select>
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
          <select ref="visibility" defaultValue={this.props.profile.visibility}>
            <option value="public">public</option>
            <option value="matches">matches only</option>
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
          <label>Address</label>
          <select ref="hideAddress" defaultValue={hidden.hideAddress}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
          <label>Rent</label>
          <select ref="hideRent" defaultValue={hidden.hideRent}>
            <option value="nh">not hidden</option>
            <option value="mh">match hidden</option>
            <option value="ah">absolutely hidden</option>
          </select>
          <label>Deposit</label>
          <select ref="hideDeposit" defaultValue={hidden.hideDeposit}>
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


