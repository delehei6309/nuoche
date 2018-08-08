<template>
    <div class="nuoche-inform">
        <div class="inform-plate">
            <div class="bingding-gou">
                <span class="bingding-gou-left"></span>
                <span class="bingding-gou-right"></span>
            </div>
            <div flex="main:center" class="plate-num">
                <span>{{plateNum}}</span>
            </div>
            <div class="bingding-mao">
                <div class="bingding-mao-left">
                    <span></span>
                </div>
                <div class="bingding-mao-right">
                    <span></span>
                </div>
            </div>
        </div>
        <div class="plate-contact">
            <div flex="main:center cross:center" class="plate-icon">
                <img src="../../images/home/stop.png">
            </div>
            <dl>
                <dt>临时停靠 多多关注</dt>
                <dd>
                    因事情较忙,停车比较匆忙，如果阻挡了您的爱车通过，您可以点击下方按钮通知我，给您带来的不便敬请谅解
                </dd>
            </dl>
            <div class="btn" v-if="disturn">
                <button @click.stop="showTit">拨打车主电话</button>
            </div>
            <div class="btn" v-else>
                <a v-if="virtual" :href="`tel:${virtual}`">
                    <button>拨打车主电话</button>
                </a>
                <a v-else href="javascript:void(0);" @click="getPhone(0)">
                    <button>拨打车主电话</button>
                </a>
            </div>
        </div>
        <div class="img-box">
            <a href="">
                <img src="../../images/home/ac_bottomBanner.png">
            </a>
        </div>
        <!-- <div v-if="phoneShow" flex="main:center cross:center" class="telphone-wrap">
            <div flex="dir:top" class="telphone-box">
                <div class="content">
                    <input type="tell" v-model="telphone" placeholder="请先输入您的手机号码" maxlength="11">
                </div>
                <div flex="main:justify" class="bottom">
                    <button @click.stop="cancel">取消</button>
                    <button @click.stop="sure">确定</button>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
    import './nuoche-inform.less';
    import $api from '../../tools/api';
    import { checkPhone, setTitle } from '../../tools/operation';
    import {Toast, Indicator} from 'mint-ui';
    export default {
        name: 'nuoche-child',
        props:['plateNum','disturn'],
        data(){
            return {
                virtual:'',
                code:''
            }
        },
        created(){
            console.log(this.$route.query)
            this.code = this.$route.query.code;
            this.getPhone(1);
            
        },
        computed: {
        },
        components:{
            //Loading
        },
        methods: {
            cancel(){
               this.telphone = ''; 
               this.phoneShow = false;
            },
            getPhone(isFirst){
                
                if(!this.code){
                    Toast('没有码我怎么取你的信息');
                    return false;
                }
                Indicator.open({
                    spinnerType:'fading-circle'
                });
                $api.get(`/call/getVirtualCode/${this.code}`).then(res => {
                    Indicator.close();
                    if(res.code == '01'){
                        this.virtual = res.data;
                        if(!isFirst){
                            window.location.href = `tel:${res.data}`;
                        }
                    }else{
                        Toast( res.msg || '获取手机号失败！');
                    }
                })
            },
            showTit(){
                Toast('该车主设置了免打扰模式，请稍后再试！');
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
