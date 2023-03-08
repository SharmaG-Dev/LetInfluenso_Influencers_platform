import { createContext, useReducer, useEffect, useContext } from "react";
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





    return <InfluencerContext.Provider value={{ ...state }}>
        {children}
    </InfluencerContext.Provider>

}


const useInfluencerContext = () => {
    return useContext(InfluencerContext)
}


export { InfluencerProvider, useInfluencerContext }