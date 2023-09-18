import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const amountEntered = useRef();
  const [validForm, setvalidForm] = useState(true);
  const enteramountHandeler = (event) => {
    event.preventDefault();
    const amountNew = amountEntered.current.value;
    const amountNewNo = +amountNew;
    if (amountNew.trim().length < 0 || amountNewNo < 1) {
      setvalidForm(false);
      return;
    }
    props.addAmount(amountNewNo);
  };

  return (
    <form className={classes.form} onSubmit={enteramountHandeler}>
      <Input
        ref={amountEntered}
        label={"Qty (" + props.qty + ")"}
        input={{
          type: "number",
          min: " 1",
          max: "5",
          step: "1",
          id: "amount" + props.id,
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
