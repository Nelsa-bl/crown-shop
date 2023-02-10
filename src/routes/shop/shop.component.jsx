// Import Routes
import { Routes, Route } from 'react-router-dom';

// Import style
import './shop.style.scss';

// Import components
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

// Nested Routes
const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
