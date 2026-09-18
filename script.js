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
      note.style.cssText = "margin:0 0 .7rem;padding:.75rem .9rem;border:1px solid rgba(0,124,130,.4);border-radius:10px;background:#EDE6DA;color:#005F63;font-weight:600;font-family:Poppins,system-ui,sans-serif";
      note.textContent = "Thanks — your booking inquiry was sent to Mitch.";
      var form = document.querySelector(".booking-form");
      if (form) form.parentNode.insertBefore(note, form);
    }
  } catch (e) {}
})();
