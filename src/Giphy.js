import React, { Component } from 'react';
// import Proptypes from 'prop-types';


// export const Giphy = ({ name }) => {
export class Giphy extends Component {
	// constructor(props){
	// 	super(props);
	// 	// console.log(props)
	// }

	render(){
		return(
		  <div>
	        <img src={this.props.name} />
	      </div>
		)
	}
}


// Giphy.propTypes = {
// 	name: PropTypes.string.isRequired
// }

