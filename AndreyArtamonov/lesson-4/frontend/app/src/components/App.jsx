import React, {Component} from "react";

import News from "./News/News.jsx";
import Form from "./Form/Form.jsx";

class App extends Component {
    state = {
        news: []
    };
    fetchNews = (count) => {
        fetch('http://localhost:8888', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                count: count
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.setState({
                    news: res
                });
            });
    };
    render() {
        const news = this.state.news;
        return (
            <div className="container">
                <Form fetchNews={this.fetchNews}/>
                {
                    (() => {
                        if (news.length) {
                            return <News news={news}/>
                        }
                    })()
                }
            </div>
        )
    }
}

export default App;