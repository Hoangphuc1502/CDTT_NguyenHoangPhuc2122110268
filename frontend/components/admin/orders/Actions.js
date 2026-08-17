"use client";

import {
  getAllOrder,
  editOrder,
  deleteOrder,
} from "@/services/OrderService";

export const getAllOrders = async (dispatch) => {
  dispatch({
    type: "loading",
    payload: true,
  });

  try {
    const responseData = await getAllOrder();

    if (responseData) {
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: responseData.Orders || [],
      });
    }
  } catch (error) {
    console.log("Get all orders error:", error);
  } finally {
    dispatch({
      type: "loading",
      payload: false,
    });
  }
};

export const updateOrder = async (
  oId,
  status,
  dispatch
) => {
  dispatch({
    type: "loading",
    payload: true,
  });

  try {
    const responseData = await editOrder(
      oId,
      status
    );

    if (responseData?.success) {
      await getAllOrders(dispatch);
    } else if (responseData?.error) {
      console.log(responseData.error);
    }
  } catch (error) {
    console.log("Update order error:", error);
  } finally {
    dispatch({
      type: "loading",
      payload: false,
    });
  }
};

export const removeOrder = async (
  oId,
  dispatch
) => {
  dispatch({
    type: "loading",
    payload: true,
  });

  try {
    const responseData = await deleteOrder(oId);

    if (responseData?.success) {
      await getAllOrders(dispatch);
    } else if (responseData?.error) {
      console.log(responseData.error);
    }
  } catch (error) {
    console.log("Delete order error:", error);
  } finally {
    dispatch({
      type: "loading",
      payload: false,
    });
  }
};