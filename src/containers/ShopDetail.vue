<template>
    <div flex="dir:top" class="shop-detail">
        <div flex-box="1">
            <div flex="dir:top" class="detail-banner">
                <swiper flex-box="1" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
                    <!-- slides -->
                    <swiper-slide v-for="item in swiperItems" 
                        style="width:100%;height:100%;"
                        :style="{'backgroundColor':item.bg}"></swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                  </swiper>
            </div>
            <div class="detail-cont">
                <div class="shop-title">中国石油加油卡-全国通用加油打折 免费洗车 免费加玻璃水 免费打蜡</div>
                <dl flex="main:justify" class="shop-price">
                    <dt flex="main:cross:center">
                        <span class="price-now">￥179.00</span>
                        <span class="price-ago">￥233.00</span>
                    </dt>
                    <dd>
                        <ul flex>
                            <li flex="main:center cross:center" class="jian">
                                <span></span>
                            </li>
                            <li class="count">1</li>
                            <li flex="main:center cross:center" class="jia">
                                <span></span>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </div>
            <div class="express">
                <dl flex="main:justify" class="shop-guige">
                    <dt flex>
                        <span>快递: </span><span>免运费</span>
                    </dt>
                    <dd flex>
                        <span>规格: </span><span>张</span>
                    </dd>
                </dl>
            </div>
            <div class="address">
                <dl flex>
                    <dt flex-box="0">送至: </dt>
                    <dd flex-box="1">北京市西城区二环到三环广安门外大街168号郎琴国际</dd>
                </dl>
            </div>
            <div class="shop-infor">
                <div flex="main:center" class="shop-infor-tit">
                    <span>
                        <img src="../images/shop/shop-infor-tit.png" alt="商品详情">
                    </span>
                </div>
                <div class="shop-infor-inner">
                    <img src="../images/shop/shop-img.jpg">
                </div>
            </div>
        </div>
        <div flex-box="0" class="bottom">
            <dl flex="box:mean">
                <dt>总金额:￥138.00</dt>
                <dd @click.stop="submit">立即购买</dd>
            </dl>
        </div>
    </div>
</template>

<script>
    import '../less/shop-detail.less';
    import Confirm from '../components/Confirm';
    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: 'shop-detail',
        data(){
            return {
                swiperOption:{
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    initialSlide:0
                },
                swiperItems:[
                    {
                        image:'',
                        url:'',
                        bg:'red'
                    },{
                        image:'',
                        url:'',
                        bg:'tomato'
                    },{
                        image:'',
                        url:'',
                        bg:'green'
                    }
                ]
            }
        },
        created(){
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted(){
            console.log('this is current swiper instance object', this.swiper)
            //this.swiper.slideTo(3, 1000, false)
        },
        components:{
            swiper,
            swiperSlide
        },
        methods: {
            submit(){
                // Confirm({
                //     title:'温馨提示',
                //     content:'您还没有填写收货地址！',
                //     okText:'立即取消',
                //     cancelText:'立即填写',
                // })
            },
            callback(){}
        },
        destroyed(){

        }
    }
</script>
