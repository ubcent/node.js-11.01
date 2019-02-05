import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './MenuItem.module.css';

const menuItem = (props) => {
        return (
            <li className={classes.item}>
                <NavLink exact={props.exact} to={props.href} activeClassName={classes.active}>
                    {props.children}
                </NavLink>
            </li>
        );
}

export default menuItem;