import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    listSkill: [],
    listIndustry: [],
    listUnit: [],
    listCity: []
};

export const GetAllData = createAsyncThunk("Unit/getAllData", async () => {
    // let prepare = [];
    // prepare.push(dropdownBusiness.IndustryDropdown());
    // prepare.push(dropdownBusiness.AllSkillDropdown());
    // prepare.push(dropdownBusiness.UnitDropdown());
    // prepare.push(dropdownBusiness.CityDropdown())
    // let result = await Promise.all(prepare);
    // if (result && result.length > 0)
    //     return result.map(x => (x?.data?.objectData || []))
    return []
});

export const MasterDataSlice = createSlice({
    name: "MasterData",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(GetAllData.fulfilled, (state, action) => {
            state.listIndustry = action.payload[0]
            state.listSkill = action.payload[1]
            state.listUnit = action.payload[2]
            state.listCity = action.payload[3]
        });
    },
});
export default MasterDataSlice.reducer;
