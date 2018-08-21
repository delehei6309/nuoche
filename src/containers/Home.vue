<template>
    <div flex="dir:top" class="home">
        <div flex-box="1" class="map-wrap" id="container"></div>
        <div class="sao-code" @click.stop="sao">
            <div flex="dir:top main:center cross:center" class="sao-inner">
                <span class="sao-icon">
                    <img src="../images/home/scanning.png">
                </span>
                <span class="sao-txt">扫码挪车</span>
            </div>
        </div>
        <div v-if="address" flex="main:center" class="home-posit">
            <div flex="cross:center" class="posit-wrap">
                <span flex-box="0">当前位置：</span>
                <span flex-box="1" class="ellipsis">{{address}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/home.less';
    import $device from '../tools/device';
    import EventBus from '../tools/event-bus';
    import wx from '../tools/wx';
    import $api from '../tools/api';
    const markIcon = require('../images/home/marker-icon4.png');
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: 'home',
        data(){
            return {
                address:''
            }
        },
        beforeCreate(){
        },
        created(){
            if($device.isWeixin){
                this.dealSession();
                if(!EventBus.location){
                    Indicator.open({
                        spinnerType:'fading-circle',
                        text:'定位中'
                    });
                }
                this.getRoute();
                
                this.wxConfig();//微信配置
            }else{
                Toast('请在微信下打开！')
            }
            //EventBus.openid = this.$route.query.openid;
            
        },
        computed: {
        },
        components:{

        },
        methods: {
            getMap(latitude,longitude){
                latitude = latitude || 39.916527;
                longitude = longitude || 116.397128;
                this.getLocation(latitude,longitude);
                //当前位置文字
                if(qq){
                    let center = new qq.maps.LatLng(latitude,longitude);
                    let map = new qq.maps.Map(document.getElementById("container"),{
                        //加载地图经纬度信息
                        center,
                        mapTypeControlOptions: {
                            mapTypeIds: []
                        },
                        zoom: 13,                       //设置缩放级别
                        draggable: true,               //设置是否可以拖拽
                        scrollwheel: false,             //设置是否可以滚动
                        disableDoubleClickZoom: true    //设置是否可以双击放大
                    });
                    let marker = new qq.maps.Marker({
                        position: center,
                        map: map,
                    });
                    let anchor = new qq.maps.Point(0, 0),
                        size = new qq.maps.Size(52, 52),
                        origin = new qq.maps.Point(0, 0),
                        markerIcon = new qq.maps.MarkerImage(
                            markIcon,
                            size, 
                            origin,
                            anchor
                        );
                    marker.setIcon(markerIcon);
                    setTimeout(()=>{
                        Indicator.close();
                    },50);

                }else {
                    setTimeout(this.getMap,200);
                }
            },
            sao(){
                // this.$router.push({
                //     path:'/binding?code=01'
                // });
                //扫一扫
                wx.scanQRCode();
            },
            wxConfig(){
                /*jsonp("http://nuoche.zhangxianfeng.com:8085/weixinshare/getSign.php?url="+encodeURIComponent(window.parent.document.URL.split('#')[0]), null, (err, data) => {
                    //Indicator.close();
                    if (err) {
                        Toast(err.message);
                    } else {
                        wx.config(data);
                    }
                });*/
                let url = window.location.href;
                $api.get('/wechat/js',{
                    url
                }).then(res => {
                    if(res.code == '01'){
                        wx.config(res.data);
                        //微信定位
                        this.wxLocation();
                    }else{
                        Indicator.close();
                        Toast(res.msg || '服务器错误！');
                    }
                });
                
            },
            getRoute(){
                this.code = this.$route.query.code;
                if(this.code != '01'){
                    //Toast('这里不能访问！！！')
                }
            },
            wxLocation(){
                if(EventBus.location){
                    let {latitude, longitude} = EventBus.location;
                    // let {latitude, longitude} = {
                    //     latitude:39.926224,
                    //     longitude:116.219721
                    // };
                    this.getMap(latitude, longitude);
                }else{
                    wx.getdingwei((res) => {
                        let { latitude, longitude } = res;//latitude 纬度
                        //存储定位信息
                        EventBus.location = {
                            latitude,longitude
                        };
                        EventBus.location[`${latitude},${longitude}`] = '';
                        this.getMap(latitude, longitude);
                        //Indicator.close();
                    });
                }
            },
            getLocation(latitude,longitude){
                let that = this;
                if(EventBus.location){
                    //在有定位信息的条件下
                    let address = EventBus.location[`${latitude},${longitude}`];
                    if(address){
                        this.address = address;
                        return false;
                    }
                }
                //$api.get('https://apis.map.qq.com/ws/geocoder/v1/?location=39.984154,116.307490&key=F4PBZ-OIRCW-HHURQ-ODE44-G4UTO-35FJ6')
                // jsonp("http://apis.map.qq.com/ws/geocoder/v1/?callback=jsonp1&location=39.984154%2C116.307490&key=F4PBZ-OIRCW-HHURQ-ODE44-G4UTO-35FJ6&get_poi=0&output=jsonp", {
                //     param:'jsonp1'
                // }, (err, data) => {
                //         console.log(err,data)
                //     if (err) {
                //         Toast(err.message);
                //     } else {
                //         console.log()
                //         wx.config(data);
                //     }
                // });
                let data={
                    location:`${latitude},${longitude}`,
                    key:"F4PBZ-OIRCW-HHURQ-ODE44-G4UTO-35FJ6",
                    get_poi:0
                }
                let url = "http://apis.map.qq.com/ws/geocoder/v1/?";
                data.output = "jsonp";  
                $.ajax({
                    type:"get",
                    dataType:'jsonp',
                    data:data,
                    jsonp:"callback",
                    jsonpCallback:"QQmap",
                    url:url,
                    success:function(json){
                        that.address = json.result.address;
                        EventBus.location[`${latitude},${longitude}`] = json.result.address;

                        //把城市id存储起来给绑码页使用
                        let {
                            location,address,address_component,ad_info
                        } = json.result;
                        let addressInfor = {
                            location,
                            address,address_component,ad_info
                        };
                        sessionStorage.setItem('addressInfor',JSON.stringify(addressInfor));

                    },
                    error:function(err){
                        Toast('获取地址失败！')
                    }

                })
            },
            dealSession(){
                let that = this;
                window.addEventListener("storage", function(event){ 
                    if(!event.newValue){ 
                        return ; 
                    } 
                    if(event.key == "getSession"){ 
                        localStorage.setItem("storeSessionData", sessionStorage.getItem("userInfor")); 
                        localStorage.removeItem("storeSessionData"); 
                    } 
                    if(event.key == "storeSessionData"){ 
                        sessionStorage.setItem("userInfor", event.newValue); 
                        that.userInfor = JSON.parse(sessionStorage.getItem("userInfor"));
                        localStorage.removeItem("getSession"); 
                    } 
                    if(event.key == "updateSession"){ 
                        sessionStorage.setItem("userInfor", event.newValue); 
                        that.userInfor = JSON.parse(sessionStorage.getItem("userInfor"));
                        localStorage.removeItem("updateSession"); 
                    }
                });
                if(this.$route.query.openid){
                    let userInfor = {};
                    userInfor.openid = this.$route.query.openid;
                    userInfor.headimgurl = this.$route.query.headimgurl;
                    userInfor.nickname = this.$route.query.nickname;

                    sessionStorage.setItem("userInfor", JSON.stringify(userInfor));  
                    localStorage.setItem("updateSession",JSON.stringify(userInfor));

                    return userInfor;
                }
                if(!sessionStorage.getItem("userInfor")){ 
                    localStorage.setItem("getSession", Date.now()); 
                }else{ 
                    this.userInfor = JSON.parse(sessionStorage.getItem("userInfor")); 
                } 
                
            }
        },
        mounted(){
            
            //this.getMap()
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
