import React, {Component} from 'react'
import {HeadingOne, HeadingTwo, HeadingThree, BodyOne, BodyTwo, SubHeadingOne} from '../atomic-components/text'
import { Button, Form,  Container, Row } from 'react-bootstrap';

import Logo from '../components/Logo'

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            'name':'',
            'affiliation':'',
            'emailAddress':'',
            'source':'',
            'additionalInfo':'',
            'subscribeToUpdate':false
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }


    onInputChange(e) {
        var newValue;
        if(e.target.name==='subscribeToUpdate') newValue = e.target.checked;
        else newValue = e.target.value;

        this.setState({
            [e.target.name]: newValue
        });
    }

    onFormSubmit(e){
        e.preventDefault()
        console.log(this.state);
    }

    render(){
    return(
    <Container>
        <Logo/>
        <br/>
        <HeadingOne text={'Request Access'}/>
        <SubHeadingOne text={'We are rolling out access to our data archive. Please let us know a bit about what you intend to do with the dataset.'}/>
        <br/>
        <Form onSubmit={this.onFormSubmit}>
            <Form.Group controlId="name">
                <Form.Label> Name </Form.Label>
                <Form.Control 
                    name="name"
                    type='text' 
                    placeholder=''
                    onChange={this.onInputChange}
                />
            </Form.Group>
            <Form.Group controlId="affiliation">
                <Form.Label> Affiliation </Form.Label>
                <Form.Control 
                    name="affiliation"
                    type='text' 
                    placeholder=''
                    onChange={this.onInputChange}
                />
            </Form.Group>
            <Form.Group controlId="emailAddress">
                <Form.Label> Email Address </Form.Label>
                <Form.Control   
                    name="emailAddress"
                    type='email' 
                    placeholder=''
                    onChange={this.onInputChange}
                />
            </Form.Group>
            <Form.Group controlId="source">
                <Form.Label>Where did you hear about us?</Form.Label>
                <Form.Control 
                    name="source"
                    as="textarea" 
                    rows="1" 
                    onChange={this.onInputChange}
                />
            </Form.Group>
            <Form.Group controlId="additionalInfo">
                <Form.Label>Additional Information</Form.Label>
                <Form.Control 
                    name="additionalInfo"
                    as="textarea"
                    rows="4"
                    onChange={this.onInputChange}
                />
            </Form.Group>
            <Form.Group id="subscribeToUpdate">
                <Form.Check 
                    name="subscribeToUpdate"
                    type="checkbox" 
                    label="Send me sporadic updates about Tattle's progress" 
                    onChange={this.onInputChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Request Access
            </Button>
        </Form>
    </Container>
    )
    }
}

export default SignUp