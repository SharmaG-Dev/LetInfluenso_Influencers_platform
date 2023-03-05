import React, { useState } from 'react'
import "./InfluencerProfile.css"
import { Fragment } from 'react'
import { Button, Card, Col, Row } from 'reactstrap'
import { InfluProfileTabs, Navlinks, ProfileTabs, itemData, FooterTabs } from '../../dummyArray'
import imagePro from "../../images/imagebg.jpg"
import { Formik } from 'formik'
import { useBlogContext } from "../../../Context/Blogs_Requrement_context/BlogContext";
import { ImageContext } from "../../../Context/ImageContex/UploadImagContext";
import SwitchTabs from '../../Elements/SwitchTabs'
import ImageGallery from '../../Elements/ImageGallery'


const InfluencerProfile = () => {

    // to set active the navalink 
    const [isActive, setIsActive] = useState(0)
    const [isTab, setIsTab] = useState(0)


    // Tabs Controlller 
    const [value, setValue] = React.useState(0);




    return (
        <Fragment>
            <Row>
                <Col sm={2}>
                    <div className="InfluProSidebar p-3">
                        {Navlinks.map((items, index) => (
                            <div key={index} onClick={() => setIsActive(index)} className={`p-3 ${isActive === index ? "InfluencerSideLinkActive" : "InfluencerSideLink"}`}>
                                <h4>{items}</h4>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col sm={6}>
                    <div className="TabsFeedSection p-3">
                        <div
                            className="PostCreateCard d-flex align-items-center justify-content-start gap-3 p-4"
                        >
                            {ProfileTabs.map((tabs, index) => (
                                <button onClick={() => { setIsTab(index) }} key={index} className={`ButtonToPost ${isTab === index ? "GreenButton" : ""}`}
                                >
                                    {tabs}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="PostCreation">

                    </div>
                </Col>
                <Col sm={4}>
                    <div className="IfluPro-UserInfo w-100 position-relative">
                        <img src={imagePro} alt="" className='img-fluid ProfileImageAvatar' />
                        <div className="d-flex flex-column ml-3">
                            <h1 className='profileh1 px-3 py-2'>Mr Jakir Hussain</h1>
                            <h3 className='profileh3 px-3 py-1 '>Lifestyle</h3>
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
                    <div className="InfluProFooter mt-3 w-100">
                        <h2>Create Section</h2>
                        <div className="FooterTabsInfluPro py-3 d-flex align-items-center justify-content-around w-100">
                            {FooterTabs.map((item) => (
                                <div className="Tabs rounded">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default InfluencerProfile