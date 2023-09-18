import React from "react";
import SweetImg from "../assets/SweetBackground.jpg";
import clases from "./Header.module.css";
import HeaderButton from "./HeaderButton";
const Header = (props) => {
  return (
    <>
      <header className={clases.header}>
        <h1>Sweet Shopers Stop</h1>
        <HeaderButton onclick={props.onShow} />
      </header>
      <div className={clases["main-image"]}>
        <img src={SweetImg} alt="Delicios Sweet Shop" />
      </div>
    </>
  );
};

export default Header;
