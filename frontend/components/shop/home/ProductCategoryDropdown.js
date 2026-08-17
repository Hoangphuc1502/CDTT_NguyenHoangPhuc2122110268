"use client";

import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

import { HomeContext } from "./index";
import styles from "./style.module.css";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";

import "./style.css";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

/* =========================
   CATEGORY LIST
========================= */  

const CategoryList = () => {
  const router = useRouter();

  const { data } = useContext(HomeContext);

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await CategoryService.getAllCategory();

        if (responseData && responseData.Categories) {
          setCategories(responseData.Categories);
        }
      } catch (error) {
        console.error("Get categories error:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (id) => {
    router.push(`/products/category/${id}`);
  };

  return (
    <div
      className={`${
        data.categoryListDropdown ? "" : "hidden"
      } my-4`}
    >
      <hr />

      <div className="py-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories && categories.length > 0 ? (
          categories.map((item) => (
            <Fragment key={item._id}>
              <div
                onClick={() => handleCategoryClick(item._id)}
                className="col-span-1 flex flex-col items-center justify-center space-y-2 cursor-pointer border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: "#f9f9f9",
                  textAlign: "center",
                }}
              >
                <img
                  src={`${apiURL}/uploads/categories/${item.cImage}`}
                  alt={item.cName}
                  className="w-20 h-20 object-cover rounded-full hover:scale-105 transition-transform duration-300"
                  style={{
                    border: "2px solid #ddd",
                    padding: "5px",
                  }}
                />

                <div
                  className="font-medium text-gray-700 hover:text-indigo-500"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginTop: "10px",
                  }}
                >
                  {item.cName}
                </div>
              </div>
            </Fragment>
          ))
        ) : (
          <div className="text-xl text-center my-4 text-gray-500">
            No Category
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================
   FILTER LIST
========================= */

const FilterList = () => {
  const { data, dispatch } = useContext(HomeContext);

  const [range, setRange] = useState(0);

  const fetchData = async (price) => {
    try {
      if (price === "all") {
        const responseData =
          await ProductService.getAllProduct();

        if (responseData && responseData.Products) {
          dispatch({
            type: "setProducts",
            payload: responseData.Products,
          });
        }

        return;
      }

      dispatch({
        type: "loading",
        payload: true,
      });

      const responseData =
        await ProductService.productByPrice(price);

      if (responseData && responseData.Products) {
        dispatch({
          type: "setProducts",
          payload: responseData.Products,
        });
      }

      dispatch({
        type: "loading",
        payload: false,
      });
    } catch (error) {
      console.error("Filter product error:", error);

      dispatch({
        type: "loading",
        payload: false,
      });
    }
  };

  const rangeHandle = (e) => {
    const value = e.target.value;

    setRange(value);
    fetchData(value);
  };

  const closeFilterBar = async () => {
    await fetchData("all");

    dispatch({
      type: "filterListDropdown",
      payload: false,
    });

    setRange(0);
  };

  return (
    <div
      className={`${
        data.filterListDropdown ? "" : "hidden"
      } my-4`}
    >
      <hr />

      <div className="w-full flex flex-col">
        <div className="font-medium py-2">
          Filter by price
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-2 w-2/3 lg:w-2/4">
            <label htmlFor="points" className="text-sm">
              Price (between 0 and 1000$):{" "}
              <span className="font-semibold text-yellow-700">
                {range}.00$
              </span>
            </label>

<input
  value={range}
  className={styles.slider}
  type="range"
  id="points"
  min="0"
  max="1000"
  step="10"
  onChange={rangeHandle}
/>
          </div>

          <div
            onClick={closeFilterBar}
            className="cursor-pointer"
          >
            <svg
              className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   SEARCH
========================= */

const Search = () => {
  const { data, dispatch } = useContext(HomeContext);

  const [search, setSearch] = useState("");
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData =
          await ProductService.getAllProduct();

        if (responseData && responseData.Products) {
          setProductArray(responseData.Products);
        }
      } catch (error) {
        console.error("Get products error:", error);
      }
    };

    fetchProducts();
  }, []);

  const searchHandle = (e) => {
    const value = e.target.value;

    setSearch(value);

    const filteredProducts = productArray.filter((item) => {
      if (!item.pName) return false;

      return item.pName
        .toUpperCase()
        .includes(value.toUpperCase());
    });

    dispatch({
      type: "setProducts",
      payload: filteredProducts,
    });
  };

  const closeSearchBar = () => {
    dispatch({
      type: "searchDropdown",
      payload: false,
    });

    dispatch({
      type: "setProducts",
      payload: productArray,
    });

    setSearch("");
  };

  return (
    <div
      className={`${
        data.searchDropdown ? "" : "hidden"
      } my-4 flex items-center justify-between`}
    >
      <input
        value={search}
        onChange={searchHandle}
        className="px-4 text-xl py-4 focus:outline-none"
        type="text"
        placeholder="Search products..."
      />

      <div
        onClick={closeSearchBar}
        className="cursor-pointer"
      >
        <svg
          className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

/* =========================
   MAIN COMPONENT
========================= */

const ProductCategoryDropdown = () => {
  return (
    <Fragment>
      <CategoryList />

      <FilterList />

      <Search />
    </Fragment>
  );
};

export default ProductCategoryDropdown;