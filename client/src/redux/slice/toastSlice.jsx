import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    type: null,
    message: '',
}
const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload.message,
            state.type = action.payload.type
        },
        clearMessage: (state, action) => {
            state.message = '',
            state.type = null
        }
    }
})
export const { setMessage,clearMessage } = toastSlice.actions
export default toastSlice.reducer