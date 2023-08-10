import useLocalStorage from "./useLocalStorage";

const useLanguage = () => {
  const [language, setLanguage] = useLocalStorage("language", {
    language: "en",
    dir: "ltr",
    font: "Condensed",
  });
  return { language, setLanguage };
};

export default useLanguage;
