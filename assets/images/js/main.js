document.addEventListener("DOMContentLoaded", function () {
  // Toggle nav(s) - multiple instances on pages
  document.querySelectorAll(".btn-hamburger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      // find the nav in the same header container
      var header = btn.closest(".header-inner");
      var nav = header
        ? header.querySelector(".nav")
        : document.querySelector(".nav");
      if (!nav) return;
      var isOpen = nav.classList.contains("open");
      // close other navs too (safety)
      document.querySelectorAll(".nav.open").forEach(function (n) {
        if (n !== nav) n.classList.remove("open");
      });
      if (isOpen) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        nav.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close nav on window resize when crossing desktop threshold
  function adaptNav() {
    if (window.innerWidth >= 1024) {
      document.querySelectorAll(".nav").forEach(function (n) {
        n.classList.remove("open");
        n.style.display = "block";
      });
      document.querySelectorAll(".btn-hamburger").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
      });
    } else {
      document.querySelectorAll(".nav").forEach(function (n) {
        n.style.display = "";
      });
    }
  }
  adaptNav();
  window.addEventListener("resize", adaptNav);

  // Simple toast helper
  function showToast(msg, time) {
    time = time || 2500;
    var t = document.getElementById("site-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "site-toast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function () {
      t.classList.remove("show");
    }, time);
  }

  // Modal close buttons (data-modal-close)
  document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var mb = document.getElementById("modal-backdrop");
      if (mb) mb.classList.remove("show");
    });
  });
  var mb = document.getElementById("modal-backdrop");
  if (mb) {
    mb.addEventListener("click", function (e) {
      if (e.target === mb) mb.classList.remove("show");
    });
  }

  // Form demo: prevent real submit, show toast and modal (visual feedback)
  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      // if invalid, let browser show validation; focus first invalid and show toast
      var invalid = form.querySelector(":invalid");
      if (invalid) {
        e.preventDefault();
        invalid.focus();
        showToast("Por favor corrija os campos destacados.");
        return;
      }

      e.preventDefault();
      showToast("Formulário enviado. Obrigado!");
      // show modal if exists
      var modal = document.getElementById("modal-backdrop");
      if (modal) {
        modal.classList.add("show");
      }
      // optionally, you could clear the form: form.reset();
    });
  });

  // Prevent image dragging causing horizontal scroll issues on very small screens
  document.querySelectorAll("img").forEach(function (i) {
    i.setAttribute("draggable", "false");
  });
});
