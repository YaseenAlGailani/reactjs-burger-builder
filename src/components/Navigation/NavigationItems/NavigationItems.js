import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/" active>Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        {props.isAuth ?
            <NavigationItem link="/logout">Log out</NavigationItem> :
            <NavigationItem link="/auth">Log in</NavigationItem>
        }
    </ul>
);

export default NavigationItems;