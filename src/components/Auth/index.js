import React from "react";
// import Header from "../navbar/header";
import "./Auth.css";
import Animatedbackground from "../Elements/Animatedbackground";
import BrandLogin from "./BrandLogin";
import InfluencerLogin from "./InfluencerLogin";
import { useNavigate } from "react-router-dom";

const Authentications = () => {

  // navigation
  const navigate = useNavigate()






  const Brand = () => {
    let ButtonsLib = document.querySelector(".buttonsib");
    ButtonsLib.style.transition = "0.8s ease";
    ButtonsLib.style.opacity = "0";
    setTimeout(() => {
      ButtonsLib.style.display = "none";
    }, 800);
    setTimeout(() => {
      let formOne = document.querySelector(".formOne");
      let formTwo = document.querySelector(".formTwo");
      formTwo.style.display = "none";
      formOne.style.display = "flex";
      formOne.style.transitions = "0.9s ease";
      formOne.style.opacity = 1;
    }, 300);
  };
  const Influencer = () => {
    let ButtonsLib = document.querySelector(".buttonsib");
    ButtonsLib.style.transition = "0.8s ease";
    ButtonsLib.style.opacity = "0";
    setTimeout(() => {
      ButtonsLib.style.display = "none";
    }, 800);
    setTimeout(() => {
      let formOne = document.querySelector(".formOne");
      let formTwo = document.querySelector(".formTwo");
      formOne.style.display = "none";
      formTwo.style.display = "flex";
      formTwo.style.transitions = "0.9s ease";
      formTwo.style.opacity = 1;
    }, 300);
  };

  // back arrow key
  const back  = () => {
    let formOne= document.querySelector(".formOne")
    let formTwo= document.querySelector(".formTwo")
    let ButtonsLib = document.querySelector(".buttonsib");
    let done= getComputedStyle(formOne).display
    let dtwo= getComputedStyle(formTwo).display
    if ((done === "flex") || (dtwo ==="flex")){
      formOne.style.display = "none"
      formTwo.style.display = "none"
      ButtonsLib.style.display = "flex"
      ButtonsLib.style.opacity = "1"
    }
    else{
      navigate(-1)
    }
  }

  return (
    <div className="MyFullCont d-flex align-items-center justify-content-center">
      <i class="fa-solid fa-arrow-left" onClick={() => {back()}} style={{color:"white",position:"absolute",top:"4%",left:"4%",fontSize:"32px",cursor:"pointer"}}></i>
      {/* <img src={image} alt="influgirl" className="img-fluid"  style={{position:"absolute",bottom:"-50px",left:"0",filter:"drop-shadow(8px 8px 15px rgba(0,0,0,0.5))"}}/> */}
      {/* <Header /> */}
      <Animatedbackground />
      <div
        className="formOne"
        style={{ display: "none", width: "100%", height: "70vh" }}
      >
        <BrandLogin />
      </div>
      <div
        className="formTwo"
        style={{ display: "none", width: "100%", height: "70vh" }}
      >
        <InfluencerLogin />
      </div>
      <div className="buttonsib">
        <button
          onClick={() => {
            Influencer();
          }}
          type="button"
          className=" buttonib"
        >
          I am Influencer
        </button>
        <button
          onClick={() => {
            Brand();
          }}
          type="button"
          className="buttonib"
        >
          I am Brand
        </button>
      </div>
    </div>
  );
};

export default Authentications;
