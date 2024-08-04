import "./Navigation.css";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInformation } = useSelector((store) => store.auth);
  const favorites = useSelector((state) => state.favorites);
  const favoritesCount = favorites.length;
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  const [showSlideBar, setShowSideBar] = useState(false);
  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSideBar = () => {
    setShowSideBar(!showSlideBar);
  };
  const closeSideBar = () => {
    setShowSideBar(false);
  };
  const [logoutApiCall] = useLogoutMutation(); //goes to logout in usersApiSlice.js ---->backend api call ('api/user/logout') -> logoutUser function will be called
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout()); // localstorage clear and userInformation null
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSlideBar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center gap-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          {cartItems.length > 0 && (
            <div className="absolute top-9 left-0 px-2 text-[12px] bg-pink-500 rounded-full">
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </div>
          )}  
          <span className="hidden nav-item-name mt-[3rem]">CART</span>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem] relative " size={26} />
          {favoritesCount > 0 && (
            <div className="absolute left-3 top-9 text-sm px-[0.5rem] bg-pink-500 rounded-full text-[12px]">
              {favoritesCount}
            </div>
          )}

          <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropDown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInformation ? (
            <span className="text-white">{userInformation?.user?.userName}</span>
          ) : (
            <></>
          )}
          {userInformation && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInformation && (
          <ul
            className={`absolute right-0 mt-2  mr-14 space-y-2 bg-gray-600 text-white ${
              !userInformation?.user?.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {/* Only  for Admin */}
            {userInformation?.user?.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/category"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            {/* ForNormal People */}
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 hover:text-black"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {userInformation ? (
        ""
      ) : (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">RESGISTER</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
  