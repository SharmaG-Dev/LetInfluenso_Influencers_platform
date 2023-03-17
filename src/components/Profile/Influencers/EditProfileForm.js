import React from 'react'
import { useState } from 'react';
import { Input } from 'reactstrap';
import app_config from '../../config';

const EditProfileForm = () => {



    //   backend url
    const url = app_config.backend_url;



    // Image FIle Name
    const [ImageFileName, setImageFileName] = useState("avatar.jpg");

    // Upload influencer avatar
    const UploadInfluencerAvatar = (e) => {
        const file = e.target.files[0];

        const fd = new FormData();
        fd.append("myfile", file);

        fetch(url + "/util/uploadfile", {
            method: "POST",
            body: fd,
        })
            .then((res) => {
                if (res.status === 200) {
                    setImageFileName(file.name);
                    console.log("File Uploaded");
                } else {
                    console.log("Not Uploaded");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };



    // DialogBox
    const DialogBox = () => {
        let dialog = document.querySelector(".InfluDialog");
        dialog.click();
    };

    return (
        <div className='position-relative  p-3 w-100'>
            <h1 className='fs-2 position-absolute'>Edit Your Profile</h1>
            <div className="EditProfileFormsec d-flex align-items-center justify-content-end">
                <div className="userAvatarChoose col-md-5 d-flex align-items-center justify-content-center">
                    <img
                        onClick={() => {
                            DialogBox();
                        }}
                        alt="Avat"
                        src={url + "/uploads/" + ImageFileName}
                        className="avatarImage"
                    />
                    <input
                        onChange={(e) => {
                            UploadInfluencerAvatar(e);
                        }}
                        type="file"
                        name=""
                        id=""
                        className="d-none InfluDialog"
                    />
                </div>
            </div>
            <form className="UpdatationEditForm w-100 mt-3">
                <Input className='w-100 mb-3' type="text" placeholder='Name' />
                <Input className='w-100 mb-3' type="text" placeholder='UserName' />
                <Input className='w-100 mb-3' type="text" placeholder='Email' />
                <Input className='w-100 mb-3' type="text" placeholder='Contact No ' />
                <Input className='w-100 mb-3' type="text" placeholder='Website Link' />
                <Input className='w-100 mb-3' type="text" placeholder='Profession' />
                <Input className='w-100 mb-3' type="text" placeholder='Price/h' />
                <Input className='w-100 mb-3' type="text" placeholder='Followers Count' />
                <Input className='w-100 mb-3' type="text" placeholder='Instagram Username' />
                <Input className='w-100 mb-3' type="text" placeholder='Experience' />
            </form>
        </div>
    )
}

export default EditProfileForm