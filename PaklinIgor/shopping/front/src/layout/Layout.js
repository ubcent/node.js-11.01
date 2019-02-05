import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
 
import Menu from '../components/menu/Menu';
import MenuItem from '../components/menu/MenuItem';

import MainPage from '../pages/MainPage';
import AuthForm from '../pages/Auth';
import RegForm from '../pages/Registration';
import ShopingList from '../pages/ShopingList';

import classes from './Layout.module.css';

const layout = (props) => {
    if (props.userId === null) {
        return (
            <Switch>
                <Route path="/registration" component={RegForm}/>
                <Route path="/auth" component={AuthForm}/>
                <Route path="/"><Redirect to="/auth"/></Route>
            </Switch>
        );
    }

    return (
        <div className={classes.layout}>
            <Menu>
                <MenuItem exact href="/">
                    Главная
                </MenuItem>
                <MenuItem href="/shopping">
                    Купить
               </MenuItem>
            </Menu>
            <div className={classes.container}>
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/shopping" exact component={ShopingList} />
                    <Route path="*"><Redirect to="/" /></Route>
                </Switch>
            </div>
        </div>);
}

const mapStateToProps = (store)  => {
    return {
        userId: store.auth.userId
    };
}

export default withRouter(connect(mapStateToProps)(layout));