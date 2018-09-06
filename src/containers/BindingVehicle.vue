<template>
    <div class="binding">
        <bind v-if="status == '02'" :addressInfor="addressInfor"></bind>
        <!-- <nuoche-inform v-if="status == '01'" :plateNum="plateNum" :disturn="disturn"></nuoche-inform> -->
    </div>
</template>

<script>
    import $api from '../tools/api';
    import $device from '../tools/device';
    import { checkPhone, setTitle } from '../tools/operation';
    import Bind from '../components/Bind';
    import NuocheInform from '../components/NuocheChild';
    import {Toast, Indicator} from 'mint-ui';
    import wx from '../tools/wx';
    export default {
        name: 'binding-vehicle',
        data(){
            return {
                phoneNumber:'',
                captchaNum:'',
                plate:'jingA',
                carId:'',
                captchaBtnTxt:'发送验证码',
                captchaLoading:false,
                timer:null,
                status:0,//01:绑定，02：未绑定
                code1:'2348329924006570',
                code2:'3133365161072253',
                plateNum:'',//车牌号
                
                addressInfor:{},

                disturn:false
            }
        },
        created(){
            
            
            if($device.isWeixin){
                //先定位
                this.getLocation();
            }else{
                this.getStatus();
            }
            
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
            getLocation(){
                let addressInfor = JSON.parse(sessionStorage.getItem('addressInfor')) || {};
                if(addressInfor.ad_info){
                    this.setLoactionInfor(addressInfor);
                    return false;
                }
                //获取定位信息
                Indicator.open({
                    spinnerType:'fading-circle'
                });
                let url = window.location.href;
                $api.get('/wechat/js',{
                    url
                }).then(res => {
                    if(res.code == '01'){
                        wx.config(res.data);
                        //微信定位
                        wx.getdingwei((res) => {
                            let { latitude, longitude } = res;//latitude 
                            this.getLocationInfor(latitude, longitude);
                            //Indicator.close();
                        });
                    }else{
                        Indicator.close();
                        Toast(res.msg || '服务器错误！');
                    }
                });
            },
            getLocationInfor(latitude,longitude){
                latitude = latitude || 39.916527;
                longitude = longitude || 116.397128;
                let that = this;
                let data={
                    location:`${latitude},${longitude}`,
                    key:"F4PBZ-OIRCW-HHURQ-ODE44-G4UTO-35FJ6",
                    get_poi:0
                }
                let url = "http://apis.map.qq.com/ws/geocoder/v1/?";
                data.output = "jsonp";  
                $.ajax({
                    type:"get",
                    dataType:'jsonp',
                    data:data,
                    jsonp:"callback",
                    jsonpCallback:"QQmap",
                    url:url,
                    success:function(json){
                        //把城市id存储起来给绑码页使用
                        let {
                            location,address,address_component,ad_info
                        } = json.result;
                        let addressInfor = {
                            location,
                            address,address_component,ad_info
                        };
                        sessionStorage.setItem('addressInfor',JSON.stringify(addressInfor));
                        
                        that.setLoactionInfor(addressInfor);
                    },
                    error:function(err){
                        Toast('获取地址失败！');
                        Indicator.close();
                    }

                })
            },
            setLoactionInfor(addressInfor){
                this.addressInfor = addressInfor;
                this.getStatus();
            },
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
                        this.disturn = res.data.disturn;
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
