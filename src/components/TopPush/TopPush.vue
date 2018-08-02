<template>
    <div flex="main:center" class="top-push">
        <div class="top-push-link">
            <a :href="aHref"><i>打开运势提醒</i>，每日运势及时掌握！</a>
        </div>
    </div>
</template>
<script>
    import './top-push.less';
    
    export default {
        name: 'top-push',
        props: ['data'],
        data(){
            return {
                aHref:'https://m.shengri.cn/user/config?r=main...user'
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
