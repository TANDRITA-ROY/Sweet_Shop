import React from "react";
import ReactDOM from "react-dom";
import classe from "./Modal.module.css";
const Backdrop = (props) => {
  return <div className={classe.backdrop} />;
};
const ModalOverlay = (props) => {
  return <div className={classe.modal}>{props.children}</div>;
};
const poralElement = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, poralElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        poralElement
      )}
    </>
  );
};

export default Modal;
