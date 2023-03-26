const InfluencersGet = (state, action) => {

    switch (action.type) {
        case "DATA_IS_LOADING":
            return {
                ...state,
                isLoading: true,
            }
        case "GET_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case "API_DATA_GET":
            return {
                ...state,
                isLoading: false,
                isError: false,
                allInfluencers: action.payload,
            }

        default:
            return state
    }



}



export default InfluencersGet;