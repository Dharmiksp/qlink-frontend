import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import classes from '../profile/profile.css';
import {Container, Col, Row} from 'react-bootstrap';

class Add extends Component {
    userId = this.props.userId
    state = {
        user: {
            app_name: '',
            link_app: ''
        },
        errorMessage: ''
    }

    changeHandler = e => {
        const { user } = {...this.state};
        const currentState = user;
        const { name, value } = e.target;
        currentState[name] = value;
        this.setState({ user: currentState });    
    }

    cancelHandler = e => {
        this.setState({ user: { ...this.state.user, app_name: '', link_app: ''} });
        this.setState({errorMessage: ''})
        this.props.addCancel()
    }

    saveHandler = e => {
        e.preventDefault()
        axios.post(`http://localhost:8080/link/${this.userId}`, this.state.user)
            .then( () => {
                this.cancelHandler()
                this.props.updateData()
            })
            .catch(error => { 
                this.setState({errorMessage: error.response.data})
            })
    }

    render() {
        const { app_name, link_app } = this.state.user
        return(
            <Container>
                <Row>
                    <Col className="col-2" />
                    <Col className="col-8">
                    <Form onSubmit={this.saveHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="app_name" value={app_name} onChange={this.changeHandler} placeholder="Name" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Link</Form.Label>
                            <Form.Control type="text" name="link_app" value={link_app} onChange={this.changeHandler} placeholder="http://"/>
                        </Form.Group>
                        <center>
                            <Button variant="secondary" type="submit" id="but">Save</Button>
                            <Button onClick={this.cancelHandler} variant="secondary" id="but">Cancel</Button>
                        </center>
                    </Form>
                    </Col>
                    <Col className="col-2" />
                </Row>
                <Row>
                    <Col className="col-1" />
                    <Col className="col-11">{ this.state.errorMessage &&
                            <h3 className="error"  id="error1"> { this.state.errorMessage } </h3> } </Col>
                    <Col className="col-2" />
                </Row>
            </Container>
        ) 
    }
}

export default Add;