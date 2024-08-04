import React from "react";
import Header from "../components/Header";
import { useGetProductsQuery } from "../redux/api/productsApiSlice";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import Product from "./Products/Product";
import { Link } from "react-router-dom";
const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : (
          <>
            {/* special products */}
          <div className="flex justify-between items-center">
            <h1 className="ml-[14rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data?.products.map((p) => (
                <div key={p._id}>
                  <Product product={p} />
                </div>
                
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
