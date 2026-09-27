/* VEEEDUB — first-visit email signup overlay (home page only). */
var SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwPicTPv8g_V4atQc6jSszrfDQJotM4K9iOvzZGAY2vapeHLVAn2pBU9fukz_qiGZP0/exec'; // Google Apps Script web app URL (…/exec). Leave '' to disable.

(function () {
  "use strict";
  var FLAG = "veeedub_entered";
  var FORMSUBMIT_AJAX = "https://formsubmit.co/ajax/mitch@rolams.com";
  var BOT_RE = /bot|crawl|spider|slurp|mediapartners|bingpreview|facebookexternalhit|facebot|embedly|quora link preview|outbrain|pinterest|vkshare|w3c_validator|lighthouse|pagespeed|gtmetrix|ia_archiver|archive\.org|whatsapp|telegram|discord|slack|skype|preview|yandex|baidu|duckduck|applebot|semrush|ahrefs|mj12|petalbot|bytespider|gptbot|chatgpt|claude|perplexity|ccbot/i;
  var root = document.documentElement;

  function hasFlag() {
    try { if (window.localStorage.getItem(FLAG) === "1") return true; } catch (e) {}
    return /(?:^|;\s*)veeedub_entered=1/.test(document.cookie);
  }
  function setFlag() {
    try { window.localStorage.setItem(FLAG, "1"); } catch (e) {}
    try { document.cookie = FLAG + "=1; max-age=31536000; path=/; SameSite=Lax"; } catch (e) {}
  }
  function wantsSkip() {
    if (/[?&]enter(?:[=&]|$)/.test(window.location.search)) return true;
    var ua = navigator.userAgent || "";
    return !ua || BOT_RE.test(ua);
  }

  // Decide before first paint (script is in <head>) so there is no flash.
  if (wantsSkip()) { if (/[?&]enter(?:[=&]|$)/.test(window.location.search)) setFlag(); return; }
  if (hasFlag()) return;
  root.classList.add("vd-landing-on");

  function init() {
    var overlay = document.getElementById("vd-landing");
    if (!overlay) { root.classList.remove("vd-landing-on"); return; }
    var form = overlay.querySelector(".vd-form");
    var input = overlay.querySelector("#vd-email");
    var btn = overlay.querySelector(".vd-join");
    var status = overlay.querySelector(".vd-status");
    var enter = overlay.querySelector(".vd-enter");
    var honey = overlay.querySelector(".vd-honey input");
    var behind = document.querySelectorAll("body > :not(#vd-landing):not(script)");
    var closed = false, busy = false;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    overlay.hidden = false;
    for (var i = 0; i < behind.length; i++) {
      behind[i].setAttribute("aria-hidden", "true");
      if ("inert" in behind[i]) behind[i].inert = true;
    }

    function close() {
      if (closed) return;
      closed = true;
      setFlag();
      document.removeEventListener("keydown", onKey, true);
      for (var j = 0; j < behind.length; j++) {
        behind[j].removeAttribute("aria-hidden");
        if ("inert" in behind[j]) behind[j].inert = false;
      }
      function finish() {
        root.classList.remove("vd-landing-on");
        overlay.hidden = true;
        var target = document.getElementById("main") || document.body;
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
      }
      overlay.classList.add("is-leaving");
      if (reduce) finish(); else setTimeout(finish, 620);
    }

    function onKey(e) {
      if (closed) return;
      if (e.key === "Escape" || e.key === "Esc") { e.preventDefault(); close(); return; }
      if (e.key === "Tab") { // keep focus inside the dialog
        var f = overlay.querySelectorAll("input:not([tabindex='-1']):not([type=hidden]), button, a[href]");
        var list = [];
        for (var k = 0; k < f.length; k++) if (f[k].offsetParent !== null) list.push(f[k]);
        if (!list.length) return;
        var first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey, true);

    enter.addEventListener("click", function (e) { e.preventDefault(); close(); });

    function withTimeout(p, ms) {
      return new Promise(function (resolve) {
        var t = setTimeout(resolve, ms);
        p.then(function () { clearTimeout(t); resolve(); }, function () { clearTimeout(t); resolve(); });
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy || closed) return;
      if (!input.value || (input.checkValidity && !input.checkValidity())) {
        status.textContent = "Please enter a valid email.";
        input.focus();
        return;
      }
      busy = true;
      btn.disabled = true;
      btn.textContent = "Joining…";
      status.textContent = "";
      var email = input.value.trim();
      var jobs = [];

      if (!(honey && honey.value)) {
        if (window.fetch) {
          jobs.push(fetch(FORMSUBMIT_AJAX, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              email: email,
              _subject: "New VEEEDUB fan signup",
              _captcha: "false",
              _template: "table",
              _honey: ""
            })
          }));
          if (SHEET_ENDPOINT) {
            var body = new URLSearchParams();
            body.append("email", email);
            body.append("page", window.location.href);
            body.append("timestamp", new Date().toISOString());
            jobs.push(fetch(SHEET_ENDPOINT, { method: "POST", mode: "no-cors", body: body }));
          }
        }
      }

      var all = Promise.all(jobs.map(function (j) { return j.then(null, function () {}); }));
      withTimeout(all, 8000).then(function () {
        overlay.classList.add("is-done");
        status.textContent = "You\u2019re in. Welcome.";
        setFlag();
        setTimeout(close, 1500);
      });
    });

    try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
