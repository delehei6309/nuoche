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
        <div flex="main:center" class="home-posit">
        <!--     <div flex="cross:center" class="posit-wrap">
                <span>当前位置：</span>
                <span>未知</span>
            </div> -->
        </div>
    </div>
</template>

<script>
    import '../less/home.less';
    import wx from '../tools/wx';
    import Toast from '../components/Toast';
    const markIcon = require('../images/home/marker-icon1.png');
    import jsonp from 'jsonp';
    export default {
        name: 'home',
        data(){
            return {

            }
        },
        created(){
            this.getRoute();
            this.wxConfig();//微信配置
        },
        computed: {
        },
        components:{

        },
        methods: {
            getMap(latitude,longitude){
                latitude = latitude || 39.916527;
                longitude = longitude || 116.397128;
                //当前位置文字
                if(qq){
                    let center = new qq.maps.LatLng(latitude,longitude);
                    let map = new qq.maps.Map(document.getElementById("container"),{
                        //加载地图经纬度信息
                        center,
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
                        size = new qq.maps.Size(57, 57),
                        origin = new qq.maps.Point(0, 0),
                        markerIcon = new qq.maps.MarkerImage(
                            markIcon,
                            size, 
                            origin,
                            anchor
                        );
                    marker.setIcon(markerIcon);
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
                jsonp("http://tt.cpostcard.com/weixinshare/getSign.php?url="+encodeURIComponent(window.parent.document.URL.split('#')[0]), null, (err, data) => {
                    if (err) {
                        Toast(err.message);
                    } else {
                        wx.config(data);
                    }
                });
            },
            getRoute(){
                this.code = this.$route.query.code;
                if(this.code != '01'){
                    //Toast('这里不能访问！！！')
                }
            }
        },
        mounted(){
            this.getMap();
            wx.getdingwei((res) => {
                let { latitude, longitude } = res;//latitude 纬度
                this.getMap(latitude, longitude)
            })
        },
        destroyed(){

        }
    }
</script>
