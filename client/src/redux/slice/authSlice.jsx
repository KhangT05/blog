import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isAuthenticated: false,
    user: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;