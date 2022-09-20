import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  page: 1,
};

export const CurrentPageSlice = createSlice({
  name: "CurrentPage",
  initialState,
  reducers: {
    change: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { change } = CurrentPageSlice.actions;

export default CurrentPageSlice.reducer;
