import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { login } from '../../store/actions/authAction';

import classes from './AuthForm.module.css';

class AuthForm extends Component {

    state = {
        email: "",
        psw: ""
    }

    changedInput = (inputName, e) => {
        this.setState({
            [inputName]: e.target.value
        });
    }

    clickButtonHandle = () => {
        if (this.state.email && this.state.psw) {
            this.props.dispatch(login(this.state.email, this.state.psw));
            this.setState({
                email: "",
                psw: ""
            });
        }
    }

    render() {
        return (
            <div className={classes.authForm}>
                <h1>Введите данные для входа</h1>
                <Input
                    elementType='input'
                    inputId={this.props.id}
                    label='Почта пользователя'
                    value={this.state.email}
                    changed={(event) => this.changedInput("email", event)} />
                <Input
                    elementType='input'
                    inputType='password'
                    inputId={this.props.id}
                    label='Пароль'
                    value={this.state.psw}
                    changed={(event) => this.changedInput("psw", event)} />
                <Button btnType='authButton' clicked={this.clickButtonHandle}>Войти</Button>
                <div className={classes.link}>
                    <Link to='/registration'>Регистрация</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        login: store.auth.userUID
    }
}

export default connect(mapStateToProps)(AuthForm);