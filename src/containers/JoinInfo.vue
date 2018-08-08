<template>
    <div class="join-info">
        <div class="join-items">
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
        </div>
    </div>
</template>

<script>
    import '../less/join-info.less';
    import {Toast, Indicator} from 'mint-ui';
    import jsonp from 'jsonp';
    export default {
        name: 'join-info',
        data(){
            return {
                items:[]
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
