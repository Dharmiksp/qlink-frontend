import React, { Component } from 'react';
import axios from 'axios';
import {Button, Form } from 'react-bootstrap';
import {Container, Col, Row} from 'react-bootstrap';
import '../profile/profile.css';

class Editl extends Component {
    linkId = this.props.linkId
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
    
    cancelHandler = () => {
        this.setState({ user: { ...this.state.user, app_name: '', link_app: ''} });
        this.setState({errorMessage: ''})        
        this.props.editCancel()
    }

    saveHandler = e => {
        e.preventDefault()
        axios.put(`http://localhost:8080/link/${this.props.linkId}`, this.state.user)
        .then( () => {
            this.props.editCancel()
        })
        .catch(error => { 
            this.setState({errorMessage: error.response.data})
        })
    }
    
    componentWillReceiveProps(newProps) {
        if(!newProps.linkId) return 
        else axios.get(`http://localhost:8080/linkget/${newProps.linkId}`)
            .then(response => { this.setState({ user: { ...this.state.user, app_name: response.data[0].app_name, link_app: response.data[0].link_app}})
        });
    }

    render() {
        const { app_name, link_app} = this.state.user;
        return(
            <Container>
                <Row>
                    <Col className="col-2" />
                    <Col className="col-8">
                        <Form onSubmit={this.saveHandler}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label id="name">Name</Form.Label>
                                <Form.Control type="text" name="app_name" value={app_name} onChange={this.changeHandler} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label id="name">Link</Form.Label>
                                <Form.Control type="text" name="link_app" value={link_app} onChange={this.changeHandler} />
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
                    <Col className="col-2" />
                    <Col className="col-10">{ this.state.errorMessage &&
                            <h3 className="error"  id="error1"> { this.state.errorMessage } </h3> } </Col>
                    <Col className="col-2" />
                </Row>
            </Container>
        )
    }
}

export default Editl;
