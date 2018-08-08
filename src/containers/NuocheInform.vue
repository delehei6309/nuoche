<template>
    <div>
        <nuoche-child v-show="status == '01'" :plateNum="plateNum" :disturn="disturn"></nuoche-child>
        <div v-show="status == '02'" class="gongzhonghao"  flex="dir:top cross:center main:center">
            <dl class="">
                <dt>
                    <img :src="image">
                </dt>
                <dd>长按关注公众号</dd>
            </dl>
        </div>
        
    </div>
</template>
<style lang="less">
    .gongzhonghao{
        dl{
            padding-top: 2.5rem;
        }
        dt{
            img{
                width:12.5rem;
                height:12.5rem;
            }
        }
        dd{
            padding:1rem 0;
            text-align: center;
        }
    }
</style>
<script>
    import NuocheChild from '../components/NuocheChild';
    import Toast from '../components/Toast';
    import $api from '../tools/api';
    export default {
        name: 'nuoche-inform',
        data(){
            return {
                status:'01',//默认已关注
                code:'',
                image:'',
                plateNum:'',//车牌号
                disturn:''
            }
        },
        created(){
            //this.getWxisBind();
            console.log(3333);
            this.plateNum = this.$route.query.plateNum; //车牌号
            this.disturn = this.$route.query.disturn; //免打扰
        },
        computed: {
        },
        components:{
            NuocheChild
        },
        methods: {
            //判断是否关注
            getWxisBind(){
                let code = this.$route.query.code;
                //this.status = '02'
                console.log('6666666666')
                $api.get(`/wechat/isBind/${code}`,).then( res =>{
                    if(res.code == '01'){
                        this.status = res.code;
                        this.data = res.data;
                        
                    }if(res.code == '02'){
                        this.status = res.code;
                        this.getImg();

                    }else if(res.code == '03'){
                        Toast(res.msg);
                    }
                });
            },
            getImg(){
                let code = this.$route.query.code;
                $api.get(`/wechat/load/${code}`).then( res =>{
                    if(res.code == '01'){
                        this.image = res.data;
                        
                    }else if(res.code == '03'){
                        Toast(res.msg);
                    }
                });
            }
        },
        destroyed(){

        }
    }
</script>
