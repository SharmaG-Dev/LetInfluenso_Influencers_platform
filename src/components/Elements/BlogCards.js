import React from "react";

const BlogCards = ({ backendUrl, data }) => {

  // Delete the Post
  const DeleteTheBlog = (pst) => {
    let result = window.confirm(
      `Are You Sure want To delete This ${pst.blogTitle} Post ? `
    );

    if (result === true) {
      fetch(backendUrl + "/blog/delete/" + pst._id, {
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

  return (
    <div class="col-md-12 mt-3">
      <div class="card " style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
        <img
          class="card-img MyBlogCardImage"
          src={backendUrl + "/uploads/" + data.blogImage}
          alt="Bologna"
        />
        <div class="card-img-overlay">
          <a href="/" class="btn btn-light btn-sm">
            {data.brand}
          </a>
        </div>
        <div class="card-body" style={{ zIndex: "1" }}>
          <h4 class="card-title TitleOfCard">{data.blogTitle}</h4>
          <small class="text-muted cat">
            <i class="far fa-clock text-info"></i> 30 min
            <i class="fas fa-users UsersCount text-info"></i>{" "}
            {data.personRequired !== "" ? `${data.personRequired} Persons` : "No Tag"}
          </small>
          <p class="card-text">{data.blogDisc}</p>
          <button
            type="button"
            className="DeleteBtnCard"
            style={{ float: "right" }}
            onClick={() => DeleteTheBlog(data)}
          >
            Delete
          </button>
        </div>
        <div
          class="card-footer FooterOfCard text-muted d-flex justify-content-between bg-transparent border-top-0"
          style={{ zIndex: "1" }}
        >
          <div class="views">12 oct 2022</div>
          <div class="stats d-flex gap-2 align-items-center">
            <i class="far fa-eye" style={{ cursor: "pointer" }}></i> 2045
            <i class="far fa-comment" style={{ cursor: "pointer" }}></i>{" "}
            35
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
