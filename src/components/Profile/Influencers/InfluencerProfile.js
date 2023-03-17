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
import { useEffect } from 'react'
import BlogCards from '../../Elements/BlogCards'
import app_config from "../../config";
import UserCard from '../../Elements/UserCard'
import { useInfluencerContext } from '../../../Context/InfluencersContext/InfluencersContext'
import ProfileCardSocial from '../../Elements/ProfileCardSocial'
import EditProfile from './EditProfile'
import EditProfileForm from './EditProfileForm'



const InfluencerProfile = () => {

    // context api data of brand profile please change it 
    // upload image using context 
    const { ImgUpload, imageUploaded, imageName } = ImageContext()

    const { allRequrement, allBlogs, GetAllBlogs } = useBlogContext()



    //   backend url
    const url = app_config.backend_url;


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


    // useEffect(() => {
    //     let container = document.querySelector('.influProHeaderMain')
    //     setHeaderHeight(container.clientHeight)
    //     let header = document.querySelector('.TabsFeedSection')
    //     setTabHeight(header.clientHeight)
    // },)



    // Delete the Post
    const DeleteTheBlog = (pst) => {
        let result = window.confirm(
            `Are You Sure want To delete This ${pst.blogTitle} Post ? `
        );

        if (result === true) {
            fetch(url + "/blog/delete/" + pst._id, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("Post Deleted");
                    } else {
                        console.log("Post not found");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("Not deleted");
        }
    };


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
                    <div className='d-none'>
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
                        <div className="PostCreation d-flex ">
                            <div className="PostsSection p-2" style={{ height: `calc(100vh -  ${TabHeight + "px"})`, overflowY: "auto" }}>
                                {allBlogs.reverse().map((blog) => (
                                    BlogCards(
                                        url,
                                        blog.blogImage,
                                        blog.brand,
                                        blog.blogTitle,
                                        "30 min",
                                        blog.personRequired,
                                        blog.blogDisc,
                                        "12 oct 2022",
                                        "2045",
                                        "35",
                                        () => { DeleteTheBlog(blog) }
                                    )
                                ))}
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
                    <Row >
                        <Col md={6}>
                            <EditProfile headerHeight={headerHeight} />
                        </Col>
                        <Col md={6}>
                            <EditProfileForm />
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Fragment>
    )
}

export default InfluencerProfile