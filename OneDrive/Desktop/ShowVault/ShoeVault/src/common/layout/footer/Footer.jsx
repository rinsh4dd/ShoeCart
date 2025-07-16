import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand + Tagline */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">ShoeCart</h2>
          <p className="text-gray-400">
            Your trusted shoe partner for quality footwear that combines style
            and comfort.
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white rounded-full p-3 hover:bg-blue-600 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white rounded-full p-3 hover:bg-blue-400 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white rounded-full p-3 hover:bg-pink-600 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white rounded-full p-3 hover:bg-blue-700 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition duration-200 flex items-center"
              >
                <span className="hover-underline">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-400 hover:text-white transition duration-200 flex items-center"
              >
                <span className="hover-underline">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition duration-200 flex items-center"
              >
                <span className="hover-underline">About Us</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition duration-200 flex items-center"
              >
                <span className="hover-underline">Contact</span>
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-gray-400 hover:text-white transition duration-200 flex items-center"
              >
                <span className="hover-underline">FAQs</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">
            Customer Service
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/shipping"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                to="/returns"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Return Policy
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">
            Contact Us
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-400">
                123 Shoe Street, Footwear City, FC 12345
              </span>
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="text-gray-400 mr-3" />
              <span className="text-gray-400">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-gray-400 mr-3" />
              <a
                href="mailto:info@shoevault.com"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                info@shoevault.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShoeVault. All rights reserved.
          </div>
          <div className="flex space-x-4 items-center">
            <div className="w-12 h-8 flex items-center justify-center">
              <img
                src="https://brandlogos.net/wp-content/uploads/2014/10/visa-logo-400x400.png"
                alt="Visa"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="w-12 h-8 flex items-center justify-center">
              <img
                src="https://imgs.search.brave.com/lcw8f_lYY4IPdm557ZmrVA8KizwjdwrTDH2guNfGU0U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg4L01hc3RlckNh/cmRfZWFybHlfMTk5/MHNfbG9nby5zdmc"
                alt="Mastercard"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="w-12 h-8 flex items-center justify-center">
              <img
                src="https://imgs.search.brave.com/Pkjwo3Yqv0BSy01ET1JyZV_wrlUalEZkxOgveECe5qY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cG9wcGluLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8x/MC9QYXlQYWwtbG9n/by0yMDE0LTEwMjR4/NTc2LndlYnA"
                alt="PayPal"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="w-12 h-8 flex items-center justify-center">
              <img
                src="https://imgs.search.brave.com/ttPSqZDr0lQcQlKlpjDntpagFKI02o8Kc2jQLVqsh3s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2IwL0Fw/cGxlX1BheV9sb2dv/LnN2Zy82NDBweC1B/cHBsZV9QYXlfbG9n/by5zdmcucG5n"
                alt="Apple Pay"
                className="max-h-full max-w-full object-contain filter brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
