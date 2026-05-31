
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Category from './pages/Category';
import Messages from './pages/Messages';
import MediaLibrary from './pages/MediaLibrary';
import AddProduct from './pages/AddProduct';

const App = () => {
  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<Products />} path='/products' />
      <Route element={<Category />} path='/category' />
      <Route element={<Messages />} path='/messages' />
      <Route element={<MediaLibrary />} path='/media-library' />
      <Route element={<AddProduct />} path='/new-product' />
    </Routes>
  )
}

export default App