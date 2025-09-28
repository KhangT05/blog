import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'

import toastReducer from './slice/toastSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer
    }
})
export default store