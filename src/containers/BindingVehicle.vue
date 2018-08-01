<template>
    <div class="binding-vehicle">
        <div class="binding-vehicle-cont">
            <div class="b-v-title">填写绑定信息</div>
            <div class="b-v-form">
                <dl flex>
                    <dt>手机号：</dt>
                    <dd>
                        <input type="text" name="" placeholder="请输入您的手机号" maxlength="11" v-model="phoneNumber">
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
                <dl flex class="car-pai">
                    <dt flex-box="0" flex>
                        <span>车牌号：</span>
                        <span>
                            <select v-model="plate">
                                <option v-for="item in plateItems"
                                    :value="item.value">{{item.text}}</option>
                            </select>
                        </span>
                    </dt>
                    <dd flex-box="1">
                        <input type="text" name="" placeholder="请输入您的车牌号" maxlength="5" v-model="carId">
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
    import '../less/binding-vehicle.less';
    import $api from '../tools/api';
    import { checkPhone } from '../tools/operation';
    import Toast from '../components/Toast';
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
                submiting:false
            }
        },
        created(){
        },
        computed: {
        },
        components:{

        },
        methods: {
            //发送验证码
            captcha(){
                let { phoneNumber } = this;
                if(!checkPhone(phoneNumber)){
                    Toast('请填写有效的手机号码！');
                    return false;
                }
                if(this.timer){
                    clearTimeout(this.timer);
                }
                this.sendCode();
            },
            sendCode(time){
                this.captchaLoading = true;
                time = time || 60;
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
                    phoneNumber,
                    captchaNum,
                    plate,carId
                } = this;
                if(!checkPhone(phoneNumber)){
                    Toast('请填写有效的手机号码！');
                    return false;
                }
                if(!captchaNum.trim()){
                    Toast('请填写验证码！');
                    return false;
                }
                if(!carId.trim()){
                    Toast('请填车牌号！');
                    return false;
                }
                this.submiting = true;//避免重复提交
                $api.post('/user/code/bindCode',{

                }).then(res => {

                })
            }
        },
        destroyed(){

        }
    }
</script>
