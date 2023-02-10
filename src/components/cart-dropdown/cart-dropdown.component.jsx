// Import react
import { useContext } from 'react';

// Navigate hook
import { useNavigate } from 'react-router-dom';

// Import Context
import { CartContext } from '../../contexts/cart.context';

// Import components
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

// Import styles
import './cart-dropdown.style.scss';

const CartDropdown = () => {
  // Destructure
  const { cartItems } = useContext(CartContext);
  // Navigation
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {/* Map the cart with items */}
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className='empty-cart'>Your cart is empty!</span>
        )}
      </div>
      {cartItems.length ? (
        <Button style={{ fontSize: '12px' }} onClick={goToCheckoutHandler}>
          GO TO CHECKOUT
        </Button>
      ) : (
        ''
      )}
    </div>
  );
};

export default CartDropdown;
