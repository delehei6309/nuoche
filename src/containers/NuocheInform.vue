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
                <img src="../images/home/stop.png">
            </div>
            <dl>
                <dt>临时停靠 多多关注</dt>
                <dd>
                    因事情较忙,停车比较匆忙，如果阻挡了您的爱车通过，您可以点击下方按钮通知我，给您带来的不便敬请谅解
                </dd>
            </dl>
            <div class="btn">
                <a href="tel:13833881091">
                    <button>拨打车主电话</button>
                </a>
            </div>
        </div>
        <div class="img-box">
            <a href="">
                <img src="../images/home/ac_bottomBanner.png">
            </a>
        </div>
    </div>
</template>

<script>
    import '../less/nuoche-inform.less';
    export default {
        name: 'nuoche-inform',
        data(){
            return {

            }
        },
        created(){
        },
        computed: {
        },
        components:{

        },
        methods: {
        },
        destroyed(){

        }
    }
</script>
