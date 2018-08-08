<template>
    <div class="news">
        <div class="news-items">
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
    </div>
</template>

<script>
    import '../less/news.less';
    import {Toast, Indicator} from 'mint-ui';
    import jsonp from 'jsonp';
    export default {
        name: 'news',
        data(){
            return {
                items:[]
            }
        },
        created(){
            this.getItems()
        },
        computed: {
        },
        components:{

        },
        methods: {
            getItems(){
                Indicator.open({
                    spinnerType:'fading-circle'
                });
                let catid = this.$route.query.id;
                jsonp(`http://test.filmfest.hualumedia.com/getFindlist.php?catid=${catid}`,{
                    param:null
                },(err,res)=>{
                    Indicator.close();
                    if (err) {
                        Toast(err.message);
                    } else {
                        console.log(res);
                        if(res.status == 200){
                            res.data.map(item => {
                                
                                this.items.push(item); 
                            })
                        }
                    }
                    
                });
            },
            link(id){
                this.$router.push({
                    path:'/news-detail',
                    query:{
                        id
                    }
                })
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
