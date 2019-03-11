import React, { Component } from 'react';
import './App.css';
import Dag from "./component/dag";
//import data from "./data";
import data from "./artemis";
import StatView from "./component/StatView";
 
class App extends Component {
	state = {blocks: []};

	componentDidMount = () => {
		data.forEach((item, i) => {
			setTimeout(() => this.setState({ blocks: [...this.state.blocks, item]}), 6000 * (i+1));
		})
	};

	render(){
		return (
			<div className="App">
				<Dag blocks={this.state.blocks}/>
				<StatView blocks={this.state.blocks}></StatView>
			</div>
    )
	}
}

export default App;
