import { render, screen } from '@testing-library/react';
import { BurgerBuilder } from './BurgerBuilder';
import Burger from '../../components/Burger/Burger';

describe('<BurgerBuilder />', () => {


    it('Renders Burger', () => {
        let props = {
            ingredients: { salad: 0 },
            totalPrice: 4,
            error: null,
            isAuthenticated: false
        }
        render(<BurgerBuilder initIngredients={() => { }} {...props} />);

        expect(screen.getByText(/Please start adding/i)).toBeInTheDocument();
        // screen.debug();
    });

    it('Renders Checkout Summary only if Authenticated', ()=>{
        let props = {
            ingredients: { salad: 0 },
            totalPrice: 4,
            error: null,
            isAuthenticated: false
        }
        render(<BurgerBuilder initIngredients={() => { }} {...props} />);
        expect(screen.queryByText(/A delicious burger with the following/i)).not.toBeInTheDocument();
    })

})
