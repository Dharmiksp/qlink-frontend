import React, { Component } from 'react';
import axios from 'axios';
import '../profile/profile.css';
import {Button, Form } from 'react-bootstrap';
import {Container, Col, Row} from 'react-bootstrap';

class Edit extends Component {
    userId = this.props.userId
    state = {
        profile_title: '',
        bio: '',
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    cancelHandler = () => {
        this.setState({ profile_title: '', bio: ''});
        this.props.editCancel()
    }

    saveHandler = e => {
        e.preventDefault()
        axios.put(`http://localhost:8080/users/${this.props.userId}`, this.state)
        .then( () => {
            console.log(this.state.display)
            this.setState({profile_title: '', bio: ''})
            this.props.editCancel()
        })
        .catch(error => {
            console.log(error.response.data);
        })
    }

    async componentWillReceiveProps(newProps) {
        await axios.get(`http://localhost:8080/users/${newProps.userId}`)
            .then(response => { this.setState({profile_title:response.data[0].profile_title, bio:response.data[0].bio });
        });
    }

    render() {
        const { profile_title, bio} = this.state;
        return(
            <Container>
                <Row>
                    <Col className="col-2" />
                    <Col className="col-8">
                    <Form onSubmit={this.saveHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="profile_title" value={profile_title} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Bio</Form.Label>
                            <Form.Control type="text" name="bio" value={bio} onChange={this.changeHandler}/>
                        </Form.Group>
                        <center>
                            <Button variant="secondary" type="submit" id="but">Save</Button>
                            <Button onClick={this.cancelHandler} variant="secondary" id="but">Cancel</Button>
                        </center>
                    </Form>
                    
                    </Col>
                    <Col className="col-2" />
                </Row>
            </Container>
        )
    }
}

export default Edit;