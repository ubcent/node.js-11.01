import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = (props) => {
    let assignedClasses = [];
    if (props.classesNames) {
        assignedClasses = props.classesNames.split(' ');
    }
    assignedClasses.push('Backdrop');

    return(
        props.show 
        ? 
        <div className={assignedClasses.map(el => {
            return classes[el]
            }).join(' ')} 
            onClick={props.clicked}>
        </div> 
        : 
        null
    );
}

export default backdrop;