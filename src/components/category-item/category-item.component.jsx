// Import useNavigation
import { useNavigate } from 'react-router-dom';

// Import style
import './category-item.style.scss';

const CategoryItem = ({ category }) => {
  // Destructure
  const { title, imageUrl, route } = category;
  // Navigation
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className='category-item-container' onClick={onNavigateHandler}>
      {/* Images inline style*/}
      <div
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {/* Info */}
      <div className='category-item-body-container'>
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
