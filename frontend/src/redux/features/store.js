import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "./auth/authSlice";
import favoritesReducer from "../features/favorites/favoriteSlice.js";
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage.js";
import cartReducer from "./cart/cartSlice.js";
import shopReducer from "../features/shop/shopSlice.js";
const initialFavorites = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export default store;
