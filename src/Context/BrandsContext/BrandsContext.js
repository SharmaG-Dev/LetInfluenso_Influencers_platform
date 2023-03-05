import { createContext, useEffect, useReducer, useContext } from "react";
import app_config from "../../components/config";
import axios from "axios";
import reducer from "../../reducer/BrandReducer"

const BrandContext = createContext()
const Backend_Url = app_config.backend_url

const initialState = {
    isLoading: false,
    isError: false,
    AllBrands: []
}

const BrandProvider = ({ children }) => {
    // use reducer 
    const [state, dispatch] = useReducer(reducer, initialState);

    const GelAllBrands = async () => {
        dispatch({ type: "API_LOADING" })
        try {
            const res = await axios.get(Backend_Url + "/brand/getall")
            const data = await res.data
            dispatch({ type: "GET_API_DATA", payload: data })
        } catch (error) {
            dispatch({ type: "API_ERROR" })
        }
    }

    useEffect(() => {
        GelAllBrands()
    }, [])



    return <BrandContext.Provider value={{ ...state, GelAllBrands }}>
        {children}
    </BrandContext.Provider>
}

const useBrandContext = () => {
    return useContext(BrandContext)
}


export { BrandProvider, useBrandContext }