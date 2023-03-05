import React from "react";
import image from "../images/influencerGirlTransparent.png";
// import { SweetAlert2 } from "sweetalert2-react-content";
import { Formik } from "formik";
import app_config from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BrandLogin = () => {
  // useNavigate
  const navigate = useNavigate();

  // backend url
  const url = app_config.backend_url;

  // Image FIle Name
  const [ImageFileName, setImageFileName] = useState("avatar.jpg");

  // Brand Login Form
  const BrandLogin = {
    email: "",
    password: "",
  };

  // Brand user Login submit
  const BrandLoginSubmit = (formdata) => {
    fetch(url + "/brand/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Login Successfully");
          res.json().then((data) => {
            navigate("/brandpro");
            sessionStorage.setItem("user", JSON.stringify(data));
          });
        } else {
          console.log("Login Revoked");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Brand SignUp  Form
  const SignUpForm = {
    username: "",
    brandName: "",
    ownerName: "",
    email: "",
    contact: "",
    websiteLink: "",
    password: "",
    brandavatar: ImageFileName,
  };

  // Submite Brand User data
  const BrandSubmit = (formdata) => {
    fetch(url + "/brand/add", {
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

  // upload the avatar
  const UploadBrandAvatar = (e) => {
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

  // DialogBox
  const DialogBox = () => {
    let dialog = document.querySelector(".OpenDialog");
    dialog.click();
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        className="container borderRadius w-75 box-shadow-1  InfluencerLoginDashboard p-0"
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
            className="col-md-6 borderRadius backgroundImage"
            style={{ height: "70vh" }}
          >
            <Formik
              initialValues={BrandLogin}
              onSubmit={BrandLoginSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit }) => (
                <form
                  className="d-flex flex-column align-items-center justify-content-center gap-5"
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
                      placeholder="Password"
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
          {/* <hr
            style={{
              padding: "0",
              margin: "0",
              width: "1px",
              height: "60vh",
              background: "black",
            }}
          /> */}
          <div className="col-md-6">
            <div className="row position-relative">
              <h1
                className="fs-3 position-absolute"
                style={{ top: "5%", textAlign: "center" }}
              >
                Let's Join us Brand
              </h1>
              <Formik
                initialValues={SignUpForm}
                onSubmit={BrandSubmit}
                enableReinitialize
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form
                    className=" col-md-6 d-flex flex-column align-items-end justify-content-center gap-5"
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
                        required
                      />
                      <input
                        type="text"
                        name="ownerName"
                        id=""
                        className="form-control w-100"
                        placeholder="Name"
                        onChange={handleChange}
                        value={values.ownerName}
                        required
                      />
                      <input
                        type="text"
                        name="brandName"
                        id=""
                        className="form-control w-100"
                        placeholder="Company Brand Name"
                        onChange={handleChange}
                        value={values.brandName}
                        required
                      />
                      <input
                        type="text"
                        name="websiteLink"
                        id=""
                        className="form-control w-100"
                        placeholder="Website Link"
                        onChange={handleChange}
                        value={values.websiteLink}
                        required
                      />
                      <input
                        type="text"
                        name="email"
                        id=""
                        className="form-control w-100"
                        placeholder="Brand Email"
                        onChange={handleChange}
                        value={values.email}
                        required
                      />
                      <input
                        type="text"
                        name="contact"
                        id=""
                        className="form-control w-100"
                        placeholder="Contact No"
                        onChange={handleChange}
                        value={values.contact}
                        required
                      />
                      <input
                        type="text"
                        name="password"
                        id=""
                        className="form-control w-100"
                        placeholder="password"
                        onChange={handleChange}
                        value={values.password}
                        required
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-outline"
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
                  // onChange={(e) => {ChangeImage(e)}}
                  src={url + "/uploads/" + ImageFileName}
                  className="avatarImage"
                />
                <input
                  onChange={(e) => {
                    UploadBrandAvatar(e);
                  }}
                  type="file"
                  name="image"
                  id="image"
                  className="d-none OpenDialog"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandLogin;
