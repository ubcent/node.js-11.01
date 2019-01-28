import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Menu.module.css';

const menu = (props) => {
        return (
            <nav className={classes.menu}>
                <div className={classes.logo}>
                    <NavLink to="/" className={classes.logo__link}>{props.brand}</NavLink>
                </div>
                <div className={classes.items}>
                    <ul className={classes.displayItems}>
                        {props.children}
                    </ul>
                </div>
            </nav>);
    
}

export default menu;