import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orders = createAsyncThunk("order", async (ordersObj) => {
    const res=await axios.post("http://localhost:4000/orders",ordersObj)
    return res.data
})


const addtocartSlice = createSlice({
    name: "slice",
    initialState: {
        cartArray: [],
        category:"super star flavours",
        pizzaHourTop:0,
        starFlavourTop:0,
        plattersTop:0,
        classicFlavoursTop:0,
        crownPizzaTop:0,
        burgersTop:0,
        newBurgersTop:0,
        wingsTop:0,
        friedChickenTop:0,
        dipsTop:0,
    },
    reducers: {
        addtocart: (state, action) => {
            console.log(action.payload, "action cart payload")
            state.cartArray.push(action.payload)
        },
        decrement: (state, action) => {
            state.cartArray = state.cartArray.map((e, i) => {
                if (e.name === action.payload) {
                    if (e.quantity === 1) {
                        return ({ ...e, quantity: 1 })
                    } else {
                        return ({ ...e, quantity: e.quantity - 1 })
                    }
                } else {
                    return e
                }
            })
        },
        increment: (state, action) => {
            state.cartArray = state.cartArray.map((e, i) => {
                if (e.name === action.payload) {
                    return ({ ...e, quantity: e.quantity + 1 })
                } else {
                    return e
                }
            })
        },
        clearCart: (state, action) => {
            state.cartArray = []
        },
        hourPizza:(state,action)=>{
            state.pizzaHourTop=action.payload
        },
        starflavour:(state,action)=>{
            state.starFlavourTop=action.payload
        },
        platterShawarma:(state,action)=>{
            state.plattersTop=action.payload
        },
        classicFlavours:(state,action)=>{
            state.classicFlavoursTop=action.payload
        },
        crownPizza:(state,action)=>{
            state.crownPizzaTop=action.payload
        },
        burgersDispatch:(state,action)=>{
            state.burgersTop=action.payload
        },
        newBurgersDispatch:(state,action)=>{
            state.newBurgersTop=action.payload
        },
        specialPasta:(state,action)=>{
            state.specialPastaTop=action.payload
        },
        wingsDispatch:(state,action)=>{
            state.wingsTop=action.payload
        },
        friedChicken:(state,action)=>{
            state.friedChickenTop=action.payload
        },
        dipsDispatch:(state,action)=>{
            state.dipsTop=action.payload
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(orders.fulfilled,(state,action)=>{
        })
    }
})

export const { addtocart, decrement, increment, clearCart,hourPizza,starflavour,platterShawarma,classicFlavours,crownPizza,burgersDispatch,newBurgersDispatch,specialPasta,wingsDispatch,friedChicken,dipsDispatch } = addtocartSlice.actions
export default addtocartSlice.reducer