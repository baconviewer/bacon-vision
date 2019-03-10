import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Box } from 'react-bulma-components';

import "./dag.css";

export default class Dag extends Component {
	constructor(props) {
		super(props);
		this.state = {blocks: this.props.blocks};
	  }
	generateDagData = (blocks) => {
		//blocks = blocks.slice(blocks.length - 5, blocks.length);
		//alert(blocks.length);
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

		//if(cy != null) cy.pan({ x: 25, y: 0 });
		// Remove first edge to prevent looped slot
		elements.edges.shift();
		// const x = elements.nodes[elements.nodes.length - 1].position.x;
		// const y = elements.nodes[elements.nodes.length - 1].position.y;
		return {elements};
	};
	componentWillUpdate(){
		//this.cy.pan = { x: 5, y: 0 };
		//alert(this.cy);
		//alert((this.props.blocks.length-1));
	}
	render() {
		const {elements} = this.generateDagData(this.props.blocks);
		return (
			
			<div className="dag-view-container">
				<CytoscapeComponent
					cy={cy => this.cy = cy}
					autolock={true}
					elements={CytoscapeComponent.normalizeElements(elements)}
					style={styles.blockView}
					fit={true}
					panningEnabled={false}
					boxSelectionEnabled={false}
				/>
			</div>
		)
	}
}

const styles = {
	blockView: {
		width: '100vw',
		height: '200px',
		shape: 'square',
	}
};
const pan = {
  x: 100,
  y: 0
};
