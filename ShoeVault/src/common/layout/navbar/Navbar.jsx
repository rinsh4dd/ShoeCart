import React, { useState } from "react";
import { CiShoppingCart, CiHeart, CiUser } from "react-icons/ci";
import { IoLogoAmplify } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleProfileClick = () => {
    if (user) {
      setShowProfileDropdown(!showProfileDropdown);
    } else {
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowProfileDropdown(false);
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <IoLogoAmplify className="text-3xl text-red-500" />
          <span className="text-xl font-semibold text-red-500">ShoeCart</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10 items-center">
          {navItems.map(({ label, path }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              className="cursor-pointer text-[16px] hover:text-red-500"
            >
              {label}
            </div>
          ))}

          {/* Icons */}
          <div className="flex gap-4 text-2xl relative">
            <CiShoppingCart
              onClick={handleCartClick}
              className="cursor-pointer hover:text-red-500"
            />
            <CiHeart
              onClick={() => navigate("/wishlist")}
              className="cursor-pointer hover:text-red-500"
            />
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-red-500"
              onClick={handleProfileClick}
            >
              <CiUser />
              {user && (
                <span className="text-[16px] font-medium text-gray-700">
                  {user.name}
                </span>
              )}
            </div>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute top-10 right-0 w-44 bg-white border rounded shadow-md p-2 text-sm z-50">
                <div className="px-3 py-1 text-gray-700">
                  Signed in as <b>{user.name}</b>
                </div>
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full text-left px-3 py-1 text-gray-500 hover:bg-gray-100"
                >
                  Track Orders
                </button>
                <button className="w-full text-left px-3 py-1 text-gray-500 hover:bg-gray-100">
                  Contact
                </button>
                <button className="w-full text-left px-3 py-1 text-gray-500 hover:bg-gray-100">
                  Report Bug
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-1 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl text-red-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-4 bg-white rounded shadow p-4 text-[16px]">
            {/* Nav links */}
            {navItems.map(({ label, path }) => (
              <div
                key={label}
                onClick={() => {
                  navigate(path);
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:text-red-500"
              >
                {label}
              </div>
            ))}

            {/* Icons Row */}
            <div className="flex gap-6 text-2xl mt-2 justify-center">
              <CiShoppingCart
                onClick={() => {
                  handleCartClick();
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:text-red-500"
              />
              <CiHeart
                onClick={() => {
                  navigate("/wishlist");
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:text-red-500"
              />
              <CiUser
                onClick={() => {
                  handleProfileClick();
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:text-red-500"
              />
            </div>

            {/* Profile Actions */}
            {user && (
              <div className="flex flex-col gap-1 mt-4 text-sm">
                <span className="text-gray-600">
                  Signed in as <b>{user.name}</b>
                </span>

                <button
                  onClick={() => {
                    navigate("/orders");
                    setIsOpen(false);
                  }}
                  className="text-left px-3 py-1 rounded hover:bg-gray-100"
                >
                  Track Orders
                </button>

                <button className="text-left px-3 py-1 rounded hover:bg-gray-100">
                  Contact
                </button>

                <button className="text-left px-3 py-1 rounded hover:bg-gray-100">
                  Report Bug
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-left px-3 py-1 text-red-500 rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
