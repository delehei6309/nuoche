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
        <div class="news-txt" v-html="data.CONTENT"></div>
    </div>
</template>

<script>
    import '../less/news-detail.less';
    import {Toast, Indicator} from 'mint-ui';
    import $api from '../tools/api';
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
                let newsId = this.$route.query.id;
                let openId = this.$route.query.openId;
                $api.get(`/news/find/${openId}/${newsId}`).then(res => {
                    Indicator.close();
                    this.data = res;
                })

            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
