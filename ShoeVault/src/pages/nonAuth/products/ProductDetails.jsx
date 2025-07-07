import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
        
        checkWishlistStatus(data.id);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message);
        toast.error("Failed to load product details");
      }
    }

    fetchProduct();
  }, [id]);

  const checkWishlistStatus = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`);
      const userData = await response.json();
      const inWishlist = userData.wishlist?.some(item => item.id === productId);
      setIsInWishlist(inWishlist);
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  };

  const handleAddToCart = async () => {
    if (!size) {
      toast.warning("Please select a size before adding to cart");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warning("Please log in first!");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      quantity: Number(quantity),
      image_url: product.image_url,
    };

    try {
      const userRes = await fetch(`http://localhost:3000/users/${user.id}`);
      if (!userRes.ok) throw new Error("User not found");
      const userData = await userRes.json();

      const existingItemIndex = userData.cart?.findIndex(
        item => item.id === product.id && item.size === size
      );

      let updatedCart;
      if (existingItemIndex !== -1 && existingItemIndex !== undefined) {
        updatedCart = [...userData.cart];
        updatedCart[existingItemIndex].quantity += Number(quantity);
        toast.success(`Quantity updated in cart (Total: ${updatedCart[existingItemIndex].quantity})`);
      } else {
        updatedCart = [...(userData.cart || []), cartItem];
        toast.success("Item added to cart!");
      }

      const patchRes = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart }),
      });

      if (!patchRes.ok) throw new Error("Failed to update cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart");
    }
  };

  const handleAddToWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warning("Please log in to add items to your wishlist!");
      return;
    }

    try {
      const userRes = await fetch(`http://localhost:3000/users/${user.id}`);
      if (!userRes.ok) throw new Error("User not found");
      const userData = await userRes.json();

      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        brand: product.brand
      };

      const alreadyInWishlist = userData.wishlist?.some(item => item.id === product.id);

      let updatedWishlist;
      if (alreadyInWishlist) {
        updatedWishlist = userData.wishlist.filter(item => item.id !== product.id);
        setIsInWishlist(false);
        toast.success("Removed from wishlist!");
      } else {
        updatedWishlist = [...(userData.wishlist || []), wishlistItem];
        setIsInWishlist(true);
        toast.success("Added to wishlist!");
      }

      const patchRes = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist: updatedWishlist }),
      });

      if (!patchRes.ok) throw new Error("Failed to update wishlist");
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error("Failed to update wishlist");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-red-600 text-xl font-semibold animate-pulse">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-gray-500 text-lg font-medium animate-pulse">
          Loading product details...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-10">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="max-w-6xl mx-auto p-6 sm:p-12 bg-white rounded-2xl shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="relative overflow-hidden rounded-xl shadow-sm group">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>

          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-gray-800">${product.price}</p>

            {product.special_offer !== "None" && (
              <span className="inline-block bg-red-500 text-white text-sm font-medium py-1.5 px-4 rounded-full">
                {product.special_offer}
              </span>
            )}

            <p className="text-gray-600 text-base leading-relaxed">
              {product.description || "No description available."}
            </p>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Category:</span> {product.category}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Brand:</span> {product.brand}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Size:</label>
              <div className="flex flex-wrap gap-2">
                {product.available_sizes?.map((shoeSize) => (
                  <button
                    key={shoeSize}
                    onClick={() => {
                      setSize(shoeSize);
                      toast.info(`Size ${shoeSize} selected`);
                    }}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      size === shoeSize
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {shoeSize}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
                className="w-20 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-black text-white py-3 px-8 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-300 shadow"
              >
                <CiShoppingCart className="text-lg" />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`flex items-center justify-center gap-2 py-3 px-8 rounded-full text-sm font-medium transition duration-300 ${
                  isInWishlist
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CiHeart className={`text-lg ${isInWishlist ? "fill-current" : ""}`} />
                {isInWishlist ? "In Wishlist" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;