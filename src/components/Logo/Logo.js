import classes from './Logo.module.css';
import LogoImg from '../../assets/images/Burger-logo.png';

const Logo = ()=>(
    <div className={classes.Logo}>
        <img src={LogoImg} alt="MyBurger logo"/>
    </div>
);

export default Logo;