import React, { Component } from 'react';
import './App.css';
import Dag from "./component/Dag";
import StatView from "./component/StatView";
import axios from 'axios';
 
class App extends Component {
	state = {blocks: [], bestBlock: 0};

	componentDidMount() {
		this.timer = setInterval(()=> this.getLatestBlocks(), 6000);
	}

	componentWillUnmount() {
		clearInterval(this.timer)
		this.timer = null;
	}

	getLatestBlocks() {
		axios
			.get(`/api/latest-blocks?lastblock=${this.state.bestBlock}`)
			.then(response => {
				let blocks = response.data
				let localMax = this.state.bestBlock
				blocks.forEach(block => {
					if(block.index > localMax) localMax = block.index;
				});
				console.log(this.state.bestBlock + ' ' + localMax)
				if(localMax > this.state.bestBlock) this.setState({bestBlock: localMax, blocks: this.state.blocks.concat(blocks)})
			})
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
