import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import "./Dag.css";

export default class Dag extends Component {
	constructor(props) {
		super(props);
		this.state = { blocks: this.props.blocks, locX: 0 };
	}
	generateDagData(blocks) {
		let elements = {nodes: [], edges: []};

		blocks.forEach((block, index) => {
			// Add blocks
			elements.nodes.push({
				data: {
					id: block.headBlockRoot,
					label: block.headBlockRoot.slice(0, 8) + "..."
				},
				position: {
					x: index * 200,
					y: 100
				},
				style: {
					width: 30,
					height: 30,
					shape: 'roundrect',
					backgroundColor: "#08357c",
					color: "white",
					textMarginY: "-30px",
					fontSize: "24pt"
				},
				selectable: false,
				grabbable: false
			});
			// Add lines between nodes
			elements.edges.push({
				data: {
					source: block.parentHeadBlockRoot,
					target: block.headBlockRoot
				},
				style: {
					width: 2,
					lineColor: 'white',
				}
			});
		});

		//if(cy != null) cy.pan({ x: 25, y: 0 });
		// Remove first edge to prevent looped slot
		elements.edges.shift();
		// const x = elements.nodes[elements.nodes.length - 1].position.x;
		// const y = elements.nodes[elements.nodes.length - 1].position.y;
		return {elements};
	}
	componentDidMount(){
		this.cy.panBy({x: 600});
	}
	componentWillUpdate(){
		if((this.props.blocks || []).length > 5){
			//offset = (this.props.blocks.length - 5) * -100;
			this.cy.panBy({x: -200});
		}
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
