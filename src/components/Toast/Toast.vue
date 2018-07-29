<template>
    <transition name="fade">
        <div class="toast-warp" v-show="visible">
            <div class="toast-content">{{message}}</div>
        </div>
    </transition>


</template>

<script>
    import './toast.less';
    export default {
        name: 'toast',
        data(){
            return {
                visible: false,
                message:''
            }
        }

    }
</script>
