import React, { Component } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Box } from 'react-bulma-components';

import "./dag.css";

export default class StatView extends Component {
    constructor(props) {
		super(props);
        this.state = {blocks: this.props.blocks};
	}
	render() {
		return (
            <div>
                <div className="columns stat-view">
                    <div className="column">
                        <Box className="stat-box">
                            <div className="stat-box-data has-text-weight-light">
                            {(this.props.blocks || []).length}
                            </div>
                            <div className="stat-box-label">
                                Block Height
                            </div>
                        </Box>
                    </div>
                    <div className="column">
                        <Box className="stat-box">
                            <div className="stat-box-data has-text-weight-light">
                                {Math.floor((this.props.blocks || []).length/64)}
                            </div>
                            <div className="stat-box-label">
                                Epoch Height
                            </div>
                        </Box>
                    </div>
                    <div className="column">
                        <Box className="stat-box">
                            <div className="stat-box-data has-text-weight-light">
                                {(this.props.blocks || []).length%64 + '/64'}
                            </div>
                            <div className="stat-box-label">
                                Blocks in Epoch
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        )
	}
}