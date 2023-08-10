import { createContext, useState, useLayoutEffect, useEffect } from "react";
import * as React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  setProductsPagination,
} from "../features/products/products_slice";
import usePagination, {
  productsTablePaginationType,
} from "../hooks/usePagination";
export interface fakeProductInterface {
  id: number;
  name: string;
  persianName: string;
  price: number;
  category: {
    en: string;
    fa: string;
  };
  addedDate: string;
  totalSupply: number;
  company: string;
  description: string;
  persiandesc: string;
  isActive: boolean;
  expireDate: string;
  buyer: string;
}
interface Icontext {
  fakeProducts: fakeProductInterface[];
  setFakeProducts: React.Dispatch<React.SetStateAction<fakeProductInterface[]>>;
}
export const AppContext = createContext<Icontext | null>({} as Icontext);

const DashboardAppContextComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const { Local_products_Table_Pagination, setLocalProductsTablePagination } =
    usePagination();
  const [fakeProducts, setFakeProducts] = useLocalStorage<
    fakeProductInterface[]
  >("fake-products", []);
  const [categories] = useState([
    {
      en: "account",
      fa: "حساب",
    },
    {
      en: "pakage",
      fa: "پکیج",
    },
    {
      en: "clothes",
      fa: "لباس",
    },
    {
      en: "book",
      fa: "کتاب",
    },
    {
      en: "tech",
      fa: "تکنولوژی",
    },
  ]);
  useLayoutEffect(() => {
    if (fakeProducts.length === 0) {
      const products: fakeProductInterface[] = [];
      for (let i = 0; i < 50; i++) {
        const product = {
          id: i + 1,
          name: ` Product ${i + 1} `,
          persianName: ` محصول ${i + 1} `,
          price: Math.floor(Math.random() * 1000) + 1,
          category: categories[Math.floor(Math.random() * categories.length)],
          addedDate: new Date(
            Date.now() - Math.floor(Math.random() * 10000000000)
          ).toLocaleDateString(),
          totalSupply: Math.floor(Math.random() * 100) + 1,
          company: ` Company ${Math.floor(Math.random() * 10) + 1}`,
          description: ` This is a description for Product ${i + 1}`,
          persiandesc: ` این توضیحات مربوط به محصول ${i + 1} می باشد`,
          isActive: Boolean(Math.random() < 0.5),
          expireDate: new Date(
            Date.now() + Math.floor(Math.random() * 10000000000)
          ).toLocaleDateString(),
          buyer: [
            "me",
            "admin",
            "amin",
            "reza",
            "mohammad",
            "korosh",
            "shahin",
          ][Math.floor(Math.random() * 6)],
        };
        products.push(product);
      }
      setFakeProducts(products);
    }
  }, []);
  useEffect(() => {
    if (fakeProducts.length > 0) {
      dispatch(fetchProducts(fakeProducts));
      setLocalProductsTablePagination({
        currentPage: Local_products_Table_Pagination.currentPage,
        offset: Local_products_Table_Pagination.offset,
        totalPages: Math.ceil(fakeProducts.length / 10),
      });
    }
  }, [fakeProducts]);
  useEffect(() => {
    dispatch(
      setProductsPagination({
        currentPage: Local_products_Table_Pagination.currentPage,
        offset: Local_products_Table_Pagination.offset,
        totalPages: Math.ceil(fakeProducts.length / 10),
      } as productsTablePaginationType)
    );
  }, [Local_products_Table_Pagination]);
  return (
    <AppContext.Provider value={{ fakeProducts, setFakeProducts }}>
      {children}
    </AppContext.Provider>
  );
};
export default DashboardAppContextComponent;
export const useContextFunction = () => {
  return React.useContext(AppContext);
};
