"use client";

import React, { Fragment, useEffect, useContext, useState } from "react";
import { HomeContext } from "./index";
import { prevSlide, nextSlide } from "./Mixins";
import OrderSuccessMessage from "./OrderSuccessMessage";
import DashboardService from "@/services/DashboardService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Slider = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const fetchSliderImages = async () => {
    try {
      const responseData = await DashboardService.getSliderImages();

      if (responseData && responseData.sliderImages) {
        dispatch({
          type: "sliderImages",
          payload: responseData.sliderImages,
        });
      }
    } catch (error) {
      console.error("Get slider images error:", error);
    }
  };

  return (
    <Fragment>
      <div className="relative mt-16 bg-gray-100 border-2">
        {data?.sliderImages?.length > 0 && (
          <>
            {/* Slider Image */}
            <img
              className="w-full"
              src={`${API_URL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
              alt="sliderImage"
            />

            {/* Previous Button */}
            <svg
              onClick={() =>
                prevSlide(
                  data.sliderImages.length,
                  slide,
                  setSlide
                )
              }
              className="z-10 absolute top-1/2 left-0 -translate-y-1/2 flex justify-center items-center w-12 h-12 text-gray-700 cursor-pointer hover:text-yellow-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>

            {/* Next Button */}
            <svg
              onClick={() =>
                nextSlide(
                  data.sliderImages.length,
                  slide,
                  setSlide
                )
              }
              className="z-10 absolute top-1/2 right-0 -translate-y-1/2 flex justify-center items-center w-12 h-12 text-gray-700 cursor-pointer hover:text-yellow-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </>
        )}
      </div>

      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;