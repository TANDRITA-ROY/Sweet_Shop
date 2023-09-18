import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from ".././../store/Cart-Context";
const MealItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;
  const cartCTX = useContext(CartContext);
  console.log(props.des);
  const AdditemtoCart = (amount) => {
    const item = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
      qty: props.qty,
    };
    cartCTX.AddItemToCart(item);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3 style={{ textAlign: "left" }}>{props.name}</h3>
        <div className={classes.description}>{props.des}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} qty={props.qty} addAmount={AdditemtoCart} />
      </div>
    </li>
  );
};

export default MealItem;
