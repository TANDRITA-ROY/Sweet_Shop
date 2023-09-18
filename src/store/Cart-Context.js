import React from "react";

const CartContext = React.createContext({
  item: [],
  amount: "",
  AddItemToCart: () => {},
  RemoveItem: () => {},
  ClearCart: () => {},
});

export default CartContext;
