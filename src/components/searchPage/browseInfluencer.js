import React from "react";
// import Header from '../main/navbar/header';
import "./browseinfluncer.css";
import { useState } from "react";
import app_config from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { useInfluencerContext } from "../../Context/InfluencersContext/InfluencersContext";
import ProfileCardUser from "../Elements/ProfileCardUser";
import axios from "axios";
// import { Profile } from 'react-facebook';
// import image from "../images/imagebg.jpg";

const BrowseInfluencer = () => {
  const { id } = useParams();
  const url = app_config.backend_url;

  // current user 
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  )



  const navigate = useNavigate();

  const { allInfluencers, isLoading, isError } = useInfluencerContext()


  const { FollowTheUser, UnfollowTheUser, GetAllInfluencer } = useInfluencerContext();

  const [buttonText, setButtonText] = useState("Follow");
  const CurrentUserFollowingList = [...new Set(currentUser.following)];
  const CurrentUserFollowerList = [...new Set(currentUser.followers)];
  const bothsideFollow = [...new Set(CurrentUserFollowingList.filter(element => CurrentUserFollowerList.includes(element)))];


  const [removeList, setRemoveList] = useState([])

  const RemoveCard = (id => {
    const arr = [...removeList, id]
    setRemoveList(arr)
  })



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
                {allInfluencers.filter(item => item._id !== currentUser._id).filter(item => removeList.includes(item._id) === false).map((data) =>
                  <ProfileCardUser data={data} url={url} removeFunction={RemoveCard} />
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
