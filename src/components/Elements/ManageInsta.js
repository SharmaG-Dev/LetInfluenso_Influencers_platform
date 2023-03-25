
import { useState } from "react";
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import app_config from "../config";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { Card, CardContent, Container, TextField } from "@mui/material";


const ManageInsta = props => {


    const [link, setLink] = useState("");
    const fb_api = app_config.fb_api;
    const url = app_config.backend_url;
    const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('profile')));
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [postList, setPostList] = useState([]);


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
            body: JSON.stringify({ instagram: value })
        }

        fetch(url + '/influencer/update/', currentUser._id, opt)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Facebook Profile Successfully Added!'
                })
                // fetch(url + '/profile/pushupdate/' + profile._id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ socialProfiles: data._id }) })
                //   .then(res => res.json())
                //   .then(data => {

                //   });
            });
    }


    return (
        <Container>
            <div className="col-md-10 mx-auto" style={{ marginTop: '5rem' }}>
                <Card >
                    <CardContent>
                        <Formik
                            initialValues={currentUser.Instagram ? currentUser.Instagram : fbForm}
                            onSubmit={onFormSubmit}
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-center">Manage Instagram Profile</h3>

                                    <TextField className="w-100 mt-5" label="Facebook Profile Url" variant="filled" name="profileUrl" onChange={handleChange} value={values.profileUrl} />
                                    <TextField className="w-100 mt-5" label="Avatar" variant="filled" name="avatar" onChange={handleChange} value={values.avatar} />

                                    <div className="">
                                        <button className="btn btn-primary mt-5 w-100">Submit</button>
                                    </div>

                                </form>

                            )}
                        </Formik>

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
                        </div>
                        <TextField className="w-100 mt-5" label="Post Url" variant="filled" value={link} onChange={handleLink} />

                        <button className="mt-5 btn btn-primary" onClick={addPost}>Add Post</button>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}

export default ManageInsta;