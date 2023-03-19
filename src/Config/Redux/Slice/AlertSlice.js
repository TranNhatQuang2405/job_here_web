import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    alertData: {
        show: false,
        message: "",
        title: "",
        httpCode: 200,
        onHide: () => { }
    }
}

export const AlertSlice = createSlice({
    name: "AlertSlice",
    initialState,
    reducers: {
        changeContentAlert: (state, action) => {
            state.alertData = { ...state.alertData, ...action.payload };
        },
        custom: (state, action) => {
            state.alertData = {
                ...state.alertData,
                show: true,
                onHide: action.payload.onHide || (() => { }),
                ...action.payload
            }
        },
        warning: (state, action) => {
            state.alertData = {
                ...state.alertData,
                httpCode: 401,
                show: true,
                onHide: action.payload.onHide || (() => { }),
                ...action.payload
            }
        },
        error: (state, action) => {
            state.alertData = {
                ...state.alertData,
                httpCode: 400,
                show: true,
                onHide: action.payload.onHide || (() => { }),
                ...action.payload
            }
        },
        success: (state, action) => {
            state.alertData = {
                ...state.alertData,
                httpCode: 200,
                show: true,
                onHide: action.payload.onHide || (() => { }),
                ...action.payload
            }
        },
        clearContentAlert: (state, action) => {
            state.alertData = {
                show: false,
                message: "",
                title: "",
                httpCode: 200,
                onHide: () => { }
            }
        },
    },
});

export const { changeContentAlert, custom, warning, error, success, clearContentAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
