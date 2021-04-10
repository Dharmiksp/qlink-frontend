import React from 'react';

import '../Backdrop/Backdrop.css';

const backdrop = (props) => (
    props.show ? <div id="backdrop" onClick={props.clicked}></div> : null
);

export default backdrop;