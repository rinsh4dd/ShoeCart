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
import LoginAsAdmin from "./admin/LoginAsAdmin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/ManageUsers";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import AddProductPage from "./admin/AddProduct";
import EditProductPage from "./admin/EditProduct";

function AppRoutesWrapper() {
  const location = useLocation();

  // Hide navbar if current path starts with "/admin", or is login/signup
  const shouldHideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="w-full min-h-screen bg-white">
      {!shouldHideNavbar && <Navbar />}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<ErrorResponse />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginAsAdmin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/products/addproduct" element={<AddProductPage/>}></Route>
          <Route path="/admin/products/edit/:id" element={<EditProductPage/>}></Route>
        </Routes>
      </div>
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
