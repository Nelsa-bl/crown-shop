// Import from react
import { createContext, useState, useEffect } from 'react';

// Helper function find existing product iteme id match (amount default 1)
const addCartItem = (cartItems, productToAdd, amount = 1) => {
  // Find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + amount }
        : cartItem
    );
  }
  // Else return new array with modified cartItems (new cart item add)
  return [...cartItems, { ...productToAdd, quantity: amount }];
};

// Remove cart item helper function
const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find CartItem to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // Check if quantity is equal to 1, if it is remove item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // Return back condition with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// Clear checkout item helper function
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// Context inits functions and state
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  // State of is cart dropdown open
  const [isCartOpen, setIsCartOpen] = useState(false);
  // State of cart items
  const [cartItems, setCartItems] = useState([]);
  // State of Cart count
  const [cartCount, setCartCount] = useState(0);
  // State of cart total
  const [cartTotal, setCartTotal] = useState(0);

  // Local storage (IMPORTANT 1. Get)
  useEffect(() => {
    const CartItems = JSON.parse(localStorage.getItem('CartItems'));
    if (CartItems) {
      setCartItems(CartItems);
    }
  }, []);

  // Local storage (IMPORTANT 2. Set)
  useEffect(() => {
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // When cartItems changes update state of cart count
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // When cartItems changes update state of cart total
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  // Function to handle add to cart
  const addItemToCart = (productToAdd, amount) => {
    setCartItems(addCartItem(cartItems, productToAdd, amount));
  };

  // Function to handle remove from cart
  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  // Function to handle remove from Checkout
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
