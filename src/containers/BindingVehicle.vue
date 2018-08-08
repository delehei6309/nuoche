<template>
    <div class="binding">
        <bind v-show="status == '02'" ></bind>
        <nuoche-inform v-if="status == '01'" :plateNum="plateNum" :disturn="disturn"></nuoche-inform>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import { checkPhone, setTitle } from '../tools/operation';
    import Bind from '../components/Bind';
    import NuocheInform from '../components/NuocheChild';
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: 'binding-vehicle',
        data(){
            return {
                phoneNumber:'',
                captchaNum:'',
                plate:'jingA',
                carId:'',
                plateItems:[
                    {
                        value:"jingA",
                        text:'京A'
                    },{
                        value:"jingB",
                        text:'京B'
                    },{
                        value:"jingC",
                        text:'京C'
                    }
                ],
                captchaBtnTxt:'发送验证码',
                captchaLoading:false,
                timer:null,
                status:0,//01:绑定，02：未绑定
                code1:'2348329924006570',
                code2:'3133365161072253',
                plateNum:''//车牌号
                
            }
        },
        created(){
            Indicator.open({
                spinnerType:'fading-circle'
                //spinnerType:'triple-bounce'//'double-bounce
            });
            this.getStatus();
        },
        computed: {
            // code:function(){
            //     return this.$route.query.code;
            // }
        },
        components:{
            Bind,
            NuocheInform
        },
        methods: {
            getStatus(){
                this.code = this.$route.query.code;
                // if(code == this.code1){
                //     this.status = '01'
                // }else if(code == this.code2){
                //     this.status = '02'
                // }else{
                //     Toast('你的码不正确');
                // }
                
                //this.status = '02';
                //绑定验证
                let code = this.code;
               return  $api.get(`/user/code/isBind/${code}`).then(res => {
                    Indicator.close();
                    if(res.code == '02'){
                        this.status = res.code;//01已绑定;02未绑定
                        setTitle('绑定挪车码');
                    }else if(res.code == '01'){
                        this.status = res.code;
                        this.$router.replace({
                            path:'/nuoche-inform',
                            query:{
                                code:this.code,
                                plateNum:res.data.plateNum,
                                disturn:res.data.disturn
                            }
                        });
                    }else{
                        Toast(res.msg || '服务器错误');
                        return {};
                    }
                })
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
