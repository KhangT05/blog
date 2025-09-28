import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    type: null,
    message: ''
}
const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.message = action.payload.message
            state.type = true
        },
        clearToast: (state) => {
            state.type = false,
                state.message = ''
        }
    }
})
export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;