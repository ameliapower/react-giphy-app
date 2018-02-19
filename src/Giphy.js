import React, { Component } from 'react';


export class Giphy extends Component {
	render() {
		return(
	        <img src={this.props.name} alt={this.props.name} />
		)
	}
}
