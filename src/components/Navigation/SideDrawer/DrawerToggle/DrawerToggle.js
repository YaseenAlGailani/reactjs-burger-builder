import classes from './DrawerToggle.module.css'

const DrawerToggle = (props)=>(
    <button className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </button>
);

export default DrawerToggle;