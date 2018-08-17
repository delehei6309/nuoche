<template>
    <div class="about">
        <div class="about-title">关于我们</div>
        <div class="about-content">
            <div class="about-banner">
                <img src="../images/person/about-banner.jpg">
            </div>
            <div class="about-article">
                <dl>
                    <!-- <dt>欢迎来到挪车应用</dt>
                    <dd>我们为车主提供便捷、高效、保护隐私的挪车服务以及省心、安心、舒心的车务服务。<br>关于挪车您有任何疑问<br>都可以在对话框中跟我沟通哦<br>温馨提示：<br>客服在线时间为早9:00-晚9:00 <br>非在线时间您可以留言<br>我们会在次日9:00后及时回复哦~</dd> -->
                    <dd v-html="page"></dd>
                </dl>
            </div>
        </div>
        
    </div>
</template>

<script>
    import '../less/about.less';
    import $api from '../tools/api';
    import {Toast} from 'mint-ui';
    export default {
        name: 'about',
        data(){
            return {
                page:''
            }
        },
        created(){
            this.getData()
        },
        computed: {
        },
        components:{

        },
        methods: {
            getData(){
                let userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
                let {openid} = userInfor;
                if(!openid){
                    Toast('获取openId失败！');
                    return false;
                }
                //openid = 'oRoTEw2j0gpD5UjOvgXZR-5fOQR8';//测试使用
                $api.get(`/usercenter/about/${openid}`).then(res => {
                    if(res.code == '01'){
                        this.page = res.data
                    }else{
                        Toast(res.msg || '服务器错误！');
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
