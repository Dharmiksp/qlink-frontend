import React, { useEffect, useState } from 'react';
import Aux from '../../hoc/Aux';
import {Button} from 'react-bootstrap';

const Pedit = (props) => {
    return (
        <Aux>
            <Button variant="light" size="sm" onClick={props.editProfile}>Edit</Button>
        </Aux>
    );
}

export default Pedit;