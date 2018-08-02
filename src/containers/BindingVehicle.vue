<template>
    <div class="binding">
        <bind v-if="status == '02'"></bind>
        <nuoche-inform v-if="status == '01'"></nuoche-inform>
    </div>
</template>

<script>
    //import '../less/binding-vehicle.less';
    import $api from '../tools/api';
    import { checkPhone, setTitle } from '../tools/operation';
    import Toast from '../components/Toast';
    import Bind from '../components/Bind';
    import NuocheInform from '../components/NuocheChild';
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
                submiting:false,
                status:0,//01:绑定，02：未绑定
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
            NuocheInform
        },
        methods: {
            getStatus(){
                let code = this.$route.query.code;
                //this.status = '02';
                绑定验证
                $api.get(`/user/code/isBind/${code}`).then(res => {
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
