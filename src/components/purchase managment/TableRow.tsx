import { fakeProductInterface } from "../../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../features/languages/language_slice";
import FormatHelper from "../../utils/formatHelper";
import moment from "moment";
import jmoment from "moment-jalaali";
import { isHidden } from "./THcomponent";
import {
  selectProducts,
  setEditProduct,
} from "../../features/products/products_slice";
import { useNavigate } from "react-router-dom";

const TableRow = ({ product }: { product: fakeProductInterface }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const languageSelector = useSelector(selectLanguage);
  const { hiddenCols } = useSelector(selectProducts);
  const lang = languageSelector.currentLanguage;
  return (
    <tr
      onClick={() => {
        dispatch(setEditProduct(product));
        nav("/edit-product");
      }}
    >
      <td
        className={`td_number ${isHidden(
          { name: product.name, type: "td_number" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_number" },
          hiddenCols,
          "boolean"
        ) &&
          (lang === "en"
            ? product.id
            : FormatHelper.toPersianString(String(product.id)))}
      </td>
      <td
        className={`td_name ${isHidden(
          { name: product.name, type: "td_name" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_name" },
          hiddenCols,
          "boolean"
        ) &&
          (lang === "en"
            ? product.name
            : FormatHelper.toPersianString(product.persianName))}
      </td>
      <td
        className={`td_price ${isHidden(
          { name: product.name, type: "td_price" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_price" },
          hiddenCols,
          "boolean"
        ) &&
          (lang === "en"
            ? "$" + product.price
            : "$" + FormatHelper.toPersianString(String(product.price)))}
      </td>
      <td
        className={`td_add ${isHidden(
          { name: product.name, type: "td_add" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_add" },
          hiddenCols,
          "boolean"
        ) &&
          (lang === "en"
            ? moment(product.addedDate).format("YYYY/MMM/DD")
            : FormatHelper.toPersianString(
                jmoment(product.addedDate).format("jYYYY/jMMM/jDD")
              ))}
      </td>
      <td
        className={`td_buyer ${isHidden(
          { name: product.name, type: "td_buyer" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_buyer" },
          hiddenCols,
          "boolean"
        ) && product.buyer}
      </td>
      <td
        className={`td_category ${isHidden(
          { name: product.name, type: "td_category" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_category" },
          hiddenCols,
          "boolean"
        ) && (lang === "en" ? product?.category?.en : product.category?.fa)}
      </td>
      <td
        className={`td_company ${isHidden(
          { name: product.name, type: "td_company" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_company" },
          hiddenCols,
          "boolean"
        ) && product.company}
      </td>
      <td
        className={`td_desc ${isHidden(
          { name: product.name, type: "td_desc" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_desc" },
          hiddenCols,
          "boolean"
        ) &&
          (lang === "en" ? product.description : product.persiandesc).slice(
            0,
            20
          ) + " ..."}
      </td>
      <td
        className={`td_exdate ${isHidden(
          { name: product.name, type: "td_exdate" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_exdate" },
          hiddenCols,
          "boolean"
        ) &&
          (lang === "en"
            ? moment(product.expireDate).format("YYYY/MMM/DD")
            : FormatHelper.toPersianString(
                jmoment(product.expireDate).format("jYYYY/jMMM/jDD")
              ))}
      </td>
      <td
        className={`td_total ${isHidden(
          { name: product.name, type: "td_total" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_total" },
          hiddenCols,
          "boolean"
        ) &&
          (lang === "en"
            ? product.totalSupply.toLocaleString()
            : FormatHelper.toPersianString(
                product.totalSupply.toLocaleString()
              ))}
      </td>
      <td
        className={`td_active ${isHidden(
          { name: product.name, type: "td_active" },
          hiddenCols,
          "string"
        )}`}
      >
        {!isHidden(
          { name: product.name, type: "td_active" },
          hiddenCols,
          "boolean"
        ) &&
          (product.isActive ? (
            <span className={`green `}></span>
          ) : (
            <span className={`red `}></span>
          ))}
      </td>
    </tr>
  );
};

export default TableRow;
