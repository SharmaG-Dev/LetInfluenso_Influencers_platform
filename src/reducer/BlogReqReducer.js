

const BlogAndReqReducer = (state, action) => {


    switch (action.type) {
        case "API_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case "MY_API_DATA":
            return {
                ...state,
                isLoading: false,
                isError: false,
                allBlogs: action.payload[0],
                allRequrement: action.payload[1],
                allBlogsReq: [...action.payload[0]].sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) }),
                allBlogsAndReq: [...action.payload[0], ...action.payload[1]].map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
            }

        default:
            return {
                ...state
            }
    }
}

export default BlogAndReqReducer;