import { useSelector } from "react-redux";
import { selectHeader } from "../../features/header/header_slice";
import { useTranslation } from "react-i18next";
import {
  filtersType,
  selectProducts,
} from "../../features/products/products_slice";
import TableRow from "./TableRow";
import THcomponent from "./THcomponent";
import Searchtr from "./Searchtr";
import { fakeProductInterface } from "../../context/ContextProvider";

const TableComponent = ({ data }: { data: fakeProductInterface[] }) => {
  const { t } = useTranslation();
  const {
    products,
    pagination: { offset },
  } = useSelector(selectProducts);
  const { currentTheme } = useSelector(selectHeader);
  const tableHeadContext: { name: string; type: filtersType }[] = t(
    "purchasing.table.heads",
    { returnObjects: true }
  );
  return (
    <div className="product-table-container">
      <table>
        <thead style={{ background: currentTheme.btnColor }}>
          {tableHeadContext.map((data, index) => {
            return <THcomponent data={data} index={index} key={index} />;
          })}
        </thead>
        <tbody>
          <Searchtr />
          {data.slice(offset, offset + 10).map((product, index) => {
            return <TableRow product={product} key={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
