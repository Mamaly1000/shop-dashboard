import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import LanguageReducer from "../features/languages/language_slice";
import HeaderReducer from "../features/header/header_slice";
import ProductsReducer from "../features/products/products_slice";

const store = configureStore({
  reducer: {
    language: LanguageReducer,
    header: HeaderReducer,
    products: ProductsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
