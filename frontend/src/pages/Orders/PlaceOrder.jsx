import React, { useEffect } from "react";
import ProgressSteps from "../../components/ProgressSteps";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart?.paymentMethod, cart?.shippingAddress?.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err.data?.message || err.message || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto pt-10">
      <ProgressSteps step1 step2 step3 />
      <h2 className="font-semibold text-2xl mt-8">Items</h2>
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse ">
              <thead>
                <tr className="">
                  <td>Image</td>
                  <td>Product</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="pb-4 pt-3">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="pt-3 pb-4">
                      <Link to={`/product/${item?._id}`}>{item.name}</Link>
                    </td>
                    <td className="pt-3 pb-4">{item?.qty}</td>
                    <td className="pt-3 pb-4">{item?.price}</td>
                    <td className="pt-3 pb-4">
                      Rs {(item?.qty * item?.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {cart.cartItems.length === 0 ? (
          ""
        ) : (
          <div className="mt-8">
            <h2 className="font-semibold mb-5 text-2xl">Order Summary</h2>
            <div className="flex justify-between flex-wrap p-8 bg-[#181818]">
              <ul className="text-lg w-[20rem]">
                <li className=" flex justify-between">
                  <span className="font-semibold mb-4">Items:</span>{" "}
                  <span>Rs {cart.itemsPrice}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold mb-4">Shipping:</span>{" "}
                  <span>Rs {cart.shippingPrice}</span>
                </li>
                <li className=" flex justify-between">
                  <span className="font-semibold mb-4">Tax:</span>{" "}
                  <span>Rs {cart.taxPrice}</span>
                </li>
                <li className="  flex justify-between">
                  <span className="font-semibold mb-4">Total:</span>{" "}
                  <span>Rs {cart.totalPrice}</span>
                </li>
              </ul>
              {error && (
                <Message variant="danger">
                  {error.data?.message || error.message}
                </Message>
              )}

              <div>
                <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                <p>
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <strong>Method:</strong> {cart.paymentMethod.paymentMethod}
              </div>

              <button
                type="button"
                className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
              {isLoading && <Loader />}
            </div>
          </div>  
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
