// Import react
import { useContext } from 'react';

// Bookmark context
import { BookmarkContext } from '../../contexts/bookmarks.context';

// Import component
import FilterProductBox from '../../components/filter-product-box/filter-product-box.component';

// Import Styles
import './favourites.style.scss';

const Favourites = () => {
  // Destructure
  const { bookmarskItem } = useContext(BookmarkContext);
  return (
    <>
      <h2>Bookmarks</h2>
      <div className='pro-container'>
        {bookmarskItem.map((product) => (
          <FilterProductBox
            className='filter-fav-icon'
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default Favourites;
