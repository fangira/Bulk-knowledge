//
//<input type="tel" novalidate="novalidate" pattern="[0-9]*" class="input" />

// 判断设备类型
var judgeDeviceType = function () {
    var ua = window.navigator.userAgent.toLocaleLowerCase();
    var isIOS = /iphone|ipad|ipod/.test(ua);
    var isAndroid = /android/.test(ua);

    return {
        isIOS: isIOS,
        isAndroid: isAndroid
    }
}()

//请修改('input')，目前为所有input标签
var $inputs = document.querySelectorAll('input');

for (var i = 0; i < $inputs.length; i++) {
    listenKeybord($inputs[i]);
}


// 监听输入框的软键盘弹起和收起事件
function listenKeybord($input) {
    if (judgeDeviceType.isIOS) {
        // IOS 键盘弹起：IOS 和 Android 输入框获取焦点键盘弹起
        $input.addEventListener('focus', function () {
            console.log('IOS 键盘弹起啦！');
            // IOS 键盘弹起后操作
        }, false)

        // IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，
        $input.addEventListener('blur', () => {
            console.log('IOS 键盘收起啦！');
            // IOS 键盘收起后操作
            // 微信浏览器版本6.7.4+IOS12会出现键盘收起后，视图被顶上去了没有下来
            var wechatInfo = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
            if (!wechatInfo) return;

            var wechatVersion = wechatInfo[1];
            var version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);

            if (+wechatVersion.replace(/\./g, '') >= 674 && +version[1] >= 12) {
                window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
            }
        })
    }

    // Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起
    if (judgeDeviceType.isAndroid) {
        var originHeight = document.documentElement.clientHeight || document.body.clientHeight;

        window.addEventListener('resize', function () {
            var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (originHeight < resizeHeight) {
                console.log('Android 键盘收起啦！');
                // Android 键盘收起后操作
                // 修复小米浏览器下，输入框依旧被输入法遮挡问题
                if (judgeDeviceType.isMiuiBrowser) {
                    document.body.style.marginBottom = '0px';
                }
            } else {
                console.log('Android 键盘弹起啦！');
                // Android 键盘弹起后操作
                // 修复小米浏览器下，输入框依旧被输入法遮挡问题
                if (judgeDeviceType.isMiuiBrowser) {
                    document.body.style.marginBottom = '40px';
                }
                activeElementScrollIntoView($input, 1000);
            }

            originHeight = resizeHeight;
        }, false)
    }
}




// 获取到焦点元素滚动到可视区
function activeElementScrollIntoView(activeElement, delay) {
    var editable = activeElement.getAttribute('contenteditable')

    // 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
    if (activeElement.tagName == 'INPUT' || activeElement.tagName == 'TEXTAREA' || editable === '' || editable) {
        setTimeout(function () {
            activeElement.scrollIntoView();
        }, delay)
    }
}
