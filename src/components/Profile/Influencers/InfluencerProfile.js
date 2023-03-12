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


    // Tabs Controlller 
    const [value, setValue] = React.useState(0);


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
                </Col>
                {/* <Col sm={4}>
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
                    <div className="InfluProFooter mt-3 w-100" style={{ height: `calc(100vh - ${headerHeight + 20 + "px"}` }}>
                        <h2>Create Section</h2>
                        <div className="FooterTabsInfluPro py-3 d-flex align-items-center justify-content-around w-100">
                            {FooterTabs.map((item) => (
                                <div className="Tabs rounded">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </Col> */}
            </Row>
        </Fragment>
    )
}

export default InfluencerProfile