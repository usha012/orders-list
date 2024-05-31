import {createSlice} from "@reduxjs/toolkit"
const orderSlice = createSlice({
    name :'orders',
    initialState:[],
    reducers:{
        addOrder:(state, action)=>{
            const order = action.payload
            return [ order, ...state]

        }
    }

})
export const {addOrder} = orderSlice.actions
export default orderSlice