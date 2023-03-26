import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useInfluencerContext } from "../../Context/InfluencersContext/InfluencersContext";

// profile card
const ProfileCardUser = ({ data, url, follow, CurrentUserFollowingList, UnFollow }) => {






    return (
        <div className="col-md-6">
            <div
                style={{ height: "20rem" }}
                className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
            >
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">
                        {data.category}
                    </strong>
                    <h3 className="mb-0">{data.name}</h3>
                    <div className="mb-1 text-muted">Nov 12</div>
                    <p className="card-text mb-auto">
                        Hello i am influencer who worked for you and make your brand
                        famous So Hire me The Price should be negotiable
                    </p>
                    <div className="d-flex gap-3">
                        <button
                            onClick={(e) => { e.target.innerText === "Follow" ? follow(url, data._id) : UnFollow(url, data._id) }}
                            className="FollowBtnCard"
                        >
                            {CurrentUserFollowingList.includes(data._id) ? "Unfollow" : "Follow"}
                        </button>
                        <button className="FollowBtnCard">Chat</button>
                    </div>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img
                        className="bd-placeholder-img"
                        width="200"
                        style={{ height: "100%", objectFit: "cover" }}
                        src={url + "/uploads/" + data.avatar}
                        role="img"
                    />
                </div>
            </div>
        </div>
    );
};


export default ProfileCardUser