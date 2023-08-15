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
    bgColor: "linear-gradient(to right, #536976, #292e49)",
    btnColor: "#435B66",
    headerColor: "#FCECDD",
    plainTextColor: "#F7F6E7",
    darkColor: "#2C2E43",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentTheme(currentTheme as themeInterface));
  }, [currentTheme]);

  return { currentTheme, setLocalCurrentTheme };
};

export default useTheme;
