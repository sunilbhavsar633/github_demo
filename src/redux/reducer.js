import { SET_CONTRIBUTORS, SET_CODE_FREQ, SET_COMMIT_ACTIVITY, SET_REPO_LIST,SET_LOADING } from "./action"
const initialState = {
    contributors: [],
    codeFrequency: [],
    commitActivity: [],
    repoList: [],
    isLoading:true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTRIBUTORS:
            return {
                ...state,
                ...action.paylod
            }
        case SET_CODE_FREQ:
            return {
                ...state,
                ...action.paylod
            }
        case SET_COMMIT_ACTIVITY:
            return {
                ...state,
                ...action.paylod
            }
        case SET_REPO_LIST:
            return {
                ...state,
                ...action.paylod
            }
        case SET_LOADING:
            return {
                ...state,
                ...action.paylod
            }
        default:
            return state;
    }
}