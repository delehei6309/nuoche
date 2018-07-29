/**
 * Created by hekk on 2017/7/23.
 */
import Promise from 'promise-polyfill';


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

import 'whatwg-fetch';
const devUrl = 'http://xxx.dev';
const testUrl = 'https://xxx.test';
const productionUrl = 'https://xxx.production';
let serverUrl = devUrl;
if (process.env.kingold == 'test') {
    serverUrl = testUrl;
}
if (process.env.kingold == 'production') {
    serverUrl = productionUrl;
}
let $query = (data) => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            } else {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(data[key])));
            }
        }
    }
    return str.join('&');
};
let get = (path, data = {}) => {
    let t = new Date().getTime();
    let url = `${serverUrl + path}?t=${t}&${$query(data)}`
    return fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).catch(err => {
        console.error('error,--->', err);
    });
};
let post = (path, data = {}) => {

    let t = new Date().getTime();
    let url = `${serverUrl + path}?t=${t}`;

    return fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: $query(data)
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).catch(err => {
        console.error('error,--->', err);
    });
};
const $api = {
    get,
    post,
    serverUrl
};
export default $api;
