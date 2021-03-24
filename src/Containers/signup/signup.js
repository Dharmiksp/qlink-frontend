import React, { Component } from 'react';
import img from '../../images/signup.png';
import Aux from '../../hoc/Aux';
import classes from './signup.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';


class Signup extends Component {
    state = {
        email_id: '',
        password: '',
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    saveHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8080/signup', this.state)
        .then (() => {
            this.setState({ email_id: '', password: ''})
        })
        .catch(error => { 
            console.log(error.response.data)
        })
    }
    
    render() {
        const { email_id, password } = this.state
        return(
            <Aux>
                <Container fluid id="con">
                    <Row>
                        <Col className="col-2"/>
                        <Col className="col-4  ">
                            <form onSubmit={this.saveHandler}>
                                <h2 id="signup">Signup</h2>
                                <div>
                                    <input id="email" type="text" name="email_id" value={email_id} onChange={this.changeHandler} placeholder="Email"/>
                                </div>
                                <div>
                                    <input id="password" type="text" name="password" value={password} onChange={this.changeHandler} placeholder="Password"/>
                                </div>
                                <Button variant="secondary" type="submit" id="save">Register</Button>
                                    
                            </form>

                        </Col>
                        <Col classname="col-1"/>
                        <Col className="col-5">
                        <img src = {img} alt="signup image"/>
                        </Col>
                    </Row>
                </Container>
                <Container fluid id="already">  
                    <Row>
                        <Col className="col-8"></Col>
                        <Col className="col-4"><a href="#" id="mem">Already a member</a></Col>
                    </Row>
                </Container>
            </Aux>
        )
    }
}

export default Signup;