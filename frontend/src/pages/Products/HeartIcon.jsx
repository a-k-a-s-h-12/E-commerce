import React, { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorites = favorites.some((p) => p._id === product._id);
  // useEffect(() => {
  //   const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
  //   dispatch(addToFavorites(favoritesFromLocalStorage));
  // }, []);
  const toggleFavorites = () => {
    if (isFavorites) {
      dispatch(removeFromFavorites(product)); //slice
      removeFavoriteFromLocalStorage(product._id); //loaclstorage
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };
  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorites ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;
