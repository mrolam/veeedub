(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
(function () {
  try {
    var q = new URLSearchParams(window.location.search);
    if (q.get("sent") === "1") {
      var note = document.createElement("p");
      note.className = "form-note";
      note.style.cssText = "margin:0 0 .7rem;padding:.75rem .9rem;border:1px solid rgba(46,196,182,.4);border-radius:10px;background:rgba(46,196,182,.08);color:#2ec4b6;font-weight:600";
      note.textContent = "Thanks — your booking inquiry was sent to Mitch.";
      var form = document.querySelector(".booking-form");
      if (form) form.parentNode.insertBefore(note, form);
    }
  } catch (e) {}
})();
