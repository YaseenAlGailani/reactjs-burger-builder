import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) => {
    // console.log(props)
    return (
        <div className={classes.Summary}>
            <h1>Enjoy your tasty Burger!</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.continueCheckout} btnType='Success'>CONTINUE</Button>
            <Button clicked={props.cancelCheckout} btnType='Danger'>CANCEL</Button>
        </div>
    )
}


export default CheckoutSummary;