import React, {Component} from 'react';

import RegForm from '../containers/Auth/RegForm';
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
                    <RegForm/>
                </Modal>
            </>
        );
    }
}