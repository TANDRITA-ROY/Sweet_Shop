import React, { useReducer } from "react";
import CartContext from "./Cart-Context";
const defaultCartItem = {
  items: [],
  amount: 0,
};
const CartActions = (state, action) => {
  if (action.type === "ADD") {
    const updatedAmount = state.amount + action.item.price * action.item.amount;
    let updatedItems;

    const exsistingitemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exsistingItem = state.items[exsistingitemIndex];
    if (exsistingItem) {
      let updatedItem = {
        ...exsistingItem,
        amount: exsistingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exsistingitemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, amount: updatedAmount };
  }
  if (action.type === "REMOVE") {
    const exsisigItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exsistingItem = state.items[exsisigItemIndex];
    const amount = state.amount - exsistingItem.price;
    let updatedItems;
    if (exsistingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== exsistingItem.id);
    } else {
      const updatdItem = { ...exsistingItem, amount: exsistingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[exsisigItemIndex] = updatdItem;
    }
    return { items: updatedItems, amount: amount };
  }
  if (action.type === "CLEAR") {
    return defaultCartItem;
  }
  return defaultCartItem;
};
const ContetProvider = (props) => {
  const [CartItems, dispatchCartItems] = useReducer(
    CartActions,
    defaultCartItem
  );

  const AddItemToCartHandler = (item) => {
    dispatchCartItems({ type: "ADD", item: item });
  };
  const RemoveItemHandelr = (id) => {
    dispatchCartItems({ type: "REMOVE", id: id });
  };
  const ClearCratHandeler = () => {
    dispatchCartItems({ type: "CLEAR" });
  };
  const CartContextVal = {
    item: CartItems.items,
    amount: CartItems.amount,
    AddItemToCart: AddItemToCartHandler,
    RemoveItem: RemoveItemHandelr,
    ClearCart: ClearCratHandeler,
  };
  return (
    <CartContext.Provider value={CartContextVal}>
      {props.children}
    </CartContext.Provider>
  );
};

export default ContetProvider;
