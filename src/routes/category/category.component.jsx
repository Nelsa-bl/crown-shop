// Import Context
import { useContext, useState, useEffect, Fragment } from 'react';

// Import useParams
import { useParams } from 'react-router-dom';

// Import category contect
import { CategoriesContext } from '../../contexts/categories.context';

// Import components
import ProductCard from '../../components/product-card/product-card.component';

// Import styles
import './category.style.scss';

const Category = () => {
  // Destruture
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  // Set state
  const [products, setProducts] = useState(categoriesMap[category]);

  // Update when [category, categoriesMap] changes
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <Fragment>
      <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
