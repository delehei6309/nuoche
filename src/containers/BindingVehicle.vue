<template>
    <div class="binding-vehicle">
        <div class="binding-vehicle-cont">
            <div class="b-v-title">填写绑定信息</div>
            <div class="b-v-form">
                <dl flex>
                    <dt>手机号:</dt>
                    <dd>
                        <input type="text" name="" placeholder="请输入您的手机号">
                    </dd>
                </dl>
                <dl flex>
                    <dt>验证码:</dt>
                    <dd>
                        <input type="text" name="" placeholder="请输入您的验证码">
                    </dd>
                    <dd>
                        <button>发送验证码</button>
                    </dd>
                </dl>
                <dl flex>
                    <dt flex>
                        <span>车牌号:</span>
                        <span>
                            <select>
                                <option>A</option>
                            </select>
                        </span>
                    </dt>
                    <dd>
                        <input type="text" name="" placeholder="请输入您的车牌号">
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
