import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Giphy } from './Giphy';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      gifs: [],
      isLoading: false,
      isError: null
      // query: ''
    }
    this.searchGifs = this.searchGifs.bind(this);
  }
  componentDidMount() {
   console.log('REMOUNTING??');
    const default_query = "trending";
    let url = "http://api.giphy.com/v1/gifs/search?q="+default_query+"&api_key=Zy94HT62CFrab0zoabo9gFiHWX5yhaM4";
    this.setState({ isLoading: true });

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
    this.setState({ query: e.target.previousSibling.value });

    let url = "http://api.giphy.com/v1/gifs/search?q="+e.target.previousSibling.value+"&api_key=Zy94HT62CFrab0zoabo9gFiHWX5yhaM4";

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
    })
    .then(gifs => gifs.data)
    .then(gifs => this.setState({
      gifs,
      isLoading: false,
     }))
    .catch(isError => this.setState({
      isError, isLoading: false
    }))
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
          <input type="text" placeholder="search" value={this.props.query} />
          <button type="submit" onClick={ this.searchGifs }>Go</button>
          You typed: <code>{this.state.query}</code>
           <p className="saved-searches"></p>
        </div>
        <div className="wrapper">
          { (gifs.length) ?
           gifs.map((v, i) =>
              <Giphy 
                key = { v.id }
                name = { v.images.fixed_height_small.url }
              />
            ) : "loading..."
          }
        </div>
      </div>
      
    );

    return(
        {gifs}
    )
  }
}

export default App;
