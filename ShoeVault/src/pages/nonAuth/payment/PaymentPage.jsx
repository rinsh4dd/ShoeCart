import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../common/context/AuthProvider";

function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India"
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios.get(`https://shoecart-4ug1.onrender.com/users/${user.id}`)
      .then(({ data }) => {
        setCart(data.cart || []);
        // Pre-fill address if available
        if (data.shippingAddress) {
          setBillingAddress(data.shippingAddress);
        }
      })
      .catch(err => {
        console.error("Error fetching cart:", err);
        alert("Failed to load your cart");
      });
  }, [user, navigate]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const handlePayment = async () => {
    if (!cart.length) {
      alert("Your cart is empty");
      return;
    }

    // Validate form
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      alert("Please enter a valid 16-digit card number");
      return;
    }

    if (!cardName) {
      alert("Please enter cardholder name");
      return;
    }

    if (!expiryDate || expiryDate.length !== 5) {
      alert("Please enter a valid expiry date (MM/YY)");
      return;
    }

    if (!cvv || cvv.length < 3) {
      alert("Please enter a valid CVV");
      return;
    }

    setIsProcessing(true);
    try {
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const newOrder = {
        id: Date.now(),
        items: [...cart],
        totalAmount,
        paymentStatus: "completed",
        orderStatus: "processing",
        paymentMethod: `VISA ****${cardNumber.slice(-4)}`,
        billingAddress,
        createdAt: new Date().toISOString()
      };

      const { data: currentUser } = await axios.get(`http://localhost:3000/users/${user.id}`);
      
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        cart: [],
        orders: [...(currentUser.orders || []), newOrder],
        shippingAddress: billingAddress // Save address for future orders
      });

      navigate("/order-confirmation", { state: { orderId: newOrder.id } });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>Please login to proceed with payment</p>
          <button 
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Purchase</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center mb-4">
                <input 
                  type="radio" 
                  id="visa" 
                  name="payment" 
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  defaultChecked
                />
                <label htmlFor="visa" className="ml-3 flex items-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                    alt="Visa" 
                    className="h-6 ml-2"
                  />
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="123"
                      maxLength={4}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={billingAddress.street}
                  onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={billingAddress.zip}
                    onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={billingAddress.country}
                    onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border-b pb-4 mb-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between py-2">
                  <div className="flex items-center">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-md object-cover mr-3 border border-gray-200"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm">₹{cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm">FREE</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="text-sm">₹{(cartTotal * 0.18).toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <p className="font-medium">Total</p>
                <p className="font-medium">₹{(cartTotal * 1.18).toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing || !cart.length}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                isProcessing || !cart.length ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
            </button>

            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="ml-3 text-sm text-yellow-700">
                  <p>This is a dummy payment. No real transaction will occur.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;