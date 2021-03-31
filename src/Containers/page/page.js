import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import classes from '../page/page.css';
import {Container, Row, Col} from 'react-bootstrap';

class Page extends Component {
    userId = this.props.userId
    state = {
        user: [],
        link: [],
        // userId: 25
    }

    loadData = () => {
        axios.get(`http://localhost:8080/users/${this.props.userId}`)
            .then(response => {
                this.setState({user: response.data});
            })

        axios.get(`http://localhost:8080/link/${this.props.userId}`)
            .then(response => {
                this.setState({link: response.data})
            })
    }

    componentDidMount() {
        this.loadData()
    }
    
    render() {
        const user = this.state.user.map(mem => { 
            return(
                <Container>
                    <Row>
                        <Col id="margin">
                            <center>
                                <div>{mem.profile_title}</div>
                                <div>{mem.bio}</div>
                            </center>
                        </Col>
                    </Row>
                </Container>
            )
        })

        const link = this.state.link.map(lik => {
            return(
                <Container id="pad">
                    <Row>
                        <Col className="col-3"/>
                        <Col className="col-6">
                            <div id="box">
                                <a id="ahre" href={lik.link_app}>
                                    <center>
                                        {lik.app_name}
                                    </center>
                                </a>
                            </div>
                        </Col>
                        <Col className="col-3"/>
                    </Row>
                </Container>
            )
        })

        return(
            <Container>
                <Row>
                    <Col>
                        {user}
                        {link}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Page;