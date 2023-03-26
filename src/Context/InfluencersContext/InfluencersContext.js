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
    ifFollowLoading: false,
    isFollowed: false,
    isFollowError: false
}

const InfluencerProvider = ({ children }) => {

    const [updatedCurrentUser, serUpdatedCurrentUser] = useState({})


    const [CurrentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    )


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


    const FollowTheUser = async (id) => {
        console.log(id)
        let result;
        try {
            const res = await axios.patch(BackendUrl + "/influencer/follow/" + CurrentUser._id, { secondperson: id })
            if (res.data) {
                currentUserUpdate(CurrentUser._id)
                result = true
            }
        } catch (error) {
            result = false
        }
        return result
    }
    const UnfollowTheUser = async (id) => {
        console.log(id)
        let result;
        try {
            const res = await axios.patch(BackendUrl + "/influencer/unfollow/" + CurrentUser._id, { secondperson: id })
            if (res.data) {
                await currentUserUpdate(CurrentUser._id)
                result = true
            }
        } catch (error) {
            result = false
        }
        return result
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
        FollowTheUser: FollowTheUser,
        UnfollowTheUser: UnfollowTheUser,
        currentUserUpdate: currentUserUpdate,
        GetAllInfluencer: GetAllInfluencer
    }}>
        {children}
    </InfluencerContext.Provider>

}


const useInfluencerContext = () => {
    return useContext(InfluencerContext)
}


export { InfluencerProvider, useInfluencerContext }