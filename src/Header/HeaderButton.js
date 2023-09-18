import React, { useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import classes from "./HeaderButton.module.css";
import CartContext from "../store/Cart-Context";
const HeaderButton = (props) => {
  const CartCntx = useContext(CartContext);
  const [bumpButton, setBumpButton] = useState(false);
  const totalItem = CartCntx.item.reduce((curVal, item) => {
    return curVal + item.amount;
  }, 0);
  const buttonCls = `${classes.button} ${bumpButton ? classes.bump : ""}`;
  useEffect(() => {
    if (CartCntx.item.length > 0) {
      setBumpButton(true);
    }
    const timer = setTimeout(() => {
      setBumpButton(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [CartCntx.item]);
  return (
    <button className={buttonCls} onClick={props.onclick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>View Cart</span>
      <span className={classes.badge}>{totalItem}</span>
    </button>
  );
};

export default HeaderButton;
