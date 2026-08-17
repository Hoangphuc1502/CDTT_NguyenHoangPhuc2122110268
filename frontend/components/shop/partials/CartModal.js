"use client";

import React, { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { LayoutContext } from "../layout";
import AuthService from "@/services/AuthService";
import CartService from "@/services/CartService";

import { cartList } from "@/components/shop/productDetails/Mixins";
import { subTotal, quantity, totalCost } from "./Mixins";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const CartModal = () => {
  const router = useRouter();

  const { data, dispatch } = useContext(LayoutContext);
  const products = data.cartProduct;

  const cartModalOpen = () => {
    dispatch({
      type: "cartModalToggle",
      payload: !data.cartModal,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await CartService.cartListProduct();

      if (responseData?.Products) {
        dispatch({
          type: "cartProduct",
          payload: responseData.Products,
        });

        dispatch({
          type: "cartTotalCost",
          payload: totalCost(),
        });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeCartProduct = (id) => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    if (cart.length !== 0) {
      cart = cart.filter((item) => item.id !== id);

      localStorage.setItem("cart", JSON.stringify(cart));

      fetchData();

      dispatch({
        type: "inCart",
        payload: cartList(),
      });

      dispatch({
        type: "cartTotalCost",
        payload: totalCost(),
      });
    }

    if (cart.length === 0) {
      dispatch({
        type: "cartProduct",
        payload: null,
      });

      fetchData();

      dispatch({
        type: "inCart",
        payload: cartList(),
      });

      dispatch({
        type: "cartTotalCost",
        payload: 0,
      });
    }
  };

  const handleCheckout = () => {
    if (AuthService.isAuthenticate()) {
      router.push("/checkout");
      cartModalOpen();
    } else {
      router.push("/");

      cartModalOpen();

      dispatch({
        type: "loginSignupError",
        payload: !data.loginSignupError,
      });

      dispatch({
        type: "loginSignupModalToggle",
        payload: !data.loginSignupModal,
      });
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        className={`${
          !data.cartModal ? "hidden" : ""
        } fixed top-0 z-30 w-full h-full bg-black opacity-50`}
      />

      {/* Cart Modal */}
      <section
        className={`${
          !data.cartModal ? "hidden" : ""
        } fixed z-40 inset-0 flex items-start justify-end`}
      >
        <div
          style={{ background: "#303031" }}
          className="w-full md:w-5/12 lg:w-4/12 h-full flex flex-col justify-between"
        >
          <div className="overflow-y-auto">
            {/* Header */}
            <div className="border-b border-gray-700 flex justify-between">
              <div className="p-4 text-white text-lg font-semibold">
                Cart
              </div>

              <div className="p-4 text-white">
                <svg
                  onClick={cartModalOpen}
                  className="w-6 h-6 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Products */}
            <div className="m-4 flex-col">
              {products && products.length > 0 ? (
                products.map((item, index) => (
                  <Fragment key={index}>
                    <div className="text-white flex space-x-2 my-4 items-center">
                      <img
                        className="w-16 h-16 object-cover object-center"
                        src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                        alt={item.pName}
                      />

                      <div className="relative w-full flex flex-col">
                        <div className="my-2">
                          {item.pName}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-400">
                              Quantity:
                            </div>

                            <span className="text-sm text-gray-200">
                              {quantity(item._id)}
                            </span>
                          </div>

                          <div>
                            <span className="text-sm text-gray-400">
                              Subtotal:
                            </span>{" "}
                            ${subTotal(item._id, item.pPrice)}.00
                          </div>
                        </div>

                        {/* Remove */}
                        <div
                          onClick={() =>
                            removeCartProduct(item._id)
                          }
                          className="absolute top-0 right-0 text-white"
                        >
                          <svg
                            className="w-5 h-5 cursor-pointer"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))
              ) : (
                <div className="m-4 text-white text-xl text-center">
                  No product in cart
                </div>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="m-4 space-y-4">
            <div
              onClick={cartModalOpen}
              className="px-4 py-2 border border-gray-400 text-white text-center cursor-pointer"
            >
              Continue shopping
            </div>

            {data.cartTotalCost ? (
              <div
                className="px-4 py-2 bg-black text-white text-center cursor-pointer"
                onClick={handleCheckout}
              >
                Checkout ${data.cartTotalCost}.00
              </div>
            ) : (
              <div className="px-4 py-2 bg-black text-white text-center cursor-not-allowed">
                Checkout
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CartModal;