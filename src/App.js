import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './App.css';

class App extends Component {

  genTree = (blocks) => {
    let elements = { nodes: [], edges: []};
    blocks.forEach((block, index) => {
      // Add blocks
      elements.nodes.push({
	      data: {
		      id: block[2],
		      label: block[1]
	      },
	      position: {
		      x: index * 100,
		      y: 0
	      }
      });
      // Add lines between nodes
      elements.edges.push({
        data: {
          source: block[2],
          target: block[3]
        }
      })
    })
  };

	render(){
	  // const elements = this.genTree();
		// Temp values
	  const elements = {
		  nodes: [
			  { data: { id: 'slot1', label: 'slot1' }, position: { x: 30, y: 100 } },
			  { data: { id: 'slot2', label: 'slot2' }, position: { x: 130, y: 100 } }
		  ],
		  edges: [
			  {
				  data: { source: 'slot1', target: 'slot2' }
			  }
		  ]
	  };
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
    width: '600px',
    height: '300px',
    shape: 'square',
    backgroundColor: 'blue'
  }
};

export default App;
