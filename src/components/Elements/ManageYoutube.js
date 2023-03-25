import { useState } from "react";
import Swal from "sweetalert2";
import app_config from "../config";
import { Formik } from "formik";
import { Card, CardContent, Container, TextField } from "@mui/material";



const ManageYoutube = props => {

    const [postList, setPostList] = useState([]);
    const [link, setLink] = useState("");
    const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('profile')));
    const url = app_config.backend_url;


    const handleLink = (e) => {
        setLink(e.target.value);
    }

    const addPost = () => {
        setPostList([...postList, link]);
        console.log(postList);
    }

    const youtubeForm = {
        title: '',
        profileUrl: '',
        avatar: '',
        posts: []
    }

    const onFormSubmit = (value) => {
        value.posts = postList;
        console.log(value);

        const opt = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ platform: 'youtube', data: value })
        }

        fetch(url + '/social/add', opt)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                fetch(url + '/profile/pushupdate/' + profile._id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ socialProfiles: data._id }) })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        Swal.fire({
                            title: 'Success',
                            icon: 'success',
                            text: 'Youtube Profile Successfully Added!'
                        })
                    });
            });
    }


    return (
        <Container>
            <div className="col-md-10 mx-auto" style={{ marginTop: '5rem' }}>
                <Card>
                    <CardContent>

                        <Formik
                            initialValues={youtubeForm}
                            onSubmit={onFormSubmit}
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-center">Manage Youtube Profile</h3>

                                    <TextField className="w-100 mt-5" label="Youtube Channel Url" variant="filled" name="profileUrl" onChange={handleChange} />
                                    <TextField className="w-100 mt-5" label="Avatar" variant="filled" name="avatar" onChange={handleChange} />

                                    <div className="">
                                        <button className="btn btn-primary mt-5 w-100">Submit</button>
                                    </div>

                                </form>

                            )}
                        </Formik>


                        <div className="row mt-5">
                            {postList.map((link) => {
                                return (
                                    <div className="col-md-6">
                                        <iframe width="100%" height="400" src={"https://www.youtube.com/embed/" + link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                )
                            })}
                        </div>


                        <TextField className="w-100 mt-5" label="Video ID" variant="filled" value={link} onChange={handleLink} />

                        <button className="mt-5 btn btn-primary" onClick={addPost}>Add Post</button>

                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}

export default ManageYoutube;