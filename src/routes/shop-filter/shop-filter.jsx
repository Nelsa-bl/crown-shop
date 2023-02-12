import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';

// Import components
import FilterProductBox from '../../components/filter-product-box/filter-product-box.component';

// Import style
import './shop-filter.style.scss';

// Import Shop mock data from Context
import { CategoriesContext } from '../../contexts/categories.context';

const ShopFilter = () => {
  // Context of products
  const { categoriesMap } = useContext(CategoriesContext);
  // Set State of Filterproduts and Hide all
  const [searchField, setsearchField] = useState('');
  const [hide, setHide] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchResult, setSearchResult] = useState(filterProducts);

  let [arr, setArr] = useState([]);

  useEffect(() => {
    // Filter users
    const newFilteredUsers = filterProducts.filter((product) => {
      return product?.name.toLocaleLowerCase().includes(searchField);
    });

    // Set new state
    setSearchResult(newFilteredUsers);
  }, [filterProducts, searchField]);

  // Function for search
  const onSearchChange = (e) => {
    // Set to lowercase
    const searchFieldString = e.target.value.toLocaleLowerCase();
    // Update state of search field
    setsearchField(searchFieldString);
  };

  // console.log(arr);
  // console.log('Filter', filterProducts);

  // Refs
  const catBtnAll = useRef();

  // Helper function
  const refresh = (data, condition, set) => {
    const update = [...data];
    data.forEach((el) => (el.isAttive = condition));
    set(update);
  };

  // Convert from Object to Array
  const convertToArr = () => {
    for (let [key, value] of Object.entries(categoriesMap)) {
      // console.log(`Key:::: ${key}`);
      value.forEach((product) => {
        product.category = key;
        product.isActive = true;

        arr.push(product);
      });
    }
  };

  // Set all products active
  useEffect(() => {
    convertToArr();
    refresh(arr, true, setFilterProducts);
    catBtnAll.current.classList.add('cat-btn-active');
  }, [categoriesMap]);

  // Chek if any products are active
  const check = () => {
    const x = filterProducts.some((el) => el.isAttive === true);
    return x;
  };

  // Set all products to active
  const reset = () => {
    refresh(filterProducts, true, setFilterProducts);
    setHide(false);
    const removeActive = document.querySelectorAll('.cat-btn-item');
    removeActive.forEach((el) => {
      el.classList.remove('cat-btn-active');
    });
    catBtnAll.current.classList.add('cat-btn-active');
  };

  // Get all uniq categories fo buttons
  const arrBtns = Array.from(new Set(arr.map(({ category }) => category)));

  // Eventa handler for category buttons
  const onClickHandler = (category, e) => {
    // Change calss for active btn
    e.target.classList.toggle('cat-btn-active');
    // When clikked only first time, do this, and cahnge state
    if (!hide) {
      refresh(filterProducts, false, setFilterProducts);
      setHide(true);
      catBtnAll.current.classList.remove('cat-btn-active');
    }

    // Set the clikked category to isActive
    const s = filterProducts.map((el) => el);
    s.forEach((el) => {
      if (el.category === category) {
        if (!el.isAttive) el.isAttive = true;
        else el.isAttive = false;
      }
    });
    setFilterProducts(s);

    // Check if none products are clikked, the set all to active
    if (!check()) {
      reset();
    }
  };

  // Get all products amount
  const allProductsLength = searchResult.length;

  // Get category amount
  const getAmount = (category) => {
    return searchResult.filter((el) => el.category === `${category}`).length;
  };

  // Show active categories string
  const showFilter = () => {
    if (hide) {
      const res = filterProducts.filter((el) => el.isAttive === true);
      const allActiveShow = Array.from(
        new Set(res.map(({ category }) => category))
      );
      return allActiveShow;
    }
  };

  return (
    <div>
      <div className='categories'>
        {/* Search Field */}
        <input
          className='search-field'
          type='search'
          placeholder='search'
          onChange={onSearchChange}
        />
        {/* Sow all btn */}
        <button
          ref={catBtnAll}
          onClick={reset}
          // data-show={`${allProductsLength ? 'show' : 'hidden'}`}
          className={`cat-btn cat-all`}
        >
          All ({allProductsLength})
        </button>
        {/* Display uniqe categories as btns */}
        {arrBtns.map((element) => (
          <button
            key={element}
            className='cat-btn cat-btn-item'
            onClick={(e) => onClickHandler(element, e)}
          >
            {element} ({getAmount(element)})
          </button>
        ))}
      </div>
      {/* Show filter actives */}
      <div className='show-actives'>
        {showFilter() ? (
          <span className='active-headline'>Filter by: </span>
        ) : (
          ''
        )}
        {showFilter()
          ? showFilter()
              .sort((a, b) => (a > b ? 1 : -1))
              ?.map((el) => (
                <span className='cat-disp' key={el}>
                  {el}
                </span>
              ))
          : ``}
      </div>
      {/* Show filtered products, sorted by category */}
      <div className='pro-container'>
        {filterProducts &&
          searchResult
            ?.filter((val) => val.isAttive === true)
            .sort((a, b) => (a.category > b.category ? 1 : -1))
            .map((product) => (
              <FilterProductBox
                className='filter-fav-icon'
                key={product.id}
                product={product}
              />
            ))}
      </div>
    </div>
  );
};

export default ShopFilter;
