import DashboardService from "@/services/DashboardService";
import { getAllOrder } from "@/services/OrderService";

export const GetAllData = async (dispatch) => {
  try {
    const responseData = await DashboardService.getDashboardData();

    if (responseData) {
      dispatch({
        type: "totalData",
        payload: responseData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const todayAllOrders = async (dispatch) => {
  try {
    const responseData = await getAllOrder();

    if (responseData) {
      dispatch({
        type: "totalOrders",
        payload: responseData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const sliderImages = async (dispatch) => {
  try {
    const responseData = await DashboardService.getSliderImages();

    if (responseData && responseData.Images) {
      dispatch({
        type: "sliderImages",
        payload: responseData.Images,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (id, dispatch) => {
  dispatch({
    type: "imageUpload",
    payload: true,
  });

  try {
    const responseData =
      await DashboardService.deleteSliderImage(id);

    if (responseData && responseData.success) {
      await sliderImages(dispatch);
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: "imageUpload",
      payload: false,
    });
  }
};

export const uploadImage = async (image, dispatch) => {
  dispatch({
    type: "imageUpload",
    payload: true,
  });

  const formData = new FormData();
  formData.append("image", image);

  try {
    const responseData =
      await DashboardService.uploadSliderImage(formData);

    if (responseData && responseData.success) {
      await sliderImages(dispatch);
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: "imageUpload",
      payload: false,
    });
  }
};