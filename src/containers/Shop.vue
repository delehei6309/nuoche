<template>
    <div class="shop">
        <div flex="main:center" class="header-wrap">
            <div class="header">
                <img src="../images/shop/header.png">
            </div>
        </div>
        <div class="shop-list">
            <ul flex="main:justify" class="shop-items">
                <li flex="dir:top main:justify" class="shop-item"
                    v-for="item in items"
                    :class="{'hot':item.isHot}">
                    <router-link flex="dir:top main:justify" 
                        :to="{path:'/shop-detail'}">
                        <div class="shop-name">
                            <p class="ellipsis">{{item.name}}</p>
                        </div>
                        <div flex="main:center cross:center" class="shop-img">
                            <img :src="item.image">
                        </div>
                        <dl class="shop-price" flex>
                            <dt>￥:{{item.price}}</dt>
                            <dd>￥:{{item.originalPrice}}</dd>
                        </dl>
                    </router-link>
                    
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '../less/shop.less';
    const Image1 = require('../images/shop/product1.jpg');
    const Image2 = require('../images/shop/product2.jpg');
    export default {
        name: 'shop',
        data(){
            return {
                items:[
                    {
                        name:'小礼品柠檬加湿器',
                        image:Image1,
                        originalPrice:399.00,
                        price:199.00
                    },{
                        name:'小礼品柠檬加湿gggg器小礼品柠檬加湿器',
                        image:Image2,
                        originalPrice:399.00,
                        price:199.00,
                        isHot:true
                    },{
                        name:'小礼品柠檬加湿器',
                        image:Image1,
                        originalPrice:399.00,
                        price:199.00
                    }
                ]
            }
        },
        created(){
        },
        computed: {
        },
        components:{

        },
        methods: {
        },
        destroyed(){

        }
    }
</script>
