import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobBusiness } from "Business";

const initialState = {
  listSavedJob: [],
};

export const GetAllSavedJob = createAsyncThunk("SavedJob/getall", async () => {
  return await jobBusiness.GetAllSavedJobId();
});

export const SavedJobSlice = createSlice({
  name: "SavedJob",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAllSavedJob.fulfilled, (state, action) => {
      state.listSavedJob = action.payload?.data?.objectData?.map((item) => item.jobId);
    });
  },
});

export default SavedJobSlice.reducer;
