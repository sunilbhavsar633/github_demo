import axios from "axios";
import { GET_REPO_LIST } from './APIEndpoints';

// const base_url = process.env.REACT_APP_API_BASE_URL || 'https://api.github.com';
const limit = process.env.REACT_APP_LIMIT || 5;
const base_url = 'https://api.github.com';
const token = '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';

export const getRepoList = (callBack, page = 1, parms = "", sort = "updated", order = 'asc') => {
    let apiURL = `${base_url}${GET_REPO_LIST}?`;
    apiURL += `q=Q&`;
    if (parms !== "") {
        // apiURL += `q=${parms}&`;
        apiURL += `q=Q&`;
    } if (apiURL.includes('?')) {
        apiURL += `sort=${sort}&order=${order}&page=${page}&per_page=${limit}`;
    }
    // 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
    axios.get(`${apiURL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function (response) {
        return callBack(null, response?.data || []);
    }).catch(function (error) {
        return callBack(error, null);
    });
}

export const getCodeFreq = (callBack,fullName) => {
    let apiURL = `${base_url}/repos/${fullName}/stats/code_frequency`;
    axios.get(`${apiURL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function (response) {        
        return callBack(null, response?.data || []);
    }).catch(function (error) {
        return callBack(error, null);
    });
}

export const getCommitActivity = (callBack,fullName) => {
    let apiURL = `${base_url}/repos/${fullName}/stats/commit_activity`;
    axios.get(`${apiURL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function (response) {
        return callBack(null, response?.data || []);
    }).catch(function (error) {
        return callBack(error, null);
    });
}

export const getContributorsByPerUser = (callBack,fullName) => {
    let apiURL = `${base_url}/repos/${fullName}/stats/contributors`;
    axios.get(`${apiURL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function (response) {
        return callBack(null, response?.data || []);
    }).catch(function (error) {
        return callBack(error, null);
    });
}
