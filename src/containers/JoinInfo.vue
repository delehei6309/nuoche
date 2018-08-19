<template>
    <div class="join-info">
        <div class="join-items" style="overflow: scroll;">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText="加载更多" bottomDropText="释放加载">
                <ul>
                    <li v-for="item in items" @click="link(item.CARNEWS_ID)">
                        <div v-if="item.THUMB_X" class="item-imgs">
                            <img :src="item.THUMB_X">
                        </div>
                        <h5>{{item.TITLE}}</h5>
                        <div class="item-bot">
                            <span>{{item.UPDATED_TIME}}</span>
                            <span v-if="item.COPYFROM">来源:{{item.COPYFROM}}</span>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import '../less/join-info.less';
    import Vue from 'vue';
    import {Toast, Indicator, Loadmore } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    import $api from '../tools/api';
    export default {
        name: 'join-info',
        data(){
            return {
                items:[],
                pageNo:1,
                pageSize:10,
                pageCount:0,
                openId:'',
                allLoaded:false
            }
        },
        created(){
            Indicator.open({
                spinnerType:'fading-circle'
            });
            this.getItems();
        },
        computed: {
            // pageCount:function(){
            //     let { pageSize, count } = this;
            //     return Math.ceil(count/pageSize);
            // }
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
                        this.pageCount = res.data.pageCount;
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
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
