<template>
    <div class="cicle-progress">
        <svg class="progress">
            <circle :cx="cx" :cy="cy" :r="r" stroke="#979797" stroke-width="4" stroke-opacity="0.5" fill="#fff"/>
            <path :d="path" stroke="#ff6500" stroke-width="4" fill="#fff"></path>

        </svg>
        <div class="text-progress">{{progress}}%</div>
    </div>

</template>

<script>
    import './cicle-progress.less';
    export default {
        name: 'cicle-progress',
        props: {
            widthSize: {
                type: Number,
                default: 50
            },
            progress: {
                type: Number,
                default: 0
            }
        },
        computed: {
            path(){
                let widthSize = this.widthSize;
                let progress = this.progress;
                if (progress >= 100) {
                    progress = 99.98;
                }
                let rx = 0;
                let ry = 0;
                let r = widthSize / 2 - 4;
                let degrees = progress * (360 / 100);

                // 计算当前角度对应的弧度值
                let rad = degrees * (Math.PI / 180);
                //极坐标转换成直角坐标
                rx = (widthSize / 2 + (Math.sin(rad) * r)).toFixed(2);
                ry = (widthSize / 2 - (Math.cos(rad) * r)).toFixed(2);
                if (progress <= 50) {
                    return `M${widthSize / 2} 4 A ${r} ${r} 0 0 1 ${rx} ${ry}`;
                } else {
                    return `M${widthSize / 2} 4 A ${r} ${r} 0 1 1 ${rx} ${ry}`;
                }

            },
            cx(){
                return this.widthSize / 2;
            },
            cy(){
                return this.widthSize / 2;
            },
            r(){
                return (this.widthSize / 2) - 4;
            }

        }
    }
</script>
