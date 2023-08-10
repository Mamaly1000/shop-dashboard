import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fakeProductInterface } from "../../context/ContextProvider";
import { productsTablePaginationType } from "../../hooks/usePagination";

export type filtersType =
  | ""
  | "td_number"
  | "td_name"
  | "td_price"
  | "td_add"
  | "td_buyer"
  | "td_category"
  | "td_company"
  | "td_desc"
  | "td_exdate"
  | "td_total"
  | "td_active";

export type singleFilterType = {
  type: filtersType;
  mode: "ASC" | "DESC";
};
export type singleSearchType = {
  type: filtersType;
  value: string | number | Date;
};
interface initType {
  pagination: productsTablePaginationType;
  products: fakeProductInterface[];
  filters: singleFilterType[];
  searches: singleSearchType[];
  hiddenCols: singleFilterType[];
  selectedProduct: fakeProductInterface;
}

const initialState: initType = {
  products: [],
  pagination: {
    currentPage: 1,
    offset: 0,
    totalPages: 0,
  },
  filters: [],
  hiddenCols: [],
  searches: [],
  selectedProduct: {
    id: 0,
    name: "",
    persianName: "",
    price: 0,
    category: {
      en: "",
      fa: "",
    },
    addedDate: "",
    totalSupply: 0,
    company: "",
    description: "",
    persiandesc: "",
    isActive: false,
    expireDate: "",
    buyer: "",
  },
};
const ProductsReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductsPagination: (state, action) => {
      state.pagination = {
        currentPage: action.payload.currentPage,
        offset: action.payload.offset,
        totalPages: action.payload.totalPages,
      };
    },
    setSelectedProductsFilters: (state, action) => {
      const check = state.filters.findIndex(
        (f) => f.type === action.payload.type
      );
      let newFilters = [...state.filters];
      if (check < 0) {
        state.filters.push({
          mode: action.payload.mode,
          type: action.payload.type,
        });
        newFilters.push({
          mode: action.payload.mode,
          type: action.payload.type,
        });
      } else {
        state.filters[check] = {
          mode: action.payload.mode,
          type: action.payload.type,
        };
        newFilters[check] = {
          mode: action.payload.mode,
          type: action.payload.type,
        };
      }
      let finalArray = [...state.products];
      for (const filter of newFilters) {
        if (filter.type === "td_add") {
          let addedDateArray = finalArray.sort((a, b) => {
            return (
              new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime()
            );
          });
          if (filter.mode === "ASC") {
            finalArray = addedDateArray;
          } else {
            finalArray = addedDateArray.reverse();
          }
        }
        if (filter.type === "td_buyer") {
          const buyerArray = finalArray.sort((a, b) => {
            return a.buyer > b.buyer ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = buyerArray;
          } else {
            finalArray = buyerArray.reverse();
          }
        }
        if (filter.type === "td_name") {
          const nameArray = finalArray.sort((a, b) => {
            return a.name > b.name ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = nameArray;
          } else {
            finalArray = nameArray.reverse();
          }
        }
        if (filter.type === "td_company") {
          const companyArray = finalArray.sort((a, b) => {
            return a.company > b.company ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = companyArray;
          } else {
            finalArray = companyArray.reverse();
          }
        }
        if (filter.type === "td_category") {
          const categoryArray = finalArray.sort((a, b) => {
            return a.category.en > b.category.en ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = categoryArray;
          } else {
            finalArray = categoryArray.reverse();
          }
        }
        if (filter.type === "td_desc") {
          const deskArray = finalArray.sort((a, b) => {
            return a.description > b.description ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = deskArray;
          } else {
            finalArray = deskArray.reverse();
          }
        }
        if (filter.type === "td_exdate") {
          let expDateArray = finalArray.sort((a, b) => {
            return (
              new Date(a.expireDate).getTime() -
              new Date(b.expireDate).getTime()
            );
          });
          if (filter.mode === "ASC") {
            finalArray = expDateArray;
          } else {
            finalArray = expDateArray.reverse();
          }
        }
        if (filter.type === "td_number") {
          let idArray = finalArray.sort((a, b) => {
            return a.id > b.id ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = idArray;
          } else {
            finalArray = idArray.reverse();
          }
        }
        if (filter.type === "td_price") {
          let priceArray = finalArray.sort((a, b) => {
            return a.price > b.price ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = priceArray;
          } else {
            finalArray = priceArray.reverse();
          }
        }
        if (filter.type === "td_total") {
          let totalArray = finalArray.sort((a, b) => {
            return a.totalSupply > b.totalSupply ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = totalArray;
          } else {
            finalArray = totalArray.reverse();
          }
        }
        if (filter.type === "td_active") {
          let totalArray = finalArray.sort((a, b) => {
            return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
          });
          if (filter.mode === "ASC") {
            finalArray = totalArray;
          } else {
            finalArray = totalArray.reverse();
          }
        }
      }
      state.products = finalArray;
    },
    setRemoveSelectedFilter: (state, action) => {
      const newFilters = state.filters.filter(
        (f) => f.type !== action.payload.type
      );
      state.filters = newFilters;
      let finalArray = [...state.products];
      for (const filter of newFilters) {
        if (filter.type === "td_add") {
          let addedDateArray = finalArray.sort((a, b) => {
            return (
              new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime()
            );
          });
          if (filter.mode === "ASC") {
            finalArray = addedDateArray;
          } else {
            finalArray = addedDateArray.reverse();
          }
        }
        if (filter.type === "td_buyer") {
          const buyerArray = finalArray.sort((a, b) => {
            return a.buyer > b.buyer ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = buyerArray;
          } else {
            finalArray = buyerArray.reverse();
          }
        }
        if (filter.type === "td_name") {
          const nameArray = finalArray.sort((a, b) => {
            return a.name > b.name ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = nameArray;
          } else {
            finalArray = nameArray.reverse();
          }
        }
        if (filter.type === "td_company") {
          const companyArray = finalArray.sort((a, b) => {
            return a.company > b.company ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = companyArray;
          } else {
            finalArray = companyArray.reverse();
          }
        }
        if (filter.type === "td_category") {
          const categoryArray = finalArray.sort((a, b) => {
            return a.category.en > b.category.en ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = categoryArray;
          } else {
            finalArray = categoryArray.reverse();
          }
        }
        if (filter.type === "td_desc") {
          const deskArray = finalArray.sort((a, b) => {
            return a.description > b.description ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = deskArray;
          } else {
            finalArray = deskArray.reverse();
          }
        }
        if (filter.type === "td_exdate") {
          let expDateArray = finalArray.sort((a, b) => {
            return (
              new Date(a.expireDate).getTime() -
              new Date(b.expireDate).getTime()
            );
          });
          if (filter.mode === "ASC") {
            finalArray = expDateArray;
          } else {
            finalArray = expDateArray.reverse();
          }
        }
        if (filter.type === "td_number") {
          let idArray = finalArray.sort((a, b) => {
            return a.id > b.id ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = idArray;
          } else {
            finalArray = idArray.reverse();
          }
        }
        if (filter.type === "td_price") {
          let priceArray = finalArray.sort((a, b) => {
            return a.price > b.price ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = priceArray;
          } else {
            finalArray = priceArray.reverse();
          }
        }
        if (filter.type === "td_total") {
          let totalArray = finalArray.sort((a, b) => {
            return a.totalSupply > b.totalSupply ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = totalArray;
          } else {
            finalArray = totalArray.reverse();
          }
        }
        if (filter.type === "td_active") {
          let totalArray = finalArray.sort((a, b) => {
            return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
          });
          if (filter.mode === "ASC") {
            finalArray = totalArray;
          } else {
            finalArray = totalArray.reverse();
          }
        }
      }
      state.products = finalArray;
    },
    resetProductsFilters: (state, action) => {
      state.filters = [];
      state.products = action.payload;
    },
    filterProducts: (state) => {
      let finalArray = [...state.products];
      for (const filter of state.filters.reverse()) {
        if (filter.type === "td_add") {
          let addedDateArray = finalArray.sort((a, b) => {
            return (
              new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime()
            );
          });
          if (filter.mode === "ASC") {
            finalArray = addedDateArray;
          } else {
            finalArray = addedDateArray.reverse();
          }
        }
        if (filter.type === "td_buyer") {
          const buyerArray = finalArray.sort((a, b) => {
            return a.buyer > b.buyer ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = buyerArray;
          } else {
            finalArray = buyerArray.reverse();
          }
        }
        if (filter.type === "td_name") {
          const nameArray = finalArray.sort((a, b) => {
            return a.name > b.name ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = nameArray;
          } else {
            finalArray = nameArray.reverse();
          }
        }
        if (filter.type === "td_company") {
          const companyArray = finalArray.sort((a, b) => {
            return a.company > b.company ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = companyArray;
          } else {
            finalArray = companyArray.reverse();
          }
        }
        if (filter.type === "td_category") {
          const categoryArray = finalArray.sort((a, b) => {
            return a.category.en > b.category.en ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = categoryArray;
          } else {
            finalArray = categoryArray.reverse();
          }
        }
        if (filter.type === "td_desc") {
          const deskArray = finalArray.sort((a, b) => {
            return a.description > b.description ? -1 : 1;
          });
          if (filter.mode === "DESC") {
            finalArray = deskArray;
          } else {
            finalArray = deskArray.reverse();
          }
        }
        if (filter.type === "td_exdate") {
          let expDateArray = finalArray.sort((a, b) => {
            return (
              new Date(a.expireDate).getTime() -
              new Date(b.expireDate).getTime()
            );
          });
          if (filter.mode === "ASC") {
            finalArray = expDateArray;
          } else {
            finalArray = expDateArray.reverse();
          }
        }
        if (filter.type === "td_number") {
          let idArray = finalArray.sort((a, b) => {
            return a.id > b.id ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = idArray;
          } else {
            finalArray = idArray.reverse();
          }
        }
        if (filter.type === "td_price") {
          let priceArray = finalArray.sort((a, b) => {
            return a.price > b.price ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = priceArray;
          } else {
            finalArray = priceArray.reverse();
          }
        }
        if (filter.type === "td_total") {
          let totalArray = finalArray.sort((a, b) => {
            return a.totalSupply > b.totalSupply ? 1 : -1;
          });
          if (filter.mode === "ASC") {
            finalArray = totalArray;
          } else {
            finalArray = totalArray.reverse();
          }
        }
        if (filter.type === "td_active") {
          let totalArray = finalArray.sort((a, b) => {
            return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
          });
          if (filter.mode === "ASC") {
            finalArray = totalArray;
          } else {
            finalArray = totalArray.reverse();
          }
        }
      }
      state.products = finalArray;
    },
    setHideCols: (state, action) => {
      const check = state.hiddenCols.findIndex(
        (h) => h.type === action.payload.type
      );
      if (check < 0) {
        state.hiddenCols.push(action.payload);
      } else {
        const newArray = state.hiddenCols.filter(
          (h) => h.type !== action.payload.type
        );
        state.hiddenCols = newArray;
      }
    },
    setAddProductsSearch: (state, action) => {
      const check = state.searches.findIndex(
        (s) => s.type === action.payload.type
      );
      let searchArray = [...state.searches];
      if (check < 0) {
        state.searches.push({
          type: action.payload.type,
          value: action.payload.value,
        });
        searchArray.push({
          type: action.payload.type,
          value: action.payload.value,
        });
      } else {
        state.searches[check] = {
          value: action.payload.mode,
          type: action.payload.type,
        };
        searchArray[check] = {
          value: action.payload.mode,
          type: action.payload.type,
        };
      }
      let finalArray = [...action.payload.products];
      for (const search of searchArray) {
        if (search.type === "td_add") {
          let addedDateArray = finalArray.filter((product) => {
            return (
              new Date(product.addedDate).getTime() >=
              new Date(search.value).getTime()
            );
          });
          finalArray = addedDateArray;
        }
        if (search.type === "td_buyer") {
          const buyerArray = finalArray.filter((product) => {
            return product.buyer
              .toLowerCase()
              .includes((search.value as string).toLowerCase());
          });
          finalArray = buyerArray;
        }
        if (search.type === "td_name") {
          const nameArray = finalArray.filter((product) => {
            return (
              product.persianName
                .toLowerCase()
                .includes((search.value as string).toLowerCase()) ||
              product.name
                .toLowerCase()
                .includes((search.value as string).toLowerCase())
            );
          });
          finalArray = nameArray;
        }
        if (search.type === "td_company") {
          const companyArray = finalArray.filter((product) => {
            return product.company
              .toLowerCase()
              .includes((search.value as string).toLowerCase());
          });
          finalArray = companyArray;
        }
        if (search.type === "td_category") {
          const categoryArray = finalArray.filter((product) => {
            return (
              product.category.en
                .toLowerCase()
                .includes((search.value as string).toLowerCase()) ||
              product.category.fa
                .toLowerCase()
                .includes((search.value as string).toLowerCase())
            );
          });
          finalArray = categoryArray;
        }
        if (search.type === "td_desc") {
          const deskArray = finalArray.filter((product) => {
            product.description
              .toLowerCase()
              .includes((search.value as string).toLowerCase());
          });
          finalArray = deskArray;
        }
        if (search.type === "td_exdate") {
          let expDateArray = finalArray.filter((product) => {
            return (
              new Date(product.expireDate).getTime() >=
              new Date(search.value as Date).getTime()
            );
          });
          finalArray = expDateArray;
        }
        if (search.type === "td_number") {
          let idArray = finalArray.filter((product) => {
            return String(product.id).includes(String(search.value));
          });
          finalArray = idArray;
        }
        if (search.type === "td_price") {
          let priceArray = finalArray.filter((product) => {
            return product.price >= +search.value;
          });
          finalArray = priceArray;
        }
        if (search.type === "td_total") {
          let totalArray = finalArray.filter((product) => {
            return product.totalSupply >= +search.value;
          });
          finalArray = totalArray;
        }
      }
      state.products = finalArray;
      state.pagination = {
        currentPage: 1,
        offset: 0,
        totalPages: Math.ceil(finalArray.length / 10),
      };
    },
    setRemoveProductsSearch: (state, action) => {
      const newArray = state.searches.filter(
        (s) => s.type !== action.payload.type
      );
      state.searches = newArray;
      let finalArray = [...action.payload.products];

      for (const search of [...newArray]) {
        if (search.type === "td_add") {
          let addedDateArray = finalArray.filter((product) => {
            return (
              new Date(product.addedDate).getTime() >=
              new Date(search.value as Date).getTime()
            );
          });
          finalArray = addedDateArray;
        }
        if (search.type === "td_buyer") {
          const buyerArray = finalArray.filter((product) => {
            return product.buyer
              .toLowerCase()
              .includes((search.value as string).toLowerCase());
          });
          finalArray = buyerArray;
        }
        if (search.type === "td_name") {
          const nameArray = finalArray.filter((product) => {
            return (
              product.persianName
                .toLowerCase()
                .includes((search.value as string).toLowerCase()) ||
              product.name
                .toLowerCase()
                .includes((search.value as string).toLowerCase())
            );
          });
          finalArray = nameArray;
        }
        if (search.type === "td_company") {
          const companyArray = finalArray.filter((product) => {
            return product.company
              .toLowerCase()
              .includes((search.value as string).toLowerCase());
          });
          finalArray = companyArray;
        }
        if (search.type === "td_category") {
          const categoryArray = finalArray.filter((product) => {
            return (
              product.category.en
                .toLowerCase()
                .includes((search.value as string).toLowerCase()) ||
              product.category.fa
                .toLowerCase()
                .includes((search.value as string).toLowerCase())
            );
          });
          finalArray = categoryArray;
        }
        if (search.type === "td_desc") {
          const deskArray = finalArray.filter((product) => {
            product.description
              .toLowerCase()
              .includes((search.value as string).toLowerCase());
          });
          finalArray = deskArray;
        }
        if (search.type === "td_exdate") {
          let expDateArray = finalArray.filter((product) => {
            return (
              new Date(product.expireDate).getTime() >=
              new Date(search.value as Date).getTime()
            );
          });
          finalArray = expDateArray;
        }
        if (search.type === "td_number") {
          let idArray = finalArray.filter((product) => {
            return String(product.id).includes(String(search.value));
          });
          finalArray = idArray;
        }
        if (search.type === "td_price") {
          let priceArray = finalArray.filter((product) => {
            return product.price >= +search.value;
          });
          finalArray = priceArray;
        }
        if (search.type === "td_total") {
          let totalArray = finalArray.filter((product) => {
            return product.totalSupply >= +search.value;
          });
          finalArray = totalArray;
        }
      }
      state.products = finalArray;
      state.pagination = {
        currentPage: 1,
        offset: 0,
        totalPages: Math.ceil(finalArray.length / 10),
      };
    },
    setSearchAllProducts: (state, _action) => {
      let finalArray = [...state.products];
      if (state.searches.length > 0) {
        for (const search of state.searches.reverse()) {
          if (search.type === "td_add") {
            let addedDateArray = finalArray.filter((product) => {
              return (
                new Date(product.addedDate).getTime() >=
                new Date(search.value as Date).getTime()
              );
            });
            finalArray = addedDateArray;
          }
          if (search.type === "td_buyer") {
            const buyerArray = finalArray.filter((product) => {
              return product.buyer
                .toLowerCase()
                .includes((search.value as string).toLowerCase());
            });
            finalArray = buyerArray;
          }
          if (search.type === "td_name") {
            const nameArray = finalArray.filter((product) => {
              return (
                product.persianName
                  .toLowerCase()
                  .includes((search.value as string).toLowerCase()) ||
                product.name
                  .toLowerCase()
                  .includes((search.value as string).toLowerCase())
              );
            });
            finalArray = nameArray;
          }
          if (search.type === "td_company") {
            const companyArray = finalArray.filter((product) => {
              return product.company
                .toLowerCase()
                .includes((search.value as string).toLowerCase());
            });
            finalArray = companyArray;
          }
          if (search.type === "td_category") {
            const categoryArray = finalArray.filter((product) => {
              return (
                product.category.en
                  .toLowerCase()
                  .includes((search.value as string).toLowerCase()) ||
                product.category.fa
                  .toLowerCase()
                  .includes((search.value as string).toLowerCase())
              );
            });
            finalArray = categoryArray;
          }
          if (search.type === "td_desc") {
            const deskArray = finalArray.filter((product) => {
              product.description
                .toLowerCase()
                .includes((search.value as string).toLowerCase());
            });
            finalArray = deskArray;
          }
          if (search.type === "td_exdate") {
            let expDateArray = finalArray.filter((product) => {
              return (
                new Date(product.expireDate).getTime() >=
                new Date(search.value as Date).getTime()
              );
            });
            finalArray = expDateArray;
          }
          if (search.type === "td_number") {
            let idArray = finalArray.filter((product) => {
              return String(product.id).includes(String(search.value));
            });
            finalArray = idArray;
          }
          if (search.type === "td_price") {
            let priceArray = finalArray.filter((product) => {
              return product.price >= +search.value;
            });
            finalArray = priceArray;
          }
          if (search.type === "td_total") {
            let totalArray = finalArray.filter((product) => {
              return product.totalSupply >= +search.value;
            });
            finalArray = totalArray;
          }
        }
      }
      state.products = finalArray;
    },
    setRemoveAllProductsSearch: (state, action) => {
      state.searches = [];
      state.products = action.payload;
    },
    AddNewProduct: (state, action) => {
      switch (action.payload.type) {
        case "FIRST":
          state.selectedProduct.id = action.payload.id;
          state.selectedProduct.name = action.payload.name;
          state.selectedProduct.buyer = action.payload.buyer;
          state.selectedProduct.company = action.payload.company;
          state.selectedProduct.persianName = action.payload.persianName;
          break;
        case "SECOND":
          state.selectedProduct.category.en = action.payload.category.en;
          state.selectedProduct.category.fa = action.payload.category.fa;
          state.selectedProduct.addedDate = action.payload.addedDate;
          state.selectedProduct.expireDate = action.payload.expireDate;
          break;
        case "THIRD":
          state.selectedProduct.description = action.payload.description;
          state.selectedProduct.persiandesc = action.payload.persiandesc;
          state.selectedProduct.price = action.payload.price;
          state.selectedProduct.isActive = action.payload.isActive;
          state.selectedProduct.totalSupply = action.payload.totalSupply;
          break;
        case "FINAL":
          const check = state.products.findIndex(
            (p) => p.id === state.selectedProduct.id
          );
          if (check < 0) {
            state.products.push(state.selectedProduct);
            state.pagination.totalPages = Math.ceil(
              action.payload.products.length / 10
            );
          } else {
            state.products[check] = state.selectedProduct;
          }
          break;

        default:
          state = initialState;
          break;
      }
    },
    setEditProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});
export const {
  fetchProducts,
  setProductsPagination,
  setSelectedProductsFilters,
  setRemoveSelectedFilter,
  resetProductsFilters,
  filterProducts,
  setHideCols,
  setAddProductsSearch,
  setRemoveProductsSearch,
  setSearchAllProducts,
  setRemoveAllProductsSearch,
  AddNewProduct,
  setEditProduct,
} = ProductsReducer.actions;
export default ProductsReducer.reducer;
export const selectProducts = (state: RootState) => {
  return state.products;
};
