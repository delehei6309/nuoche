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
            <div flex="cross:center" class="posit-wrap">
                <span>当前位置：</span>
                <span>北京市海淀区西二旗附近</span>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/home.less';
    export default {
        name: 'home',
        data(){
            return {

            }
        },
        created(){
        },
        computed: {
        },
        components:{

        },
        methods: {
            getMap(){
                if(qq){
                    let center = new qq.maps.LatLng(39.916527,116.397128);
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
                        size = new qq.maps.Size(42, 68),
                        origin = new qq.maps.Point(0, 0),
                        markerIcon = new qq.maps.MarkerImage(
                            "http://shengri.cn/img/backup.png",
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
                this.$router.push({
                    path:'/binding-vehicle'
                });
            }
        },
        mounted(){
            this.getMap();
        },
        destroyed(){

        }
    }
</script>
