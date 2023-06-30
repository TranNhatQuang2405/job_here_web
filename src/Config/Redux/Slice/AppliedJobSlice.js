import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobBusiness } from "Business";

const initialState = {
    listAppliedJob: [],
};

export const getAllAppliedJob = createAsyncThunk("AppliedJob/getall", async () => {
    return await jobBusiness.getAllAppliedJob();
});

export const AppliedJobSlice = createSlice({
    name: "AppliedJob",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAppliedJob.fulfilled, (state, action) => {
            state.listAppliedJob = action.payload?.data?.objectData;
        });
    },
});
// export const { } = AppliedJobSlice.actions;
export default AppliedJobSlice.reducer;
