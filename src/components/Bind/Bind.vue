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
                        <input type="tel" name="" placeholder="请输入您的验证码" maxlength="6" v-model="captchaNum">
                    </dd>
                    <dd flex-box="0">
                        <button @click.stop="captcha" :disabled="captchaLoading">{{captchaBtnTxt}}</button>
                    </dd>
                </dl>
                <dl flex class="car-pai">
                    <dt flex-box="0">车牌号：</dt>
                    <dd flex-box="1" flex>
                        <!-- <span class="pai-span">
                            <select v-model="plateCity">
                                <option v-for="item in plateItems" :value="item.value">{{item.text}}</option>
                            </select>
                            <i>{{cityName}}</i>
                            
                        </span> -->
                        <self-select class="select-province"
                            :title="'请您选择车牌省份'"
                            :alphabet="provinceItems"
                            :value="province" @callBack="provinceBack"></self-select>
                        <self-select class="select-alphabet"
                            :title="'请您选择车牌省份字母'"
                            :alphabet="alphabet"
                            :value="alp" @callBack="alpBack"></self-select>
                        
                        <span>
                            <input type="text" name="" placeholder="请输入您的车牌号" maxlength="5" v-model="plateNum">
                        </span>
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
    import { checkPhone, setTitle, stringToByte } from '../../tools/operation';
    import {Toast, Indicator} from 'mint-ui';
    import cityItems from '../../../city/city.js';

    import SelfSelect from '../SelfSelect';

    import wx from '../../tools/wx';

    export default {
        name: 'bind',
        props:['addressInfor'],
        data(){
            return {
                telphone:'',
                captchaNum:'',
                plateNum:'',
                plateCity:'',

                
                captchaBtnTxt:'发送验证码',
                captchaLoading:false,
                timer:null,
                code:'',
                validCode:'XXXoooo9999',//验证码存储
                provinceItems:[],
                province:'',
                alphabet:[],
                alp:''
            }
        },
        created(){
            this.code = this.$route.query.code;
            

            this.getUserInfor();

            this.setAlphabet();
            this.setPalteProvince();
            
        },
        computed: {
            // cityName:function(){
            //     let text = cityItems[0].value;
            //     this.plateItems.map(item => {

            //         if(item.value == this.plateCity){
            //             console.log(item)
            //             text = item.text;
            //         }
            //     });
            //     return text;
            // }
        },
        components:{
            SelfSelect
        },
        methods: {
            alpBack(item){
                this.alp = item.text;
            },
            provinceBack(item){
                console.log(item)
                this.province = item.text;
            },
            getUserInfor(){
                let that = this;
                window.addEventListener("storage", function(event){ 
                    if(!event.newValue){ 
                        return ; 
                    } 
                    if(event.key == "getSession"){ 
                        localStorage.setItem("storeSessionData", sessionStorage.getItem("userInfor")); 
                        localStorage.removeItem("storeSessionData"); 
                    } 
                    if(event.key == "storeSessionData"){ 
                        sessionStorage.setItem("userInfor", event.newValue); 
                        that.userInfor = JSON.parse(sessionStorage.getItem("userInfor"));
                        localStorage.removeItem("getSession"); 
                    } 
                    if(event.key == "updateSession"){ 
                        sessionStorage.setItem("userInfor", event.newValue); 
                        that.userInfor = JSON.parse(sessionStorage.getItem("userInfor"));
                        localStorage.removeItem("updateSession"); 
                    }
                });
                if(!sessionStorage.getItem("userInfor")){ 
                    localStorage.setItem("getSession", Date.now()); 
                }else{ 
                    this.userInfor = JSON.parse(sessionStorage.getItem("userInfor")); 
                } 
                
            },
            setPalteProvince(){
                let cityCode = '""';
                if(this.addressInfor.ad_info){
                    cityCode = this.addressInfor.ad_info.adcode;
                }
                
                Indicator.open({
                    spinnerType:'fading-circle'
                });
                
                $api.get(`/user/code/getCity/${cityCode}`).then(res => {
                    Indicator.close();
                    if(res.code == '01'){
                        res.data.provinces.map(item => {
                            this.provinceItems.push({
                                value:item.code,
                                text:item.shortName
                            });
                        });
                        let defaultProvinceItem = res.data.defaultProvince;
                        if(defaultProvinceItem){
                            this.province = defaultProvinceItem.shortName;
                            
                        }else{
                            this.province = this.provinceItems[0].text;
                        }
                    }else{
                        Toast(res.msg || '服务器错误！');
                    }
                });
                
            },
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
                        this.validCode = res.data;
                        this.clearValidCode();
                    }else{
                        Toast(res.msg);
                    }
                });
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
                    province,alp,
                    plateNum,
                    //openId,
                    addressInfor
                } = this;
                //console.log(this.userInfor)
                let openId = this.userInfor.openid || '';
                let location = addressInfor;
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
                plateNum = ''+ province + alp + plateNum;
                if(captchaNum != this.validCode){
                    console.log(captchaNum,this.validCode)
                    Toast('验证码输入有误！');
                    return false;
                }
                Indicator.open({
                    spinnerType:'triple-bounce'
                });
                location = stringToByte(JSON.stringify(location));
                let params = {
                    telphone,
                    code,
                    plateNum,
                    openId,
                    location//绑码的位置信息
                };
                $api.post('/user/code/bind',params).then(res => {
                    Indicator.close();

                    if(res.code == '01'){
                        //绑定成功，判断是否关注公众号？
                        $api.get(`/wechat/isBind/${code}`,).then( res =>{
                            if(res.code == '01'){
                                Toast({
                                    message:'您已经成功绑定挪车码！',
                                    duration:2000
                                });
                                setTimeout(()=>{
                                    this.$router.replace({
                                        path:'/my-code'
                                    })
                                },2000);
                                
                            }else if(res.code == '02'){
                                //未关注
                                this.$router.replace({
                                    path:'/guan-zhu',
                                    query:{
                                        code
                                    }
                                });

                            }else{
                                Toast(res.msg || '服务器错误');
                            }
                        });
                    }else{
                        Toast(res.msg);
                        return null
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
                },120000);
            },
            setAlphabet(){
                let alp = '';
                for(let i=0;i<26;i++){
                    alp = String.fromCharCode(65+i);
                    this.alphabet.push({
                        text:alp,
                        value:alp
                    });
                }
                this.alp = this.alphabet[0].text;
                
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
