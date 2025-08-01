import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import toastSlice from './slice/toastSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})
export default store