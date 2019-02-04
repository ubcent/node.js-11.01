import React, {Component} from 'react';

import AuthForm from '../containers/Auth/AuthForm';
import Modal from '../components/UI/Modal/Modal';
import Backdrop from '../components/UI/Backdrop/Backdrop';

export default class PageNotFound extends Component
{
    render()
    {
        return (
            <>
                <Backdrop/>
                <Modal show classesNames='authModal'>
                    <AuthForm/>
                </Modal>
            </>
        );
    }
}