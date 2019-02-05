import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { registration } from '../../store/actions/authAction';

import classes from './RegForm.module.css';

class AuthForm extends Component {

    state = {
        name: '',
        email: '',
        psw: ''
    }

    changedInput = (inputName, e) => {
        this.setState({
            [inputName]: e.target.value
        });
    }

    clickButtonHandle = () => {
        if (this.state.email && this.state.psw) {
            this.props.dispatch(registration(this.state.name, this.state.email, this.state.psw));
            this.setState({
                name: '',
                email: '',
                psw: ''

            });
        }
    }

    clickButtonCancelHandle = () => {
        this.props.history.push('/auth');
    }

    render() {
        return (
            <div className={classes.authForm}>
                <h1>Введите данные для регистрации</h1>
                <Input
                    elementType='input'
                    inputId={this.props.id}
                    label='Имя пользователя'
                    value={this.state.name}
                    changed={(event) => this.changedInput('name', event)} />
                <Input
                    elementType='input'
                    inputId={this.props.id}
                    label='Почта пользователя'
                    value={this.state.email}
                    changed={(event) => this.changedInput('email', event)} />
                <Input
                    elementType='input'
                    inputType='password'
                    inputId={this.props.id}
                    label='Пароль'
                    value={this.state.psw}
                    changed={(event) => this.changedInput('psw', event)} />
                <Button btnType='authButton' clicked={this.clickButtonHandle}>Зарегистрироваться</Button>
                <Button btnType='Danger Middle' clicked={this.clickButtonCancelHandle}>Отмена</Button>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        login: store.auth.userUID
    }
}

export default connect(mapStateToProps)(withRouter(AuthForm));