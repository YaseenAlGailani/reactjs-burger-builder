import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auth from '../../../containers/Auth/Auth';


const NavigationItems = () =>  (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Log in</NavigationItem>
    </ul>
);

export default NavigationItems;