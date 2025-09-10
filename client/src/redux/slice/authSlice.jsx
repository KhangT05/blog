import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isAuthenticated: false,
    user: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            if (action.payload && action.payload.user) {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            } else {
                state.isAuthenticated = true;
            }
        },
        setLogout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    }
})
export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;