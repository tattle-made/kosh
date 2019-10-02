import React, {Component} from 'react'
import {HeadingOne, HeadingTwo, HeadingThree, BodyOne, BodyTwo, SubHeadingOne} from '../atomic-components/text'
import { Button, Form,  Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

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
            'subscribeToUpdate':false,
            'status':'default'
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
        this.setState({status:'upload'})

        axios.post('http://localhost:9003/request-access/add', this.state)
        .then((res)=>this.setState({'status':'success'}))
        .catch((err)=>this.setState({'status':'error'}));
    }

    render(){
    return(
    <Container>
        <Logo/>
        <br/>
        <HeadingOne text={'Whatsapp Data Archive'}/>
        <SubHeadingOne text={'We are rolling out access to our data archive. Please let us know how you intend to use this archive.'}/>
        <br/>
        <Form onSubmit={this.onFormSubmit}>
            <Form.Row>
                <Col>
                    <Form.Label> Name*</Form.Label>
                    <Form.Control 
                        name="name"
                        type='text' 
                        placeholder=''
                        onChange={this.onInputChange}
                    />
                </Col>
                <Col>
                    <Form.Label> Email Address* </Form.Label>
                    <Form.Control   
                        name="emailAddress"
                        type='email' 
                        placeholder=''
                        onChange={this.onInputChange}
                    />
                </Col>
            </Form.Row>
            <Form.Text className="text-muted">
                Fields marked * are required
            </Form.Text>

            <br/>

            <Form.Row>
                <Col>
                    <Form.Label> Affiliation </Form.Label>
                    <Form.Control 
                        name="affiliation"
                        type='text' 
                        placeholder=''
                        onChange={this.onInputChange}
                    />
                </Col>

                <Col>
                    <Form.Label>How did you find out about us?</Form.Label>
                    <Form.Control 
                        name="source"
                        as="textarea" 
                        rows="1" 
                        onChange={this.onInputChange}
                    />
                </Col>
            </Form.Row>

            <br/>

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
            {
                this.state.status==='default' 
                ? 
                    <Button variant="color-primary-one" type="submit">
                        Request Access
                    </Button>
                :
                this.state.status==='upload'
                ?
                    <Button variant="color-primary-one" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                        Submitting...
                    </Button>
                :
                this.state.status==='error'
                ?
                    <HeadingTwo text={'There was an error processing your request. Please try again later.'}/>
                :
                this.state.status==='success'
                ?
                    <HeadingTwo text={'Thank you! Look out for communication from us in your email.'}/>
                :
                    <div> Form is in unknown state </div>
            }
            
        </Form>
    </Container>
    )
    }
}

export default SignUp