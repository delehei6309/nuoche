/**
 * Created by chunting on 2018/8/3.
 */
import wx from 'weixin-js-sdk';
import $api from './api';
let config = (options) => {
    wx.config({
        debug: false,
        appId: options.appId,
        timestamp: parseInt(options.timestamp),
        nonceStr: options.nonceStr,
        signature: options.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','scanQRCode']
    });
};
let getShare = (settings) => {
    let content = {
        title: settings.title || '标题',
        link: settings.link || window.location.href,
        imgUrl: settings.imgUrl || 'logo',
        desc: settings.desc || '介绍'
    }
    $api.get('/wechat/shareInfo')
        .then(data => {
            if (data.code == 200) {
                config(data.data.shareInfo);
                wx.ready(() => {
                    onMenuShareTimeline(content);
                    onMenuShareAppMessage(content);
                });
            }
        });
};

let scanQRCode = ($fn) => {
    wx.ready(() => {
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                //$fn();
            },
            fail:function (res) {

            }
        });
    });
    
};
let getdingwei = ($fn) => {
    wx.ready(() => {
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                if($fn){
                    $fn(res);
                }
            }
        });
    });
}
let onMenuShareTimeline = (content, $fn) => {
    wx.onMenuShareTimeline({
        title: content.title,
        link: content.link,
        imgUrl: content.imgUrl,
        trigger: function (res) {

        },
        success: function (res) {
            $fn();
        },
        cancel: function (res) {

        },
        fail: function (res) {

        }
    });
};
let onMenuShareAppMessage = (content, $fn) => {
    wx.onMenuShareAppMessage({
        title: content.title,
        desc: content.desc,
        link: content.link,
        imgUrl: content.imgUrl,
        trigger: function (res) {

        },
        success: function (res) {
            $fn();
        },
        cancel: function (res) {

        },
        fail: function (res) {

        }
    });
};
export  default {
    wx,
    config,
    getShare,
    scanQRCode,
    getdingwei
}
