/**
 * Created by chunting on 2018/8/3.
 */

//import config from './config.js';
//console.log(config)
import $api from './api';
import {Toast, Indicator} from 'mint-ui';
import jsonp from 'jsonp';
let serverUrl = 'http://api.zhangxianfeng.com';
let get = (path, data = {}, source = {}) => {
    data.t = new Date().getTime();
    let url = `${serverUrl + path}`
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',

        },
        params: data,
        //withCredentials: true
        //crossdomain:true
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        }
        return {};
    }).catch(err => {
        console.log('err--->')
    })
};
let get2 = (path, data = {}, source = {}) => {
    let url = `${path}`
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',

        },
        params: data,
        //withCredentials: true
        //crossdomain:true
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
        // params: {
        //     t: new Date().getTime()
        // },
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
    get2,
    post,
    serverUrl
};
export default $api;
