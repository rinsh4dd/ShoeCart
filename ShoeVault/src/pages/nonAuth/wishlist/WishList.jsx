import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../common/context/AuthProvider";
import { CiHeart, CiShoppingCart, CiTrash } from "react-icons/ci";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch user's wishlist
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get(`https://shoecart-4ug1.onrender.com/users/${user.id}`);
        setWishlist(data.wishlist || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, navigate]);

  const removeFromWishlist = async (productId) => {
    try {
      const { data: currentUser } = await axios.get(`https://shoecart-4ug1.onrender.com/users/${user.id}`);
      const updatedWishlist = currentUser.wishlist?.filter(item => item.id !== productId) || [];
      
      await axios.patch(`https://shoecart-4ug1.onrender.com/users/${user.id}`, {
        wishlist: updatedWishlist
      });
      
      setWishlist(updatedWishlist);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const addToCart = async (product) => {
    try {
      // Get current cart
      const { data: currentUser } = await axios.get(`https://shoecart-4ug1.onrender.com/users/${user.id}`);
      const currentCart = currentUser.cart || [];
      
      // Check if item already exists in cart
      const existingItem = currentCart.find(item => 
        item.id === product.id && item.size === (product.size || "M")
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = currentCart.map(item =>
          item.id === product.id && item.size === (product.size || "M")
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...currentCart,
          {
            ...product,
            quantity: 1,
            size: product.size || "M" // Default size if not specified
          }
        ];
      }

      await axios.patch(`https://shoecart-4ug1.onrender.com/users/${user.id}`, {
        cart: updatedCart
      });

      alert("Item added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>Please login to view your wishlist</p>
          <button 
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow">
          <CiHeart className="h-16 w-16 mx-auto text-gray-400" />
          <h2 className="text-xl font-medium text-gray-800 mt-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mt-2">Save items you love to your wishlist</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Wishlist</h1>
          <p className="text-gray-600 mt-2">{wishlist.length} items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <CiTrash className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <h3 
                  className="text-lg font-medium text-gray-900 mb-1 cursor-pointer hover:text-indigo-600"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">₹{product.price.toFixed(2)}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <CiShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;