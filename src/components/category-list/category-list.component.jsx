// Import components
import CategoryItem from '../category-item/category-item.component';
import { Link } from 'react-router-dom';

// Import style
import './category-list.style.scss';

// Import Image
import GettyImage from '../../assets/gettyimages-1.jpg';

// Objects
const categories = [
  {
    id: 1,
    title: 'hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route: 'shop/hats',
  },
  {
    id: 2,
    title: 'jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route: 'shop/jackets',
  },
  {
    id: 3,
    title: 'sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens',
  },
  {
    id: 5,
    title: 'mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    route: 'shop/mens',
  },
];

const CategoryList = () => {
  return (
    <div className='categories-container'>
      {/* Map over categories Object */}
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
      <Link to='/shop-filter'>
        <div style={{ height: 'auto' }} className='category-item-container'>
          <div className='category-item-body-container'>
            <h2>Filter</h2>
            <p>Go to filter</p>
          </div>
          <img style={{ width: '100%' }} src={GettyImage} alt='GettImage' />
        </div>
      </Link>
    </div>
  );
};

export default CategoryList;
