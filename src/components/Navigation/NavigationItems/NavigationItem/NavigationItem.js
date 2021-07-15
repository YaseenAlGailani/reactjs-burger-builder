import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    return (
    <li className={classes.NavigationItem}>
        <NavLink
            activeClassName={classes.active}
            exact={props.exact}
            to={props.link}>{props.children}</NavLink>
    </li>
)};

export default NavigationItem;