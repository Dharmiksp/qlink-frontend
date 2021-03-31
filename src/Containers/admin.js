import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import {Container, Row, Col} from 'react-bootstrap';
import Pedit from '../Component/button/Pedit';
import Ledit from '../Component/button/Ledit';
import Ladd from '../Component/button/Ladd'
import Screen from '../Containers/screen/screen';
import Add from './link/Add';
import classes from './profile/profile.css';
import Delete from './link/Delete';
import { ButtonGroup, Button, Card } from 'react-bootstrap';
import Modal from '../Component/Modal/Modal';
import Page from '../Containers/page/page';
import Edit from './profile/Edit';
import { Link } from 'react-router-dom';
import Editl from './link/Editl';
import axios from 'axios';

class Admin extends Component {
    
    state = {
        user:[],
        link:[],
        userEdit: false,
        linkAdd: false,
        linkEdit: false,
        linkId: '',
        userId: 25,
    }

    loadData = () => {
        axios.get(`http://localhost:8080/users/${this.state.userId}`)
            .then(response => {
                this.setState({user: response.data});
            })

        axios.get(`http://localhost:8080/link/${this.state.userId}`)
            .then(response => {
                this.setState({link: response.data})
            })
    }

    componentDidMount() {
        this.loadData()
    }

    userEditHandler = () => {
        this.setState({userEdit: true});
    }

    userEditCancelHandler = () => {
        this.setState({ userEdit: false});
        this.loadData()
    }

    linkAddHandler = () => {
        this.setState({ linkAdd: true });
    }

    linkAddCancelHandler = () => {
        this.setState({ linkAdd: false });
        this.loadData()
    }

    linkEditHandler = (linkId) => {
        this.setState({ linkEdit: true, linkId: linkId});
        console.log(linkId)
    }

    linkEditCancelHandler = () => {
        this.setState({ linkEdit: false});
        this.loadData()
    }

    
    render() {
        const user = this.state.user.map(mem => {            
            return(
                <Card bg="dark" text="white" >  
                    <Card.Header><h3>Profile</h3></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Container>
                                <Row>
                                    <Col className="col-10">
                                        <div> Title: {mem.profile_title}</div>
                                        <div>Bio: {mem.bio}</div>
                                    </Col>
                                    <Col className="col-2">
                                    <Pedit editProfile={this.userEditHandler}/>
                                    </Col>
                                </Row>
                            </Container>
                            
                            
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })


        const link = this.state.link.map(lik => {
            return(
                <Card bg="dark" text="white" id="cards" >  
                    <Card.Body>
                        <Card.Text>
                            <Container>
                                <Row >
                                    <Col className="col-9" >
                                        <div>{lik.app_name}</div>
                                        <div>{lik.link_app}</div>
                                    </Col>
                                    <Col className="col-3 ">
                                        <ButtonGroup aria-label="Basic example" size="sm">
                                            <Ledit editLink={() => this.linkEditHandler(lik.link_id)} />
                                            <Delete linkId={lik.link_id} updateData={this.loadData}/>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Container>                            
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

        return(
            <Aux>
                <Container fluid>
                    <Row>
                        <Col className="col-9">
                            <Container>
                                <Row id="profile">
                                    <Col className="col-2" />
                                    <Col className="col-8 "  >
                                        {user}
                                        <Modal show={this.state.userEdit} modalClosed={this.userEditCancelHandler}>
                                            <Edit editCancel={this.userEditCancelHandler} userId={this.state.userId}/>
                                        </Modal>
                                    </Col>
                                    <Col className="col-2" />
                                </Row>
                                <Row id="profile">
                                    <Col className="col-2" />
                                    <Col className="col-8 " >
                                        <Ladd addLink={this.linkAddHandler}/>
                                        <Modal show={this.state.linkAdd} modalClosed={this.linkAddCancelHandler}>
                                            <Add userId={this.state.userId} updateData={this.loadData} addCancel={this.linkAddCancelHandler}/>
                                        </Modal>
                                    </Col>
                                    <Col className="col-2" />
                                </Row>
                                <Row>
                                    <Col className="col-2" />
                                    <Col className="col-8" >
                                        {link}
                                        <Modal show={this.state.linkEdit} modalClosed={this.linkEditCancelHandler}>
                                            <Editl linkId={this.state.linkId} editCancel={this.linkEditCancelHandler}/>
                                        </Modal>
                                    </Col>
                                    <Col className="col-2" />
                                </Row>
                            </Container>
                        </Col>
                        <Col className="col-3 border">
                            <Container fluid >
                                <Row>
                                    <Col className="Col-12" id="profile">
                                        <Card bg="dark" text="white">
                                            <Card.Header>
                                                {/* <Link to = {`qlink/${this.state.userName}`}>
                                                    Qlink: http://qlink/{this.state.userName}
                                                </Link> */}
                                                Qlink:
                                            </Card.Header>    
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Screen userId={this.state.userId}/>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Aux>
        )
    }
}

export default Admin;