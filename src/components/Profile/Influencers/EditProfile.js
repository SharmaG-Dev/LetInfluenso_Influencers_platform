import React from 'react'
import { useState } from 'react';
import { Button } from 'reactstrap';
import app_config from '../../config';
import { InfluProfileTabs, itemData, FooterTabs } from "../../dummyArray"
import ImageGallery from '../../Elements/ImageGallery'

const EditProfile = ({ headerHeight }) => {


    //   backend url
    const url = app_config.backend_url;


    //   user from sesssion storage
    const [CurrentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );


    // Tabs Controlller 
    const [value, setValue] = React.useState(0);

    return (
        <div>
            <div className='influProHeaderMain'>
                <div className="IfluPro-UserInfo w-100 position-relative">
                    <img src={url + "/uploads/" + CurrentUser.avatar} alt="" className='img-fluid ProfileImageAvatar' />
                    <div className="d-flex flex-column ml-3">
                        <h1 className='profileh1 px-3 py-2'>{CurrentUser.name}</h1>
                        <h3 className='profileh3 px-3 py-1 '>{CurrentUser.category}</h3>
                    </div>
                    <Button color='secondary' outline className='EditProFileBtn ' >Edit Profile</Button>
                </div>
                <div className="InfluUserInfo_Tabs mt-5 py-2 d-flex align-items-center gap-3">
                    {InfluProfileTabs.map((item, index) => (
                        <div className={`Tabs rounded ${value === index ? "active" : ""}`} key={index} onClick={() => { setValue(index) }}>
                            <h5>{item}</h5>
                        </div>
                    ))}
                </div>
                <div className="GalleryContainer w-100">
                    <ImageGallery data={itemData} />
                </div>
            </div>
            {/* <div className="InfluProFooter mt-3 w-100" style={{ height: `calc(100vh - ${headerHeight + 20 + "px"}` }}>
                <h2>Create Section</h2>
                <div className="FooterTabsInfluPro py-3 d-flex align-items-center justify-content-around w-100">
                    {FooterTabs.map((item) => (
                        <div className="Tabs rounded">
                            {item}
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    )
}

export default EditProfile