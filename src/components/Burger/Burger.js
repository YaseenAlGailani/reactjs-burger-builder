import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    
    let burgerContent = <p>Please start adding ingredients</p>

    if (props.ingredients !== null && Object.keys(props.ingredients).length) {
        let ingredients = Object.entries(props.ingredients).map(([ingredient, amount]) => {
            return ([...Array(amount)]).map((_, i) => {
                return <BurgerIngredient key={ingredient + i} type={ingredient} />
            });
        }).reduce((arr, nextArr) => { return arr.concat(nextArr) });

        if(ingredients.length){
            burgerContent = ingredients; 
        } 
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {burgerContent}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;