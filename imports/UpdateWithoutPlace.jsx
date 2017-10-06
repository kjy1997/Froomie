import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, Button, FormControl,Image, FormGroup } from 'react-bootstrap';

export default class SignUpWithoutPlace extends Component { 
	renderSignUpMain() {
		return this.getTasks().map((task) => (
      		<SignUpMain key={task._id} task={task} />
    	));
	}

   register(event) {
        event.preventDefault();

        var mainInfos = this.SignUpMain.infos();
        const budget = ReactDOM.findDOMNode(this.refs.budget).value.trim();
        const movein = ReactDOM.findDOMNode(this.refs.movein).value.trim();
        const lengthofstay = ReactDOM.findDOMNode(this.refs.lengthofstay).value.trim();

        Accounts.createUser({username: mainInfos.username , password: mainInfos.password}, (error) => {
            if (error) {
                console.log("Error: " + error.reason);
            } else {
                Users.update(Meteor.userId(), {
                    $set: {
                      "profile.email": mainInfos.email,
                      "profile.firstname": mainInfos.firstname,
                      "profile.lastname": mainInfos.lastname,
                      "profile.age": mainInfos.age,
                      "profile.gender": mainInfos.gender,
                      "profile.roomates": mainInfos.roommates,
                      "profile.introduction": mainInfos.introduction,
                      
                      "profile.budget": budget,
                      "profile.moveindate": movein,
                      "profile.lengthofstay": lengthofstay
                    }
                })
                console.log("Registered in user: " + Meteor.user().username);
            }
        });
    }

	render() {
		return (
			<div>
      <form onSubmit={this.register.bind(this)}>
        <FormGroup>

				<div className="container">
					<Row className="place">
        				<Col sm={4} className="subtitle">
         	 				<h2>About Your Stay</h2>
       	 				</Col>
       	 			</Row>
       	 			<Row>
       	 		 <FormControl
				   		className="input"
            			type="text"
            			placeholder="Budget"
                  ref="budget"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Move in date"
                  ref="movein"
          			/>
          			<FormControl
          			    className="input"
            			type="text"
            			placeholder="Length of stay"
                  ref="lengthofstay"
          			/>  
       	 	</Row>
       	 
				</div>
				

				<div className="container">
		<Row className="button-row">
		<Col sm={3} className="blank">
       	 </Col>
       	 <Col sm={6} className="btn-content">
       	 	 <Button className="submit" type="submit">
          Update
        </Button>
       	 </Col>
       	 <Col sm={3} className="blank">
       	 </Col>
        </Row>
        </div>
      </FormGroup>
			</form>

			</div>


		);
	}
}