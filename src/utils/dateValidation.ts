import moment from "moment";

export const dateValidation = (
  date: string,
  exDate: string,
  lang: string
): boolean => {
  let result = true;
  if (lang === "fa") {
    if (
      new Date(
        moment(date, "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD")
      ).getTime() >=
      new Date(
        moment(exDate, "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD")
      ).getTime()
    ) {
      result = false;
    }
  }
  if (lang === "en") {
    if (new Date(date).getTime() >= new Date(exDate).getTime()) {
      result = false;
    }
  }
  return result;
};
