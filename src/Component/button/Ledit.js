import React from 'react';
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