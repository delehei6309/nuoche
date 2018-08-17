<template>
    <div class="news">
        <div class="news-items">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText="加载更多" bottomDropText="释放加载">
                <div class="lists">
                    <dl flex="main:justify" v-for="item in items" @click="link(item.CARNEWS_ID)">
                        <dt flex-box="1" flex="dir:top main:justify">
                            <h5>{{item.TITLE}}</h5>
                            <div class="desc ellipsis">{{item.DESCRIPTION}}</div>
                            <div flex class="bottom">
                                <span>{{item.UPDATED_TIME}}</span>
                                <span>来源:{{item.COPYFROM}}</span>
                            </div>
                        </dt>
                        <dd flex-box="0" flex="main:center cross:center">
                            <img v-if="item.THUMB_X" :src="item.THUMB_X">
                            <!-- <img v-else src="../images/find/newsList_img.jpg"> -->
                        </dd>
                    </dl>
                </div>  
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import '../less/news.less';
    //import jsonp from 'jsonp';
    import $api from '../tools/api';
    import Vue from 'vue';
    import {Toast, Indicator, Loadmore } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: 'news',
        data(){
            return {
                items:[],
                allLoaded:false,
                pageNo:1,
                pageSize:10,
                count:0,
                openId:''
            }
        },
        created(){
            Indicator.open({
                spinnerType:'fading-circle'
            });
            this.getItems()
        },
        computed: {
            pageCount:function(){
                let { pageSize, count } = this;
                return Math.ceil(count/pageSize);
            }
        },
        components:{

        },
        methods: {
            getItems(){
                
                let catid = this.$route.query.id;
                let openId = this.$route.query.openId;
                this.openId = openId;
                let {
                    pageNo,pageSize
                } = this;
                return $api.get(`/news/list/${catid}/${openId}/${pageNo}/${pageSize}`).then(res => {
                    Indicator.close();
                    if(res.status == 200){
                        res.data.news.map(item => {
                            
                            this.items.push(item); 
                        });
                        this.count = res.data.pageCount;
                    }else{
                        Toast(res.msg || '服务器错误！');
                    }
                    return res;
                })
                
            },
            link(id){
                this.$router.push({
                    path:'/news-detail',
                    query:{
                        id,
                        openId:this.openId
                    }
                })
            },
            loadBottom() {
                if(this.pageNo >= this.pageCount){
                    this.allLoaded = true;// 若数据已全部获取完毕
                    Toast('没有更多内容了！');
                    this.$refs.loadmore.onBottomLoaded();
                    return false;
                }
                this.pageNo ++ ;
                this.getItems().then(()=>{
                    this.$refs.loadmore.onBottomLoaded();
                });
                //
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
