import React, { useContext, useState } from "react";
import clases from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/Cart-Context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCTX = useContext(CartContext);
  const totalamount = cartCTX.amount.toFixed(2);
  const hasItems = cartCTX.item.length > 0;
  const [isCheckOut, setIsChecOut] = useState(false);
  const REmovefromCartHandeler = (id) => {
    cartCTX.RemoveItem(id);
  };
  const AddToCartHandeler = (item) => {
    cartCTX.AddItemToCart({ ...item, amount: 1 });
  };
  const orderHandeler = () => {
    setIsChecOut(true);
  };
  const cartItem = (
    <ul className={clases["cart-items"]}>
      {cartCTX.item.map((item) => {
        return (
          <li>
            <CartItem
              name={item.name}
              price={item.price}
              amount={item.amount}
              onRemove={REmovefromCartHandeler.bind(null, item.id)}
              onAdd={AddToCartHandeler.bind(null, item)}
            />
          </li>
        );
      })}
    </ul>
  );

  const SubmitData = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://full-stack-sweet-hop-may-2023-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: cartCTX.item,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCTX.ClearCart();
  };

  const cartModalContent = (
    <React.Fragment>
      {cartItem}
      <div className={clases.total}>
        <span>Amount</span>
        <span>{totalamount}</span>
      </div>
      {isCheckOut && (
        <Checkout onCancel={props.onCartClose} onConfirm={SubmitData} />
      )}
      {!isCheckOut && (
        <div className={clases.actions}>
          <button className={clases["button--alt"]} onClick={props.onCartClose}>
            Close
          </button>
          {hasItems && (
            <button className={clases.button} onClick={orderHandeler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={clases.actions}>
        <button className={clases.button} onClick={props.onCartClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
