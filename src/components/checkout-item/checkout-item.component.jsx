// Import useContext
import { useContext } from 'react';

// Import Link
import { Link } from 'react-router-dom';

// Import cart context
import { CartContext } from '../../contexts/cart.context';

// Import styles
import './checkout-item.style.scss';

const CheckoutItem = ({ cartItem }) => {
  // Destructure
  const { name, imageUrl, price, quantity, id } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  // Handler for removing item
  const clearItemHandler = () => clearItemFromCart(cartItem);

  // Handler for Incremnet and decriment
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <span className='name'>
        {' '}
        <Link to={`/shop-filter/${id}`}>{name}</Link>{' '}
      </span>

      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'>{parseFloat(price).toFixed(2)} € </span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
