"use client";

import React, { Fragment, useContext, useEffect, useState } from "react";
import { CategoryContext } from "./index";
import CategoryService from "@/services/CategoryService";

const EditCategoryModal = () => {
  const { data, dispatch } = useContext(CategoryContext);

  const [des, setDes] = useState("");
  const [status, setStatus] = useState("");
  const [cId, setCid] = useState("");

  useEffect(() => {
    setDes(data.editCategoryModal.des);
    setStatus(data.editCategoryModal.status);
    setCid(data.editCategoryModal.cId);
  }, [data.editCategoryModal]);

  const fetchData = async () => {
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
    }
  };

  const submitForm = async () => {
    dispatch({
      type: "loading",
      payload: true,
    });

    try {
      const responseData =
        await CategoryService.editCategory(
          cId,
          des,
          status
        );

      if (responseData?.success) {
        dispatch({
          type: "editCategoryModalClose",
        });

        await fetchData();
      } else if (responseData?.error) {
        console.log(responseData.error);
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

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={() =>
          dispatch({
            type: "editCategoryModalClose",
          })
        }
        className={`${
          data.editCategoryModal.modal
            ? ""
            : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />

      {/* Modal */}
      <div
        className={`${
          data.editCategoryModal.modal
            ? ""
            : "hidden"
        } fixed inset-0 m-4 flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">

          {/* Header */}
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Category
            </span>

            {/* Close */}
            <span
              style={{ background: "#303031" }}
              onClick={() =>
                dispatch({
                  type: "editCategoryModalClose",
                })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="description">
              Category Description
            </label>

            <textarea
              value={des}
              onChange={(e) => setDes(e.target.value)}
              className="px-4 py-2 border focus:outline-none"
              name="description"
              id="description"
              cols={5}
              rows={5}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="status">
              Category Status
            </label>

            <select
              value={status}
              name="status"
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="px-4 py-2 border focus:outline-none"
              id="status"
            >
              <option value="Active">
                Active
              </option>

              <option value="Disabled">
                Disabled
              </option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6">
            <button
              style={{ background: "#303031" }}
              onClick={submitForm}
              disabled={data.loading}
              className="rounded-full text-gray-100 text-lg font-medium py-2 disabled:opacity-50"
            >
              {data.loading
                ? "Updating..."
                : "Update category"}
            </button>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default EditCategoryModal;