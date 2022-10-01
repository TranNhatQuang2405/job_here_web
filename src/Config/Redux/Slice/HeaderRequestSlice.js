import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

const loadData = () => {
  var headerStorage = localStorage.getItem("header");
  headerStorage = headerStorage ? JSON.parse(headerStorage) : {};
  var lang = headerStorage["Accept-Language"];
  if (lang === "vi") {
    i18n.changeLanguage("vn");
  } else {
    i18n.changeLanguage("en");
    headerStorage["Accept-Language"] = "en";
  }
  localStorage.setItem("header", JSON.stringify({ ...headerStorage }));

  return headerStorage;
};

const initialState = {
  headers: { ...loadData() },
};

export const HeaderRequestSlice = createSlice({
  name: "HeaderRequest",
  initialState,
  reducers: {
    changeAcceptLanguage: (state, action) => {
      state.headers = { ...state.headers, "Accept-Language": action.payload };
    },
    changeToken: (state, action) => {
      state.headers["Authorization"] = "Bearer " + action.payload;
      localStorage.setItem("header", JSON.stringify({ ...state.headers }));
    },
  },
});

export const { changeAcceptLanguage, changeToken } = HeaderRequestSlice.actions;

export default HeaderRequestSlice.reducer;
