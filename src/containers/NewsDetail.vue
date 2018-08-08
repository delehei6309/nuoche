<template>
    <div class="news-detail">
        <h3>{{data.TITLE}}</h3>
        <div flex class="news-zhu">
            <span>{{data.UPDATED_TIME}}</span>
            <span v-if="data.COPYFROM">来源:{{data.COPYFROM}}</span>
        </div>
        <div v-if="data.THUMB_X" class="news-detail-img">
            <img :src="data.THUMB_X">
        </div>
        <h5>{{data.SHORTTITLE}}</h5>
        <div class="news-txt">{{data.CONTENT}}</div>
    </div>
</template>

<script>
    import '../less/news-detail.less';
    import {Toast, Indicator} from 'mint-ui';
    import jsonp from 'jsonp';
    export default {
        name: 'news-detail',
        data(){
            return {
                data:{}
            }
        },
        created(){
            this.getItems();
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
                let id = this.$route.query.id;
                jsonp(`http://test.filmfest.hualumedia.com/getFindContent.php?id=${id}`,{
                    param:null
                },(err,res)=>{
                    Indicator.close();
                    if (err) {
                        Toast(err.message);
                    } else {
                        this.data = res;
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
