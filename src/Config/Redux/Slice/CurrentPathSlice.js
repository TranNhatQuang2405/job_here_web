import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    path: "/",
    isGoToLogin: false
};

export const CurrentPathSlice = createSlice({
    name: "CurrentPath",
    initialState,
    reducers: {
        changeCurrentPath: (state, action) => {
            state.path = action.payload
            state.isGoToLogin = true
        },
        finishLogin: (state, action) => {
            state.path = "/"
            state.isGoToLogin = false
        },
        finishNavigate: (state, action) => {
            state.isGoToLogin = false
        },
    },
});

export const { changeCurrentPath, finishLogin, finishNavigate } = CurrentPathSlice.actions;

export default CurrentPathSlice.reducer;
