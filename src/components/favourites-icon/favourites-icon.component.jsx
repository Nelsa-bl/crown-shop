// Import Context
import { useContext } from 'react';
import { BookmarkContext } from '../../contexts/bookmarks.context';

// Import styles
import './favourites-icon.style.scss';

const FavouritesIcon = () => {
  const { bookmarskItem } = useContext(BookmarkContext);
  const total = bookmarskItem.length;
  return (
    <span style={{ position: 'absolute', marginLeft: '3px' }}>
      {total ? `(${total})` : ''}
    </span>
  );
};

export default FavouritesIcon;
