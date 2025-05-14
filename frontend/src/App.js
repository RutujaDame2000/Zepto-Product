
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/cartContext";
import OrderHistoryPage from "./pages/OrderHistory";
import OrderSuccess from "./components/OrderSuccess";


// Components
import NavbarZepto from "./components/NavbarZepto";
import ProtectedRoute from "./components/ProtectedRoute";


// Pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AccountPage from "./pages/AccountPage";
import WalletPage from "./pages/WalletPage";
import AdminUploadProduct from "./pages/AdminUploadProduct";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import VendorDashboardPage from "./pages/VendorDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import VendorEditProductPage from "./pages/VendorEditProductPage";
import VendorAddProductPage from './pages/VendorAddProductPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <NavbarZepto />
        <ToastContainer />
        <Routes>

          {/* Public Routes */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected User Routes */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute role="user"><AccountPage /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
          <Route path="/category/:categoryName" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
          <Route path="/product/:productId" element={<ProtectedRoute><ProductDetailsPage /></ProtectedRoute>} />
          

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/adminuploadproduct" element={<ProtectedRoute role="admin"><AdminUploadProduct /></ProtectedRoute>} />
          {/* Fix for /admin/AccountPage error */}
          <Route path="/admin/AccountPage" element={<Navigate to="/account" replace />} />

          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<ProtectedRoute role="vendor"><VendorDashboardPage /></ProtectedRoute>} />
          <Route path="/vendor/edit-product/:productId" element={<ProtectedRoute role="vendor"><VendorEditProductPage /></ProtectedRoute>} />
          <Route path="/vendor/add-product" element={<ProtectedRoute role="vendor"><VendorAddProductPage /></ProtectedRoute>} />

          {/* Fallback for unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
         <Route path="/order-success" element={<OrderSuccess />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
