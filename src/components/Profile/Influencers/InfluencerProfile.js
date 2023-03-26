import React, { useState } from 'react'
import "./InfluencerProfile.css"
import { Fragment } from 'react'
import { Button, Card, Col, Input, Row } from 'reactstrap'
import { InfluProfileTabs, Navlinks, ProfileTabs, itemData, FooterTabs } from '../../dummyArray'
import imagePro from "../../images/imagebg.jpg"
import { Formik } from 'formik'
import { useBlogContext } from "../../../Context/Blogs_Requrement_context/BlogContext";
import { ImageContext } from "../../../Context/ImageContex/UploadImagContext";
import SwitchTabs from '../../Elements/SwitchTabs'
import ImageGallery from '../../Elements/ImageGallery'
import { useEffect } from 'react'
import BlogCards from '../../Elements/BlogCards'
import app_config from "../../config";
import UserCard from '../../Elements/UserCard'
import { useInfluencerContext } from '../../../Context/InfluencersContext/InfluencersContext'
import ProfileCardSocial from '../../Elements/ProfileCardSocial'
import EditProfile from './EditProfile'
import EditProfileForm from './EditProfileForm'
import ManageFB from '../../Elements/ManageFB'
import ManageInsta from '../../Elements/ManageInsta'
import ManageYoutube from '../../Elements/ManageYoutube'
import ProfileCardFriends from '../../Elements/ProfileCardFriends'
import BrandCards from '../../Elements/BrandCards'



const InfluencerProfile = () => {

    // context api data of brand profile please change it 
    // upload image using context 
    const { ImgUpload, imageUploaded, imageName } = ImageContext()

    const { allRequrement, allBlogs, GetAllBlogs, allBlogsAndReq } = useBlogContext()


    
    //   backend url
    const url = app_config.backend_url;


    // all the types of data
    const ApiArray = [allBlogsAndReq, allRequrement, allBlogs]


    //   user from sesssion storage
    const [CurrentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );



    // all influencer 
    const allInfluencers = useInfluencerContext().allInfluencers



    // to set active the navalink 
    const [isActive, setIsActive] = useState(0)
    const [isTab, setIsTab] = useState(0)





    const [headerHeight, setHeaderHeight] = useState(null)
    const [TabHeight, setTabHeight] = useState(null)






    return (
        <Fragment>
            <Row>
                <Col sm={3}>
                    <div className="InfluProSidebar p-3">
                        {Navlinks.map((items, index) => (
                            <div key={index} onClick={() => setIsActive(index)} className={`p-3 ${isActive === index ? "InfluencerSideLinkActive" : "InfluencerSideLink"}`}>
                                <h4>{items}</h4>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col sm={9}>
                    {/* {console.log(allBlogsAndReq)} */}
                    <div className={` ${isActive === 0 ? "" : "d-none"}`}>
                        <div className="TabsFeedSection py-3">
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
                        <div className="SearchBoxBlogAndReq w-100 py-2" style={{ height: "40px" }}>
                            <Input style={{ padding: "6px 10px" }} type="text" className='w-75' placeholder='Search blog and requirement...' />
                        </div>
                        <div className="PostCreation d-flex">
                            <div className="PostsSection p-2 " style={{ height: `calc(100vh -  ${TabHeight + "px"})`, overflowY: "auto" }}>
                                {ApiArray[isTab].map((data) => {
                                    return data.blogImage ? (
                                        <BlogCards data={data} backendUrl={url} />
                                    ) :
                                        (
                                            <BrandCards data={data} col={12} />
                                        );
                                })}

                            </div>
                            <div className="friendsSection mt-3" style={{ height: `calc(100vh -  ${TabHeight + "px"})`, overflowY: "auto" }}>

                                <div>
                                    {allInfluencers.slice(0, 5).map((influ) => (
                                        UserCard(influ.avatar, influ.name, influ.username)
                                    ))}
                                    <div className="seeAllButtonInfluUserList d-flex align-items-center justify-content-between p-2">
                                        <small>friend / suggested friends</small>
                                        <h6 style={{ color: "blue", cursor: "pointer" }}>See All</h6>
                                    </div>
                                </div>
                                <div className=' d-flex flex-column align-items-start justify-content-start px-5 py-2'>
                                    <ProfileCardSocial type={"facebookBackground"} />
                                    <ProfileCardSocial type={"instaBackground"} />
                                    <ProfileCardSocial type={"youtubeBackground"} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={` row ${isActive === 1 ? "" : "d-none"}`} >
                        <Col md={6}>
                            <EditProfile headerHeight={headerHeight} />
                        </Col>
                        <Col md={6}>
                            <EditProfileForm />
                        </Col>
                    </div>
                    <div className={`${isActive === 2 ? "" : "d-none"}`}>
                        <ManageFB />
                    </div>
                    <div className={`${isActive === 3 ? "" : "d-none"}`}>
                        <ManageInsta />
                    </div>
                    <div className={`${isActive === 4 ? "" : "d-none"}`}>
                        <ManageYoutube />
                    </div>
                    <div style={{ height: "100vh", overflow: "auto" }} className={`row p-3 container ${isActive === 5 ? "" : "d-none"}`}>

                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}


                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}


                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}
                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}


                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}


                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}
                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}


                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}


                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}
                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}


                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}


                        {ProfileCardFriends(url, "Lifestyle , Food", imagePro, "Pragya Tripathi")}

                    </div>
                </Col>

            </Row>
        </Fragment >
    )
}

export default InfluencerProfile