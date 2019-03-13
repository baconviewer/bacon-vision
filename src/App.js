import React, { Component } from 'react';
import './App.css';
import Dag from "./component/dag";
//import data from "./data";
import data from "./artemis";
import StatView from "./component/StatView";
 
class App extends Component {
	state = {blocks: []};

	componentDidMount = () => {
		this.timer = setInterval(()=> this.incrementBlock(), 1000);
		this.counter = 0;
	}

	componentWillUnmount() {
		clearInterval(this.timer)
		this.timer = null;
	}

	incrementBlock() {
		this.setState({ blocks: [...this.state.blocks, data[this.counter]], counter: this.counter++})
	}

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
