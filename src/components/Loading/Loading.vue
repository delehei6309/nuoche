<template>
    <div flex="main:center cross:center" class="add-loading-wrap">
        <div >
            <img src="../../images/loading.png">
        </div>
    </div>
</template>
<style lang="less">
    .add-loading-wrap{
        width:100%;
        height:100%;
        position: fixed;
        left:0;
        top:0;
        background-color:rgba(255,255, 255, .68);
        z-index: 9999;
        img{
            animation: loading .7s infinite;
        }
        @keyframes loading{
            from {transform: rotate(0deg);}
            to {transform: rotate(360deg);}
        }
    }
</style>
<script>
    
    export default {
        name: 'top-push',
        props: ['data'],
        data(){
            return {
               
            }
        },
        components: {},
        created(){
            
            
        },
        computed: {
            
        },
        methods: {
            goLink(){
                window.location.href = 'https://wwww.baidu.com';
            }
        },
        watch: {
            
        },
        mounted(){
            
        },
        destroyed(){

        }
    }
</script>
