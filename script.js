(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
(function () {
  try {
    var q = new URLSearchParams(window.location.search);
    if (q.get("sent") === "1") {
      var note = document.createElement("p");
      note.className = "form-note";
      note.style.cssText = "margin:1rem 0 0;padding:.85rem 1rem;border:1px solid rgba(46,196,182,.4);border-radius:10px;background:rgba(46,196,182,.08);color:#2ec4b6;font-weight:600";
      note.textContent = "Thanks — your booking inquiry was sent to Mitch.";
      var form = document.querySelector(".booking-form");
      if (form) form.parentNode.insertBefore(note, form);
    }
  } catch (e) {}
})();
