import React, { Component } from 'react';
import Aux from '../../hoc/Aux.js';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js';

class Layout extends Component {
	state = {
		showSideDrawer: true
	}

	sideDrawerCloserHander = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHander = () => {
		this.setState( (prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	}

	render (){
		return (
			<Aux>
			<Toolbar drawerToggleClicked={this.sideDrawerToggleHander}/>
			<SideDrawer closed={this.sideDrawerCloserHander} open={this.state.showSideDrawer}/>
			<main className={classes.Content}>
			{this.props.children}
			</main>
			</Aux>
		)
	}
}

export default Layout;
