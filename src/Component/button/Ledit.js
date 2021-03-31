import React, { useEffect, useState } from 'react';
// import classes from '../Butt/Butt.css';
import Aux from '../../hoc/Aux';
import { Button } from 'react-bootstrap';

const Ledit = (props) => {
    return (
        <Aux>
            <Button variant="light" size="sm" onClick={props.editLink}>Edit</Button>        
        </Aux>
    );
}

export default Ledit;