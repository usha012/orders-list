import {createSlice} from "@reduxjs/toolkit"
const orderSlice = createSlice({
    name :'orders',
    initialState:[],
    reducers:{
        addOrder:(state, action)=>{
            const order = action.payload
            return [ order, ...state]

        },
        editSaleOrder: (state, action)=>{
            const order = action.payload
            const orderIndex = state.findIndex(el => el?._id === order?._id)
            const updatedOrders = [
                ...state.slice(0, orderIndex),
                order,
                ...state.slice(orderIndex + 1)
            ]
            return updatedOrders
        }
    }

})
export const {addOrder, editSaleOrder} = orderSlice.actions
export default orderSlice