// Import Routes
import { Routes, Route } from 'react-router-dom';

// Import components
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import ShopFilter from './routes/shop-filter/shop-filter';
import ShopFilterItem from './routes/shop-filter-item/shop-filter-item.component';
import Checkout from './routes/checkout/checkout.component';
import Favourites from './routes/favourites/favourites.component';

// Import style

const App = () => {
  return (
    // Set up routing (navigation)
    // Route path that mathces string renders element given component
    <Routes>
      {/* <Route path='/home' element={<Home />} /> */}

      {/* Nested routs */}
      {/* index render in outlet of parent */}
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='shop-filter' element={<ShopFilter />} />
        <Route path='shop-filter/:id' element={<ShopFilterItem />}></Route>
        <Route path='bookmarks' element={<Favourites />} />
        <Route path='auth' element={<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
