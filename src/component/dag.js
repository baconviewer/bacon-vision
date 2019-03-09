import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import "./dag.css";

export default class Dag extends Component {

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
					y: 250
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
					width: 2,
				}
			});
		});
		// Remove first edge to prevent looped slot
		elements.edges.shift();
		// const x = elements.nodes[elements.nodes.length - 1].position.x;
		// const y = elements.nodes[elements.nodes.length - 1].position.y;
		return {elements};
	};

	render() {
		const {elements} = this.generateDagData(this.props.blocks);
		return (
			<div className="dag-view-container">
				<CytoscapeComponent
					autolock
					elements={CytoscapeComponent.normalizeElements(elements)}
					style={styles.blockView}
					// pan={{x, y}}
				/>
			</div>
		)
	}
}

const styles = {
	blockView: {
		width: '5000px',
		height: '500px',
		shape: 'square',
	}
};
