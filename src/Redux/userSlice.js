import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name :'user',
    initialState:[],
    reducers:{
        addUser:(state, action)=>{
            const user = action.payload
            return user

        }
    }

})
export const {addUser} = userSlice.actions
export default userSlice