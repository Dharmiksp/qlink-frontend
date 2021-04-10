import React, { Component } from 'react';
import axios from 'axios';
import '../page/page.css';
import {Container, Row, Col, Image} from 'react-bootstrap';

class Page extends Component {
    username = this.props.match.params.username
    state = {
        user: [],
        link: [],
        userId: '',
        display: ''
    }

    loadData = () => {
        axios.get(`http://localhost:8080/username/${this.username}`)
            .then(response => {
                this.setState({userId: response.data[0].user_id})
                this.setState({user: response.data});
                axios.get(`http://localhost:8080/image/${this.state.userId}`)
                .then(response => {
                    this.setState({display: `http://localhost:8080/${response.data.displayImage}`})
                })
                .catch(error => {
                    console.log(error.message)
                })
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
                <Container key={"page" + mem.user_id}>
                    <Row>
                        <Col id="margin" >
                            <center>
                                <div>{mem.profile_title}</div>
                                <div>{mem.bio}</div>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Image src={this.state.display} roundedCircle id="imag" />
                            </center>
                            
                        </Col>
                   </Row>
                </Container>
            )
        })

        const link = this.state.link.map(lik => {
            return(
                <Container id="pad" key={"pager" + lik.link_id}>
                    <Row>
                        <Col className="col-3"/>
                        <Col className="col-6">
                            <div id="box" key={lik.link_id}>
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