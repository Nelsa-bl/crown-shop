import { createContext, useState, useEffect } from 'react';

// Import component
import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// Wrap around Root Component to so all get access to this Context
// in index.js

// Actaul value to acesss
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Actual component (recives childeren)
export const UserProvider = ({ children }) => {
  // Ste value
  const [currentUser, setCurrentUser] = useState(null);
  // Set values to pass
  const value = { currentUser, setCurrentUser };

  // User Observer when user login/logout
  useEffect(() => {
    const unsucribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // Set state when logged in / logged out
      setCurrentUser(user);
      // console.log(user);
    });

    return unsucribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
