// import configureStore from '@reduxjs/toolkit'
import {configureStore, combineReducers } from '@reduxjs/toolkit'
// import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './userSlice';
import productsSlice from './productsSlice';
import orderSlice from './orderSlice';
import customerSlice from './customerSlice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    products: productsSlice.reducer,
    orders: orderSlice.reducer,
    customer: customerSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
  }
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore ({
    reducer:persistedReducer
})

const persistor = persistStore(store);

export { store, persistor };