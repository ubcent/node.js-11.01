import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Menu from '../components/menu/Menu';
import MenuItem from '../components/menu/MenuItem';

import MainPage from '../pages/MainPage';
import NewsList from '../pages/NewsList';

import classes from './Layout.module.css';

const layout = () => {
    return (
        <div className={classes.layout}>
            <Menu>
                <MenuItem exact href="/">
                    Главная
                </MenuItem>
                <MenuItem href="/news">
                    Новости
               </MenuItem>
            </Menu>
            <div className={classes.container}>
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/news" exact component={NewsList} />
                    <Route path="*"><Redirect to="/" /></Route>
                </Switch>
            </div>
            {/* <footer className={classes.footer}>
                &copy; 2019 Паклин Игорь Викторович
            </footer> */}
        </div>);
}

export default layout;
