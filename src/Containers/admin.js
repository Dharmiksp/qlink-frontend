import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import { Container, Row, Col } from 'react-bootstrap';
import Pedit from '../Component/button/Pedit';
import Ledit from '../Component/button/Ledit';
import Display from '../Component/button/Display';
import Ladd from '../Component/button/Ladd'
import Screen from '../Containers/screen/screen';
import Add from './link/Add';
import './profile/profile.css';
import Delete from './link/Delete';
import { ButtonGroup, Card } from 'react-bootstrap';
import Modal from '../Component/Modal/modal1/Modal';
import Edit from './profile/Edit';
import { Link } from 'react-router-dom';
import Image from './profile/Image';
import Editl from './link/Editl';
import axios from 'axios';

class Admin extends Component {
    userId = this.props.match.params.id
    state = {
        user: [],
        link: [],
        userEdit: false,
        imageAdd: false,
        linkAdd: false,
        linkEdit: false,
        linkId: '',
    }

    loadData = () => {
        axios.get(`http://localhost:8080/users/${this.userId}`)
            .then(response => {
                this.setState({ user: response.data });
            })

        axios.get(`http://localhost:8080/link/${this.userId}`)
            .then(response => {
                this.setState({ link: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.loadData();
    }

    userEditHandler = () => {
        this.setState({ userEdit: true });
    }

    userEditCancelHandler = () => {
        this.setState({ userEdit: false });
        this.loadData()
    }

    imageAddHandler = () => {
        this.setState({ imageAdd: true });
    }

    imageAddCancelHandler = () => {
        this.setState({ imageAdd: false });
    }

    linkAddHandler = () => {
        this.setState({ linkAdd: true });
    }

    linkAddCancelHandler = () => {
        this.setState({ linkAdd: false });
        this.loadData()
    }

    linkEditHandler = (linkId) => {
        this.setState({ linkEdit: true, linkId: linkId });
    }

    linkEditCancelHandler = () => {
        this.setState({ linkEdit: false });
        this.loadData()
    }


    render() {
        const user = this.state.user.map(mem => {
            return (
                <Card bg="dark" text="white" key={"client" + mem.user_id} >
                    <Card.Header><h3>Profile</h3></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Container>
                                <Row>
                                    <Col lg={8} md={8} sm={12}>
                                        <div>Title: {mem.profile_title}</div>
                                        <div>Bio: {mem.bio}</div>
                                        <div>Display:</div>
                                    </Col>
                                    <Col lg={4} md={4} sm={4}>
                                        <ButtonGroup aria-label="Basic example" size="sm">
                                            <Pedit editProfile={this.userEditHandler} />
                                            <Display addImage={this.imageAddHandler} />
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
                <Link to={`/qlink/${us.username}`} key={"user" + us.user_id}>
                    <div id="qlink">Qlink: http://qlink/{us.username}</div>
                </Link>
            )
        })


        const link = this.state.link.map(lik => {
            return (
                <Card bg="dark" text="white" id="cards" key={"customer" + lik.link_id} >
                    <Card.Body>
                        <Card.Text>
                            <Container>
                                <Row >
                                    <Col lg={8} md={8} sm={12} >
                                        <div>{lik.app_name}</div>
                                        <div>{lik.link_app}</div>
                                    </Col>
                                    <Col lg={4} md={4} sm={4}>
                                        <ButtonGroup aria-label="Basic example" size="sm">
                                            <Ledit editLink={() => this.linkEditHandler(lik.link_id)} />
                                            <Delete linkId={lik.link_id} updateData={this.loadData} />
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

        return (
            <Aux>
                <Container fluid>
                    <Row>
                        <Col sm={12} md={12} lg={9} >
                            <Container>
                                <Row id="profile">
                                    <Col lg={2} md={1} sm={0} />
                                    <Col lg={8} md={10} sm={12} >
                                        {user}
                                        <Modal show={this.state.userEdit} modalClosed={this.userEditCancelHandler}>
                                            <Edit editCancel={this.userEditCancelHandler} userId={this.userId} />
                                        </Modal>
                                        <Modal show={this.state.imageAdd} modalClosed={this.imageAddCancelHandler}>
                                            <Image userId={this.userId} addCancel={this.imageAddCancelHandler} />
                                        </Modal>
                                    </Col>
                                    <Col lg={2} md={1} sm={0} />
                                </Row>
                                <Row id="profile">
                                    <Col lg={2} md={1} sm={0} />
                                    <Col lg={8} md={10} sm={12} >
                                        <Ladd addLink={this.linkAddHandler} />
                                        <Modal show={this.state.linkAdd} modalClosed={this.linkAddCancelHandler}>
                                            <Add userId={this.userId} updateData={this.loadData} addCancel={this.linkAddCancelHandler} />
                                        </Modal>
                                    </Col>
                                    <Col lg={2} md={1} sm={0} />
                                </Row>
                                <Row>
                                    <Col lg={2} md={1} sm={0} />
                                    <Col lg={8} md={10} sm={12} >
                                        {link}
                                        <Modal show={this.state.linkEdit} modalClosed={this.linkEditCancelHandler}>
                                            <Editl linkId={this.state.linkId} editCancel={this.linkEditCancelHandler} />
                                        </Modal>
                                    </Col>
                                    <Col lg={2} md={1} sm={0} />
                                </Row>
                            </Container>
                        </Col>
                        <Col lg={3} id="boder" >
                            <Container>
                                <Row>
                                    <Col md={1} />
                                    <Col md={10} id="profile">
                                        <Card bg="dark" text="white">
                                            <Card.Header>
                                                {users}
                                            </Card.Header>
                                        </Card>
                                    </Col>
                                    <Col md={1} />
                                </Row>
                                <Row>
                                    <div id="mobile">
                                        <Screen userId={this.userId} />
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