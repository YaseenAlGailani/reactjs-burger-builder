import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


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
                <Toolbar isAuth={this.props.isAuthenticated} toggleDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} visible={this.state.sideDrawerVisible} hide={this.hideSideDrawerHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default connect(state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
})(Layout)