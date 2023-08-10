import useLocalStorage from "./useLocalStorage";
export type productsTablePaginationType = {
  totalPages: number;
  offset: number;
  currentPage: number;
};

const usePagination = () => {
  const [Local_products_Table_Pagination, setLocalProductsTablePagination] =
    useLocalStorage<productsTablePaginationType>("products-table-pagination", {
      totalPages: 0,
      offset: 0,
      currentPage: 1,
    });

  return { Local_products_Table_Pagination, setLocalProductsTablePagination };
};

export default usePagination;
