import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isempty = (value) => value.trim() === "";
const isPhnNoValid = (value) => value.trim().length === 10;
const ispostalCodevalid = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const inputName = useRef();
  const inputPhnNo = useRef();
  const inputHouse = useRef();
  const inputCity = useRef();
  const inputPinCode = useRef();

  const [formIsValid, setFormIsValid] = useState({
    name: true,
    phnNo: true,
    house: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const name = inputName.current.value;
    const phnNo = inputPhnNo.current.value;
    const house = inputHouse.current.value;
    const city = inputCity.current.value;
    const postalCode = inputPinCode.current.value;

    const nameIsValid = !isempty(name);
    const phnNoIsValid = isPhnNoValid(phnNo);
    const houseIsValid = !isempty(house);
    const cityIsValid = !isempty(city);
    const postalCodeIsValid = ispostalCodevalid(postalCode);

    setFormIsValid({
      name: nameIsValid,
      phnNo: phnNoIsValid,
      house: houseIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formValid =
      nameIsValid &&
      phnNoIsValid &&
      houseIsValid &&
      cityIsValid &&
      postalCodeIsValid;

    if (!formValid) {
      return;
    }
    props.onConfirm({
      name,
      phnNo,
      house,
      city,
      postalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formIsValid.name ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formIsValid.city ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formIsValid.postalCode ? "" : classes.invalid
  }`;
  const houseControlClasses = `${classes.control} ${
    formIsValid.house ? "" : classes.invalid
  }`;

  const PhnNoControlClasses = `${classes.control} ${
    formIsValid.phnNo ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputName} />
        {!formIsValid.name && <p>Enter a valid name!</p>}
      </div>
      <div className={PhnNoControlClasses}>
        <label htmlFor="phnno">Phone No</label>
        <input type="text" id="phnno" ref={inputPhnNo} />
        {!formIsValid.phnNo && (
          <p>Enter a valid Phone no, minimum 10 Char long!</p>
        )}
      </div>
      <div className={houseControlClasses}>
        <label htmlFor="house">House No., Building Name</label>
        <input type="text" id="house" ref={inputHouse} />
        {!formIsValid.house && <p>Enter a valid House name!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Area Name, Road, City</label>
        <input type="text" id="city" ref={inputCity} />
        {!formIsValid.city && <p>Enter a valid City!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputPinCode} />
        {!formIsValid.postalCode && (
          <p>Enter a valid Postal cod, minimum 6 charecters long!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
