import React, { Component } from 'react';
import axios from 'axios';
import classes from '../page/page.css';
import {Container, Row, Col} from 'react-bootstrap';

class Page extends Component {
    username = this.props.match.params.username
    state = {
        user: [],
        link: [],
        display: ''
    }

    loadData = () => {
        axios.get(`http://localhost:8080/username/${this.username}`)
            .then(response => {
                console.log(this.props.username);
                this.setState({user: response.data});
            })
            .catch(error => { 
                console.log(error.message)
            })

        axios.get(`http://localhost:8080/linkd/${this.username}`)
            .then(response => {
                this.setState({link: response.data})
            })
            .catch(error => { 
                console.log(error.message)
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