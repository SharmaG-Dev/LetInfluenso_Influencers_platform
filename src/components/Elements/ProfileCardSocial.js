import React, { Fragment } from 'react'

const ProfileCardSocial = (props) => {
    return (
        <Fragment>
            <div className={`card ProfileCardSocial border ${props.type} `} style={{ width: "18rem", boxShadow: "none" }}>
                <img src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title ProfileCardName text-white">Coding Yaar</h5>
                    <p class="card-text profileCardDetails text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary VisitProfileButton text-white">Know More</a>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileCardSocial