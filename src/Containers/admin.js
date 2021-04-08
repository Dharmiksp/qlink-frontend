import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import {Container, Row, Col} from 'react-bootstrap';
import Pedit from '../Component/button/Pedit';
import Ledit from '../Component/button/Ledit';
import Display from '../Component/button/Display';
import Ladd from '../Component/button/Ladd'
import Screen from '../Containers/screen/screen';
import Add from './link/Add';
import classes from './profile/profile.css';
import Delete from './link/Delete';
import { ButtonGroup, Button, Card } from 'react-bootstrap';
import Modal from '../Component/Modal/modal1/Modal';
import Page from './page/Page';
import Edit from './profile/Edit';
import { Link } from 'react-router-dom';
import Image from './profile/Image';
import Editl from './link/Editl';
import axios from 'axios';

class Admin extends Component {
    userId = this.props.match.params.id
    state = {
        user:[],
        link:[],
        userEdit: false,
        imageAdd: false,
        linkAdd: false,
        linkEdit: false,
        linkId: '',
    }

    loadData = () => {
        axios.get(`http://localhost:8080/users/${this.userId}`)
            .then(response => {
                this.setState({user: response.data});
                console.log(this.userId)
            })

        axios.get(`http://localhost:8080/link/${this.userId}`)
            .then(response => {
                this.setState({link: response.data})
            })
    }

    componentDidMount() {
        this.loadData();
    }

    userEditHandler = () => {
        this.setState({userEdit: true});
    }

    userEditCancelHandler = () => {
        this.setState({ userEdit: false});
        this.loadData()
    }

    imageAddHandler = () => {
        this.setState({imageAdd: true});
    }

    imageAddCancelHandler = () => {
        this.setState({imageAdd: false});
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
                                    <Col className="col-9">
                                        <div>Title: {mem.profile_title}</div>
                                        <div>Bio: {mem.bio}</div>
                                        <div>Display:</div>
                                    </Col>
                                    <Col className="col-3">
                                    <ButtonGroup aria-label="Basic example" size="sm">
                                        <Pedit editProfile={this.userEditHandler}/>
                                        <Display addImage={this.imageAddHandler}/>
                                    </ButtonGroup>
                                    </Col>
                                    
                                </Row>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

        const users = this.state.user.map(us => {
            return (
                <Link to = {`/qlink/${us.username}`}>
                    <div id="qlink">Qlink: http://qlink/{us.username}</div>
                </Link>
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
                                            <Edit editCancel={this.userEditCancelHandler} userId={this.userId}/>
                                        </Modal>
                                        <Modal show={this.state.imageAdd} modalClosed={this.imageAddCancelHandler}>
                                            <Image userId={this.userId} addCancel={this.imageAddCancelHandler}/>
                                        </Modal>
                                    </Col>
                                    <Col className="col-2" />
                                </Row>
                                <Row id="profile">
                                    <Col className="col-2" />
                                    <Col className="col-8 " >
                                        <Ladd addLink={this.linkAddHandler}/>
                                        <Modal show={this.state.linkAdd} modalClosed={this.linkAddCancelHandler}>
                                            <Add userId={this.userId} updateData={this.loadData} addCancel={this.linkAddCancelHandler}/>
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
                        <Col className="col-3 " id="boder" >
                            <Container fluid>
                                <Row>
                                    <Col className="Col-12" id="profile">
                                        <Card bg="dark" text="white">
                                            <Card.Header>
                                                {users}                                     
                                            </Card.Header>    
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <div id="mobile">
                                    <Screen userId={this.userId}/>
                                    </div>
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