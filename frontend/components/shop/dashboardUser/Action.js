import UserService from "@/services/UserService";
import OrderService from "@/services/OrderService";
import AuthService from "@/services/AuthService";

export const fetchData = async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  const jwt = JSON.parse(localStorage.getItem("jwt"));

  const userId = jwt ? jwt.user._id : "";

  try {
    const responseData = await UserService.getUserById(userId);

    setTimeout(() => {
      if (responseData && responseData.User) {
        dispatch({
          type: "userDetails",
          payload: responseData.User,
        });

        dispatch({
          type: "loading",
          payload: false,
        });
      }
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
  }
};

export const fetchOrderByUser = async (dispatch) => {
  dispatch({ type: "loading", payload: true });

  const jwt = JSON.parse(localStorage.getItem("jwt"));

  const userId = jwt ? jwt.user._id : "";

  try {
    const responseData =
      await OrderService.getOrderByUser(userId);

    setTimeout(() => {
      if (responseData && responseData.Order) {
        dispatch({
          type: "OrderByUser",
          payload: responseData.Order,
        });

        dispatch({
          type: "loading",
          payload: false,
        });
      }
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
  }
};

export const updatePersonalInformationAction = async (
  dispatch,
  fData
) => {
  const formData = {
    uId: fData.id,
    name: fData.name,
    phoneNumber: fData.phone,
  };

  dispatch({ type: "loading", payload: true });

  try {
    const responseData =
      await UserService.updatePersonalInformation(formData);

    setTimeout(() => {
      if (responseData && responseData.success) {
        dispatch({
          type: "loading",
          payload: false,
        });

        fetchData(dispatch);
      } else {
        dispatch({
          type: "loading",
          payload: false,
        });
      }
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
  }
};

export const handleChangePassword = async (
  fData,
  setFdata,
  dispatch
) => {
  if (
    !fData.newPassword ||
    !fData.oldPassword ||
    !fData.confirmPassword
  ) {
    setFdata({
      ...fData,
      error:
        "Please provide your all password and a new password",
    });

    return;
  }

  if (fData.newPassword !== fData.confirmPassword) {
    setFdata({
      ...fData,
      error: "Password doesn't match",
    });

    return;
  }

  const jwt = JSON.parse(localStorage.getItem("jwt"));

  if (!jwt || !jwt.user) {
    setFdata({
      ...fData,
      error: "User is not authenticated",
    });

    return;
  }

  const formData = {
    uId: jwt.user._id,
    oldPassword: fData.oldPassword,
    newPassword: fData.newPassword,
  };

  dispatch({ type: "loading", payload: true });

  try {
    const responseData =
      await UserService.updatePassword(formData);

    if (responseData && responseData.success) {
      setFdata({
        ...fData,
        success: responseData.success,
        error: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      dispatch({
        type: "loading",
        payload: false,
      });
    } else if (responseData && responseData.error) {
      dispatch({
        type: "loading",
        payload: false,
      });

      setFdata({
        ...fData,
        error: responseData.error,
        success: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      dispatch({
        type: "loading",
        payload: false,
      });
    }
  } catch (error) {
    console.log(error);

    dispatch({
      type: "loading",
      payload: false,
    });
  }
};

// Logout
export const logout = () => {
  AuthService.logout();
};