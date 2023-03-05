const BrandContextReducer = (state , action) => {

    switch (action.type) {
        case "API_LOADING":
            return {
                ...state , 
                isLoading:true
            }
        case "API_ERROR":
            return {
                ...state ,
                isLoading:false,
                isError:true
            }
        case  "GET_API_DATA":
            return{
                ...state ,
                isLoading:false,
                isError:false,
                AllBrands:action.payload
            }

        default:
            return state
    }


}



export default BrandContextReducer ;