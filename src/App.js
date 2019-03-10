import React, { Component } from 'react';
import './App.css';
import Dag from "./component/dag";
import data from "./data";
import StatView from "./component/StatView";
 
class App extends Component {
	state = {blocks: []};

	componentDidMount = () => {
		data.forEach((item, i) => {
			setTimeout(() => this.setState({ blocks: [...this.state.blocks, item]}), 500 * (i+1));
		})
	};

	render(){
		return (
			<div className="App">
				<Dag blocks={this.state.blocks}/>
				<StatView></StatView>
			</div>
    )
	}
}

export default App;
