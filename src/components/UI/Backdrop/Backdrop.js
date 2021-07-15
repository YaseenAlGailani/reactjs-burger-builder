import classes from './Backdrop.module.css';

const Backdrop = (props)=>(
    props.shown ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)

export default Backdrop;

 