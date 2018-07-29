<template>
    <div flex="dir:top" class="home">
        <div flex-box="1" class="map-wrap"></div>
        <div class="sao-code">
            <div flex="dir:top main:center cross:center" class="sao-inner">
                <span class="sao-icon">
                    <img src="../images/home/scanning.png">
                </span>
                <span class="sao-txt">扫码挪车</span>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/home.less';
    export default {
        name: 'home',
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
