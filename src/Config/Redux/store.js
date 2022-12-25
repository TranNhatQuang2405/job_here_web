import { configureStore } from "@reduxjs/toolkit";
import CurrentPageSlice from "./Slice/CurrentPageSlice";
import HeaderRequestSlice from "./Slice/HeaderRequestSlice";
import SavedJobSlice from "./Slice/SavedJobSlice";
import UserSlice from "./Slice/UserSlice";
import CurrentPathSlice from "./Slice/CurrentPathSlice";
import MasterDataSlice from "./Slice/MasterDataSlice";

export const store = configureStore({
  reducer: {
    CurrentPage: CurrentPageSlice,
    HeaderRequest: HeaderRequestSlice,
    SavedJob: SavedJobSlice,
    User: UserSlice,
    CurrentPath: CurrentPathSlice,
    MasterData: MasterDataSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
