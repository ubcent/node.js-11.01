import React, {Component} from "react";

import "./Form.sass";

class Form extends Component {
    state = {
        notice: 1
    };
    notices = [{
        id: 1,
        message: 'Please select the count of news'
    }, {
        id: 2,
        message: 'The count of news should be from 1 to 10'
    }];
    fetchNews = () => {
        const input = document.getElementById("count").value;

        document.getElementById("count").value = '';

        if (!isNaN(input)) {
            if (input < 1 || input > 10) {
                this.setState({
                    notice: 2
                });

                return;
            }

            this.props.fetchNews(+input);

            this.setState({
                notice: 1
            })
        } else {
            this.setState({
                notice: 1
            })
        }
    };
    render() {
        const noticeId =  this.state.notice - 1;

        return (
            <div className="form">
                <p className="form__notice">
                    {this.notices[noticeId].message}
                </p>
                <input type="text" id="count" className="form__input-text"/>
                <input type="submit" onClick={this.fetchNews} className="form__input-submit"/>
            </div>
        )
    }
}

export default Form;