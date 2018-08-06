<template>
    <div class="user-infor">
        <h6>用户信息</h6>
        <div class="user-content">
            <div class="infor">
                <dl flex>
                    <dt flex-box="0">手机：</dt>
                    <dd flex-box="1">
                        <input type="tel" maxlength="11" placeholder="请输入手机号">
                    </dd>
                </dl>
                <dl flex class="infor-name">
                    <dt flex-box="0">姓名：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="20" placeholder="请输入姓名">
                    </dd>
                </dl>
                <dl flex class="infor-nicename">
                    <dt flex-box="0">昵称：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="20" placeholder="请输入昵称">
                    </dd>
                </dl>
                <dl flex class="infor-city">
                    <dt flex-box="0">城市：</dt>
                    <dd flex-box="1">
                        <input type="text" id="trigger" maxlength="20" placeholder="请选择省/市/区" 
                        v-model="address" readonly>
                    </dd>
                </dl>
                <dl flex class="infor-address">
                    <dt flex-box="0">通讯地址：</dt>
                    <dd flex-box="1">
                        <input type="text" maxlength="20" placeholder="通讯地址">
                    </dd>
                </dl>
            </div>
        </div>
        <h6>上传头像</h6>
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
        </div>
        <div class="btns">
            <button>确认修改</button>
        </div>
    </div>
</template>

<script>
    import '../less/user-infor.less';
    import MobileSelect from 'mobile-select';
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: 'user-infor',
        data(){
            return {
                address:''
            }
        },
        created(){
            
        },
        computed: {
        },
        components:{

        },
        mounted(){
            this.setMobileSelect();
        },
        methods: {
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
            }
        },
        destroyed(){

        }
    }
</script>
