import { createSlice } from "@reduxjs/toolkit";

const waiterCallSlice=createSlice({
    name:"waiterCall",
    initialState:{
        callwaiter:null,
        callwaiterLoading:false,
        callwaiterError:null
    },
    reducers:{
        setcallWaiter:(state,action)=>{
            state.callwaiter=action.payload
        },
        setcallWaiterLoading:(state,action)=>{
            state.callwaiterLoading=action.payload
        },
        setcallWaiterError:(state,action)=>{
            state.callwaiterError=action.payload
        },
    }
})
export const {setcallWaiter,setcallWaiterLoading,setcallWaiterError}=waiterCallSlice.actions
export default waiterCallSlice.reducer