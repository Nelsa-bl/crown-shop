// always Imort createcontext
import { createContext, useState, useEffect } from 'react';

// Import Products
import { getCategoriesAndDodcuments } from '../utils/firebase/firebase.utils';

// Set Init value
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// Set to page
export const CategoriesProvider = ({ children }) => {
  // const [products, setProducts] = useState(PRODUCTS);
  const [categoriesMap, setCategoriesMap] = useState({});

  // Import data (async inside useEffect)
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDodcuments();
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {' '}
      {children}{' '}
    </CategoriesContext.Provider>
  );
};
