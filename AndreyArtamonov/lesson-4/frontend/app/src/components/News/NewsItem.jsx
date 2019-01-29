import React, {Component} from "react";

class NewsItem extends Component {
    render() {
        const {source, title} = this.props.params;

        return (
            <p className="news__item">
                <span className="news__source">{source}: </span> {title}
            </p>
        )
    }
}

export default NewsItem;