import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './App.css';
import data from "./data";

class App extends Component {

  genTree = (blocks) => {
    let elements = {
    	nodes: [{data: {id: "0x0000000000000000000000000000000000000000000000000000000000000000", label: "0"}}],
	    edges: []};
    blocks.forEach((block, index) => {
	    // Add blocks
	    elements.nodes.push({
		    data: {
			    id: block.blockHeadRoot,
			    label: block.blockHeadRoot
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

	render(){
	  const elements = this.genTree(data);
	  // const elements = temp;
		return (
		  <div className="App">
        <div className="block-view-container">
          <CytoscapeComponent elements={CytoscapeComponent.normalizeElements(elements)} style={styles.blockView} />
        </div>
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

export default App;
