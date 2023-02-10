import { useContext, Fragment } from 'react';

// Import style
import './categories-preview.style.scss';

// Import Shop mock data
import { CategoriesContext } from '../../contexts/categories.context';

// Import Components
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {/* Map trough categoryMap Object */}
      {Object.keys(categoriesMap).map((title) => {
        // Get all products
        const products = categoriesMap[title];
        // console.log(products);
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
