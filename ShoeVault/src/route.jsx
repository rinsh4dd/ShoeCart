import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./common/layout/navbar/Navbar";
import Landing from "./pages/nonAuth/landing/Landing";
import ErrorResponse from "./pages/nonAuth/404/ErrorResponse";
import Products from "./pages/nonAuth/products/Products";
import ProductDetails from "./pages/nonAuth/products/ProductDetails";
import Cart from "./pages/nonAuth/cart/Cart";
import PaymentPage from "./pages/nonAuth/payment/PaymentPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import LoginPage from "./pages/auth/LoginPage";
import AuthProvider from "./common/context/AuthProvider";
import AboutUs from "./pages/nonAuth/aboutus/AboutUs";
import OrderConfirmation from "./pages/nonAuth/order/OrderConfirmation";
import OrdersPage from "./pages/nonAuth/order/OrdersPage";
import OrderDetails from "./pages/nonAuth/order/OrderDetails";
import Wishlist from "./pages/nonAuth/wishlist/WishList";
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/ManageUsers";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import AddProductPage from "./admin/AddProduct";
import EditProductPage from "./admin/EditProduct";
import UserOrders from "./admin/UserOrders";
import AdminPrivateRoute from "./common/Routes/AdminRoute";
import PrivateRoute from "./common/Routes/privateRoute";
import Footer from "./common/layout/footer/Footer";

function AppRoutesWrapper() {
  const location = useLocation();

  const shouldHideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      {!shouldHideNavbar && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {/* All your <Route /> definitions */}
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<ErrorResponse />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/about" element={<AboutUs />} />

          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/products/addproduct" element={<AddProductPage />} />
            <Route path="/admin/products/edit/:id" element={<EditProductPage />} />
            <Route path="/admin/user-orders/:id" element={<UserOrders />} />
          </Route>
        </Routes>
      </div>

      {/* ✅ Now Footer will show below all pages except admin/login/signup */}
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

function UserRouter() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutesWrapper />
      </AuthProvider>
    </Router>
  );
}
export default UserRouter;
