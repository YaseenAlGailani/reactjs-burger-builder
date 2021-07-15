import classes from "./Order.module.css";

const Order = (props) => {
    let ingredients = [];
    for (let [name, qnt] of Object.entries(props.ingredients)){
        if (qnt){
            ingredients.push(<span key={name+qnt} className={classes.Ingredient}>{name}({qnt})</span>);
        }
    }

    return (
        <div className={classes.Order}>
            <p>Igredients: {ingredients}</p>
            <p>Price: <strong>$ {Number(props.price).toFixed(2)}</strong></p>
        </div>
    );
}


export default Order;