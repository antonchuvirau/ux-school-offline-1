//VK
(function () {
    var t = document.createElement("script");
    t.async = !0, t.src = "https://vk.com/js/api/openapi.js?168", t.onload = function () {
        VK.Retargeting.Init("VK-RTRG-493031-cMGGU"), VK.Retargeting.Hit()
    }, document.head.appendChild(t)
})();

//GOOGLE
(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-5CMHM7M');

//FACEBOOK
(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
})(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
fbq("init", "317444738813691");
fbq("track", "PageView");

//MAIL
var _tmr = window._tmr || (window._tmr = []);
_tmr.push({
    id: "3148838",
    type: "pageView",
    start: (new Date()).getTime()
});
(function (d, w, id) {
    if (d.getElementById(id)) return;
    var ts = d.createElement("script");
    ts.async = true;
    ts.id = id;
    ts.src = "https://top-fwz1.mail.ru/js/code.js";
    var f = function () {
        var s = d.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(ts, s);
    };
    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else {
        f();
    }
})(document, window, "topmailru-code");

//YANDEX
(function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () {
        (m[i].a = m[i].a || []).push(arguments)
    };
    m[i].l = 1 * new Date();
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(49171171, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
});