// profile card
const ProfileCardFriends = (url, category, image, name) => {
    // Follow Button
    const Followed = (e) => {
        if (e.target.innerText === "Follow Back") {
            e.target.innerText = "Followed";
            e.target.style.background = ""
            e.target.style.color = ""
        } else {
            e.target.innerText = "Follow Back";
            e.target.style.background = "#00ad65"
            e.target.style.color = "white"
        }
    };

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
                            Follow Back
                        </button>
                        <button className="DeleteBtnCard ">Block</button>
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

export default ProfileCardFriends;