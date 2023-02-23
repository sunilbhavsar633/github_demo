import { takeEvery,put } from 'redux-saga/effects'
import { GET_CONTRIBUTORS,SET_CONTRIBUTORS,GET_CODE_FREQ,SET_CODE_FREQ,GET_COMMIT_ACTIVITY,SET_COMMIT_ACTIVITY, SET_REPO_LIST,GET_REPO_LIST } from './action';
import axios from "axios";
import { GET_REPO } from '../API/APIEndpoints';

// const base_url = process.env.REACT_APP_API_BASE_URL || 'https://api.github.com';
// const limit = process.env.REACT_APP_LIMIT || 5;
const limit = 5;
const base_url = 'https://api.github.com';
// const token = process.env.REACT_APP_GIT_TOKEN || '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';
const token =  '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';


function* getContributors(params) {
    const apiURL = `${base_url}/repos/${params.fullName}/stats/contributors`;
    const resp = yield axios.get(`${apiURL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const { data } = yield resp;
    yield put({type:SET_CONTRIBUTORS,paylod:{isLoading:false,contributors:data}})
}

function* getCodeFreq(params){
    const apiURL = `${base_url}/repos/${params.fullName}/stats/code_frequency`;
    const resp = yield axios.get(`${apiURL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const {data } = yield resp;
    yield put({type:SET_CODE_FREQ,paylod:{isLoading:false,codeFrequency:data}})
}
function* getCommitActivity(params){
    const apiURL = `${base_url}/repos/${params.fullName}/stats/commit_activity`;
    const resp = yield axios.get(`${apiURL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const {data } = yield resp;
    yield put({type:SET_COMMIT_ACTIVITY,paylod:{isLoading:false,commitActivity:data}})
}

function*  getRepoList(params) {
    const sort='updated';
    const order='asc';
    const page=params?.page ||1;
    const apiURL = `${base_url}${GET_REPO}?q=Q&sort=${sort}&order=${order}&page=${page}&per_page=${limit}`;
    const resp = axios.get(`${apiURL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const {data } = yield resp;
    yield put({type:SET_REPO_LIST,paylod:{isLoading:false,repoList:data}})
}

function* sagaAction() {
    yield takeEvery(GET_CONTRIBUTORS, getContributors);
    yield takeEvery(GET_CODE_FREQ, getCodeFreq);
    yield takeEvery(GET_COMMIT_ACTIVITY, getCommitActivity);
    yield takeEvery(GET_REPO_LIST, getRepoList);
}
export default sagaAction;