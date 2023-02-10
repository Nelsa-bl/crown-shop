// Import Fragment (component render to nothing)
import { Fragment, useContext } from 'react';

// Import Routes
import { Outlet, Link } from 'react-router-dom';

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
  NavUser,
  LogoContainer,
} from './navigation.style';

// Navigation
// Outlet determines nested routed elements position
const Navigation = () => {
  // Current value of use Contetxt
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  // console.log(currentUser);
  return (
    <Fragment>
      <NavigationContainer>
        {/* to specifes path */}
        <LogoContainer to='/'>
          <Logo className='logo' />
        </LogoContainer>
        <NavLinks>
          {/* Link is like a href used by router */}
          <NavLink to='/shop'>SHOP</NavLink>
          <NavLink to='/shop-filter'>FILTER</NavLink>
          <NavLink to='/bookmarks'>
            BOOKMARKS <FavouritesIcon />
          </NavLink>
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
          {currentUser ? <NavUser>{currentUser?.displayName}</NavUser> : ''}
          <CartIcon />
        </NavLinks>
        {/* Condition for cart is open */}
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
