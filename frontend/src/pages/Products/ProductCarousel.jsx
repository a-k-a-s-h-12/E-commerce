import React from "react";
import { useGetTopProductsQuery } from "../../redux/api/productsApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

import Loader from "../../components/Loader";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <div className="mb-4 lg:block md:block xl:block pt-5">
      {isLoading ? <Loader/> : (
        <Slider
          {...settings}
          className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map((p) => (
            <div key={p._id}>
              <img
                src={p.image}
                alt={p.name}
                className="w-full rounded-lg object-cover h-[30rem]"
              />

              <div className="mt-4 flex justify-between">
                <div className="one">
                  <h2>{p.name}</h2>
                  <p>Rs.{p.price}</p> <br />
                  <p className="w-[25rem]">
                    {p.description.substring(0, 120)}...
                  </p>
                </div>
                <div className="flex justify-between w-[24rem] ">
                  <div className="one">
                    <h1 className="flex item-center mb-6">
                      <FaStore className="text-white mr-2" /> Brand : {p.brand}
                    </h1>
                    <h1 className="flex item-center mb-6">
                      <FaClock className="text-white mr-2" /> Added :{" "}
                      {moment(p.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex item-center mb-6">
                      <FaStar className="text-white mr-2" /> Reviews :{" "}
                      {p.numReviews}
                    </h1>
                  </div>
                  <div className="two">
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-white" /> Ratings:{" "}
                      {Math.round(p.rating)}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                      {p.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="mr-2 text-white" /> In Stock:{" "}
                      {p.countInStock}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
