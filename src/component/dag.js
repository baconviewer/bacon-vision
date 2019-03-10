import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Box } from 'react-bulma-components';

import "./dag.css";

export default class Dag extends Component {
	constructor(props) {
		super(props);
		// create a ref to store the textInput DOM element
		this.cytoscapeComponent = React.createRef();
		this.panThatShit = this.panThatShit.bind(this);
	}
	generateDagData = (blocks) => {
		let elements = {nodes: [], edges: []};
		blocks.forEach((block, index) => {
			// Add blocks
			elements.nodes.push({
				data: {
					id: block.blockHeadRoot,
					label: block.slot
				},
				position: {
					x: index * 100,
					y: 100
				},
				style: {
					width: 20,
					height: 20,
					shape: 'rectangle',
					backgroundColor: "red"
				},
				selectable: false,
				grabbable: false
			});
			// Add lines between nodes
			elements.edges.push({
				data: {
					source: block.headParentRoot,
					target: block.blockHeadRoot
				},
				style: {
					width: 6,
					lineColor: 'red',
				}
			});
		});
		// Remove first edge to prevent looped slot
		elements.edges.shift();
		// const x = elements.nodes[elements.nodes.length - 1].position.x;
		// const y = elements.nodes[elements.nodes.length - 1].position.y;
		return {elements};
	};

	panThatShit(){
		alert(this.cytoscapeComponent);
		this.cytoscapeComponent.panBy(pan);
	}

	render() {
		const {elements} = this.generateDagData(this.props.blocks);
		return (
			
			<div className="dag-view-container">
				<CytoscapeComponent
					ref={this.cytoscapeComponent}
					autolock={true}
					elements={CytoscapeComponent.normalizeElements(elements)}
					style={styles.blockView}
					fit="true"
					panningEnabled={false}
					
				/>
			</div>
		)
	}
}

const styles = {
	blockView: {
		width: '100vw',
		height: '300px',
		shape: 'square',
	}
};
const pan = {
  x: 100,
  y: 0
};
