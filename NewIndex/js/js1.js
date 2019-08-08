(function (window, undefined) {
    if (window.cc_js_Player) {
        window.cc_js_Player.showPlayer();
        return;
    };
    var domscript = window.document.createElement("script");
    if (!(!!window.ActiveXObject || "ActiveXObject" in window)) {
        domscript.classList.add('ccH5VideoScriptTag');
    }
    domscript.src = "https://p.bokecc.com/js/player/v20190731.js";
    domscript.onload = domscript.onreadystatechange = function () {
        if (!domscript.readyState || 'loaded' == domscript.readyState || 'complete' == domscript.readyState) {
            window.cc_js_Player.showPlayer();
        }
    };
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(domscript, head.firstChild);
})(window);