import React, { Component } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import StatBox from './StatBox'

import "./dag.css";

export default class StatView extends Component {

	render() {
		return (
            <div className="columns stat-view">
                <StatBox></StatBox>
                <StatBox></StatBox>
                <StatBox></StatBox>
            </div>
        )
	}
}