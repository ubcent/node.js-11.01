import './index.scss';

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import "isomorphic-fetch"

import NewsContainer from './containers/NewsContainer';

export class App extends Component {

	render () {

		return (
			<Fragment>  
				<NewsContainer />
			</Fragment>
		)
	}

}

ReactDOM.render(<App />, document.getElementById('root'));
