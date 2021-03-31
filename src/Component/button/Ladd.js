import React, { useEffect, useState } from 'react';
import Aux from '../../hoc/Aux';
import {Button} from 'react-bootstrap';
import classes from '../../Containers/profile/profile.css';


const Ladd = (props) => {
    return (
        <Aux>
            <Button onClick={props.addLink} variant="dark" block id="add">Add New Link</Button>
            
        </Aux>
    );
}

export default Ladd;