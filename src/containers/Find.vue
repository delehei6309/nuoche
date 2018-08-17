<template>
    <div flex="dir:top" class="find">
        <div flex-box="0" class="find-banner">
            <img src="../images/find/headerBanner.jpg">
        </div>
        <div flex-box="1" class="find-lists">
            <div class="sss">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul>
                        <li v-for="item in items" :class="item.val" 
                            @click="link(item.val,item.NEWSCATEGORY_ID)">{{item.NAME}}</li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>

    </div>
</template>

<script>
    import '../less/find.less';
    import $api from '../tools/api';
    import jsonp from 'jsonp';
    import Vue from 'vue';
    import {Toast, Indicator, Loadmore } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: 'find',
        data(){
            return {
                items:[],
                allLoaded:false,
                userInfor:{},
                pageSize:2,
                pageNo:10,
                openId:''
            }
        },
        created(){
            this.getUser();
        },
        computed: {
        },
        components:{

        },
        methods: {
            getUser(){
                this.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
                
                this.openId = this.userInfor.openid;
                if(!this.openId){
                    Toast('获取openid失败！');
                    return false;
                }
                this.getItems(this.openId);
            },
            getItems(openId){
                Indicator.open({
                    spinnerType:'fading-circle'
                });
                let{
                    pageNo,pageSize
                } = this;
                $api.get(`/news/cats/${openId}`).then(res => {
                    Indicator.close();
                    if(res.status == 200){
                        res.data.map(item => {
                            if(item.CATTYPE == 1){
                                item.val = 'news';
                            }else{
                                item.val = 'join-info';
                            }
                            this.items.push(item); 
                        });
                    }else{
                        Toast(res.msg || '服务器错误！');
                    }
                });
            },
            loadBottom() {
                this.allLoaded = true;// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
            },
            link(url,NEWSCATEGORY_ID){
                console.log(url);
                this.$router.push({
                    path:`/${url}`,
                    query:{
                        id:NEWSCATEGORY_ID,
                        openId:this.openId
                    }
                });
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
