// Import from react
import { createContext, useState, useEffect } from 'react';

// Helper function find existing bookmark item id match
const addBookmarkItem = (bookmarskItem, productToAdd) => {
  // Find if bookmarskItem contains productToAdd
  const existingBookmarkItem = bookmarskItem.find(
    (bookmarkItem) => bookmarkItem.id === productToAdd.id
  );
  // If found, add bookmark
  if (existingBookmarkItem) {
    return bookmarskItem.map((bookmarkItem) =>
      bookmarkItem.id === productToAdd.id ? { ...bookmarkItem } : bookmarkItem
    );
  }
  // Else return new array with modified bookmarskItem
  return [...bookmarskItem, { ...productToAdd }];
};

// Remove bookmark item helper function
const removeBookmarkItem = (bookmarskItem, bookmarkItemToRemove) => {
  // Find CartItem to remove
  const existingBookmarkItem = bookmarskItem.find(
    (bookmarkItem) => bookmarkItem.id === bookmarkItemToRemove.id
  );
  // Check if bookmark exists
  if (existingBookmarkItem) {
    return bookmarskItem.filter(
      (bookmarkItem) => bookmarkItem.id !== bookmarkItemToRemove.id
    );
  }
  // Return back condition with matching bookmark id
  return bookmarskItem.map((bookmarkItem) =>
    bookmarkItem.id === bookmarkItemToRemove.id
      ? { ...bookmarkItem }
      : bookmarkItem
  );
};

// Clear bookmarks item helper function
const clearBookmarkItem = (bookmarskItem, bookmarkItemToClear) => {
  return bookmarskItem.filter(
    (bookmarkItem) => bookmarkItem.id !== bookmarkItemToClear.id
  );
};

// Context inits functions and state
export const BookmarkContext = createContext({
  bookmarskItem: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  clearBookmarkFromCart: () => {},
  bookmarkCount: 0,
});

export const BookmarkProvider = ({ children }) => {
  // Local storage state
  const [local, setLocal] = useState([]);
  // State of cart items
  const [bookmarskItem, setBookmarksItem] = useState(local);

  // Local storage (IMPORTANT 1. Get)
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setBookmarksItem(items);
    }
  }, []);

  // Local storage (IMPORTANT 2. Set)
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(bookmarskItem));
  }, [bookmarskItem]);

  // Function to handle add to bookmarks
  const addBookmark = (productToAdd, amount) => {
    setBookmarksItem(addBookmarkItem(bookmarskItem, productToAdd));
  };

  // Function to handle remove from bookmarks
  const removeBookmark = (bookmarkItemToRemove) => {
    setBookmarksItem(removeBookmarkItem(bookmarskItem, bookmarkItemToRemove));
  };

  // Function to handle remove from bookmarks
  const clearBookmarkFromCart = (bookmarkItemToClear) => {
    setBookmarksItem(clearBookmarkItem(bookmarskItem, bookmarkItemToClear));
  };

  const value = {
    addBookmark,
    removeBookmark,
    clearBookmarkFromCart,
    bookmarskItem,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
