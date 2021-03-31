import React, { Component } from 'react';
import img from '../../images/signup.png';
import Aux from '../../hoc/Aux';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import classes from './signup.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Signup extends Component {
    state = {
        user: {
            username: '',
            email_id: '',
            password: ''
        },
        errorMessage: '',
        userId: ''
    }

    changeHandler = e => {
        const { user } = {...this.state};
        const currentState = user;
        const { name, value } = e.target;
        currentState[name] = value;
        this.setState({ user: currentState });
    }

    saveHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8080/signup', this.state.user)
        .then ( res => {
            var token = res.data;
            var decoded = jwt_decode(token);
            console.log(decoded.id);
            this.setState({ userId: decoded.id})
        })
        .catch(error => { 
            this.setState({errorMessage: error.response.data})
        })
    }

    render() {
        const { username, email_id, password } = this.state.user
        return(
            <Aux>
                <Container fluid id="con">
                    <Row>
                        <Col className="col-2"/>
                        <Col className="col-4  ">
                            <form onSubmit={this.saveHandler}>
                                <h2 id="signup">Signup</h2>
                                <div>
                                    <input id="username" type="text" name="username" value={username} onChange={this.changeHandler} placeholder="Username"/>
                                </div>
                                <div>
                                    <input id="email" type="text" name="email_id" value={email_id} onChange={this.changeHandler} placeholder="Email"/>
                                </div>
                                <div>
                                    <input id="password" type="text" name="password" value={password} onChange={this.changeHandler} placeholder="Password"/>
                                </div>
                                <Button variant="secondary" type="submit" id="save">Register</Button>
                            </form>

                        </Col>
                        <Col className="col-1"/>
                        <Col className="col-5">
                        <img src = {img} alt="signup image"/>
                        </Col>
                    </Row>
                </Container>
                <Container fluid id="already">  
                    <Row>
                        <Col className="col-2"/>
                        <Col className="col-6">
                        { this.state.errorMessage &&
                            <h3 className="error" id="error"> { this.state.errorMessage } </h3> }
                        </Col>
                        <Col className="col-4"> <Link to="/login" id="mem">Already a member</Link>
                        </Col>
                    </Row>
                </Container>
            </Aux>
        )
    }
}

export default Signup;