import React from "react";
import image from "../images/influencerGirlTransparent.png";
import { useState } from "react";
import app_config from "../config";
import { Formik } from "formik";

const InfluencerLogin = () => {
  const url = app_config.backend_url;

  // DialogBox
  const DialogBox = () => {
    let dialog = document.querySelector(".InfluDialog");
    dialog.click();
  };

  // Image FIle Name
  const [ImageFileName, setImageFileName] = useState("avatar.jpg");

  // Influencer signup Form
  const InfluencerSignUpForm = {
    username: "",
    name: "",
    category: "",
    email: "",
    contact: "",
    password: "",
    avatar: ImageFileName,
  };

  // Submit Influencer User data
  const InfluencerSignUpSubmit = (formdata) => {
    fetch(url + "/influencer/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("user submit");
        } else {
          console.log("User revoked ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Influencer Login  Form
  const InfluencerLoginForm = {
    email: "",
    password: "",
  };

  // Influencer Log In Submit
  const InfluencerLoginSubmit = (formdata) => {
    fetch(url + "/influencer/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Login Successfully");
        } else {
          console.log("Login Revoked");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Upload influencer avatar
  const UploadInfluencerAvatar = (e) => {
    const file = e.target.files[0];

    const fd = new FormData();
    fd.append("myfile", file);

    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        if (res.status === 200) {
          setImageFileName(file.name);
          console.log("File Uploaded");
        } else {
          console.log("Not Uploaded");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        className="container borderRadius w-75 box-shadow-1  InfluencerLoginDashboard p-0 radius-2"
        style={{ height: "70vh", background: "white", width: "100%" }}
      >
        <img
          src={image}
          alt="influgirl"
          className="img-fluid"
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "0",
            filter: "drop-shadow(8px 8px 15px rgba(0,0,0,0.5))",
          }}
        />
        <div className="row d-flex align-items-center justify-content-center">
          <div
            className="col-md-6 borderRadius backgroundImage "
            style={{ height: "70vh" }}
          >
            <div className="row"></div>
            <Formik
              initialValues={InfluencerLoginForm}
              onSubmit={InfluencerLoginSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit }) => (
                <form
                  className=" d-flex flex-column align-items-center justify-content-center gap-5"
                  style={{ height: "70vh" }}
                  onSubmit={handleSubmit}
                >
                  <h1 className="fs-3">Log In</h1>
                  <div className="form d-flex flex-column align-items-center justify-content-center  gap-3 w-50">
                    <input
                      type="email"
                      name=""
                      id="email"
                      className="form-control w-100"
                      placeholder="Email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <input
                      type="text"
                      name=""
                      id="password"
                      className="form-control w-100"
                      placeholder="password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    <div>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="form-check-input"
                      />{" "}
                      Remember Me
                    </div>
                  </div>
                  <button
                    className="btn btn-primary text-white"
                    style={{ zIndex: "1" }}
                    type="submit"
                  >
                    Log In
                  </button>
                </form>
              )}
            </Formik>
          </div>
    
          <div className="col-md-6">
            <div className="row position-relative ">
              <h1
                className="fs-3 position-absolute"
                style={{ top: "5%", textAlign: "center" }}
              >
                Welcome Influencers Create Account Now
              </h1>
              <Formik
                initialValues={InfluencerSignUpForm}
                onSubmit={InfluencerSignUpSubmit}
                enableReinitialize
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form
                    className="col-md-7 d-flex flex-column align-items-end justify-content-center gap-5 "
                    style={{ height: "70vh" }}
                    onSubmit={handleSubmit}
                  >
                    <div className="form d-flex flex-column align-items-center justify-content-center  gap-3 w-100">
                      <input
                        type="text"
                        name="username"
                        id=""
                        className="form-control w-100"
                        placeholder="userName"
                        onChange={handleChange}
                        value={values.username}
                      />
                      <input
                        type="text"
                        name="name"
                        id=""
                        className="form-control w-100"
                        placeholder="Name"
                        onChange={handleChange}
                        value={values.name}
                      />
                      <input
                        type="text"
                        name="category"
                        id=""
                        className="form-control w-100"
                        placeholder="category"
                        onChange={handleChange}
                        value={values.category}
                      />
                      <input
                        type="text"
                        name="email"
                        id=""
                        className="form-control w-100"
                        placeholder="Email"
                        onChange={handleChange}
                        value={values.email}
                      />
                      <input
                        type="text"
                        name="contact"
                        id=""
                        className="form-control w-100"
                        placeholder="Contact No"
                        onChange={handleChange}
                        value={values.contact}
                      />
                      <input
                        type="text"
                        name="password"
                        id=""
                        className="form-control w-100"
                        placeholder="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-outline "
                      type="submit"
                    >
                      Create Account
                    </button>
                  </form>
                )}
              </Formik>

              <div className="userAvatarChoose col-md-5 d-flex align-items-center justify-content-center">
                <img
                  onClick={() => {
                    DialogBox();
                  }}
                  alt="Avat"
                  src={url + "/uploads/" + ImageFileName}
                  className="avatarImage"
                />
                <input
                  onChange={(e) => {
                    UploadInfluencerAvatar(e);
                  }}
                  type="file"
                  name=""
                  id=""
                  className="d-none InfluDialog"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerLogin;
