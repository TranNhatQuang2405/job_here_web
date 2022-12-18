import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sessionInfo: null,
  pending: false,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    changeSession: (state, action) => {
      state.sessionInfo = action.payload;
      state.pending = false;
    },
    LogOut: (state) => {
      state.sessionInfo = null;
      state.pending = false;
    },
    SetIsPending: (state) => {
      state.pending = true;
    },
    SetIsNotPending: (state) => {
      state.pending = false;
    },
  },
});

export const { changeSession, LogOut, SetIsPending, SetIsNotPending } = UserSlice.actions;

export default UserSlice.reducer;
