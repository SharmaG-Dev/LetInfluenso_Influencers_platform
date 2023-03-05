import React from "react";

const BlogCards = (
  url,
  image,
  brandName,
  blogTitle,
  time,
  tagged,
  BlogDisc,
  dateOfblog,
  watched,
  commented,
  blog
) => {
  return (
    <div class="col-md-12 mt-3">
      <div class="card ">
        <img
          class="card-img MyBlogCardImage"
          src={url + "/uploads/" + image}
          alt="Bologna"
        />
        <div class="card-img-overlay">
          <a href="/" class="btn btn-light btn-sm">
            {brandName}
          </a>
        </div>
        <div class="card-body" style={{ zIndex: "1" }}>
          <h4 class="card-title TitleOfCard">{blogTitle}</h4>
          <small class="text-muted cat">
            <i class="far fa-clock text-info"></i> {time}
            <i class="fas fa-users UsersCount text-info"></i>{" "}
            {tagged !== "" ? `${tagged} Persons` : "No Tag"}
          </small>
          <p class="card-text">{BlogDisc}</p>
          <button
            type="button"
            className="DeleteBtnCard"
            style={{ float: "right" }}
            onClick={blog}
          >
            Delete
          </button>
        </div>
        <div
          class="card-footer FooterOfCard text-muted d-flex justify-content-between bg-transparent border-top-0"
          style={{ zIndex: "1" }}
        >
          <div class="views">{dateOfblog}</div>
          <div class="stats d-flex gap-2 align-items-center">
            <i class="far fa-eye" style={{ cursor: "pointer" }}></i> {watched}
            <i class="far fa-comment" style={{ cursor: "pointer" }}></i>{" "}
            {commented}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
