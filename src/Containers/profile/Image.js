import React, { Component } from 'react';
import axios from 'axios';
import {Button, Form, Card } from 'react-bootstrap';
import {Container, Col, Row} from 'react-bootstrap';


class Image extends Component {
    userId = this.props.userId
    state = {
        display: '',
    }

    changeHandler = e => {
        this.setState({ display: e.target.files[0] })
    }

    saveHandler = e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append(
        "display",
        this.state.display
      );
        axios.post(`http://localhost:8080/image/${this.userId}`, formData)
            .then(res => {
                this.props.addCancel()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        const {display} = this.state;
        return(
           <Container>
               <Row>
                <Col className="col-12"> 
                <Card bg="dark" text="white">
                    <Card.Header as="h5">Profile Photo</Card.Header>
                    <Card.Body>
                    <Form onSubmit={this.saveHandler}>
                        <Form.Group>
                            <input type="file" name='display' file={display} onChange={this.changeHandler} accept="image/*"/>
                        </Form.Group>
                        <center>
                            <Button variant="secondary" type="submit">Upload</Button>
                        </center>
                    </Form>
                    </Card.Body>
                </Card>
                </Col>
               </Row>
           </Container>
        )
    }
}

export default Image;