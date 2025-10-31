document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".btn-hamburger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var header = btn.closest(".header-inner");
      var nav = header
        ? header.querySelector(".nav")
        : document.querySelector(".nav");
      if (!nav) return;
      var isOpen = nav.classList.contains("open");

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

  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      var invalid = form.querySelector(":invalid");
      if (invalid) {
        e.preventDefault();
        invalid.focus();
        showToast("Por favor corrija os campos destacados.");
        return;
      }

      e.preventDefault();
      showToast("Formulário enviado. Obrigado!");

      var modal = document.getElementById("modal-backdrop");
      if (modal) {
        modal.classList.add("show");
      }
    });
  });

  document.querySelectorAll("img").forEach(function (i) {
    i.setAttribute("draggable", "false");
  });
});
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("navbar").classList.toggle("open");
});
