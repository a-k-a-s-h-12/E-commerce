import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInformation: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.userInformation = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      //In Local Storage only strings can be stored--> JSON.stringify()
      const expireTime = new Date().getTime + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expireTime", expireTime);
    },
    logout: (state) => {
      state.userInformation = null;
      localStorage.clear();
    }
  },
});
export const { setInfo, logout } = authSlice.actions;
export default authSlice.reducer;