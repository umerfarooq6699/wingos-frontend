import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productObj=createAsyncThunk("product",async(obj)=>{
    var res=await axios.post("http://localhost:4000/addProduct",obj)
    return res.data
})

export const getProducts=createAsyncThunk("getProducts",async()=>{
    var res=await axios.get("http://localhost:4000/getProduct")
    return res.data
})


export const getUsers=createAsyncThunk("getUsers",async()=>{
    var res=await axios.get("http://localhost:4000/getUser")
    return res.data
})  

export const getOrders=createAsyncThunk("orders",async()=>{
    var res=await axios.get("http://localhost:4000/getallOrders")
    return res.data
})


export const getDashboardData=createAsyncThunk("dashboardData",async()=>{
    var res=await axios.get("http://localhost:4000/getDashboardData")
    return res.data
})

export const dashboardDeleteProduct=createAsyncThunk("deleteProduct",async(obj)=>{
    var res=await axios.post("http://localhost:4000/deleteDashboardProduct",obj)
    return res.data
})

export const getsingleproduct=createAsyncThunk("getsingleproduct",async(id)=>{
    var res=await axios.post("http://localhost:4000/getsingleproduct",{id})
    return res.data
})


export const updatedProduct=createAsyncThunk("updatedProduct",async(obj)=>{
    var res=await axios.post("http://localhost:4000/updatedProduct",obj)
    return res.data
})

export const deleteUser=createAsyncThunk("deleteUser",async(id)=>{
    var res=await axios.post("http://localhost:4000/deleteUser",{id})
    return res.data
})


export const removeOrder=createAsyncThunk("removeOrder",async(id)=>{
    var res=await axios.delete(`http://localhost:4000/DeleteOrder/${id}`)
    return res.data
})


const adminSlice=createSlice({
    name:"admin",
    initialState:{
        notification:{},
        index:0,
        loading:false,
    },
    reducers:{
        dashboardPage:(state,action)=>{
            state.index=action.payload
        },
        productPage:(state,action)=>{
            state.index=action.payload
        },
        userPage:(state,action)=>{
            state.index=action.payload
        },
        orderPage:(state,action)=>{
            state.index=action.payload
        },
        dashboardNotificationEmpty:(state,action)=>{
            state.notification={}
        }
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(productObj.fulfilled,(state,action)=>{

        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.notification=action.payload
            state.loading=false
        })
        .addCase(getProducts.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(getDashboardData.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(dashboardDeleteProduct.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(getsingleproduct.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(updatedProduct.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(removeOrder.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
    }
})

export const {dashboardPage,productPage,userPage,orderPage,dashboardNotificationEmpty}=adminSlice.actions
export default adminSlice.reducer