import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    type: null,
    message: '',
}
const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setMessage: (state, action) => { }
    }
})
export const { setMessage } = toastSlice.actions
export default toastSlice.reducer