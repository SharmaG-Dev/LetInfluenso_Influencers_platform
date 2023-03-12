import React, { Fragment } from 'react'

const ProfileCardSocial = () => {
    return (
        <Fragment>
            <div class="card ProfileCardSocial border" style={{ width: "18rem" , boxShadow:"none" }}>
                <img src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title ProfileCardName">Coding Yaar</h5>
                    <p class="card-text profileCardDetails">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary VisitProfileButton">Know More</a>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileCardSocial