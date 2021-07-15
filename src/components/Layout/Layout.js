import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {

    state = {
        sideDrawerVisible: false
    }
    toggleSideDrawerHandler = () => {
        this.setState({ sideDrawerVisible: true })
    }

    hideSideDrawerHandler = () => {
        this.setState({ sideDrawerVisible: false });
    }

    render() {
        return (
            <>
                <Toolbar toggleDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer visible={this.state.sideDrawerVisible} hide={this.hideSideDrawerHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout