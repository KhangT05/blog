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
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        setLogout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})
export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;