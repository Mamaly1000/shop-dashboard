import { useSelector } from "react-redux";
import { selectLanguage } from "../../features/languages/language_slice";
import {
  filtersType,
  selectProducts,
  singleSearchType,
} from "../../features/products/products_slice";
import { isHidden } from "./THcomponent";
import InputComponent from "./InputComponent";
import CalendarInputComponent from "./CalendarInputComponent";
export const IsSearchSelected = (
  type: filtersType,
  data: singleSearchType[]
): boolean => {
  const check = data.findIndex((s) => s.type === type);
  if (check < 0) {
    return false;
  } else {
    return true;
  }
};
const Searchtr = () => {
  const { currentLanguage: _lang } = useSelector(selectLanguage);
  const { hiddenCols } = useSelector(selectProducts);
  return (
    <tr className="search-tr">
      <InputComponent
        className={`td_number ${isHidden(
          { name: "", type: "td_number" },
          hiddenCols,
          "string"
        )}`}
        type="td_number"
        input_type="number"
      />
      <InputComponent
        className={`td_name ${isHidden(
          { name: "", type: "td_name" },
          hiddenCols,
          "string"
        )}`}
        type="td_name"
        input_type="text"
      />
      <InputComponent
        className={`td_price ${isHidden(
          { name: "", type: "td_price" },
          hiddenCols,
          "string"
        )}`}
        type="td_price"
        input_type="number"
      />
      <CalendarInputComponent
        className={`td_add ${isHidden(
          { name: "", type: "td_add" },
          hiddenCols,
          "string"
        )}`}
        type="td_add"
      />
      <InputComponent
        className={`td_buyer ${isHidden(
          { name: "", type: "td_buyer" },
          hiddenCols,
          "string"
        )}`}
        type="td_buyer"
        input_type="text"
      />
      <InputComponent
        className={`td_category ${isHidden(
          { name: "", type: "td_category" },
          hiddenCols,
          "string"
        )}`}
        type="td_category"
        input_type="text"
      />
      <InputComponent
        className={`td_company ${isHidden(
          { name: "", type: "td_company" },
          hiddenCols,
          "string"
        )}`}
        type="td_company"
        input_type="text"
      />
      <InputComponent
        className={`td_desc ${isHidden(
          { name: "", type: "td_desc" },
          hiddenCols,
          "string"
        )}`}
        type="td_desc"
        input_type="text"
      />
      <CalendarInputComponent
        className={`td_exdate ${isHidden(
          { name: "", type: "td_exdate" },
          hiddenCols,
          "string"
        )}`}
        type="td_exdate"
      />
      <InputComponent
        className={`td_total ${isHidden(
          { name: "", type: "td_total" },
          hiddenCols,
          "string"
        )}`}
        type="td_total"
        input_type="number"
      />
      <td
        className={`td_active ${isHidden(
          { name: "", type: "td_active" },
          hiddenCols,
          "string"
        )}`}
      ></td>
    </tr>
  );
};

export default Searchtr;
