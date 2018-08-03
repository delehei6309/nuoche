<template>
    <div class="binding">
        <bind v-if="status == '02'"></bind>
        <nuoche-inform v-if="status == '01'"></nuoche-inform>
        <loading v-show="uiLoading"></loading>
    </div>
</template>

<script>
    //import '../less/binding-vehicle.less';
    import $api from '../tools/api';
    import { checkPhone, setTitle } from '../tools/operation';
    import Toast from '../components/Toast';
    import Bind from '../components/Bind';
    import NuocheInform from '../components/NuocheChild';
    import Loading from '../components/Loading';
    export default {
        name: 'binding-vehicle',
        data(){
            return {
                uiLoading:true,
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
                submiting:false,
                status:0,//01:绑定，02：未绑定
                code1:'2348329924006570',
                code2:'3133365161072253'
                
            }
        },
        created(){
            this.getStatus();
        },
        computed: {
            code:function(){
                return this.$route.query.code;
            }
        },
        components:{
            Bind,
            NuocheInform,
            Loading
        },
        methods: {
            getStatus(){
                let code = this.$route.query.code;
                // if(code == this.code1){
                //     this.status = '01'
                // }else if(code == this.code2){
                //     this.status = '02'
                // }else{
                //     Toast('你的码不正确');
                // }
                
                //this.status = '02';
                //绑定验证
                $api.get(`/user/code/isBind/${code}`).then(res => {
                    this.uiLoading = false;
                    if(res.code == '01' || res.code == '02'){
                        this.status = res.code ;//01已绑定;02未绑定
                        
                    }else{
                        Toast(res.msg);
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
