import React, { Component } from 'react';
import { Col, Row, Button, FormControl, Image, Thumbnail } from 'react-bootstrap';
import '../client/css/search.css';

export default class Search extends Component { 

	render() {
		return (	
			<div>
			<Row className="top-bar">
			<Col sm={3} className="logo">
				<h3>Froomie!</h3>
			</Col>
			</Row>

			<Row className="content">
				<Col sm={3} className="filter">
         	 		<h3>Filters</h3>
         	 		<FormControl componentClass="select" placeholder="select">
        			<option value="select">select age</option>
        			<option value="other">...</option>
      				</FormControl>
      				<FormControl componentClass="select" placeholder="select">
        			<option value="select">select gender</option>
        			<option value="other">...</option>
      				</FormControl>
      				<FormControl componentClass="select" placeholder="select">
        			<option value="select">select location</option>
        			<option value="other">...</option>
      				</FormControl>
      				<FormControl componentClass="select" placeholder="select">
        			<option value="select">select tag</option>
        			<option value="other">...</option>
      				</FormControl>
      				<FormControl componentClass="select" placeholder="select">
        			<option value="select">select budget</option>
        			<option value="other">...</option>
      				</FormControl>		
      				 <Button className="submit" type="submit">
          				Submit
        			 </Button>
       	 		</Col>
       	 		<Col sm={9} className="display">
         	 		 <Row>
    		<Col xs={6} md={4}>
      <Thumbnail className="thumbnail" src="/img/avatar.jpg" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail className="thumbnail" src="/assets/thumbnaildiv.png" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail className="thumbnail" src="/assets/thumbnaildiv.png" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    </Row>	
       	 		</Col>
			</Row>
			</div>
		);
	}
}