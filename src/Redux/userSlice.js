import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name :'user',
    initialState: {},
    reducers:{
        addUser:(state, action)=>{
            const user = action.payload
            return user

        },
        removeUser: (state, action) => ({})
    }

})
export const {addUser, removeUser} = userSlice.actions
export default userSlice