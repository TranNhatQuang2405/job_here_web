import { configureStore } from "@reduxjs/toolkit";
import CurrentPageSlice from "./Slice/CurrentPageSlice";

export const store = configureStore({
  reducer: {
    CurrentPage: CurrentPageSlice,
  },
});
