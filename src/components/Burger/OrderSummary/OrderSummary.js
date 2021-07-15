import {useEffect} from 'react';
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients).map((ingKey) => {
        return (
            <li key={ingKey} >
                <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}
            </li>
        );
    })

    useEffect(()=>{
        console.log('this component is updating')
    });

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.cancelPurchase}>Cancel</Button>
            <Button btnType='Success' clicked={props.continuePurchase}>Continue</Button>
        </>
    );
}

export default OrderSummary