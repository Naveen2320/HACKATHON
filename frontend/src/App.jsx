import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Menu from './pages/Menu';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage'; // Assuming this exists or will be created
import { ROUTES } from './config/constants';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background">
                <Navbar />
                <main>
                    <Routes>
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
                        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-success/:orderId" element={<OrderConfirmationPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
