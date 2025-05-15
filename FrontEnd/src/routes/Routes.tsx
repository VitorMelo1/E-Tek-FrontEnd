import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/Main/MainLayout';
import Home from '../pages/home/Home';
import Sobre from '../pages/ProductDetails/Sobre';
import Cart from '../pages/CartPage/Cart';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          
        </Route>
        <Route path="/cart" element={<Cart />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;