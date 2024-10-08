import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";

export const signup=createAsyncThunk("signup",async(obj)=>{
    var res=await axios.post("https://wingos-server.vercel.app/signup",obj)
    return res.data
})


export const signin=createAsyncThunk("signin",async(obj)=>{
    var res=await axios.post("https://wingos-server.vercel.app/signin",obj)
    return res.data
})

export const Logged=createAsyncThunk("logged",async(token)=>{
    var res=await axios.get("https://wingos-server.vercel.app/",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res.data
})

export const forgetEmail=createAsyncThunk("forget",async(email)=>{
    var res=await axios.post("https://wingos-server.vercel.app/sendmail",email)
    return res.data
})

export const changePassword=createAsyncThunk("Passwords",async({obj,token})=>{
    var res=await axios.post("https://wingos-server.vercel.app/changePassword",obj,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res.data
})


const userSlice=createSlice({
    name:"user",
    initialState:{
        notification:{},
        cartMsg:{},
        client:{},
        cartBtnMsg:{}
    },
    reducers:{
        emptyNotification:(state,action)=>{
            state.notification={}
        },
        emptyCartMsg:(state,action)=>{
            state.cartMsg={}
            state.cartBtnMsg={}
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(signup.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(signin.fulfilled,(state,action)=>{
            state.notification=action.payload
            if(action.payload.data){
                state.client=action.payload.data.user
                localStorage.setItem("token",action.payload.data.token)
                localStorage.setItem("user",JSON.stringify(action.payload.data.user))
            }
        })
        .addCase(Logged.fulfilled,(state,action)=>{
            console.log(action.payload)
            // state.cartMsg=action.payload
            state.cartBtnMsg=action.payload
        })
        .addCase(changePassword.fulfilled,(state,action)=>{
            state.notification=action.payload
        })
        .addCase(forgetEmail.fulfilled,(state,action)=>{
            console.log(action.payload)
        })
    }
})
export const {emptyNotification,emptyCartMsg}=userSlice.actions
export default userSlice.reducer