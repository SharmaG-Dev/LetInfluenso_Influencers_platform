import React from 'react'
import { Button } from 'reactstrap'
import app_config from '../config';

const UserCard = (image, name, UserName,) => {

    //   backend url
    const url = app_config.backend_url;
    return (
        <div className=' d-flex border w-100 rounded mt-2' style={{ height: "6rem" }}>
            <div className="UserCardImgArea d-flex align-items-center justify-content-center" style={{ flex: "1" }}>
                <img src={url + "/uploads/" + image} alt="avataruser" className='rounded-circle' style={{ height: "4.5rem", width: "4.5rem", backgroundSize: "cover", backgroundPosition: "centerFF" }} />
            </div>
            <div className="UserCardTextArea d-flex justify-content-between px-2" style={{ flex: "3.5" }}>
                <div className="texts d-flex flex-column align-items-start justify-content-center gap-1 p-2 ">
                    <h5>{name}</h5>
                    <small>{UserName}</small>
                </div>
                <div className="follow_unfollow d-flex align-items-center justify-content-end ">
                    <Button outline className='userListCardBtn' >Follow</Button>
                </div>
            </div>
        </div>
    )
}

export default UserCard