import React from "react";
import BuyNowOverlay from "../button/BuyNowOverlay";
import ProductImage from "../Images/ProductImage";
import CustomButton from "../button/CustomButton";
import { useNavigate } from "react-router-dom";

const ProductListCard = ({
  id,
  image,
  name,
  special_offer,
  price,
  category,
  brand,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
  };
  return (
    <div
      onClick={handleClick}
      
      className="h-auto flex flex-col justify-between relative border border-gray-200 rounded-lg shadow-sm w-[230px] p-3 duration-300 transform hover:-translate-y-1 group bg-white"
    >
      {special_offer !== "None" && (
        <div className="bg-red-500 text-[10px] z-10 absolute top-0 right-0 p-1 m-1 font-bold text-white rounded">
          {special_offer}
        </div>
      )}

      <div className="relative mb-2">
        <ProductImage
          src={image}
          className="w-full h-[160px] rounded object-contain"
          alt={name}
        />
        {/* <BuyNowOverlay /> */}
      </div>

      <div className="flex justify-between font-semibold mt-1 text-sm text-gray-800">
        <div className="w-[110px] truncate">{name}</div>
        <div className="text-gray-900 font-bold">${price}.00</div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between font-medium mt-1 text-[11px] text-gray-500">
        <div>
          Category: <span className="text-gray-700">{category}</span>
        </div>
        <div>
          Brand: <span className="text-gray-700">{brand}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <CustomButton color="blue" className="sm:w-1/2 w-full h-[28px] text-xs">
          Add to Cart
        </CustomButton>
        <CustomButton color="blue" className="sm:w-1/2 w-full h-[28px] text-xs">
          Buy Now
        </CustomButton>
      </div>
    </div>
  );
};

export default ProductListCard;
