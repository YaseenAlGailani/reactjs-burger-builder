import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Mushroom', type: 'mushroom' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return (
                    <BuildControl
                        disabled={props.disabled[ctrl.type]}
                        less={() => props.removeIngredient(ctrl.type)}
                        more={() => props.addIngredient(ctrl.type)}
                        key={ctrl.label}
                        label={ctrl.label}
                    />
                );
            })}

            <button onClick={props.order} disabled={props.price <= 4}className={classes.OrderButton}>Order Now</button>
        </div>
    );
}

export default BuildControls;