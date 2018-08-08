<template>
    <div flex="dir:top" class="tabs-warp">
        <router-view flex-box="1"></router-view>
        <div class="tabs" flex-box="0" flex="dir:left main:justify">
            <router-link flex="dir:top main:center cross:center" 
                class="tab tab-home" 
                :to="{path:'/tabs/home'}"
                active-class="tab-active"
                replace>
                    <span class="tab-icon"></span>
                    <span class="tab-text">首页</span>
                </router-link>
            <!-- <router-link flex="dir:top main:center cross:center" 
                class="tab tab-shop"
                :to="{path:'/tabs/shop'}"
                active-class="tab-active"
                replace>
                    <span class="tab-icon"></span>
                    <span class="tab-text">商城</span>
                </router-link> -->
            <a flex="dir:top main:center cross:center"  href="javascript:void(0);"
                @click.stop="link" class="tab tab-shop">
                <span class="tab-icon"></span>
                <span class="tab-text">商城</span>
            </a>
            <router-link flex="dir:top main:center cross:center"
                class="tab tab-find"
                :to="{path:'/tabs/find'}"
                active-class="tab-active"
                replace>
                    <span class="tab-icon"></span>
                    <span class="tab-text">发现</span>
                </router-link>
             <router-link flex="dir:top main:center cross:center" 
                class="tab tab-person"
                :to="{path:'/tabs/person'}"
                active-class="tab-active"
                replace>
                    <span class="tab-icon"></span>
                    <span class="tab-text">我的</span>
                </router-link>
        </div>
    </div>
</template>

<script>
    import '../less/tabs.less';
    export default {
        name: 'tabs',
        data(){
            return {
                shopLink:''
            }
        },
        created(){
            
        },
        methods: {
            link(){
                let userInfor = JSON.parse(sessionStorage.getItem('userInfor'));
                let url = `http://test.shop.hualumedia.com/Base/wxLogin?shop=9&openid=${userInfor.openid}`;
                window.location.href = url;
            }
        }
        
    }
</script>
