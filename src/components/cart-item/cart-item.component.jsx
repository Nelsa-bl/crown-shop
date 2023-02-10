import { Link } from 'react-router-dom';

// Import styles
import './cart-item.style.scss';

const CartItem = ({ cartItem }) => {
  const { name, quantity, price, imageUrl, id } = cartItem;
  return (
    <Link to={`/shop-filter/${id}`}>
      <div className='cart-item-container'>
        <img src={imageUrl} alt={`${name}`} />
        <div className='item-details'>
          <span className='name'>{name}</span>
          <span className='price'>
            {quantity} x {parseFloat(price).toFixed(2)} €
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
