import React, { Component } from "react";
import {HeadingOne, HeadingTwo, HeadingThree, BodyOne, BodyTwo, SubHeadingOne} from '../atomic-components/text'
import { Button, Form,  Container, Row, Col, Spinner } from 'react-bootstrap';

class LoginCard extends Component {
  constructor(props){
    super(props)
    this.state={
      status : 'default'
    }
  }

  onSubmit(){
    console.log('hi')
    //this.setState({status:'upload'})
  }
  
  render() {
    return (
          <Form onSubmit={this.props.onSubmit}>
            <Form.Row>
              <Col xs={12} md={3}>
                <Form.Label> Username</Form.Label>
                <Form.Control 
                    name="username"
                    type='text' 
                    placeholder='Enter Username'
                    onChange={this.props.onChange}
                />
              </Col>

              <Col xs={12} md={3}>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  name="password"
                  type="password" 
                  placeholder="Password" 
                  onChange={this.props.onChange}
                />
              </Col>

              <Col xs={12} md={2} className="login-button">
                {
                  this.props.loading==true
                  ? 
                    <Button variant="color-primary-one" disabled block>
                      <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          />
                        Signing In
                    </Button>
                  :
                    <Button 
                      variant="color-primary-one" 
                      type="submit" 
                      onClick = {this.onSubmit()}
                      block
                    >
                      Sign In
                    </Button>
                }
              </Col>
              
            </Form.Row>

            <br/>

          </Form>
    );
  }
}

export default LoginCard;
