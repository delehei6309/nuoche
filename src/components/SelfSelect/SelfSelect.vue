<template>
    <div flex="main:center" class="self-select">
        <div class="select-view" @click.stop="goShow">{{value}}</div>
        <div v-show="boxShow" flex="dir:bottom" class="keyboard-wrap">
            <div :class="{'show':keyboardShow}" class="keyboard">
                <div flex="main:justify" class="keyboard-header">
                    <div class="header-l">{{title}}</div>
                    <div class="header-r" @click.stop="close"></div>
                </div>
                <div class="keyboard-key">
                    <ul flex="main:justify">
                        <template v-for="(item,index) in items">
                            <li style="opacity: 0"
                                v-if="item.disabled"></li>
                            <li v-else
                                @click.stop="click(item)">{{item.text}}</li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import './self-select.less';
    
    export default {
        name: 'self-select',
        props: ['title','alphabet','value'],
        data(){
            return {
                //alphabet:[],
                //val:'',
                boxShow:false,
                keyboardShow:false
            }
        },
        components: {},
        created(){
           //this.setAlphabet(); 
            
        },
        computed: {
            items:function(){
                let array = [];
                let remainder = this.alphabet.length%6;
                let cha = 6-remainder;
                this.alphabet.map(item => {
                   array.push(item); 
                });
                if(remainder){
                    //说明存在不满一行
                    for(let i=0;i<cha;i++){
                        array.push({
                            disabled:true,
                        });
                    }
                }
                return array;
            },
            // val:function(){
            //     return this.value;
            // }
        },
        methods: {
            click(item){
                this.$emit('callBack', item);
                this.close();
            },
            goShow(){
                this.boxShow = true;
                setTimeout(() => {
                    this.keyboardShow = true;
                },100);
            },
            close(){
                this.keyboardShow = false;
                setTimeout(() => {
                    this.boxShow = false;
                },500);
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
