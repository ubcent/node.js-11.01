import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../components/UI/Button/Button';
import Spinner from '../components/UI/Spinner/Spinner';

import classes from './NewsList.module.css';

class NewsList extends Component {
    render() {
        let show = null;
        // if (this.props.shopingList.is_loading) {
        //         show = <Spinner/>;
        // } else {
            show = <h1>В разработке</h1>
        // }
        return (
            <div className={classes.main}>
                {show}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {

    }
}

export default connect(mapStateToProps)(NewsList);