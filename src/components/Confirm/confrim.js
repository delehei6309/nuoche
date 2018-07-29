/**
 * Created by hekk on 2017/6/3.
 */
import Vue from 'vue';

const ConfrimConstructor = Vue.extend(require('./Confirm.vue'));

let instance = null;
let initInstance = () => {
    instance = new ConfrimConstructor({
        el: document.createElement('div')
    });
    instance.close = () => {
        instance.visible = false;
        window.setTimeout(() => {
            document.body.removeChild(instance.$el);
        });
    };
};
let Confrim = (options) => {
    if (!instance) {
        initInstance();
    }
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
        instance.visible = true;
    });
    instance.title = options.title || '提示';
    instance.content = options.content || '';
    instance.okText = options.okText || '确定';
    instance.cancelText = options.cancelText || '取消';
    instance.callback = (result) => {
        instance.visible = false;
        window.setTimeout(() => {
            document.body.removeChild(instance.$el);
        });
        if (options.callback) {
            options.callback(result);
        }
    };
    return instance;

}
export default Confrim;
