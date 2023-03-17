import React, { Fragment } from 'react'

const ProfileCardSocial = (props) => {
    return (
        <Fragment>
            <div className={`card ProfileCardSocial border ${props.type} `} style={{ width: "18rem", boxShadow: "none" }}>
                <img src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title ProfileCardName text-white">Abhishek sharma</h5>
                    <div class="card-text profileCardDetails text-white">
                        <table>
                            <td>
                                <tr>Followers</tr>
                                <tr>125K</tr>
                            </td>
                            &nbsp;
                            &nbsp;
                            <td>
                                <tr>Folllwings</tr>
                                <tr>24k</tr>
                            </td>
                            &nbsp;
                            &nbsp;
                            <td>
                                <tr>Posts </tr>
                                <tr>345</tr>
                            </td>
                        </table>


                    </div>
                    <a href="#" class="btn  VisitProfileButton mt-1" >Visit Profile</a>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileCardSocial