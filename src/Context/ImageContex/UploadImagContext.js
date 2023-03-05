import app_config from "../../components/config";
import { createContext, useReducer } from "react";
import { useContext } from "react";
import reducer from "../../reducer/ImageUploadReducer"


const BackendUrl = app_config.backend_url

const ImageUploader = createContext()

const initialState = {
    isError: false,
    isLoading: false,
    imageUploaded: false,
    imageName: ""
}


const ImageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const ImgUpload = (e) => {
        dispatch({ type: "UPLOAD_IN_PROCESS" })
        const file = e.target.files[0];

        const fd = new FormData();
        fd.append("myfile", file);

        fetch(BackendUrl + "/util/uploadfile", {
            method: "POST",
            body: fd,
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch({ type: "IMAGE_UPLOADED", payload: file.name })
                    console.log("Image uploaded");
                } else {
                    console.log("File Not Uploaded");
                }
            })
            .catch((err) => {
                dispatch({ type: "ERROR_TO_UPLOAD" })
            });
    }

    return (
        <ImageUploader.Provider value={{ ...state, ImgUpload }}>
            {children}
        </ImageUploader.Provider>
    )
}


const ImageContext = () => {
    return useContext(ImageUploader)
}



export { ImageContextProvider, ImageContext }