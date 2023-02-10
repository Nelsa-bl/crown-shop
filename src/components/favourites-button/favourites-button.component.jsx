// Import Context
import { useContext } from 'react';
import { BookmarkContext } from '../../contexts/bookmarks.context';

// Import styles
import './favourites-button.style.scss';

const FavouritesButton = ({ product, className }) => {
  const { addBookmark, removeBookmark, bookmarskItem } =
    useContext(BookmarkContext);

  return (
    <>
      {bookmarskItem.map((el) => el.id).includes(product.id) ? (
        <span
          className={className}
          onClick={() => {
            removeBookmark(product);
          }}
        >
          ❤️
        </span>
      ) : (
        <span
          className={className}
          onClick={() => {
            addBookmark(product);
          }}
        >
          🖤
        </span>
      )}
    </>
  );
};

export default FavouritesButton;
