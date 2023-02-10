// Import react
import { useContext } from 'react';

// Import Context
import { CartContext } from '../../contexts/cart.context';

// Import syles
import './product-card.style.scss';

// Import components
import Button from '../button/button.component';

const ProductCard = ({ product }) => {
  // Desturucture
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  // Helper function add item to cart
  const addProductToCart = () => addItemToCart(product);

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      {/* On click call addItemToCart as a function*/}
      <Button buttonType='inverted' onClick={addProductToCart}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
