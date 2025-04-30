import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import NavbarZepto from './components/NavbarZepto';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import WalletPage from './pages/WalletPage';
import AdminUploadProduct from './pages/AdminUploadProduct';
import ProductCategoryPage from './pages/ProductCategoryPage';
import CategoryPage from './pages/CategoryPage';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ New
import { CartProvider } from "./context/cartContext"; 
import React from 'react';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <CartProvider>
      <Router>
        <NavbarZepto />
        <ToastContainer />
        <Routes>

          {/* Public Route */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          {/* <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            } 
          /> */}
          <Route path="/account" element={<AccountPage />} />

          <Route 
            path="/wallet" 
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/adminuploadproduct" 
            element={
              <ProtectedRoute>
                <AdminUploadProduct />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/section/:categoryGroup" 
            element={
              <ProtectedRoute>
                <ProductCategoryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/category/:categoryName" 
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
