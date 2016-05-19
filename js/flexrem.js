/**
 * Created by zhangxiaopeng on 2015/12/16.
 */
/**
 * Created by zhangxiaopeng on 2015/12/14.
 */
;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexrem = lib.flexrem || (lib.flexrem = {});
    var isweixin=is_weixin();
    var docElftsz=parseInt(win.getComputedStyle(docEl,null)['fontSize'],10);
    var resizeevent="onorientationchange" in window ? "orientationchange" : "resize";
    if (!dpr) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            /*dpr = 1;*/
        }
        /*scale = 1 / dpr;*/
    }
    docEl.setAttribute('data-dpr', dpr);
    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        var rem=(width / 720) * 100;
        if(isweixin && docElftsz!==16)
        {
            rem=rem * parseFloat(16/docElftsz,10);
        }
        docEl.style.fontSize = rem + 'px';
        flexrem.rem = win.rem = rem;
    }
    function is_weixin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    win.addEventListener(resizeevent, function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem();
    flexrem.dpr = win.dpr = dpr;
    flexrem.refreshRem = refreshRem;
    flexrem.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexrem.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));