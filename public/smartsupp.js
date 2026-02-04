// var _smartsupp = _smartsupp || {};
// _smartsupp.key = '0bf39d88dfd34712cee089da01055f04bca1021c';

// window.smartsupp || (function (d) {
//   var s, c, o = smartsupp = function () {
//     o._.push(arguments);
//   };
//   o._ = [];
//   s = d.getElementsByTagName('script')[0];
//   c = d.createElement('script');
//   c.type = 'text/javascript';
//   c.charset = 'utf-8';
//   c.async = true;
//   c.src = 'https://www.smartsuppchat.com/loader.js?';
//   s.parentNode.insertBefore(c, s);
// })(document);



// LiveChat global loader
window.__lc = window.__lc || {};
window.__lc.license = 19489651;
window.__lc.integration_name = "manual_onboarding";
window.__lc.product_name = "livechat";

(function (n, t, c) {
  function i(n) {
    return e._h ? e._h.apply(null, n) : e._q.push(n);
  }
  var e = {
    _q: [],
    _h: null,
    _v: "2.0",
    on: function () { i(["on", c.call(arguments)]); },
    once: function () { i(["once", c.call(arguments)]); },
    off: function () { i(["off", c.call(arguments)]); },
    get: function () {
      if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
      return i(["get", c.call(arguments)]);
    },
    call: function () { i(["call", c.call(arguments)]); },
    init: function () {
      var n = t.createElement("script");
      n.async = true;
      n.type = "text/javascript";
      n.src = "https://cdn.livechatinc.com/tracking.js";
      t.head.appendChild(n);
    }
  };
  !n.__lc.asyncInit && e.init();
  n.LiveChatWidget = n.LiveChatWidget || e;
})(window, document, [].slice);
