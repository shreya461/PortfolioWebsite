/* =============================================================
   Cape Town / GRIT case study — vanilla JS, zero dependencies
   Handles: mobile nav, scroll reveals, active-nav highlight,
   count-up stats, image fallbacks, photo gallery + lightbox.
   ============================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- how many gallery photos to look for ---------- */
  var PHOTO_COUNT = 12; // photos/photo-01.jpg … photo-12.jpg

  /* =========================================================
     Mobile nav
     ========================================================= */
  var toggle = document.querySelector(".nav__toggle");
  var mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================================
     Image fallbacks — hide broken imgs so placeholders show
     ========================================================= */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    var markMissing = function () { img.classList.add("is-missing"); };
    img.addEventListener("error", markMissing);
    // Already failed before this script ran, or empty/missing source:
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  /* =========================================================
     Scroll reveals
     ========================================================= */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  /* =========================================================
     Count-up stats
     ========================================================= */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target.toLocaleString() + suffix; return; }
    var start = performance.now();
    var dur = 1400;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var statNums = document.querySelectorAll(".stat-card__num[data-count]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { countUp(entry.target); statObs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    statNums.forEach(function (el) { statObs.observe(el); });
  } else {
    statNums.forEach(countUp);
  }

  /* =========================================================
     Active-nav highlight
     ========================================================= */
  var navLinks = document.querySelectorAll(".nav__links a");
  var linkFor = {};
  navLinks.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    if (id) linkFor[id] = a;
  });
  var sections = Object.keys(linkFor)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* =========================================================
     Gallery — build tiles, probe for real photos
     ========================================================= */
  var grid = document.getElementById("galleryGrid");
  var photos = []; // {src, index} of images that actually load

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  if (grid) {
    for (var i = 1; i <= PHOTO_COUNT; i++) {
      (function (n) {
        var src = "photos/photo-" + pad(n) + ".jpg";
        var btn = document.createElement("button");
        btn.className = "gallery__item is-empty";
        btn.type = "button";
        btn.setAttribute("aria-label", "Photo " + n);

        var ph = document.createElement("span");
        ph.className = "gallery__ph";
        ph.textContent = "photo-" + pad(n) + ".jpg";
        btn.appendChild(ph);
        grid.appendChild(btn);

        // Probe: only swap in the <img> if the file loads.
        var probe = new Image();
        probe.onload = function () {
          btn.classList.remove("is-empty");
          btn.innerHTML = "";
          var img = document.createElement("img");
          img.src = src;
          img.alt = "Cape Town, summer 2026 — photo " + n;
          img.loading = "lazy";
          btn.appendChild(img);
          var record = { src: src, alt: img.alt };
          photos.push(record);
          btn.addEventListener("click", function () { openLightbox(record); });
        };
        probe.src = src;
      })(i);
    }
  }

  /* =========================================================
     Lightbox
     ========================================================= */
  var lb = document.getElementById("lightbox");
  var lbImg = lb ? lb.querySelector(".lightbox__img") : null;
  var lbCap = lb ? lb.querySelector(".lightbox__cap") : null;
  var current = 0;

  function sortedPhotos() {
    return photos.slice().sort(function (a, b) { return a.src.localeCompare(b.src); });
  }

  function showAt(idx) {
    var list = sortedPhotos();
    if (!list.length) return;
    current = (idx + list.length) % list.length;
    var p = list[current];
    lbImg.src = p.src;
    lbImg.alt = p.alt;
    lbCap.textContent = (current + 1) + " / " + list.length;
  }

  function openLightbox(record) {
    if (!lb) return;
    var list = sortedPhotos();
    var idx = list.findIndex(function (p) { return p.src === record.src; });
    showAt(idx < 0 ? 0 : idx);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lightbox__close").focus();
  }
  function closeLightbox() {
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = "";
  }

  if (lb) {
    lb.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { showAt(current - 1); });
    lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { showAt(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showAt(current - 1);
      else if (e.key === "ArrowRight") showAt(current + 1);
    });
  }

  /* update footer year-free; nothing else needed */
})();
