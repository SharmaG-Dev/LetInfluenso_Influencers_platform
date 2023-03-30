import { createContext, useReducer, useEffect, useContext, useState } from "react";
import axios from "axios";
import app_config from "../../components/config";
import reducer from "../../reducer/InfluencersGetReducer"


// backend url 
const BackendUrl = app_config.backend_url


const InfluencerContext = createContext()



// initialState of reducer 
const initialState = {
    isLoading: false,
    isError: false,
    allInfluencers: [],
}

const InfluencerProvider = ({ children }) => {

    const [CurrentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    )


    // current user Following List and Unfollow List 
    const [Follower, setFollower] = useState([])
    const [Following, setFollowing] = useState([])

    const [state, dispatch] = useReducer(reducer, initialState)

    const GetAllInfluencer = async () => {
        dispatch({ type: "DATA_IS_LOADING" })
        try {
            const res = await axios.get(BackendUrl + "/influencer/getall")
            const data = await res.data
            dispatch({ type: "API_DATA_GET", payload: data })
        } catch (error) {
            dispatch({ type: "GET_ERROR" })
        }

    }

    useEffect(() => {
        GetAllInfluencer()
    }, [])




    // Follow Button
    const Follow = async (id) => {
        try {
            const res = await axios.patch(BackendUrl + "/influencer/follow/" + CurrentUser._id, { secondperson: id })
            if (res.status === 200) {
                await GetAllInfluencer()
                await setCurrentUser(res.data)
                console.log("follow ho gay")
            }
        } catch (error) {
            console.log("error hai follow me ")
        }
    }


    // Follow Button
    const UnFollow = async (id) => {
        try {
            const res = await axios.patch(BackendUrl + "/influencer/unfollow/" + CurrentUser._id, { secondperson: id })
            if (res.status === 200) {
                await GetAllInfluencer()
                await setCurrentUser(res.data)
            }
        } catch (error) {
            console.log("error hai follow me ")
        }
    }

    const currentUserUpdate = async (id) => {
        try {
            const res = await axios.get(BackendUrl, "/influencer/singleUser/" + id)
            const data = res.data
            setCurrentUser(data)
        } catch (error) {
            console.log("single data error")
        }
    }





    return <InfluencerContext.Provider value={{
        ...state,
        currentUserUpdate: currentUserUpdate,
        GetAllInfluencer: GetAllInfluencer,
        Follow: Follow,
        CurrentUser: CurrentUser,
        UnFollow: UnFollow,
        Follower: Follower,
        Following: Following
    }}>
        {children}
    </InfluencerContext.Provider>

}


const useInfluencerContext = () => {
    return useContext(InfluencerContext)
}


export { InfluencerProvider, useInfluencerContext }