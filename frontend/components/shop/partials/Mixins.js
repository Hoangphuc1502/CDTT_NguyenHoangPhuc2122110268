export const subTotal = (id, price) => {
  const carts = JSON.parse(localStorage.getItem("cart")) || [];

  const item = carts.find((item) => item.id === id);

  return item ? item.quantitiy * price : 0;
};

export const quantity = (id) => {
  const carts = JSON.parse(localStorage.getItem("cart")) || [];

  const item = carts.find((item) => item.id === id);

  return item ? item.quantitiy : 0;
};

export const totalCost = () => {
  const carts = JSON.parse(localStorage.getItem("cart")) || [];

  return carts.reduce(
    (total, item) => total + item.quantitiy * item.price,
    0
  );
};