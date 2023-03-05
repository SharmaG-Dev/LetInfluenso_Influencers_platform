import React from "react";

const Modal = (ModalContent) => {
  const ChangeDisplay = () => {
    let modal = document.querySelector(".TheModal");
    modal.style.display = "none";
  };
  return (
    <div className="TheModal position-absolute " style={{ zIndex: "1" }}>
      <div
        className="TheModalContent w-50 h-50 p-4 bg-white rounded position-relative"
        style={{
          boxShadow: "4px 4px 10px rgba(0,0,0,0.1",
          animation: "modal 0.9s ease-in-out",
        }}
      >
        <i
          className="fa-solid fa-xmark position-absolute top-4 right-4"
          onClick={() => {
            ChangeDisplay();
          }}
        ></i>
        {ModalContent}
      </div>
    </div>
  );
};

export default Modal;
