import { useState, useEffect } from "react";
import {
  filtersType,
  selectProducts,
  setAddProductsSearch,
  setRemoveProductsSearch,
} from "../../features/products/products_slice";
import FormatHelper from "../../utils/formatHelper";
import { closeIcon, filterIcon } from "../../assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "react-advance-jalaali-datepicker";
import { selectHeader } from "../../features/header/header_slice";
import "./../../calander.css";
import { selectLanguage } from "../../features/languages/language_slice";
import { isHidden } from "./THcomponent";
import { useContextFunction } from "../../context/ContextProvider";
import { IsSearchSelected } from "./Searchtr";
import jmoment from "moment-jalaali";
import moment from "moment-jalaali";
const CalendarInputComponent = ({
  className,
  type,
}: {
  className: string;
  type: filtersType;
}) => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector(selectHeader);
  const { currentLanguage: lang } = useSelector(selectLanguage);
  const { hiddenCols, searches } = useSelector(selectProducts);
  const contextData = useContextFunction();
  const [selectedDate, setSelectedDate] = useState("");
  const DatePickerInput = (props: any) => {
    return <input style={{ color: "#ffffff" }} {...props} />;
  };
  useEffect(() => {
    if (!IsSearchSelected(type, searches)) {
      setSelectedDate("");
    }
  }, [searches]);
  return (
    <td
      className={`${className}`}
      style={{ background: currentTheme.btnColor }}
    >
      {!isHidden({ name: "fhfgh", type: type }, hiddenCols, "boolean") &&
        (lang === "fa" ? (
          <DatePicker
            inputComponent={DatePickerInput}
            placeholder="روز / ماه / سال"
            format="jYYYY/jMM/jDD"
            controlValue={true}
            preSelected={FormatHelper.toPersianString(selectedDate)}
            onChange={(_unix: any, formatted: any) => {
              setSelectedDate(formatted);
            }}
            cancelOnBackgroundClick={true}
            customClass="calander"
          />
        ) : (
          <DatePicker
            inputComponent={DatePickerInput}
            placeholder="day / month / year"
            format="YYYY/MM/DD"
            controlValue={true}
            preSelected={selectedDate}
            onChange={(_unix: any, formatted: any) => {
              setSelectedDate(formatted);
            }}
            cancelOnBackgroundClick={true}
            customClass="calander"
          />
        ))}
      {!isHidden({ name: "", type: type }, hiddenCols, "boolean") && (
        <div className="btn-container">
          <button
            onClick={() => {
              if (selectedDate.length > 0) {
                dispatch(
                  setAddProductsSearch({
                    type: type,
                    value:
                      lang === "fa"
                        ? new Date(
                            moment(selectedDate, "jYYYY/jMM/jDD")
                              .locale("en")
                              .format("YYYY/MM/DD")
                          ).getTime()
                        : new Date(selectedDate).getTime(),
                    products: contextData!.fakeProducts,
                  })
                );
              }
            }}
            disabled={IsSearchSelected(type, searches)}
          >
            <img src={filterIcon} />
          </button>
          <button
            style={{ background: "red" }}
            onClick={() => {
              dispatch(
                setRemoveProductsSearch({
                  type: type,
                  products: contextData!.fakeProducts,
                })
              );
              setSelectedDate("");
            }}
          >
            <img src={closeIcon} />
          </button>
        </div>
      )}
    </td>
  );
};

export default CalendarInputComponent;
