// import PropTypes from 'prop-types';
import React, { Component } from 'react';


export class Giphy extends Component {
	render(){
		return(
	        <img src={this.props.name} />
		)
	}
}


// Giphy.propTypes = {
// 	name: PropTypes.string.isRequired
// }

