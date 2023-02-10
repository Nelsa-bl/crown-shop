import React from 'react';
import ReactDOM from 'react-dom/client';

// Import React Router
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';
import { BookmarkProvider } from './contexts/bookmarks.context';

import reportWebVitals from './reportWebVitals';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <CategoriesProvider>
        <CartProvider>
          <BookmarkProvider>
            <App />
          </BookmarkProvider>
        </CartProvider>
      </CategoriesProvider>
    </UserProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
