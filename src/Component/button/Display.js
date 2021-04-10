import React from 'react';
import Aux from '../../hoc/Aux';
import {Button} from 'react-bootstrap';

const Display = (props) => {
    return (
        <Aux>
            <Button variant="light" size="sm" onClick={props.addImage}>Upload</Button>
        </Aux>
    );
}

export default Display;