import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../components/UI/Button/Button';
import Spinner from '../components/UI/Spinner/Spinner';

import {getNews} from '../store/actions/newsAction';

import classes from './NewsList.module.css';

class NewsList extends Component {
    getNews = () => {
        this.props.dispatch(getNews());
    }

    render() {
        let show = null;
        if (this.props.news.is_loading) {
                show = <Spinner/>;
        } else if (this.props.news.news.length > 0) {
            show = (
                <ul className={classes.list}>
                    {this.props.news.news.map((el,index) => {
                        return (<li className={classes.item} key={index}>
                            <h2>{el.header}</h2>
                            <p>{el.body}</p>
                        </li>);
                    })}
                </ul>
            );
        }
        return (
            <div className={classes.main}>
                <Button btnType='authButton' clicked={this.getNews}>Получить новости</Button>
                {show}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        news: store.news
    }
}

export default connect(mapStateToProps)(NewsList);