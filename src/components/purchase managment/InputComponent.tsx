import React, { useState } from "react";
import {
  filtersType,
  selectProducts,
  setAddProductsSearch,
  setRemoveProductsSearch,
} from "../../features/products/products_slice";
import { closeIcon, filterIcon } from "../../assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";
import { isHidden } from "./THcomponent";
import { useContextFunction } from "../../context/ContextProvider";
import { IsSearchSelected } from "./Searchtr";
import { useEffect } from "react";

const InputComponent = ({
  type,
  className,
  input_type,
}: {
  type: filtersType;
  className: string;
  input_type: React.HTMLInputTypeAttribute;
}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>("");
  const { hiddenCols, searches } = useSelector(selectProducts);
  const contextData = useContextFunction();
  const { currentTheme } = useSelector(selectHeader);

  useEffect(() => {
    if (!IsSearchSelected(type, searches)) {
      setText("");
    }
  }, [searches]);

  return (
    <td
      style={{ background: currentTheme.btnColor }}
      className={`${className}`}
    >
      {!isHidden({ name: "fhfgh", type: type }, hiddenCols, "boolean") && (
        <input
          type={input_type}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      )}
      {!isHidden({ name: "fhfgh", type: type }, hiddenCols, "boolean") && (
        <div className="btn-container">
          <button
            onClick={() => {
              if (text.length > 0) {
                dispatch(
                  setAddProductsSearch({
                    type: type,
                    value: text,
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
            onClick={() => {
              setText("");
              dispatch(
                setRemoveProductsSearch({
                  type: type,
                  products: contextData!.fakeProducts,
                })
              );
            }}
            style={{ background: "red" }}
          >
            <img src={closeIcon} />
          </button>
        </div>
      )}
    </td>
  );
};

export default InputComponent;
