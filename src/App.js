import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Giphy } from './Giphy';
import { Input, Button } from './StyleComponents';
import './global.scss';


const apiKey = "Zy94HT62CFrab0zoabo9gFiHWX5yhaM4";
const urlFragment = "http://api.giphy.com/v1/gifs/search?q=";


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

  // Get trending gifs on init
  componentDidMount() { 
    this.setState({ isLoading: true }); 
    const default_query = "trending";
    const url = urlFragment+default_query+"&api_key="+apiKey;

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


  // Get queried gifs on user input
  searchGifs(e) {

    let query = this.searchInput.value || "trending";
    this.searchInput.value = "";
    this.setState({ query: query, isLoading: true });

    let url = urlFragment+query+"&api_key="+apiKey;

    fetch(url, {
      method: "GET", 
       headers: {
         "Content-Type": "application/json"
       }
    }).then(data => {
      if(data.ok) {
        return data.json();
      }else{
        throw new Error('We have an error...');
      }
    }).then(gifs => gifs.data)
      .then(gifs => this.onSetStorage( //set to localStorage
        gifs, 
        query
      ))
      .catch(isError => this.setState({
        isError, isLoading: false
      })
    )
  } //searchGifs


  // Set queries to storage array
  onSetStorage(gifs, query) { 
    let queryArr = [];  
    queryArr = this.state.storage || [];
    if(!(queryArr).includes(query) && query !== ""){
      queryArr.push(query);
    }
    localStorage.setItem('savedQueries', JSON.stringify(queryArr));
    this.setState({ gifs: gifs, isLoading: false  });  //
  } //onSetStorage


  // Retrieve from storage on click
  getItem(e){
    let unselectedItems = e.target.parentNode.childNodes;
    for(var i=0; i<unselectedItems.length; i++){
      unselectedItems[i].classList.remove('active');
    }
    e.target.classList.add('active');

    let query = e.target.innerHTML;

    let url = urlFragment+query+"&api_key="+apiKey;

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
    const { gifs, isError, storage } = this.state;
    
    if(isError){
      return <div>{isError.message}</div>
    }

    return (
      <div>
        <div className="search">
          <Input type="text" placeholder="Search..." size=".4em" 
                innerRef={ (input) => { this.searchInput = input; } } 
                onFocus={ (e) => e.target.placeholder = "" }
                onBlur={ (e) => e.target.placeholder = "Search..." }
          />
          <Button primary type="button" onClick={ this.searchGifs }>Go</Button>
         
         <div className="search-results">
           { (storage.length) ? 
            storage.map((v,i) => 
             <Button className="i" key={i} 
             onClick={this.getItem}>{v}</Button>
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
    )

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