"use client";

import React, { Fragment, useContext, useState } from "react";
import { CategoryContext } from "./index";
import CategoryService from "@/services/CategoryService";

const AddCategoryModal = () => {
  const { data, dispatch } = useContext(CategoryContext);

  const [fData, setFdata] = useState({
    cName: "",
    cDescription: "",
    cImage: "",
    cStatus: "Active",
    success: false,
    error: false,
  });

  const alert = (msg, type) => (
    <div
      className={`${
        type === "red" ? "bg-red-200" : "bg-green-200"
      } py-2 px-4 w-full`}
    >
      {msg}
    </div>
  );

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

  const submitForm = async (e) => {
    e.preventDefault();

    dispatch({
      type: "loading",
      payload: true,
    });

    if (!fData.cImage) {
      dispatch({
        type: "loading",
        payload: false,
      });

      setFdata({
        ...fData,
        error: "Please upload a category image",
      });

      return;
    }

    try {
      const formData = new FormData();

      formData.append("cName", fData.cName);
      formData.append("cDescription", fData.cDescription);
      formData.append("cImage", fData.cImage);
      formData.append("cStatus", fData.cStatus);

      const responseData =
        await CategoryService.createCategory(formData);

      if (responseData?.success) {
        await fetchData();

        setFdata({
          cName: "",
          cDescription: "",
          cImage: "",
          cStatus: "Active",
          success: responseData.success,
          error: false,
        });

        dispatch({
          type: "loading",
          payload: false,
        });
      } else {
        setFdata({
          ...fData,
          success: false,
          error: responseData?.error || "Create category failed",
        });

        dispatch({
          type: "loading",
          payload: false,
        });
      }
    } catch (error) {
      console.log(error);

      setFdata({
        ...fData,
        success: false,
        error: "Something went wrong",
      });

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
            type: "addCategoryModal",
            payload: false,
          })
        }
        className={`${
          data.addCategoryModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />

      {/* Modal */}
      <div
        className={`${
          data.addCategoryModal ? "" : "hidden"
        } fixed inset-0 m-4 flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-full md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">

          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Category
            </span>

            <span
              style={{ background: "#303031" }}
              onClick={() =>
                dispatch({
                  type: "addCategoryModal",
                  payload: false,
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

          {fData.error
            ? alert(fData.error, "red")
            : null}

          {fData.success
            ? alert(fData.success, "green")
            : null}

          <form
            className="w-full"
            onSubmit={submitForm}
          >
            {/* Category Name */}
            <div className="flex flex-col space-y-1 w-full py-4">
              <label>Category Name</label>

              <input
                value={fData.cName}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cName: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                type="text"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-1 w-full">
              <label>Category Description</label>

              <textarea
                value={fData.cDescription}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cDescription: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                rows={5}
              />
            </div>

            {/* Image */}
            <div className="flex flex-col space-y-1 w-full">
              <label>Category Image</label>

              <input
                accept=".jpg, .jpeg, .png"
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cImage: e.target.files?.[0] || "",
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                type="file"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col space-y-1 w-full">
              <label>Category Status</label>

              <select
                value={fData.cStatus}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cStatus: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
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
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                disabled={data.loading}
                className="text-gray-100 rounded-full text-lg font-medium py-2"
              >
                {data.loading
                  ? "Creating..."
                  : "Create category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;