import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import adminSlice from "./Slices/adminSlice";
import addtocartSlice from "./Slices/addtocartSlice";

const Store=configureStore({
    reducer:{
        User:userSlice,
        Dashboard:adminSlice,
        Cart:addtocartSlice
    }
})

export default Store