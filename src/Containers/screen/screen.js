import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import classes from '../screen/screen.css';
import {Container, Row, Col} from 'react-bootstrap';

class Screen extends Component {
   userId = this.props.userId
    state = {
        user: [],
        link: [],
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
               <Container fluid >
                   <Row >
                       <Col className="col-12 " id="margin">
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
                <Container id="padd">
                    <Row >
                        <Col className="col-1"/>
                        <Col className="col-10" >
                            <div id="box"><a id="ahr" href={lik.link_app}>
                                <center>{lik.app_name}</center></a></div>
                        </Col>
                        <Col className="col-1"/>
                    </Row>
                </Container>
            )
        })

        return(
            <Container>
                <Row>
                    <Col className="col-12">
                        {user}
                        {link}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Screen;