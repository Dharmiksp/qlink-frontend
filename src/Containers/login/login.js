import React, { Component } from 'react';
import img from '../../images/login.png';
import Aux from '../../hoc/Aux';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Admin from '../admin';
import classes from './login.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

class Login extends Component {
    state = {
        user: {
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
        axios.post('http://localhost:8080/login', this.state.user)
        .then ( res => {
            var token = res.data;
            var decoded = jwt_decode(token);
            this.setState({ userId: decoded.id})
            console.log(this.state.userId);
            this.props.history.push(`admin/${this.state.userId}`);

        })
        .catch(error => { 
            console.log(error)
            // this.setState({errorMessage: error})
        })
    }

    render() {
        const { email_id, password } = this.state.user;
        <Admin userId={this.state.userId} />
        return(
            <Aux>
                <Container fluid id="con"> 
                    <Row>
                        <Col className="col-2" />
                        <Col className="col-4 ">
                            <img src={img} alt="Login" />
                        </Col>
                        <Col className="col-1" />
                        <Col className="col-5"> 
                            <form onSubmit={this.saveHandler}>
                                <h2 id="signup">Login</h2>
                                <div>
                                    <input id="email" type="text" name="email_id" value={email_id} onChange={this.changeHandler} placeholder="Email"/>
                                </div>
                                <div>
                                    <input id="password" type="text" name="password" value={password} onChange={this.changeHandler} placeholder="Password"/>
                                </div>
                                <Button variant="secondary" type="submit" id="save">
                                    Login
                                </Button>  
                            </form>
                        </Col>
                    </Row>
                </Container>
                <Container fluid id="already">  
                    <Row>
                        <Col className="col-2" />
                        <Col className="col-5"> <Link to="/" id="mem">Create an account</Link>
                        </Col>
                        <Col className="col-5">
                        { this.state.errorMessage &&
                            <h3 className="error" id="error"> { this.state.errorMessage } </h3> }
                        </Col>
                    </Row>
                </Container>
            </Aux>
        )
    }
}

export default Login;