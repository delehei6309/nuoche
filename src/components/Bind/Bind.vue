<template>
    <div class="binding-vehicle">
        <div class="binding-vehicle-cont">
            <div class="b-v-title">填写绑定信息</div>
            <div class="b-v-form">
                <dl flex>
                    <dt>手机号：</dt>
                    <dd>
                        <input type="text" name="" placeholder="请输入您的手机号" maxlength="11" v-model="telphone">
                    </dd>
                </dl>
                <dl flex class="captcha">
                    <dt flex-box="0">验证码：</dt>
                    <dd flex-box="1">
                        <input type="text" name="" placeholder="请输入您的验证码" maxlength="6" v-model="captchaNum">
                    </dd>
                    <dd flex-box="0">
                        <button @click.stop="captcha" :disabled="captchaLoading">{{captchaBtnTxt}}</button>
                    </dd>
                </dl>
                <dl flex >
                    <dt flex-box="0">车牌号：</dt>
                    <dd flex-box="1">
                        <input type="text" name="" placeholder="请输入您的车牌号" maxlength="7" v-model="plateNum">
                    </dd>
                </dl>
            </div>
            <div flex="main:center" class="btn">
                <button @click.stop="submit">立即绑定</button>
            </div>
        </div>
        <div class="bingding-gou">
            <span class="bingding-gou-left"></span>
            <span class="bingding-gou-right"></span>
        </div>
    </div>
</template>

<script>
    import './bind.less';
    import $api from '../../tools/api';
    import { checkPhone, setTitle } from '../../tools/operation';
    import Toast from '../Toast';
    export default {
        name: 'bind',
        data(){
            return {
                telphone:'',
                captchaNum:'',
                plateNum:'jingA',
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
                code:'',
                validCode:'XXXoooo9999'//验证码存储
            }
        },
        created(){
            this.code = this.$route.query.code;
        },
        computed: {
            
        },
        components:{

        },
        methods: {
            //发送验证码
            captcha(){
                let { telphone } = this;
                if(!checkPhone(telphone)){
                    Toast('请填写有效的手机号码！');
                    return false;
                }
                if(this.captchaLoading){
                    return false;
                }
                if(this.timer){
                    clearTimeout(this.timer);
                }

                this.sendCode(60);
                $api.get(`/user/code/sendValidCode/${telphone}`,{
                    
                }).then(res => {
                    if(res.code == '01'){
                        this.validCode == res.data;
                        this.clearValidCode();
                    }else{
                        Toast(res.msg);
                    }
                });
                //test
                this.validCode = '111111';
            },
            sendCode(time){
                this.captchaLoading = true;
                //time = time || 60;
                this.captchaBtnTxt = `${time}s`;
                if(time > 0){
                    time -- ;
                    this.timer = setTimeout(() => {
                        this.sendCode(time)
                    },1000);
                }else{
                    this.captchaBtnTxt = '重新发送'
                    this.captchaLoading = false;
                }
                
            },
            //绑定
            submit(){
                let {
                    telphone,
                    captchaNum,code,
                    plateNum
                } = this;
                if(!checkPhone(telphone)){
                    Toast('请填写有效的手机号码！');
                    return false;
                }
                if(!captchaNum.trim()){
                    Toast('请填写验证码！');
                    return false;
                }
                if(!plateNum.trim()){
                    Toast('请填车牌号！');
                    return false;
                }
                if(captchaNum != this.validCode){
                    Toast('验证码输入有误！');
                    return false;
                }
                this.submiting = true;//避免重复提交
                console.log(telphone,captchaNum,code,plateNum)
                this.$router.push({
                    path:'/nuoche-inform',
                    query:{
                        code:this.code
                    }
                })
                $api.post('/user/code/bindCode',{
                    telphone,code,plateNum
                }).then(res => {
                    if(res.code == '01'){
                        this.$router.push({
                            path:'/nuoche-inform',
                            query:{
                                code:this.code
                            }
                        })
                    }else{
                        Toast(res.msg);
                    }
                })
            },
            //清除存储的验证码
            clearValidCode(time){
                if(this.timeOuter){
                    clearTimeout(this.timeOuter);
                }
                this.timeOuter = setTimeout(()=>{
                    this.validCode = 'XXXoooo9999';
                },60000);
            }
        },
        destroyed(){

        }
    }
</script>
