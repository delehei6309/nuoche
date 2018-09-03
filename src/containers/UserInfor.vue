<template>
    <div class="user-infor">
        <h6>用户信息</h6>
        <div class="user-content">
            <div class="infor">
                <dl flex>
                    <dt flex-box="0">手机：</dt>
                    <dd flex-box="1">
                        <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="telphone">
                    </dd>
                </dl>
                <!-- <dl flex class="infor-name">
                    <dt flex-box="0">姓名：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="20" placeholder="请输入姓名">
                    </dd>
                </dl> -->
                <dl flex class="infor-nicename">
                    <dt flex-box="0">昵称：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="20" placeholder="请输入昵称" v-model="nickName">
                    </dd>
                </dl>
                <dl flex class="infor-nicename che-num">
                    <dt flex-box="0">车牌号：</dt>
                    <dd flex-box="1" flex="cross:center">
                        <self-select class="select-province"
                            :title="'请您选择车牌省份'"
                            :alphabet="provinceItems"
                            :value="plateProvince" @callBack="provinceBack"></self-select>
                        <self-select class="select-alphabet"
                            :title="'请您选择车牌省份字母'"
                            :alphabet="alphabet"
                            :value="alp" @callBack="alpBack"></self-select>
                        
                        <span>
                            <input type="text" placeholder="请输入您的车牌号" maxlength="5" v-model="plate">
                        </span>
                    </dd>
                </dl>
                <dl flex class="infor-nicename che-type">
                    <dt flex-box="0">车型：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="20" placeholder="请输入车型" v-model="carType">
                    </dd>
                </dl>
                <dl flex class="infor-nicename che-infor">
                    <dt flex-box="0">车架号：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="20" placeholder="请输入车架号" v-model="machineType">
                    </dd>
                </dl>
                <dl flex class="infor-city">
                    <dt flex-box="0">城市：</dt>
                    <dd flex-box="1">
                        <input type="text" id="trigger" maxlength="20" placeholder="请选择省/市/区" 
                        v-model="location" readonly>
                    </dd>
                </dl>
                <dl flex class="infor-address">
                    <dt flex-box="0">通讯地址：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="50" placeholder="通讯地址" v-model="address">
                    </dd>
                </dl>
            </div>
        </div>
        <h6>上传头像</h6>
        <div class="user-upload">
            <dl flex="cross:center">
                <dt flex>
                    <div class="up-load" 
                        :class="{'file-loading':upLoading}">
                        <vue-core-image-upload
                            class="btn"
                            inputOfFile="file"
                            extensions="png,jpg,jpeg,gif"
                            :credentials="false"
                            @imageuploaded="imageuploaded"
                            @imagechanged="imagechanged"
                            @errorhandle="errorhandle"
                            :max-file-size="10485760"
                            :url="uploadUrl" >
                        </vue-core-image-upload>
                    </div>
                    <div class="up-view">
                        <img :src="avatar" ref="imgWrap">
                        <span v-if="upLoading" class="up-loading"></span>
                    </div>
                </dt>
                <dd>请上传120*120的图片尺寸<br>否则图片变形</dd>
            </dl>
        </div>
        <div class="btns">
            <button @click.stop="submit">确认修改</button>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor.less';
    import MobileSelect from 'mobile-select';
    import {Toast, Indicator} from 'mint-ui';
    import { checkPhone, setTitle } from '../tools/operation';
    import EventBus from '../tools/event-bus';
    import $api from '../tools/api';
    import cityItems from '../../city/city.js';
    import SelfSelect from '../components/SelfSelect';
    const avatar = require('../images/person/default.jpg');
    import VueCoreImageUpload  from 'vue-core-image-upload';
    export default {
        name: 'user-infor',
        data(){
            return {
                nickName:'',
                telphone:'',
                address:'',
                userInfor:{},
                plateItems:[],
                plateCity:1,
                _plateNum:'',//取详情的完整name;
                plateNum:'',
                carType:'',
                machineType:'',
                avatar:'',
                avatarKey:'',

                provinceItems:[],
                plateProvince:'',
                alphabet:[],
                alp:'',
                plate:'',

                //三级联动地址显示
                location:'',
                area:'',//区县id
                city:'',//城市id
                province:'',//省份id

                upLoading:false,

                avatarStatu:'default'
            }
        },
        created(){
            this.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            this.setAlphabet();
            if(this.userInfor.openid){
                //获取城市列表数据
                this.getCityTree().then(res =>{
                    console.log(res)
                    this.getUserInfor();
                });
                //省份添加
                cityItems.map(item => {
                    this.plateItems.push(item);
                });
            }else{
                Toast('获取openid失败！');
            }
            
            
        },
        computed: {
            // cityName:function(){
            //     let text = cityItems[0].text;
            //     console.log(text)
            //     this.plateItems.map(item => {

            //         if(item.value == this.plateCity){
            //             console.log(item)
            //             text = item.text;
            //         }
            //     });
            //     return text;
            // }
            uploadUrl:function(){
                let openid = this.userInfor.openid;
                return `${$api.serverUrl}/usercenter/load/my/${openid}`
            }
        },
        components:{
            SelfSelect,
            VueCoreImageUpload
        },
        mounted(){
            
        },
        methods: {
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
                cityItems.map(item => {
                    this.provinceItems.push(item);
                });
                this.plateProvince = cityItems[0].text;
            },
            getUserInfor(){
                let openid = this.userInfor.openid || '""';
                if(!openid){
                    Toast('获取openid失败！');
                    return false;
                }
                Indicator.open({
                    spinnerType:'fading-circle'
                });
                $api.get(`/usercenter/my/${openid}`).then(res => {
                    Indicator.close();
                    if(res.code == '01'){
                        this.nickName = res.data.nickName;
                        this.telphone = res.data.telphone;
                        this.address = res.data.address;
                        this.carType = res.data.carType;
                        this.machineType = res.data.machineType;
                        if(res.data.avatar){
                            this.avatar = res.data.avatar;
                            this.avatarStatu = 'avatar';
                        }else{
                            this.avatar = avatar;
                            this.avatarStatu = 'default';
                        }
                        
                        this.province = res.data.province;
                        this.city = res.data.city;
                        this.area = res.data.area;
                        //this.plateNum = res.data.plateNum;
                        this._plateNum = res.data.plateNum;
                        this.getPlateNum(this._plateNum);

                        //选中地址联动
                        this.changeMobileSelect();
                    }else{
                        //this.dealPlateNum('冀T12345');
                        Toast(res.msg || '服务器错误！');
                    }
                })
            },
            imagechanged(res){
                console.log(res)
                this.upLoading = true;
            },
            imageuploaded(res){
                if(res.code == '01'){
                    this.avatar = res.data.avatar;
                    this.avatarKey = res.data.avatarKey;
                    this.$refs.imgWrap.onload = ()=>{
                        this.upLoading = false;
                    }
                }else{
                    Toast(res.msg || '服务器错误！');
                }
                
            },
            errorhandle(res){
                console.log(res)
                this.upLoading = false;
            },
            submit(){
                if(this.upLoading){
                    Toast('图片上传完成后再提交！');
                    return false;
                }
                let { 
                    nickName, telphone, address,
                    cityName, carType,
                    machineType,
                    plateProvince, alp, plate,
                    province,city,area,
                    avatar,avatarKey
                } = this;
                if(this.avatarStatu == 'default'){
                    avatar = '';
                }
                // carType = carType || '""';
                // machineType = machineType || '""';
                // address = address || '""';
                // plateNum = plateNum || '""';
                let openId = this.userInfor.openid || '""';
                //校验
                if(!checkPhone(telphone)){
                    Toast('请输入正确的手机号！');
                    return false;
                }
                if(!nickName.trim()){
                    Toast('请输入昵称！');
                    return false;
                }
                // if(!address.trim()){
                //     Toast('请输入详细地址！');
                //     return false;
                // }
                //plateNum ? plateNum = cityName + plateNum : plateNum = '""';
                // let ooo = {
                //     nickName, telphone, address,
                //     cityName, plateNum, carType,
                //     machineType
                // }
                // console.log(ooo);
                Indicator.open({
                    spinnerType:'triple-bounce'
                });
                let plateNum = plateProvince + alp + plate;
                //console.log(plateNum);
                $api.post(`/usercenter/update/my/${openId}`,{
                    nickName, telphone, address,
                    plateNum, carType,
                    machineType,
                    province,city,area,
                    avatar,avatarKey
                }).then(res => {
                    Indicator.close();
                    if(res.code == '01'){
                        Toast({
                            message:'修改成功！',
                            duration:2000
                        });
                        setTimeout(()=>{
                            let pageFromEvn = (new Date).getTime();
                            EventBus.pageFromEvn = pageFromEvn;
                            this.$router.replace({
                                path:'/tabs/person',
                                query:{
                                    pageFrom:pageFromEvn
                                }
                            })
                        },2000);
                    }else{
                        Toast(res.msg || '服务器错误！');
                    }
                });
            },
            getPlateNum(_plateNum){
                _plateNum = _plateNum || '';
                let arr = _plateNum.split('');
                let pName = arr.shift();
                //this.plateProvince = pName;

                this.plateItems.map(({value,text}) =>{
                    if(text == pName){
                        this.plateProvince = text;
                    }
                });

                let aNmae = arr.shift();

                this.alphabet.map(({value,text}) =>{
                    if(text == aNmae){
                        this.alp = text;
                    }
                });
                console.log('0000000',arr);
                this.plate = arr.join('');
            },
            setMobileSelect(){
                let that = this;
                let {cityData} = this;
                this.mobileSelect = new MobileSelect({
                    trigger: '#trigger',
                    title: '城市选择',
                    wheels: [
                        {data:cityData}
                    ],
                    position:[0,0,0],
                    keyMap: {
                        id:'id',
                        value: 'name',
                        childs :'children'
                    },
                    callback:function(indexArr, data){
                        let provinceName = '',
                            cityName = '',
                            areaName = '';
                        console.log(data[1])
                        if(data[0]){
                            that.province = data[0].id;
                            provinceName = data[0].name;
                        }
                        if(data[1]){
                            that.city = data[1].id;
                            cityName = data[1].name;
                        }
                        if(data[2]){
                            that.area = data[2].id;
                            areaName = data[2].name;
                        }
                        that.location = `${provinceName}${cityName}${areaName}`;
                        console.log(data); //返回选中的json数据
                    }
                });
            },
            changeMobileSelect(){
                if(this.mobileSelect){
                    let {cityData,province,city,area} = this;
                    let position = [];
                    let idArr = [province,city,area];
                    this.location = '';
                    let idIndex = 0;
                    console.log(cityData,province,city,area)
                    let fun = (arr) => {
                        let id = idArr[idIndex];
                        arr.forEach((item,index) => {
                            if(id == item.id){
                                position.push(index);
                                console.log(item.name)
                                this.location = this.location + item.name;
                                if(item.children && item.children.length>0){
                                    idIndex ++ ;
                                    fun(item.children)
                                }
                            }
                        })
                    };
                    if(province){
                        fun(cityData);
                    }else{
                        position = [0,0,0];
                    }
                    this.mobileSelect.locatePosition(0,position[0]);
                    if(city){
                        this.mobileSelect.locatePosition(1,position[1]);
                    }
                    if(area){
                        this.mobileSelect.locatePosition(2,position[2]);
                    }
                    
                }else{
                    setTimeout(()=>{
                        this.changeMobileSelect();
                    },100);
                }
            },
            provinceBack(item){
                this.plateProvince = item.text;
            },
            alpBack(item){
                this.alp = item.text;
            },
            //获取city data
            getCityTree(){
                let openid = this.userInfor.openid || '""';
                return $api.get(`/usercenter/cityTree/${openid}`).then(res => {
                    if(res.code == '01'){
                        
                        this.cityData = res.data;
                        this.setMobileSelect();
                        return res;
                    }else{
                        Toast(res.msg || '服务器错误！');
                        return false;
                    }
                    
                })
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
