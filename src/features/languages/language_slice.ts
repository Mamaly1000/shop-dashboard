import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface languageType {
  currentLanguage: "en" | "fa";
}

const initialState: languageType = {
  currentLanguage: "en",
};
const LanguageReducer = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});
export const { setLanguage } = LanguageReducer.actions;
export default LanguageReducer.reducer;
export const selectLanguage = (state: RootState) => {
  return state.language;
};
