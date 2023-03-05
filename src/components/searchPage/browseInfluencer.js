import React from "react";
// import Header from '../main/navbar/header';
import "./browseinfluncer.css";
import { useState } from "react";
import app_config from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { useInfluencerContext } from "../../Context/InfluencersContext/InfluencersContext";
// import { Profile } from 'react-facebook';
// import image from "../images/imagebg.jpg";

const BrowseInfluencer = () => {
  const { id } = useParams();
  const url = app_config.backend_url;


  const navigate = useNavigate();

  const { allInfluencers, isLoading, isError } = useInfluencerContext()


  // Follow Button
  const Followed = (e) => {
    if (e.target.innerText === "Followed") {
      e.target.innerText = "Follow";
      e.target.style.background = ""
      e.target.style.color = ""
    } else {
      e.target.innerText = "Followed";
      e.target.style.background = "#00ad65"
      e.target.style.color = "white"
    }
  };

  // profile card
  const ProfileCard = (category, image, name) => {
    return (
      <div className="col-md-6">
        <div
          style={{ height: "20rem" }}
          className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        >
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary">
              {category}
            </strong>
            <h3 className="mb-0">{name}</h3>
            <div className="mb-1 text-muted">Nov 12</div>
            <p className="card-text mb-auto">
              Hello i am influencer who worked for you and make your brand
              famous So Hire me The Price should be negotiable
            </p>
            <div className="d-flex gap-3">
              <button
                onClick={(e) => {
                  Followed(e);
                }}
                className="FollowBtnCard"
              >
                Follow
              </button>
              <button className="FollowBtnCard">Chat</button>
            </div>
          </div>
          <div className="col-auto d-none d-lg-block">
            <img
              className="bd-placeholder-img"
              width="200"
              style={{ height: "100%", objectFit: "cover" }}
              src={url + "/uploads/" + image}
              role="img"
            />
          </div>
        </div>
      </div>
    );
  };


  const toProfile = () => {
    navigate("/show");
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="container-fluid">
        <div className="container">
          <div className="browse_searchBar">
            <input
              type="text"
              name="browse_search"
              id="browse_search"
              placeholder="Search The Influencer"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="content_browsed">
            <div className="container">
              <div className="row mb-2">
                {allInfluencers.map((data) =>
                  ProfileCard(data.category, data.avatar, data.name)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseInfluencer;
