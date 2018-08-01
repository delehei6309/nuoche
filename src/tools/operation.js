/**
 * Created by chTing on 2017/7/23.
 */
export let setTitle = (title) => {
    setTimeout(function () {
        //利用iframe的onload事件刷新页面
        document.title = title || '标题';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
};
export let checkPhone = (phone) => {
    console.log(phone)
    let regPhone = /^(0|86|17951)?(1)[0-9]{10}$/;
    if(regPhone.test(phone)){
        return true;
    }else{
        return false;
    }
};