import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
require("bootstrap-less/bootstrap/bootstrap.less");
import "isomorphic-fetch"
import ES6Promise from 'es6-promise';
ES6Promise.polyfill();

import Loading from '../components/Loading';
import Search from '../components/Search';

class Row extends PureComponent {
static propTypes = {
  newsitem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      content: PropTypes.string,
      category: PropTypes.string,
  }).isRequired
  };

  render() {
  const { newsitem } = this.props;
    return (
      <div className="row">
        <div className = "idrow">{newsitem.id}</div>
        <div className = "right-col">
          <div>{newsitem.content}</div>
          <div>{newsitem.category}</div>
        </div>      
      </div>
    );
  }
}

export default class NewsContainer extends PureComponent {

constructor(props) {
  super(props);

  this.state = {
    items: [],
    loading: false,
    shouldHide: true,
    filterString: '',
    itemsCountPerPage: 50
  }
    this.compareByAsc.bind(this);
    this.compareByDesc.bind(this);
    this.sortBy.bind(this);
}

compareByAsc(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

compareByDesc(key) {
    return function (a, b) {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    };
  }
 
sortBy = (key, event) => {
    let arrayCopy = [...this.state.items];
    let caption = event.target.innerHTML;
    if (caption.search('▼') !== -1) {
     arrayCopy.sort(this.compareByAsc(key));
     this.setState({items: arrayCopy});
     event.target.innerHTML = caption.slice(0, -1) + '▲';
    }
     else if (caption.search('▼') == -1) {
     arrayCopy.sort(this.compareByDesc(key));
     this.setState({items: arrayCopy});
     event.target.innerHTML = caption.slice(0, -1) + '▼';
     }   
  }


handleSendClick1 = (event) => {

  this.setState({ loading: true });
   window.fetch('http://localhost:8888/api/newsitems')
    .then((response) => response.json())
    .then((items) => {
      var res = items.items;
      var filtered = res.filter(item => item.category == 'Чемпионат Европы');
      this.setState({
         items: filtered,
         loading: false,
         shouldHide: false
      })
    })
    .catch(() => {
         this.setState({
         items: [],
         loading: false,
         shouldHide: false
      });
    });  
    event.preventDefault();
  }


handleSendClick2 = (event) => {

  this.setState({ loading: true });
   window.fetch('http://localhost:8888/api/newsitems')
    .then((response) => response.json())
    .then((items) => {
      var res = items.items;
      var filtered = res.filter(item => item.category == 'Australian Open');
      this.setState({
         items: filtered,
         loading: false,
         shouldHide: false
      })
    })
    .catch(() => {
         this.setState({
         items: [],
         loading: false,
         shouldHide: false
      });
    });
    event.preventDefault();
  }

handleSendClick3 = (event) => {

  this.setState({ loading: true });
   window.fetch('http://localhost:8888/api/newsitems')
    .then((response) => response.json())
    .then((items) => {
      var res = items.items;
      var filtered = res.filter(item => item.category == 'Трансферы');
      this.setState({
         items: filtered,
         loading: false,
         shouldHide: false
      })
    })
    .catch(() => {
         this.setState({
         items: [],
         loading: false,
         shouldHide: false
      });
    });
    event.preventDefault();
  }

  handleSendClick4 = (event) => {

  this.setState({ loading: true });
   window.fetch('http://localhost:8888/api/newsitems')
    .then((response) => response.json())
    .then((items) => {
      var res = items.items;
      this.setState({
         items: res,
         loading: false,
         shouldHide: false
      })
    })
    .catch(() => {
         this.setState({
         items: [],
         loading: false,
         shouldHide: false
      });
    });
    event.preventDefault();
  }

    render() {
    let indexOfLastTodo = this.state.itemsCountPerPage;
    let indexOfFirstTodo = indexOfLastTodo - this.state.itemsCountPerPage;
    let renderedItems = this.state.items.slice(indexOfFirstTodo, indexOfLastTodo);
    function Object_values(obj) {
    let vals = [];
    for (const prop in obj) {
        vals.push(obj[prop]);
    }
    return vals;
    }
    String.prototype.includes = function (str) {
    var returnValue = false;

    if (this.indexOf(str) !== -1) {
      returnValue = true;
    }

    return returnValue;
    }
    const { items, loading, shouldHide } = this.state;
    const rows = renderedItems.filter(newsitem => Object_values(newsitem).toString().toLowerCase().includes(this.state.filterString.toLowerCase())).map((newsitem, idx) => <Row key = {idx} newsitem = {newsitem} />)

    return (
      <Fragment>
          <div className = "text-center">
            <h4> Выберите категорию новостей </h4>
            <div className = "buttons">
              <button type="submit" className="btn btn-primary" onClick={this.handleSendClick1}>Чемпионат Европы</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleSendClick2}>Australian Open</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleSendClick3}>Трансферы</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleSendClick4}>Все категории</button>
            </div>
            <Search onTextChange={text => this.setState({filterString: text})}/ >
            { loading ? <Loading /> : ''}
          </div> 
        <div className = {this.state.shouldHide ? 'hidden' : ''}>
          <div className="table">
            <div className="header">
              <div onClick={(event) => this.sortBy('id', event)}>ID &#9660;</div>
              <div className = "right-col">
              <div>Название новости</div>
              <div>Категория</div>
              </div>
            </div>
            <div className="body">
               {rows}
            </div>
          </div>   
        </div>
      </Fragment>
    ); 
  }
}

