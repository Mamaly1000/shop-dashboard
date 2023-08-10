import { downIcon, zoominIcon, zoomoutIcon } from "../../assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  filtersType,
  resetProductsFilters,
  selectProducts,
  setHideCols,
  setRemoveSelectedFilter,
  setSelectedProductsFilters,
  singleFilterType,
} from "../../features/products/products_slice";
import { useContextFunction } from "../../context/ContextProvider";
import { IsSelected } from "../dropdown-component/DropDown";
import { motion } from "framer-motion";

export const isHidden = (
  item: {
    name: string;
    type: filtersType;
  },
  data: singleFilterType[],
  type: "boolean" | "string"
): string | boolean => {
  const check = data.findIndex((f) => f.type === item.type);
  if (check < 0) {
    return type === "string" ? "" : false;
  } else {
    return type === "boolean" ? true : "hide-yourself";
  }
};

const THcomponent = ({
  data,
  index,
}: {
  data: {
    name: string;
    type: filtersType;
  };
  index: number;
}) => {
  const dispatch = useDispatch();
  const contextData = useContextFunction();
  const { hiddenCols, filters } = useSelector(selectProducts);
  return (
    <th
      className={`${data.type} ${isHidden(data, hiddenCols, "string")}`}
      key={index}
    >
      {!isHidden(data, hiddenCols, "boolean") && data.name}
      {!isHidden(data, hiddenCols, "boolean") && (
        <motion.img
          src={downIcon}
          onClick={() => {
            if (IsSelected(data, filters).type === data.type) {
              if (IsSelected(data, filters).mode === "ASC") {
                dispatch(
                  setSelectedProductsFilters({
                    mode: "DESC",
                    type: data.type,
                    products: contextData!.fakeProducts,
                  } as singleFilterType)
                );
                dispatch(filterProducts());
              } else if (IsSelected(data, filters).mode === "DESC") {
                dispatch(
                  setRemoveSelectedFilter({
                    type: data.type,
                    products: contextData!.fakeProducts,
                  })
                );
                dispatch(resetProductsFilters(contextData!.fakeProducts));
              }
            } else {
              dispatch(
                setSelectedProductsFilters({
                  mode: "ASC",
                  type: data.type,
                  products: contextData!.fakeProducts,
                } as singleFilterType)
              );
              dispatch(filterProducts());
            }
          }}
          animate={{
            rotate:
              IsSelected(data, filters).mode === "DESC" &&
              IsSelected(data, filters).type === data.type
                ? 180
                : 0,
          }}
          transition={{ duration: 0.1, type: "spring" }}
        />
      )}
      {!isHidden(data, hiddenCols, "boolean") ? (
        <img
          src={zoominIcon}
          onClick={() => {
            dispatch(
              setRemoveSelectedFilter({
                type: data.type,
                products: contextData!.fakeProducts,
              })
            );
            dispatch(resetProductsFilters(contextData!.fakeProducts));
            dispatch(
              setHideCols({ mode: "ASC", type: data.type } as singleFilterType)
            );
          }}
        />
      ) : (
        <img
          src={zoomoutIcon}
          onClick={() => {
            dispatch(
              setHideCols({ mode: "ASC", type: data.type } as singleFilterType)
            );
          }}
        />
      )}
    </th>
  );
};

export default THcomponent;
