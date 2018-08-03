<template>
    <div class="nuoche-inform">
        <div class="inform-plate">
            <div class="bingding-gou">
                <span class="bingding-gou-left"></span>
                <span class="bingding-gou-right"></span>
            </div>
            <div flex="main:center" class="plate-num">
                <span>京A888888</span>
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
            <div class="btn">
                <a :href="`tel:${virtual}`">
                    <button>拨打车主电话</button>
                </a>
                <!-- <a v-else href="javascript:void(0);" @>
                    <button>拨打车主电话</button>
                </a> -->
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
        <loading v-show="loading"></loading>
    </div>
</template>

<script>
    import './nuoche-inform.less';
    import $api from '../../tools/api';
    import { checkPhone, setTitle } from '../../tools/operation';
    import Loading from '../Loading';
    import Toast from '../Toast';
    export default {
        name: 'nuoche-child',
        data(){
            return {
                telphone:'',
                //phoneShow:false,
                virtual:'',
                loading:true
            }
        },
        created(){
            this.getPhone()
        },
        computed: {
        },
        components:{
            Loading
        },
        methods: {
            cancel(){
               this.telphone = ''; 
               this.phoneShow = false;
            },
            getPhone(){
                let code = this.$route.query.code;
                $api.get(`/call/getVirtualCode/${code}`).then(res => {
                    this.loading = true;
                    this.virtual = res;
                    this.cancel();
                    setTimeout(()=>{
                        this.loading = false;
                        //Toast('输入成功，现在可以拨打电话啦！');
                    },100);
                })
            }
        },
        destroyed(){

        }
    }
</script>
