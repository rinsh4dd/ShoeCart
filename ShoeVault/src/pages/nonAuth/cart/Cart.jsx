import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../common/context/AuthProvider";

function Cart() {
  const [cart, setCart] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetch(`https://shoecart-4ug1.onrender.com/users/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setCart(data.cart || []);
        });
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }
  }, [user]);

  const updateCartInDB = async (updatedCart) => {
    setIsUpdating(true);
    setCart(updatedCart);
    try {
      if (user) {
        await fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: updatedCart })
        });
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCartInDB(updatedCart);
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    updateCartInDB(updatedCart);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getItemCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = () => {
    if (user) {
      navigate("/payment");
    } else {
      navigate("/login", { state: { from: "/cart" } });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-medium text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <button 
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 shadow-sm font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-500 mt-2">{getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <div key={index} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-24 h-24 rounded-md object-cover border border-gray-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-lg font-medium text-gray-900 ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      
                      <div className="mt-4 flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            disabled={isUpdating}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-center w-12 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            disabled={isUpdating}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => handleRemove(index)}
                          disabled={isUpdating}
                          className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isUpdating}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  user ? "Proceed to Checkout" : "Sign in to Checkout"
                )}
              </button>

              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{' '}
                  <button 
                    type="button" 
                    onClick={() => navigate("/")}
                    className="text-indigo-600 font-medium hover:text-indigo-500"
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;