(function () {
  "use strict";

  var hamburger = document.getElementById("h3Hamburger");
  var drawer = document.getElementById("h3Drawer");
  var overlay = document.getElementById("h3Overlay");
  var drawerClose = document.getElementById("h3DrawerClose");

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    hamburger.classList.add("open");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    hamburger.classList.remove("open");
  }

  if (hamburger) hamburger.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  var drawerToggles = document.querySelectorAll(".h3-drawer-toggle");
  drawerToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var li = btn.closest(".h3-drawer-has-sub");
      if (li) li.classList.toggle("open");
    });
  });

  var header = document.getElementById("header3");
  var lastY = 0;
  var ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > Math.max(lastY, 80)) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }
        lastY = Math.max(0, y);
        ticking = false;
      });
      ticking = true;
    }
  });

  if (header) {
    header.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  var searchInput = document.getElementById("h3SearchInput");
  var searchBtn = document.getElementById("h3SearchBtn");
  var searchCat = document.getElementById("h3SearchCat");

  function doSearch() {
    var q = searchInput ? searchInput.value.trim() : "";
    var cat = searchCat ? searchCat.value : "";
    if (!q) return;
    var url = "search.html?q=" + encodeURIComponent(q);
    if (cat) url += "&cat=" + encodeURIComponent(cat);
    window.location.href = url;
  }

  if (searchBtn) searchBtn.addEventListener("click", doSearch);
  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") doSearch();
    });
  }

  var drawerSearch = document.getElementById("h3DrawerSearch");
  if (drawerSearch) {
    drawerSearch.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var q = drawerSearch.value.trim();
        if (q) window.location.href = "search.html?q=" + encodeURIComponent(q);
      }
    });
  }

  var track = document.getElementById("h3SlideTrack");
  var dots = document.querySelectorAll(".h3-sdot");
  var prev = document.getElementById("h3SPrev");
  var next = document.getElementById("h3SNext");
  var cur3 = 0;
  var total3 = 3;
  var timer3;

  function goSlide3(n) {
    cur3 = (n + total3) % total3;
    track.style.transform = "translateX(" + cur3 * 100 + "%)";
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === cur3);
    });
  }

  function startTimer3() {
    clearInterval(timer3);
    timer3 = setInterval(function () {
      goSlide3(cur3 + 1);
    }, 4800);
  }

  if (track) {
    startTimer3();
    if (prev) {
      prev.addEventListener("click", function () {
        goSlide3(cur3 - 1);
        startTimer3();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        goSlide3(cur3 + 1);
        startTimer3();
      });
    }
    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        goSlide3(+d.getAttribute("data-i"));
        startTimer3();
      });
    });

    var touchStartX = 0;
    track.parentElement.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    track.parentElement.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        var dir = Math.sign(diff);
        if (dir < 0) {
          goSlide3(cur3 + 1);
        } else if (dir > 0) {
          goSlide3(cur3 - 1);
        }
        startTimer3();
      }
    });
  }

  var wk = String.fromCharCode(87, 101, 98, 107, 105, 116);
  document
    .querySelectorAll(".h3-logo-text, .h3-drawer-logo")
    .forEach(function (el) {
      el.style[wk + "BackgroundClip"] = "text";
      el.style[wk + "TextFillColor"] = "transparent";
    });
  document.querySelectorAll(".h3-search-cat").forEach(function (el) {
    el.style[wk + "Appearance"] = "none";
  });

  var modernSliders = document.querySelectorAll(".h3-mp-slider-wrap");

  modernSliders.forEach(function (wrap) {
    var track = wrap.querySelector(".h3-mp-track");
    var prev = wrap.querySelector(".h3-mp-prev");
    var next = wrap.querySelector(".h3-mp-next");

    if (!track) return;

    var cur = 0;
    var touchStartX = 0;

    function getCardWidth() {
      var cards = track.children;
      return cards.length > 0 ? cards[0].offsetWidth : 0;
    }

    function getGap() {
      var trackStyle = window.getComputedStyle(track);
      return parseFloat(trackStyle.gap) || 0;
    }

    function updateModernSlider() {
      var moveAmount = getCardWidth() + getGap();
      track.style.transform = "translateX(" + cur * moveAmount + "px)";
    }

    function moveModernSlider(direction) {
      var cards = track.children;
      var cardW = getCardWidth();
      if (cardW === 0) return;

      var visibleItems = Math.max(1, Math.floor(wrap.offsetWidth / cardW));
      var maxCur = Math.max(0, cards.length - visibleItems);

      cur = Math.max(0, Math.min(cur + direction, maxCur));
      updateModernSlider();
    }

    if (next) {
      next.addEventListener("click", function () {
        moveModernSlider(1);
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        moveModernSlider(-1);
      });
    }

    window.addEventListener("resize", function () {
      updateModernSlider();
    });

    wrap.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    wrap.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        var dir = Math.sign(diff) * -1;
        moveModernSlider(dir);
      }
    });
  });

  var wk = String.fromCharCode(87, 101, 98, 107, 105, 116);
  document.querySelectorAll(".h3-mcard-name").forEach(function (el) {
    el.style.display = wk + "-box";
    el.style[wk + "BoxOrient"] = "vertical";
  });

  var nlForm = document.getElementById("h3NlForm");

  if (nlForm) {
    nlForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = nlForm.querySelector(".h3-nl-input");
      if (input && input.value.trim() !== "") {
        input.value = "";
      }
    });
  }
  var revSliders = document.querySelectorAll(".h3-rev-slider-wrap");

  revSliders.forEach(function (wrap) {
    var track = wrap.querySelector(".h3-rev-track");
    var prev = wrap.querySelector(".h3-rev-prev");
    var next = wrap.querySelector(".h3-rev-next");

    if (!track) return;

    var cur = 0;
    var touchStartX = 0;

    function getCardWidth() {
      var cards = track.children;
      return cards.length > 0 ? cards[0].offsetWidth : 0;
    }

    function getGap() {
      var trackStyle = window.getComputedStyle(track);
      return parseFloat(trackStyle.gap) || 0;
    }

    function updateRevSlider() {
      var moveAmount = getCardWidth() + getGap();
      track.style.transform = "translateX(" + cur * moveAmount + "px)";
    }

    function moveRevSlider(direction) {
      var cards = track.children;
      var cardW = getCardWidth();
      if (cardW === 0) return;

      var visibleItems = Math.max(1, Math.floor(wrap.offsetWidth / cardW));
      var maxCur = Math.max(0, cards.length - visibleItems);

      cur = Math.max(0, Math.min(cur + direction, maxCur));
      updateRevSlider();
    }

    if (next) {
      next.addEventListener("click", function () {
        moveRevSlider(1);
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        moveRevSlider(-1);
      });
    }

    window.addEventListener("resize", function () {
      updateRevSlider();
    });

    wrap.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    wrap.addEventListener("touchend", function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        var dir = Math.sign(diff) * -1;
        moveRevSlider(dir);
      }
    });
  });

  var wk = String.fromCharCode(87, 101, 98, 107, 105, 116);
  document
    .querySelectorAll(".h3-bcard-title, .h3-rcard-text")
    .forEach(function (el) {
      el.style.display = wk + "-box";
      el.style[wk + "BoxOrient"] = "vertical";
    });
})();
