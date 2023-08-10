import { useState } from "react";

export default class FormatHelper {
  static toPersianString(str: string) {
    if (str !== "") {
      if (typeof str === "string") {
        return str
          ?.replace(/1/g, "۱")
          ?.replace(/2/g, "۲")
          ?.replace(/3/g, "۳")
          ?.replace(/4/g, "۴")
          ?.replace(/5/g, "۵")
          ?.replace(/6/g, "۶")
          ?.replace(/7/g, "۷")
          ?.replace(/8/g, "۸")
          ?.replace(/9/g, "۹")
          ?.replace(/0/g, "۰");
      } else {
        return (str as any)
          ?.toString()
          ?.replace(/1/g, "۱")
          ?.toString()
          ?.replace(/2/g, "۲")
          ?.toString()
          ?.replace(/3/g, "۳")
          ?.toString()
          ?.replace(/4/g, "۴")
          ?.toString()
          ?.replace(/5/g, "۵")
          ?.toString()
          ?.replace(/6/g, "۶")
          ?.toString()
          ?.replace(/7/g, "۷")
          ?.toString()
          ?.replace(/8/g, "۸")
          ?.toString()
          ?.replace(/9/g, "۹")
          ?.toString()
          ?.replace(/0/g, "۰");
      }
    } else return "";
  }
  static toEnglishString(str: string) {
    if (typeof str === "string") {
      return str
        ?.replace(/۱/g, "1")
        ?.replace(/۲/g, "2")
        ?.replace(/۳/g, "3")
        ?.replace(/۴/g, "4")
        ?.replace(/۵/g, "5")
        ?.replace(/۶/g, "6")
        ?.replace(/۷/g, "7")
        ?.replace(/۸/g, "8")
        ?.replace(/۹/g, "9")
        ?.replace(/۰/g, "0");
    } else {
      return (str as any)
        ?.toString()
        ?.replace(/۱/g, "1")
        ?.toString()
        ?.replace(/۲/g, "2")
        ?.toString()
        ?.replace(/۳/g, "3")
        ?.toString()
        ?.replace(/۴/g, "4")
        ?.toString()
        ?.replace(/۵/g, "5")
        ?.toString()
        ?.replace(/۶/g, "6")
        ?.toString()
        ?.replace(/۷/g, "7")
        ?.toString()
        ?.replace(/۸/g, "8")
        ?.toString()
        ?.replace(/۹/g, "9")
        ?.toString()
        ?.replace(/۰/g, "0");
    }
  }
}

export function digitSperator(value: any) {
  const str = value?.toString()?.split(".");
  if (str[0].length >= 4) {
    str[0] = str[0]?.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1]?.length >= 4) {
    str[1] = str[1]?.replace(/(\d{3})/g, "$1 ");
  }
  // return str.join(".").trim().replaceAll(" ", "");
  return str?.join(".")?.trim()?.split(" ")?.join("");
}
export function deleteCommaSperator(value: any) {
  // return value.toString().replaceAll(",", "");
  return value?.toString().split(",").join("");
}
export const FadeCompontent = (setData: any) => {
  const [value, setValue] = useState(false);
  if (value) {
    setTimeout(() => {
      setData(false);
      setValue(false);
    }, 200);
  }

  return { value, setValue };
};
