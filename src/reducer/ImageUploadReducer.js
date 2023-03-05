const imageUploadRed = (state, action) => {

    switch (action.type) {
        case "UPLOAD_IN_PROCESS":
            return {
                ...state,
                isLoading: true,
            }
        case "ERROR_TO_UPLOAD":
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        case "IMAGE_UPLOADED":
            return {
                ...state,
                isError: false,
                isLoading: false,
                imageUploaded: true,
                imageName: action.payload
            }

        default:
            return state;
    }


}


export default imageUploadRed