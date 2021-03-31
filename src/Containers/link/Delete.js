import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

class Delete extends Component {
    linkId = this.props.linkId
    
    deleteHandler = () => {
        axios.delete(`http://localhost:8080/link/${this.linkId}`)
        this.props.updateData()
    }
    
    render() {
        return (
            <Button onClick={this.deleteHandler} variant="light" size="sm">Delete</Button>
        )
    }
}

export default Delete;
