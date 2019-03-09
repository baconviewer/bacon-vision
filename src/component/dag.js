import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import data from "../data";

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
					y: 0
				}
			});
			// Add lines between nodes
			elements.edges.push({
				data: {
					source: block.headParentRoot,
					target: block.blockHeadRoot
				}
			});
		});
		return elements;
	};

	render() {
		const elements = this.generateDagData(data);
		return (
			<div className="dag-view-container">
				<CytoscapeComponent
					elements={CytoscapeComponent.normalizeElements(elements)}
					style={styles.blockView}
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
		backgroundColor: 'blue'
	}
};
