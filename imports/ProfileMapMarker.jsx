import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

// standard profile marker
const ProfileMapMarker = ({text}) => 
  <div style={ProfileMapMarkerStyle}>{text}</div>
  
const ProfileMapMarkerStyle = {
  position: 'absolute',
  width: 40,
  height: 40,

  border: '1px solid black',
  borderRadius: 40,
  backgroundColor: 'rgba(155, 155, 155, 0.3)',
  textAlign: 'center',
  color: 'black',
  fontSize: 12,
  padding: 4
};

export default ProfileMapMarker;