"use client";

// =========================
// WISHLIST
// =========================

export const isWish = (id, wList) => {
  if (wList && wList.includes(id)) {
    return true;
  }

  return false;
};

export const isWishReq = (e, id, setWlist) => {
  if (typeof window === "undefined") {
    return;
  }

  let list = [];

  try {
    const wishList = localStorage.getItem("wishList");

    list = wishList ? JSON.parse(wishList) : [];

    if (!Array.isArray(list)) {
      list = [];
    }
  } catch (error) {
    console.error("Wishlist error:", error);
    list = [];
  }

  if (!list.includes(id)) {
    list.push(id);

    localStorage.setItem(
      "wishList",
      JSON.stringify(list)
    );

    setWlist(list);
  }
};

export const unWishReq = (e, id, setWlist) => {
  if (typeof window === "undefined") {
    return;
  }

  let list = [];

  try {
    const wishList = localStorage.getItem("wishList");

    list = wishList ? JSON.parse(wishList) : [];

    if (!Array.isArray(list)) {
      list = [];
    }
  } catch (error) {
    console.error("Wishlist error:", error);
    list = [];
  }

  const index = list.indexOf(id);

  if (index !== -1) {
    list.splice(index, 1);

    localStorage.setItem(
      "wishList",
      JSON.stringify(list)
    );

    setWlist(list);
  }
};


// =========================
// SLIDER
// =========================

export const nextSlide = (totalImg, slide, setSlide) => {
  if (totalImg <= 0) {
    return;
  }

  if (slide >= totalImg - 1) {
    setSlide(0);
  } else {
    setSlide(slide + 1);
  }
};

export const prevSlide = (totalImg, slide, setSlide) => {
  if (totalImg <= 0) {
    return;
  }

  if (slide <= 0) {
    setSlide(totalImg - 1);
  } else {
    setSlide(slide - 1);
  }
};