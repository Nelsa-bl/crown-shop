// Import useParams
import { useParams } from 'react-router-dom';

// Import react
import { useContext, useState, useEffect } from 'react';

// Import Context
import { CartContext } from '../../contexts/cart.context';
// Import Shop mock data from Context
import { CategoriesContext } from '../../contexts/categories.context';

// Import style
import './shop-filter-item.style.scss';

// Import components
import Button from '../../components/button/button.component';
import FavouritesButton from '../../components/favourites-button/favourites-button.component';

const ShopFilterItem = () => {
  // Set State
  const [pro, setPro] = useState([]);

  // Context of products
  const { categoriesMap } = useContext(CategoriesContext);

  // Get id from URL
  const { id } = useParams();

  // On page load
  useEffect(() => {
    for (let [key, value] of Object.entries(categoriesMap)) {
      value.map((product) => {
        if (product.id === Number(id)) {
          setPro([product]);
        }
      });
    }
  }, [categoriesMap, id]);

  // Desturucture
  const { addItemToCart } = useContext(CartContext);

  // Counter
  const [counter, setCounter] = useState(1);

  // Increase counter
  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  // Decrese counter
  const decreaseCounter = () => {
    counter > 1 && setCounter(counter - 1);
  };

  // Reset counter to 1 after add to cart click
  const reset = () => setCounter(1);

  return (
    <div>
      {pro
        .filter((val) => val.id === Number(id))
        .map((product) => (
          <div className='box-container' key={product.id}>
            <div>
              <div
                className='pro-image item-img'
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              />
            </div>
            <div>
              <h3>{product.name}</h3>
              <p className='pro-cat'>{product.category}</p>
              <p className='cat-price'>
                {parseFloat(product.price).toFixed(2)} €
              </p>
              <div className='counter-item'>
                <button onClick={decreaseCounter}>&#10094;</button>
                <p>{counter}</p>
                <button onClick={increaseCounter}>&#10095;</button>
              </div>
              <Button
                onClick={() => {
                  addItemToCart(product, counter);
                  reset();
                }}
              >
                ADD TO CART
              </Button>
              {/* Favorites button */}
              <FavouritesButton
                className='filter-item-fav-icon'
                product={product}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShopFilterItem;
