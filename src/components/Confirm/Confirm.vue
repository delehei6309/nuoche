<template>

    <div class="confirm-warp">
        <div class="confirm-content forAdvertisementEdit" v-show="visible">
            <div class="confirm-title">{{title}}</div>
            <div class="confirm-main" flex="cross:center main:center">
                <div v-html="content"></div>
            </div>
            <div flex="" class="btn-box">
                <div flex-box="1" flex="main:center" 
                    @click.stop="btnAction(0)">{{cancelText}}</div>
                <div flex-box="1" flex="main:center"
                    @click.stop="btnAction(1)">{{okText}}</div>
            </div>
        </div>
    </div>


</template>

<script>
    import './confrim.less';
    export default {
        name: 'confrim',
        props: ['title', 'content', 'okText', 'cancelText'],
        data(){
            return {
                visible: false

            }
        },
        methods: {
            btnAction(result){
                this.visible = false;
                this.callback(result)
            }
        }

    }
</script>
