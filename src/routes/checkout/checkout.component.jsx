// Import react
import { useContext } from 'react';

// Import Cart context
import { CartContext } from '../../contexts/cart.context';

// Import component
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

// Import Styles
import './checkout.style.scss';

const Checkout = () => {
  // Destructure
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div>
      <div className='checkout-container'>
        <div className='checkout-header'>
          <div className='header-block'>
            <span>Product</span>
          </div>
          <div className='header-block'>
            <span>Description</span>
          </div>
          <div className='header-block'>
            <span>Quantity</span>
          </div>
          <div className='header-block'>
            <span>Price</span>
          </div>
          <div className='header-block'>
            <span>Remove</span>
          </div>
        </div>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <span className='total'>
          Total: {parseFloat(cartTotal).toFixed(2)} €
        </span>
      </div>
    </div>
  );
};

export default Checkout;
