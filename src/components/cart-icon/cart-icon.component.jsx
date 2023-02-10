// Import useContext
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Imort svg
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

// Import Context
import { CartContext } from '../../contexts/cart.context';

// Import styles
import './cart-icon.style.scss';

const CartIcon = () => {
  // State
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const [pathName, setPathName] = useState('');

  // Ref
  const btnRef = useRef();

  // Get URL location
  const location = useLocation().pathname;

  // Close basket cart on naviagtion to new page
  useEffect(() => {
    setPathName(location);
    if (pathName !== location) setIsCartOpen(false);
  }, [location]);

  // Close on click outside
  const closeCart = (e) => {
    if (
      e.target.closest('.cart-icon-container') !== btnRef.current &&
      e.target.closest('.cart-dropdown-container') !==
        document.querySelector('.cart-dropdown-container')
    ) {
      setIsCartOpen(false);
    }
  };

  document.body.addEventListener('click', closeCart);

  // Toggle open state
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div
      ref={btnRef}
      className='cart-icon-container'
      onClick={toggleIsCartOpen}
    >
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
