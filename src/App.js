import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Giphy } from './Giphy';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      gifs: [],
      isLoading: false,
      isError: null,
      query: ''
    }
    this.searchGifs = this.searchGifs.bind(this);
    this.getItem = this.getItem.bind(this);

    this.state.storage = localStorage.getItem('savedQueries') ? JSON.parse(localStorage.getItem('savedQueries')) : [];
  }
  componentDidMount() {
    this.setState({ isLoading: true }); 
    const default_query = "trending";
    const url = "http://api.giphy.com/v1/gifs/search?q="+default_query+"&api_key=Zy94HT62CFrab0zoabo9gFiHWX5yhaM4";

      fetch(url)
      .then(data => {
        if(data.ok) {
          return data.json();
        }else{
          throw new Error('We have an error ...');
        }
      })
      .then(gifs => gifs.data)
      .then(gifs => this.setState({
        gifs,
        isLoading: false,
       }))
      .catch(isError => this.setState({
        isError, isLoading: false
      }))

  } //componentDidMount

 
  searchGifs(e){
    e.preventDefault;
    let query = this.refs.myInput.value;
    this.setState({ query: query, isLoading: true });

    let url = "http://api.giphy.com/v1/gifs/search?q="+query+"&api_key=50&api_key=Zy94HT62CFrab0zoabo9gFiHWX5yhaM4";

    fetch(url, {
      method: "GET", 
       headers: {
         "Content-Type": "application/json"
       }
    }).then(data => {
      if(data.ok) {
        return data.json();
      }else{
        throw new Error('We have an error ...');
      }
    }).then(gifs => gifs.data)
      .then(gifs => this.onSetStorage(
        gifs, 
        query,
        // isLoading: false
      ))
      .catch(isError => this.setState({
        isError, isLoading: false
      })
    )
  } //searchGifs

  componentWillUpdate(nextProps, nextState) {
      // normally set localstorage here
  }

  componentWillMount() {
      // normally get localstorage here
  }
 
  onSetStorage(gifs, query){
    let queryArr = [];  
    queryArr = this.state.storage || [];
    if(!(queryArr).includes(query)){
      queryArr.push(query);
    }
    let myStore = localStorage.setItem('savedQueries', JSON.stringify(queryArr));
    this.setState({ gifs: gifs });  //, isLoading: false
  } //onSetStorage

  getItem(e){
    e.preventDefault;
    let query = e.target.innerHTML;

    let url = "http://api.giphy.com/v1/gifs/search?q="+query+"&api_key=Zy94HT62CFrab0zoabo9gFiHWX5yhaM4";

    fetch(url, {
      method: "GET", 
       headers: {
         "Content-Type": "application/json"
       }
    }).then(data => {
      if(data.ok) {
        return data.json();
      }else{
        throw new Error('We have an error ...');
      }
    }).then(gifs => gifs.data)
      .then(gifs => this.onSetStorage(
        gifs, 
        query,
        // isLoading: false
      ))
      .catch(isError => this.setState({
        isError, isLoading: false
      })
    )
  }
  render() {
    const { gifs, query, isLoading, isError } = this.state;
    console.log(this.state);

    if(isError){
      return <div>{isError.message}</div>
    }

    return (
      <div>
       <div className="search">
          <input type="text" placeholder="search" ref="myInput" />
          <button type="button" onClick={ this.searchGifs }>Go</button>
          { (this.state.query) ? 
            <p>Searching: {this.state.query}</p>
           : "" }

           { (this.state.storage.length) ? 
            this.state.storage.map((v,i) => 
              <button key={i} onClick={this.getItem}>{v}</button>
            ) : "" }
        </div>
        <div className="wrapper">
          { (gifs.length) ?
           gifs.map((v, i) =>
              <Giphy 
                key = { v.id }
                name = { v.images.fixed_height_small.url }
              />
            ) : "Loading..."
          }
        </div>
      </div>
    );

    return(
        {gifs}
    )

  } //render
} //App

export default App;

