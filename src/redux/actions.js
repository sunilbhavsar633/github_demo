import { GET_CONTRIBUTORS,GET_CODE_FREQ ,GET_COMMIT_ACTIVITY,GET_REPO_LIST,SET_LOADING} from './action';

export const getContributorsByPerUser =  (fullName) => {
    return {type:GET_CONTRIBUTORS,fullName}
}

export const getCodeFreq =  (fullName) => {
    return {type:GET_CODE_FREQ,fullName}
}

export const getCommitActivity =  (fullName) => {
    return {type:GET_COMMIT_ACTIVITY,fullName}
}

export const getRepoList =  (page=1) => {
    return {type:GET_REPO_LIST,page}
}

export const getSetLoading =  (isLoading) => {
    return {type:SET_LOADING,action:{payload:{isLoading}}}
}