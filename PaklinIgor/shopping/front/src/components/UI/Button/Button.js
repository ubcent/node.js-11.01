import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
    let assignedClasses = [];
    if (props.btnType) {
        assignedClasses = props.btnType.split(' ');
    }
    assignedClasses.push('Button');

    return (
        <button
            disabled={props.disabled}
            className={assignedClasses.map(el => {
                return classes[el]
            }).join(' ')}
            onClick={props.clicked}>{props.children}</button>
    );
};

export default button;