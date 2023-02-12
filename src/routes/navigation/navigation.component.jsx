// Import Fragment (component render to nothing)
import { Fragment, useContext, useState, useEffect, useRef } from 'react';

// Import Routes
import { Outlet } from 'react-router-dom';

// Import components
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import FavouritesIcon from '../../components/favourites-icon/favourites-icon.component';

// Import use Context
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

// Import logo
import { ReactComponent as Logo } from '../../assets/crown.svg';

// Import Sign out
import { signOutUser } from '../../utils/firebase/firebase.utils';

// Import style
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from './navigation.style';

import './navigation.style.scss';

// Navigation
// Outlet determines nested routed elements position
const Navigation = () => {
  // Current value of use Contetxt
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);

  // Observer for Navigation scroll
  const useElementOnScreen = (options) => {
    // Ref for header
    const maninNavRef = useRef(null);
    const [isVisable, setIsVisable] = useState(false);

    // When target hit do this
    const callBackFunction = (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) setIsVisable(true);
      else setIsVisable(false);
    };

    // Listen for changes
    useEffect(() => {
      const observer = new IntersectionObserver(callBackFunction, options);
      if (maninNavRef.current) observer.observe(maninNavRef.current);

      return () => {
        if (maninNavRef.current) observer.unobserve(maninNavRef.current);
      };
    }, [maninNavRef, options]);

    return [maninNavRef, isVisable];
  };

  // Call Observer with options
  const [maninNavRef, isVisable] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: '1.0',
  });

  // Toggle Mobile menu
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Close on click outside
  const closeCart = (e) => {
    setTimeout(() => {
      setMenuOpen(false);
    }, '100');
  };

  // Use effect for mobile menu
  useEffect(() => {
    document.querySelector('.mobile-menu').addEventListener('click', closeCart);
  }, []);

  // console.log(currentUser);
  return (
    <Fragment>
      <NavigationContainer className={`${isVisable ? 'sticky' : ''}`}>
        {/* to specifes path */}
        <LogoContainer to='/'>
          <Logo className='logo' />
        </LogoContainer>
        <button className='mobile-menu-btn' onClick={handleMenuToggle}>
          MENU
        </button>
        <NavLinks
          className={`mobile-menu ${menuOpen ? 'mobile-nav-active' : ''}`}
        >
          {/* Link is like a href used by router */}
          <NavLink to='/shop'>SHOP</NavLink>
          <NavLink to='/shop-filter'>FILTER</NavLink>
          <NavLink to='/bookmarks'>
            BOOKMARKS <FavouritesIcon />
          </NavLink>
          {currentUser ? <NavLink to='/profile'>PROFILE</NavLink> : ''}
          {/* Check if user is logged in */}
          {/* {console.log(currentUser?.displayName)} */}
          {/* {console.log(currentUser)} */}
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          {/* {currentUser ? <NavUser>{currentUser?.displayName}</NavUser> : ''} */}

          <CartIcon />
        </NavLinks>
        {/* Condition for cart is open */}
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      {/* Listen for scroll */}
      <div ref={maninNavRef}></div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
