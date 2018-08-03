/**
 * Created by chunting on 2018/8/3.
 */
import axios from 'axios';

//import config from './config.js';
//console.log(config)
let serverUrl = 'http://api.zhangxianfeng.com';
let get = (path, data = {}, source = {}) => {
    console.log(data)
    data.t = new Date().getTime();
    let url = `${serverUrl + path}`
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        params: data,
        //withCredentials: true
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        }
        return {};
    }).catch(err => {
        console.log('err--->')
    })
};
let post = (path, data = {}) => {
    let  url = `${serverUrl + path}`;
    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            t: new Date().getTime()
        },
        //withCredentials: true,
        data: data
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        } else {
            return {};
        }
    }).catch(err => {
        console.log('err--->')
    })
};

const $api = {
    get,
    post,
    serverUrl
};
export default $api;
