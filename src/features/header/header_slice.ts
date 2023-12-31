import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export type TABS_TYPE = "profile" | "setting" | "chat" | "info" | "";
export type DashboardSectionTypes =
  | ""
  | "Purchase management"
  | "Financial Management"
  | "wallet"
  | "Friends"
  | "calculator"
  | "Monitoring";

export interface themeInterface {
  bgColor: string;
  btnColor: string;
  plainTextColor: string;
  headerColor: string;
  darkColor: string;
}

interface initType {
  currentTab: TABS_TYPE;
  displayDashboardSection: DashboardSectionTypes;
  displaySideBar: boolean;
  currentTheme: themeInterface;
}

const initialState: initType = {
  currentTab: "",
  displaySideBar: false,
  displayDashboardSection: "Purchase management",
  currentTheme: {
    bgColor: "linear-gradient(to right, #536976, #292e49)",
    btnColor: "#435B66",
    headerColor: "#FCECDD",
    plainTextColor: "#F7F6E7",
    darkColor: "#2C2E43",
  },
};
const HeaderReducer = createSlice({
  name: "header",
  initialState: initialState,
  reducers: {
    setHeaderTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setDisplaySideBar: (state, action) => {
      state.displaySideBar = action.payload;
    },
    setDasboardSection: (state, action) => {
      state.displayDashboardSection = action.payload;
    },
    setCurrentTheme: (state, action) => {
      state.currentTheme = {
        bgColor: action.payload.bgColor,
        btnColor: action.payload.btnColor,
        darkColor: action.payload.darkColor,
        headerColor: action.payload.headerColor,
        plainTextColor: action.payload.plainTextColor,
      };
    },
  },
});
export const {
  setHeaderTab,
  setDisplaySideBar,
  setDasboardSection,
  setCurrentTheme,
} = HeaderReducer.actions;
export default HeaderReducer.reducer;
export const selectHeader = (state: RootState) => {
  return state.header;
};
