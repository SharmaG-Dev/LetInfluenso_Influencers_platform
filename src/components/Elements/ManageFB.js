import { Card, CardContent, makeStyles, TextField } from "@mui/material";
import { useState } from "react";
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import app_config from "../config";
import { Formik } from "formik";
import Swal from "sweetalert2";


const ManageFB = props => {

    const [link, setLink] = useState("");
    const fb_api = app_config.fb_api;
    const url = app_config.backend_url;
    const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('profile')));
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [postList, setPostList] = useState(currentUser.facebook ? currentUser.facebook.posts : []);

    const handleLink = (e) => {
        setLink(e.target.value);
    }

    const addPost = () => {
        setPostList([...postList, link]);
        console.log(postList);
    }

    const fbForm = {
        profileUrl: '',
        avatar: '',
        posts: []
    }

    const onFormSubmit = (value) => {
        value.posts = postList;
        console.log(value);

        const opt = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ facebook: value })
        }

        fetch(url + '/influencer/update/' + currentUser._id, opt)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Facebook Profile Successfully Added!'
                })
                // fetch(url + '/profile/pushupdate/' + profile._id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ socialProfiles: data._id }) })
                //     .then(res => res.json())
                //     .then(data => {
                //         console.log(data)

                //     });
            });
    }


    return (
        <div >
            <div style={{ height: '1rem', backgroundImage: `url(${url + '/inf_back.jfif'})` }}>

            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-3 bg-white" style={{ height: '70vh', width: "100%" }}>
                                <img className="img-fluid" style={{ width: "100%", height: "100vh", backgroundSize: "cover" }} src="https://www.pixelstalk.net/wp-content/uploads/2016/06/Facebook-Wallpapers-HD.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Card style={{ overflow: 'visible' }} >
                            <CardContent >
                                <Formik
                                    initialValues={currentUser.facebook ? currentUser.facebook : fbForm}
                                    onSubmit={onFormSubmit}
                                >
                                    {({
                                        values,
                                        handleChange,
                                        handleSubmit,
                                        isSubmitting
                                    }) => (
                                        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                                            <h3 className="text-center">Manage Facebook Profile</h3>

                                            <TextField className="w-100 mt-5" label="Facebook Profile Url" variant="filled" name="profileUrl" onChange={handleChange} value={values.profileUrl} />
                                            <TextField className="w-100 mt-5" label="Avatar" variant="filled" name="avatar" onChange={handleChange} value={values.avatar} />

                                            <div className="">
                                                <button className="btn btn-primary mt-5 w-100">Submit</button>
                                            </div>

                                        </form>

                                    )}
                                </Formik>

                                {/* <TextField className="w-100 mt-5" label="Post Url" variant="filled" value={link} onChange={handleLink} />
                                <button className="mt-5 btn btn-primary" onClick={addPost}>Add Post</button>
                                <div className="row mt-5">
                                    {postList.map((link, index) => {
                                        return (
                                            <div key={index} className="col-md-4">
                                                <FacebookProvider appId={fb_api}>
                                                    <EmbeddedPost href={link} width="100%" target="_top" />
                                                </FacebookProvider>
                                            </div>
                                        )
                                    })}
                                </div> */}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <TextField className="w-100 mt-5" label="Post Url" variant="filled" value={link} onChange={handleLink} />

                        <button className="mt-5 btn btn-primary" onClick={addPost}>Add Post</button>
                        <div style={{ height: "70vh", overflow: "scroll" }} className="row mt-5">
                            {postList.map((link, index) => {
                                return (
                                    <div key={index} className="col-md-12">
                                        <FacebookProvider appId={fb_api}>
                                            <EmbeddedPost href={link} width="100%" target="_top" />
                                        </FacebookProvider>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ManageFB;