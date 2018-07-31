<template>
    <div class="binding-vehicle">
        <div class="binding-vehicle-cont">
            <div class="b-v-title">填写绑定信息</div>
            <div class="b-v-form">
                <dl flex>
                    <dt>手机号：</dt>
                    <dd>
                        <input type="text" name="" placeholder="请输入您的手机号" maxlength="11">
                    </dd>
                </dl>
                <dl flex class="captcha">
                    <dt flex-box="0">验证码：</dt>
                    <dd flex-box="1">
                        <input type="text" name="" placeholder="请输入您的验证码" maxlength="6">
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
                        <input type="text" name="" placeholder="请输入您的车牌号" maxlength="5">
                    </dd>
                </dl>
            </div>
            <div flex="main:center" class="btn">
                <button>立即绑定</button>
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
    export default {
        name: 'binding-vehicle',
        data(){
            return {
                plate:'jingA',
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
                timer:null
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
                
            }
        },
        destroyed(){

        }
    }
</script>
