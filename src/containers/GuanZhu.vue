<template>
    <div flex="main:center cross:center" class="guanzhu">
        <div class="guanzhu-box">
            <!-- <img src="../images/code.png"> -->
            <div class="img-wrap"><img v-if="image" :src="image"></div>
            <div class="guanzhu-txt">请关注挪车公众号，<br>以便及时收到挪车通知。</div>
        </div>

    </div>
</template>
<style lang="less">
    .guanzhu{
        height:100%;
        background-color:#ffd72f;
        padding:.3rem;
        //img{ pointer-events: none;}
        .guanzhu-box{
            background-color: #fff;
            border-radius: .5rem;
            
            padding:2rem;
            .img-wrap{
                //font-size: 0;
                width:12rem;
                height:12rem;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .guanzhu-txt{
                font-size:.8rem;
                text-align: center;
                padding:.5rem 0;
            }
        }
    }
</style>
<script>
    import {Toast, Indicator} from 'mint-ui';
    import $api from '../tools/api';
    export default {
        name: 'guanzhu',
        data(){
            return {
                image:''
            }
        },
        created(){
            Indicator.open({
                spinnerType:'fading-circle'
                //spinnerType:'triple-bounce'//'double-bounce
            });
            this.code = this.$route.query.code;
            this.getWechatCode();
        },
        computed: {
        },
        components:{

        },
        methods: {
            getWechatCode(){
                $api.get(`/wechat/load/${this.code}`).then(res => {
                    Indicator.close();
                    if(res.code == '01'){
                        this.image = res.data;
                    }else{
                        Toast(res.msg || '服务器错误');
                    }
                })
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
