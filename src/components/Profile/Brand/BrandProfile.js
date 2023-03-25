import React, { useEffect } from "react";
import "./BrandProfile.css";
import BlogCards from "../../Elements/BlogCards";
import { useState } from "react";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useBlogContext } from "../../../Context/Blogs_Requrement_context/BlogContext";
import { ImageContext } from "../../../Context/ImageContex/UploadImagContext";

const BrandProfile = () => {
  // use Navigate
  const navigate = useNavigate();


  // upload image using context 
  const { ImgUpload, imageUploaded, imageName } = ImageContext()

  const { allRequrement, allBlogs, GetAllBlogs } = useBlogContext()


  //   backend url
  const url = app_config.backend_url;


  //   user from sesssion storage
  const [CurrentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  // Delete the Post
  const DeleteThePost = (post) => {
    let result = window.confirm(
      `Are You Sure want To delete This ${post.nameofproduct} Post ? `
    );

    if (result === true) {
      fetch(url + "/requirement/delete/" + post._id, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Post Deleted");
          } else {
            console.log("Post not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Not deleted");
    }
  };

  // Delete the Post
  const DeleteTheBlog = (pst) => {
    let result = window.confirm(
      `Are You Sure want To delete This ${pst.blogTitle} Post ? `
    );

    if (result === true) {
      fetch(url + "/blog/delete/" + pst._id, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Post Deleted");
          } else {
            console.log("Post not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Not deleted");
    }
  };



  //  Form Selector 
  const OpenModal = (e) => {
    let blog = document.querySelector('.blogFormSec');
    let Requirement = document.querySelector('.RequirementFormSec');
    let BlogcardDom = document.querySelector('.BrandBlogCardDisplay');
    let BrandReqCardDom = document.querySelector('.BrandRequirementCardDom');
    let BlogBtnToPost = document.querySelector('.BlogBtnToPost');
    let ReqBtnToPost = document.querySelector('.ReqBtnToPost');
    if (e.target.innerText === "Requirement") {
      Requirement.classList.add("activeForm")
      ReqBtnToPost.classList.add("GreenButton")
      BrandReqCardDom.style.display = "block"
      BlogcardDom.style.display = "none"
      BlogBtnToPost.classList.remove("GreenButton")
      blog.classList.remove("activeForm")
    } else if (e.target.innerText === "Blog") {
      blog.classList.add("activeForm")
      BlogBtnToPost.classList.add("GreenButton")
      BrandReqCardDom.style.display = "none"
      BlogcardDom.style.display = "block"
      ReqBtnToPost.classList.remove("GreenButton")
      Requirement.classList.remove("activeForm")
    }
  };

  // Requrement post form
  const RequirementForm = {
    userid: CurrentUser._id,
    brand: CurrentUser.brandName,
    nameofproduct: "",
    category: "",
    minFollowers: "",
    socialMedia: "",
    experience: "",
    offerPrice: "",
  };
  // Requirement Post Submit
  const RequirementPostSubmit = (formdata) => {
    fetch(url + "/requirement/post", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Post Posted");
          GetAllBlogs()
        } else {
          console.log("Somthing error to post");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // Blog Post Form
  const BlogForm = {
    userId: CurrentUser._id,
    brand: CurrentUser.brandName,
    blogImage: imageName,
    blogTitle: "",
    personRequired: "",
    blogDisc: "",
  };

  // Blog Submit
  const OnBlogSubmit = (formdata) => {
    fetch(url + "/blog/post", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Blog Post");
          console.log(formdata);
          GetAllBlogs()
        } else {
          console.log(formdata);
          console.log("Blog Not post");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };



  // brand cards
  const BrandCards = (post, CompanyName, table) => {
    return (
      <div className="col-md-12 my-3">
        <div className="h-100 p-5 bg-light border rounded-3">
          <h2 className="fw-bolder mb-4 fs-2">{CompanyName}</h2>
          <div>{table}</div>
          <div className="buttonsContBrandCard mt-5">
            <button className="btn SaveBtnCard" type="button">
              Edit
            </button>
            <button
              className="btn DeleteBtnCard mx-3 "
              onClick={() => {
                DeleteThePost(post);
              }}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // requirement Post Table
  const Table = (
    Brand,
    nameOfProduct,
    influecerCate,
    minFollowers,
    OnSocialMedia,
    Experience,
    PriceOffer
  ) => {
    return (
      <table>
        <tr>
          <td>Brand :</td>
          <td>{Brand}</td>
        </tr>
        <tr>
          <td>Name Of Product:</td>
          <td>{nameOfProduct}</td>
        </tr>
        <tr>
          <td>Need Influencer Category:</td>
          <td>{influecerCate}</td>
        </tr>
        <tr></tr>
        <tr>
          <th> Influencers requierment</th>
          <th></th>
        </tr>
        <tr>
          <td>Min-follwers :</td>
          <td>{minFollowers}</td>
        </tr>
        <tr>
          <td> Social Media Active :</td>
          <td>{OnSocialMedia}</td>
        </tr>
        <tr>
          <td>Experience :</td>
          <td>{Experience}</td>
        </tr>
        <tr className="mt-5">
          <th>Offers Price</th>
          <th>{PriceOffer}</th>
        </tr>
      </table>
    );
  };



  // log out
  const LogOut = () => {
    navigate("/");
    sessionStorage.removeItem("user");
  };










  useEffect(() => {
    let btn = document.querySelector('.btnChooseImage')
    if (imageUploaded === false) {
      btn.innerHTML = "Upload"
    } else if (imageUploaded === true) {
      btn.innerHTML = imageName
    }
  },)












  return (
    <div>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row">
          <div className="col-md-2 ">
            <input
              type="file"
              name=""
              id=""
              onChange={(e) => {
                ImgUpload(e);
              }}
              className="FileChooseDialogBox"
              style={{ display: "none" }}
            />
            <div className="profileLinks">
              <div className="ProLink border-bottom my-3 d-flex align-items-center justify-content-start">
                <a href="/">Edit Profile</a>
              </div>
              <div className="ProLink border-bottom my-3 d-flex align-items-center justify-content-start">
                <a href="/">Manage Facebook</a>
              </div>
              <div className="ProLink border-bottom my-3 d-flex align-items-center justify-content-start">
                <a href="/">Manage Instagram</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div
              className="buttonsTopost d-flex align-items-center justify-content-start gap-3 p-4"
              style={{ height: "8rem", background: "#f5f5f5" }}
            >
              <button
                className="ButtonToPost ReqBtnToPost GreenButton"
                onClick={(e) => {
                  OpenModal(e);
                }}
              >
                Requirement
              </button>
              <button
                className="ButtonToPost BlogBtnToPost"
                onClick={(e) => {
                  OpenModal(e);
                }}
              >
                Blog
              </button>
            </div>
            <div
              className="brandBlog-Post row  overflow-auto"
              style={{ maxHeight: "90vh" }}
            >
              <div className="BrandRequirementCardDom">


                {allRequrement.filter((i) => i.userid === CurrentUser._id).reverse().map((pst) =>
                  BrandCards(
                    pst,
                    pst.brand,
                    Table(
                      pst.brand,
                      pst.nameofproduct,
                      pst.category,
                      pst.minFollowers,
                      pst.socialMedia,
                      pst.experience,
                      pst.offerPrice
                    )
                  )
                )}
              </div>

              <div className="BrandBlogCardDisplay" style={{ display: "none" }}>


                {allBlogs.filter((i) => i.userId === CurrentUser._id).reverse().map((blog) => (
                  <BlogCards data={blog} backendUrl={url} />
                ))}

              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="profile d-flex align-items-end"
              style={{ height: "60vh" }}
            >
              <div
                className="card d-flex flex-column align-items-center justify-content-start p-4 position-relative border"
                style={{ width: "100%", height: "80%", boxShadow: "none" }}
              >
                <img
                  src={url + "/uploads/" + CurrentUser.brandavatar}
                  alt=""
                  className="img-fluid rounded-circle border"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    marginTop: "-5rem",
                    border: "8px solid white",
                    boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.5)",
                  }}
                />
                <div
                  className=" w-100 d-flex align-items-center justify-content-between"
                  style={{ height: "6rem", padding: "2px 0px" }}
                >
                  <h1 className="fs-2 fw-bolder">
                    {CurrentUser.brandName}{" "}
                    <span className="fs-6 fw-light">
                      {CurrentUser.slogan
                        ? CurrentUser.slogan
                        : "Write Your Slogan"}
                    </span>{" "}
                  </h1>
                  <img
                    src={url + "/uploads/" + CurrentUser.brandavatar}
                    className="img-fluid"
                    alt=""
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="brandProfileDetailsTable w-100">
                  <table style={{ width: "80%" }}>
                    <tr className="w-100">
                      <td className="w-50">Brand Name </td>
                      <td className="w-50">{CurrentUser.brandName}</td>
                    </tr>
                    <tr className="w-100">
                      <td className="w-50">Id Owner</td>
                      <td className="w-50">{CurrentUser.ownerName}</td>
                    </tr>
                    <tr className="w-100">
                      <td className="w-50">Owner Status</td>
                      <td className="w-50">
                        {CurrentUser.OwnerStatus
                          ? CurrentUser.OwnerStatus
                          : "Not Written"}
                      </td>
                    </tr>
                    <tr className="w-100">
                      <td className="w-50">Email</td>
                      <td className="w-50">{CurrentUser.email}</td>
                    </tr>
                    <tr className="w-100">
                      <td className="w-50">Website Link</td>
                      <td className="w-50">
                        <a href="/">{CurrentUser.websiteLink}</a>
                      </td>
                    </tr>
                    <tr className="w-100">
                      <td className="w-50">Hired Influencers </td>
                      <td className="w-50">
                        <a href="/">0</a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="BrandProfileDashboardBtn position-absolute bottom-5 w-100 px-3 d-flex gap-3">
                  <button className="btn btn-outline-secondary">
                    Edit Profile
                  </button>
                  <button className="btn btn-outline-secondary">
                    Change Avatar
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      LogOut();
                    }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
            <div className="card formSection border p-3" style={{ width: "100%", boxShadow: "none" }}>
              <div className="blogFormSec">
                <Formik
                  initialValues={BlogForm}
                  onSubmit={OnBlogSubmit}
                  enableReinitialize
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <form name="Blog-Form" onSubmit={handleSubmit}>
                      <h2 className="fs-2">Blog Post</h2>
                      <div className="row mt-5">
                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <button
                              type="button"
                              onClick={() => {
                                document.querySelector('.FileChooseDialogBox').click()
                              }}
                              className="btn  btn-outline-secondary btnChooseImage"
                            >
                              Choose Image
                            </button>
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="last">Title Of Blog</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              placeholder=""
                              id="blogTitle"
                              onChange={handleChange}
                              value={values.blogTitle}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="company">Discription Of blog</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              placeholder=""
                              id="blogDisc"
                              onChange={handleChange}
                              value={values.blogDisc}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="phone">Person Tag</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              id="personRequired"
                              placeholder="Required Person"
                              onChange={handleChange}
                              value={values.personRequired}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary mt-5">
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
              <div className="RequirementFormSec activeForm">
                <Formik
                  initialValues={RequirementForm}
                  onSubmit={RequirementPostSubmit}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <form name="Requirement-Form" onSubmit={handleSubmit}>
                      <h2 className="fs-2">Requirement Post</h2>
                      <div className="row mt-5">
                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="first">Name Of Product</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              placeholder=""
                              id="first"
                              name="nameofproduct"
                              onChange={handleChange}
                              value={values.nameofproduct}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="last">Influencer Category</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              placeholder=""
                              id="category"
                              onChange={handleChange}
                              value={values.category}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="company">Min-Followers</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              placeholder=""
                              id="minFollowers"
                              onChange={handleChange}
                              value={values.minFollowers}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="phone">Social Media</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              id="socialMedia"
                              placeholder="Instagram , Facebook , Youtube"
                              onChange={handleChange}
                              value={values.socialMedia}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="email">Min-Exp</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              id="experience"
                              placeholder="3 years"
                              onChange={handleChange}
                              value={values.experience}
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label for="url">Offer Price</label>
                            <input
                              type="text"
                              className="form-control w-100"
                              id="offerPrice"
                              placeholder="$300 - $560"
                              onChange={handleChange}
                              value={values.offerPrice}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn ButtonToPost mt-3 ">
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandProfile;
