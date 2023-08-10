import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useDispatch } from "react-redux";
import {
  setCurrentTheme,
  themeInterface,
} from "../features/header/header_slice";

const useTheme = () => {
  const [currentTheme, setLocalCurrentTheme] = useLocalStorage<{
    bgColor: string;
    btnColor: string;
    headerColor: string;
    plainTextColor: string;
    darkColor: string;
  }>("theme", {
    bgColor: "linear-gradient(to right, #6441a5, #2a0845)",
    btnColor: "#6528F7",
    headerColor: "#FFBDF7",
    plainTextColor: "#FFECEC",
    darkColor: "#3A1078",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentTheme(currentTheme as themeInterface));
  }, [currentTheme]);

  return { currentTheme, setLocalCurrentTheme };
};

export default useTheme;
