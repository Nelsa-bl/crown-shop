// React
import { Link } from 'react-router-dom';

// Import style
import './filter-product-box.style.scss';

// Import components
import FavouritesButton from '../favourites-button/favourites-button.component';

const FilterProductBox = ({ product, className }) => {
  return (
    <div>
      <div className='outer-container'>
        <Link to={`/shop-filter/${product.id}`}>
          <div className='pro-item'>
            <h3>{product.name}</h3>
            <p className='pro-cat'>{product.category}</p>
            <div
              className='pro-image'
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            />
            <p className='cat-price'>
              {parseFloat(product.price).toFixed(2)} €
            </p>
          </div>
        </Link>
        <FavouritesButton className={className} product={product} />
      </div>
    </div>
  );
};

export default FilterProductBox;
