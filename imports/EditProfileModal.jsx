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
    //const streetField = ReactDOM.findDOMNode(this.refs.streetField).value.trim();
    //const cityField   = ReactDOM.findDOMNode(this.refs.cityField).value.trim();
    //const zipField    = ReactDOM.findDOMNode(this.refs.zipField).value.trim();
    const suiteField  = ReactDOM.findDOMNode(this.refs.suiteField).value.trim();
    const propertyField     = ReactDOM.findDOMNode(this.refs.propertyField).value.trim();
    const roomField         = ReactDOM.findDOMNode(this.refs.roomCountField).value.trim();
    const bathroomField     = ReactDOM.findDOMNode(this.refs.bathroomCountField).value.trim();
    const internetField     = ReactDOM.findDOMNode(this.refs.internetField).checked;
    const parkingField      = ReactDOM.findDOMNode(this.refs.parkingField).checked;
    const acField           = ReactDOM.findDOMNode(this.refs.acField).checked;
    const rentField         = ReactDOM.findDOMNode(this.refs.rentField).value.trim();
    const depositField      = ReactDOM.findDOMNode(this.refs.depositField).value.trim();
    const roomTypeField     = ReactDOM.findDOMNode(this.refs.roomTypeField).value.trim();
    const bathroomTypeField = ReactDOM.findDOMNode(this.refs.bathroomTypeField).value.trim();
    const furnishingField   = ReactDOM.findDOMNode(this.refs.furnishingField).value.trim();
    const genderPrefField   = ReactDOM.findDOMNode(this.refs.genderPrefField).value.trim();

    if (!fNameField || !lNameField || !aboutField) {
      alert("Missing information!");
      return;
    }

    let address = {
      //street: streetField,
      //city: cityField,
      //zipcode: zipField,
      suite: suiteField
    }

    let property = {
      propertyType: propertyField,
      roomCount: roomField,
      bathroomCount: bathroomField
    }

    let amenities = {
      internet: internetField,
      parking: parkingField,
      ac: acField
    }

    let room = {        
      rent: rentField,
      deposit: depositField,
      roomType: roomTypeField,
      bathroomType: bathroomTypeField,
      furnishing: furnishingField,
      genderPref: genderPrefField
    }

    let obj = {
      name: fNameField + " " + lNameField,
      about: aboutField,
      address: address,
      property: property,
      amenities: amenities,
      room: room,
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
    let firstName = this.props.fname;
    let lastName = this.props.lname;
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

          <label>Housing Info</label>
          <br />

          <div className="housingInfo">
            <div className="housingColumn propertyInfo">
              <label className="housingColumnName">Property</label>
              <input type="text" ref="addressField" placeholder="address" defaultValue={address}/>
              <input type="text" ref="suiteField" placeholder="suite" defaultValue={address.suite}/>
              <input type="text" ref="propertyField" placeholder="property type" defaultValue={property.propertyType}/>
              <input type="number" ref="roomCountField" placeholder="# of rooms" defaultValue={property.roomCount}/>
              <input type="number" ref="bathroomCountField" placeholder="# of bathrooms" defaultValue={property.bathroomCount}/>
            </div>
            <div className="housingColumn amenitiesInfo">
              <label className="housingColumnName">Amenities</label>
              <label><input type="checkbox" ref="internetField" defaultChecked={amenities.internet}/>internet</label>
              <label><input type="checkbox" ref="parkingField" defaultChecked={amenities.parking}/>parking</label>
              <label><input type="checkbox" ref="acField" defaultChecked={amenities.ac}/>air conditioning</label>
            </div>
            <div className="housingColumn roomInfo">
              <label className="housingColumnName">Room</label>
              <input type="number" ref="rentField" placeholder="monthly rent" defaultValue={room.rent}/>
              <input type="number" ref="depositField" placeholder="security deposit" defaultValue={room.deposit}/>
              <input type="text" ref="roomTypeField" placeholder="room type" defaultValue={room.roomType}/>
              <input type="text" ref="bathroomTypeField" placeholder="bathroom type" defaultValue={room.bathroomType}/>
              <input type="text" ref="furnishingField" placeholder="furnishing" defaultValue={room.furnishing}/>
              <input type="text" ref="genderPrefField" placeholder="preferred gender" defaultValue={room.genderPref}/>
            </div>
          </div>

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


