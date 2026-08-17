"use client";

import React, { Fragment, useContext, useEffect } from "react";
import { CategoryContext } from "./index";
import CategoryService from "@/services/CategoryService";
import moment from "moment";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const AllCategories = () => {
  const { data, dispatch } = useContext(CategoryContext);
  const { categories, loading } = data;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({
      type: "loading",
      payload: true,
    });

    try {
      const responseData = await CategoryService.getAllCategory();

      if (responseData?.Categories) {
        dispatch({
          type: "fetchCategoryAndChangeState",
          payload: responseData.Categories,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: "loading",
        payload: false,
      });
    }
  };

  const deleteCategoryReq = async (cId) => {
    try {
      const responseData =
        await CategoryService.deleteCategory(cId);

      if (responseData?.success) {
        await fetchData();
      } else if (responseData?.error) {
        console.log(responseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = (cId, type, des, status) => {
    if (type) {
      dispatch({
        type: "editCategoryModalOpen",
        cId,
        des,
        status,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((item, key) => (
                <CategoryTable
                  category={item}
                  editCat={(cId, type, des, status) =>
                    editCategory(cId, type, des, status)
                  }
                  deleteCat={(cId) =>
                    deleteCategoryReq(cId)
                  }
                  key={key}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-xl text-center font-semibold py-8"
                >
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-sm text-gray-600 mt-2">
          Total {categories?.length || 0} category found
        </div>
      </div>
    </Fragment>
  );
};

const CategoryTable = ({
  category,
  deleteCat,
  editCat,
}) => {
  return (
    <tr>
      <td className="p-2 text-left">
        {category.cName.length > 20
          ? category.cName.slice(0, 20) + "..."
          : category.cName}
      </td>

      <td className="p-2 text-left">
        {category.cDescription.length > 30
          ? category.cDescription.slice(0, 30) + "..."
          : category.cDescription}
      </td>

      <td className="p-2 text-center">
        <img
          className="w-12 h-12 object-cover object-center"
          src={`${apiURL}/uploads/categories/${category.cImage}`}
          alt={category.cName}
        />
      </td>

      <td className="p-2 text-center">
        {category.cStatus === "Active" ? (
          <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
            {category.cStatus}
          </span>
        ) : (
          <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
            {category.cStatus}
          </span>
        )}
      </td>

      <td className="p-2 text-center">
        {moment(category.createdAt).format("lll")}
      </td>

      <td className="p-2 text-center">
        {moment(category.updatedAt).format("lll")}
      </td>

      <td className="p-2 flex items-center justify-center">
        {/* Edit */}
        <span
          onClick={() =>
            editCat(
              category._id,
              true,
              category.cDescription,
              category.cStatus
            )
          }
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 fill-current text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        {/* Delete */}
        <span
          onClick={() => deleteCat(category._id)}
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 fill-current text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </td>
    </tr>
  );
};

export default AllCategories;