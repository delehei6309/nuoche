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
                <!-- <dl flex class="car-pai">
                    <dt flex-box="0">车牌号：</dt>
                    <dd flex-box="1" flex>
                        <span class="pai-span">
                            <select v-model="plateCity">
                                <option v-for="item in plateItems" :value="item.value">{{item.text}}</option>
                            </select>
                            <i>{{cityName}}</i>
                        </span>
                        <span>
                            <input type="text" name="" placeholder="请输入您的车牌号" maxlength="6" v-model="plateNum">
                        </span>
                    </dd>
                </dl> -->
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
                <!-- <dl flex class="infor-city">
                    <dt flex-box="0">城市：</dt>
                    <dd flex-box="1">
                        <input type="text" id="trigger" maxlength="20" placeholder="请选择省/市/区" 
                        v-model="address" readonly>
                    </dd>
                </dl> -->
                <dl flex class="infor-address">
                    <dt flex-box="0">通讯地址：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="50" placeholder="通讯地址" v-model="address">
                    </dd>
                </dl>
            </div>
        </div>
        <!-- <h6>上传头像</h6>
        <div class="user-upload">
            <dl flex="cross:center">
                <dt flex>
                    <div class="up-load"></div>
                    <div class="up-view">
                        <img src="../images/person/default.jpg">
                    </div>
                </dt>
                <dd>请上传120*120的图片尺寸<br>否则图片变形</dd>
            </dl>
        </div> -->
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
    import $api from '../tools/api';
    import cityItems from '../../city/city.js';
    import SelfSelect from '../components/SelfSelect';
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

                provinceItems:[],
                plateProvince:'',
                alphabet:[],
                alp:'',
                plate:''
            }
        },
        created(){
            this.setAlphabet();
            this.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            this.getUserInfor();
            //省份添加
            cityItems.map(item => {
                this.plateItems.push(item);
            });
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
        },
        components:{
            SelfSelect
        },
        mounted(){
            //this.setMobileSelect();
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
                        if(res.data.address == '""'){
                            this.address = '';
                        }else{
                            this.address = res.data.address;
                        }
                        if(res.data.carType == '""'){
                            this.carType = '';
                        }else{
                            this.carType = res.data.carType;
                        }
                        if(res.data.machineType == '""'){
                            this.machineType = '';
                        }else{
                            this.machineType = res.data.machineType;
                        }
                        if(res.data.plateNum == '""'){
                            this.plateNum = '';
                        }else{
                            this.plateNum = res.data.plateNum;
                        }
                        //this._plateNum = res.data.plateNum;
                        this.getPlateNum();
                    }else{
                        //this.dealPlateNum('冀T12345');
                        Toast(res.msg || '服务器错误！');
                    }
                })
            },
            submit(){
                let { 
                    nickName, telphone, address,
                    cityName, carType,
                    machineType,
                    plateProvince, alp, plate
                } = this;
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
                    machineType
                }).then(res => {
                    Indicator.close();
                    if(res.code == '01'){
                        Toast({
                            message:'修改成功！',
                            duration:2000
                        });
                        setTimeout(()=>{
                            this.$router.replace({
                                path:'/person'
                            })
                        },2000);
                    }else{
                        Toast(res.msg || '服务器错误！');
                    }
                });
            },
            getPlateNum(_plateNum){
                let arr = _plateNum.split('');
                let name = arr[0];
                this.plateItems.map(({value,text}) =>{
                    if(text == name){
                        this.plateCity = value;
                    }
                });
                arr.shift();
                this.plateNum = arr.join('');
            },
            setMobileSelect(){
                let that = this;
                console.log(MobileSelect)
                var mobileSelect = new MobileSelect({
                    trigger: '#trigger',
                    title: '城市选择',
                    wheels: [
                        {data:[
                            {
                                id:'1',
                                value:'北京市',
                                childs:[
                                    {
                                        id:'11',
                                        value:'北京市',
                                        childs:[
                                            {
                                                id:'111',
                                                value:'朝阳区'
                                            },{
                                                id:'111',
                                                value:'海淀区'
                                            },{
                                                id:'111',
                                                value:'丰台区'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id:'2',
                                value:'河北省',
                                childs:[
                                    {
                                        id:'11',
                                        value:'石家庄市',
                                        childs:[
                                            {
                                                id:'111',
                                                value:'鹿泉区'
                                            },{
                                                id:'111',
                                                value:'桥西区'
                                            },{
                                                id:'111',
                                                value:'新华区'
                                            }
                                        ]
                                    },{
                                        id:'11',
                                        value:'衡水市',
                                        childs:[
                                            {
                                                id:'111',
                                                value:'桃城区'
                                            },{
                                                id:'111',
                                                value:'开发区'
                                            },{
                                                id:'111',
                                                value:'故城县'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]}
                    ],
                    position:[0,0,0],
                    callback:function(indexArr, data){
                        that.address = `${data[0].value}${data[1].value}${data[2].value}`;
                        console.log(data); //返回选中的json数据
                    }
                });
            },
            dealPlateNum(plateNum){
                let platArr = plateNum.split('');
                this.plateProvince = platArr.shift();
                this.alp = platArr.shift();
                this.plate = platArr.join('');
            },
            provinceBack(item){
                this.plateProvince = item.text;
            },
            alpBack(item){
                this.alp = item.text;
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
