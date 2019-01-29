import React, {Component} from "react";

import NewsItem from "./NewsItem.jsx";

import "./News.sass";

class News extends Component {
    render() {
        const news = this.props.news;

        return (
            <section className="news">
                <h1 className="news__title">Top news by Yandex</h1>
                {news.map((item, i) => {
                    return <NewsItem params={item} key={`news-${i}`}/>
                })}
            </section>
        )
    }
};

export default News;