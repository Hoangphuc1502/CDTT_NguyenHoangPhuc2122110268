import { createOrder } from "@/services/OrderService";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });

  try {
    const responseData = await cartListProduct();

    if (responseData && responseData.Products) {
      setTimeout(() => {
        dispatch({
          type: "cartProduct",
          payload: responseData.Products,
        });

        dispatch({
          type: "loading",
          payload: false,
        });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
  }
};

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  totalCost,
  router
) => {
  // Kiểm tra địa chỉ
  if (!state.address) {
    setState({
      ...state,
      error: "Vui lòng nhập địa chỉ giao hàng",
    });
    return;
  }

  // Kiểm tra số điện thoại
  if (!state.phone) {
    setState({
      ...state,
      error: "Vui lòng nhập số điện thoại",
    });
    return;
  }

  dispatch({
    type: "loading",
    payload: true,
  });

  const jwt = JSON.parse(localStorage.getItem("jwt"));

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const orderData = {
    allProduct: cart,
    user: jwt?.user?._id,
    amount: totalCost(),
    transactionId: Date.now(),
    address: state.address,
    phone: state.phone,
    paymentMethod: "COD",
  };

  try {
    const responseData = await createOrder(orderData);

    if (responseData?.success) {
      // Xóa giỏ hàng
      localStorage.setItem("cart", JSON.stringify([]));

      dispatch({
        type: "cartProduct",
        payload: null,
      });

      dispatch({
        type: "cartTotalCost",
        payload: null,
      });

      dispatch({
        type: "orderSuccess",
        payload: true,
      });

      dispatch({
        type: "loading",
        payload: false,
      });

      // Next.js
      router.push("/");
      return;
    }

    if (responseData?.error) {
      console.log(responseData.error);

      setState({
        ...state,
        error: responseData.error,
      });
    }
  } catch (error) {
    console.log(error);

    setState({
      ...state,
      error: "Đã xảy ra lỗi khi đặt hàng",
    });
  }

  dispatch({
    type: "loading",
    payload: false,
  });
};