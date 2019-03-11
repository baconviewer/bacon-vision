import React, { Component } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Box } from 'react-bulma-components';

import "./dag.css";

export default class StatBox extends Component {

	render() {
		return (
            <div className="column">
                <Box className="stat-box">
                    <div className="stat-box-data has-text-weight-light">
                        YAY!
                    </div>
                    <div className="stat-box-label">
                        YAY!
                    </div>
                </Box>
            </div>
        )
	}
}