import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import PropTypes from 'prop-types';

const SideDrawer = (props) => {
    let classesArr=[];
    props.visible ? classesArr = [classes.SideDrawer, classes.Open] : classesArr = [classes.SideDrawer, classes.Close];

    return (
        <>
            <Backdrop shown={props.visible} clicked={props.hide} />
            <div className={classesArr.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}

SideDrawer.propTypes={
    visible:PropTypes.bool
}

export default SideDrawer;