import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import app_config from "../../components/config";
import reducer from "../../reducer/BlogReqReducer"

// backend Url 


const BlogContext = createContext()

// intialState
const initialState = {
    isLoading: false,
    isError: false,
    allBlogs: [],
    allRequrement: [],
    allBlogsReq: [],
    allBlogsAndReq: []
}


const BlogProvider = ({ children }) => {

    const url = app_config.backend_url
    // use reducer 
    const [state, dispatch] = useReducer(reducer, initialState);


    const GetAllBlogs = async () => {
        dispatch({ type: "API_LOADING" })
        try {
            const requirement_res = await axios.get(url + "/requirement/get")
            const blog_res = await axios.get(url + "/blog/get")
            const blogData = await blog_res.data
            const reqdata = await requirement_res.data
            dispatch({ type: "MY_API_DATA", payload: [blogData, reqdata] })
        } catch (error) {
            dispatch({ type: "API_ERROR" })
        }

    }


    useEffect(() => {
        GetAllBlogs(url)
    }, [])



    return <BlogContext.Provider value={{ ...state, GetAllBlogs }}>
        {children}
    </BlogContext.Provider>

}

const useBlogContext = () => {
    return useContext(BlogContext)
}


export { BlogProvider, useBlogContext };