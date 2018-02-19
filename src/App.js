// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Giphy } from './Giphy';
import { Input, Button } from './StyleComponents';
import './global.scss';

class App extends Component {
  constructor(props){
    super(props); 
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
  // Get trending gifs
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

  // get queried gifs
  searchGifs(e) {
    e.preventDefault;

    let query = this.searchInput.value || "trending";
    this.searchInput.value = "";
    this.setState({ query: query, isLoading: true });

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
      .then(gifs => this.onSetStorage( //set to localStorage
        gifs, 
        query,
        // isLoading: false
      ))
      .catch(isError => this.setState({
        isError, isLoading: false
      })
    )
  } //searchGifs

  onSetStorage(gifs, query){
    let queryArr = [];  
    queryArr = this.state.storage || [];
    if(!(queryArr).includes(query) && query !== ""){
      queryArr.push(query);
    }
    localStorage.setItem('savedQueries', JSON.stringify(queryArr));
    this.setState({ gifs: gifs, isLoading: false  });  //
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
        query
      ))
      .catch(isError => this.setState({
        isError, isLoading: false
      })
    )
  }
  render() {
    const { gifs, query, isLoading, isError } = this.state;
    {(isLoading) ? 'Loading...' : ''}

    if(isError){
      return <div>{isError.message}</div>
    }

    return (
      <div>
       <div className="search">
          <Input type="text" placeholder="Search" size=".4em" 
                innerRef={ (input) => { this.searchInput = input; } } 
                onFocus={ (e) => e.target.placeholder = "" }
                onBlur={ (e) => e.target.placeholder = "Search" }
          />
          <Button primary type="button" onClick={ this.searchGifs }>Go</Button>
         
         <div className="search-results">
           { (this.state.storage.length) ? 
            this.state.storage.map((v,i) => 
             <Button key={i} onClick={this.getItem}>{v}</Button>
            ) : "" }
          </div>
        </div>

        <div className="wrapper">
          { (gifs.length) ?
           gifs.map((v, i) =>
              <Giphy 
                key = { v.id }
                name = { v.images.fixed_height.url }
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



// App.propTypes = {
//   name: PropTypes.string,
//   isLoading: PropTypes.bool,
//   gifs: PropTypes.array
// }

export default App;