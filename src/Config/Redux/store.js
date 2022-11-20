import { configureStore } from "@reduxjs/toolkit";
import CurrentPageSlice from "./Slice/CurrentPageSlice";
import HeaderRequestSlice from "./Slice/HeaderRequestSlice";
import SavedJobSlice from "./Slice/SavedJobSlice";
import UserSlice from "./Slice/UserSlice";

export const store = configureStore({
  reducer: {
    CurrentPage: CurrentPageSlice,
    HeaderRequest: HeaderRequestSlice,
    SavedJob: SavedJobSlice,
    User: UserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
