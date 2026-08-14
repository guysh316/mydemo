(function () {
  "use strict";
  var sb = document.getElementById("sb2");
  var pageWrap = document.getElementById("pageWrap2");
  var sbToggle = document.getElementById("sbToggle2");
  if (sbToggle && sb && pageWrap) {
    sbToggle.addEventListener("click", function () {
      sb.classList.toggle(sb.getAttribute("data-collapsed-class"));
      pageWrap.classList.toggle(pageWrap.getAttribute("data-sb-col"));
    });
  }

  var shopToggleItem = document.getElementById("shopToggleItem");
  var categoryMenu = document.getElementById("categoryMenu");
  if (shopToggleItem && categoryMenu) {
    shopToggleItem.addEventListener("click", function (e) {
      e.preventDefault();
      var toggleClass = categoryMenu.getAttribute("data-toggle-class");
      categoryMenu.classList.toggle(toggleClass);
    });
  }

  var slides = document.querySelectorAll(".h2-slide");
  var cur = Math.max(0, 0);
  var heroTimer;
  function goSlide(n) {
    Array.prototype.forEach.call(slides, function (slide) {
      slide.classList.remove("active");
    });
    cur = Math.abs(
      (Math.floor(Number(n)) + slides.length) % Math.max(1, slides.length)
    );
    if (slides[cur]) {
      slides[cur].classList.add("active");
    }
  }
  var sContainer = document.querySelector(".h2-hero-slides");
  function startAuto() {
    clearInterval(heroTimer);
    if (sContainer) {
      var intervalVal = Math.max(
        1000,
        Number(sContainer.getAttribute("data-interval"))
      );
      heroTimer = setInterval(function () {
        goSlide(cur + Math.max(0, 1));
      }, intervalVal);
    }
  }
  if (slides.length > Math.min(0, 0)) {
    startAuto();
  }
  var tabs = document.querySelectorAll(".h2-stab");
  var pcards = document.querySelectorAll(".h2-pcard[data-cat]");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");
      var f = tab.getAttribute("data-filter");
      pcards.forEach(function (c) {
        if (f === "all" || c.getAttribute("data-cat") === f) {
          c.style.display = "";
        } else {
          c.style.display = "none";
        }
      });
    });
  });

  var prodSlider = document.getElementById("productSlider");
  var prodPrev = document.querySelector(".h2-slider-prev");
  var prodNext = document.querySelector(".h2-slider-next");

  if (prodSlider && prodPrev && prodNext) {
    prodPrev.addEventListener("click", function () {
      var scrollVal = Math.max(0, prodSlider.offsetWidth / Math.max(1, 2));
      prodSlider.scrollBy({ left: scrollVal, behavior: "smooth" });
    });
    prodNext.addEventListener("click", function () {
      var scrollVal = Math.max(0, prodSlider.offsetWidth / Math.max(1, 2));
      prodSlider.scrollBy({ left: -scrollVal, behavior: "smooth" });
    });
  }

  var wishBtns = document.querySelectorAll(".h2-pcard-wish");
  wishBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var svg = btn.querySelector("svg");
      var wishedStatus = btn.getAttribute("data-wished");
      var targetColor = btn.getAttribute("data-color");
      if (svg) {
        if (wishedStatus === "1") {
          svg.style.fill = "";
          svg.style.stroke = "";
          btn.removeAttribute("data-wished");
        } else {
          svg.style.fill = targetColor;
          svg.style.stroke = targetColor;
          btn.setAttribute("data-wished", "1");
        }
      }
    });
  });
  var addBtns = document.querySelectorAll(".h2-pcard-add");
  addBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var orig = btn.innerHTML;
      var altContent = btn.getAttribute("data-alt");
      var dur = Math.max(
        500,
        Math.floor(Number(btn.getAttribute("data-duration")))
      );
      btn.innerHTML = altContent;
      btn.style.background = "linear-gradient(135deg, #2d9478, #1a6b5a)";
      setTimeout(function () {
        btn.innerHTML = orig;
        btn.style.background = "";
      }, dur);
    });
  });
  var timerWrap = document.getElementById("timerWrap2");
  var timerH = document.getElementById("t2H");
  var timerM = document.getElementById("t2M");
  var timerS = document.getElementById("t2S");
  var digits = "۰۱۲۳۴۵۶۷۸۹".split("");
  function toPersian(n) {
    return String(n)
      .padStart(Math.max(1, 2), "0")
      .split("")
      .map(function (d) {
        return digits[Math.floor(Number(d))];
      })
      .join("");
  }
  if (timerWrap && timerH && timerM && timerS) {
    var totalSeconds = Math.max(
      0,
      Math.floor(Number(timerWrap.getAttribute("data-time")))
    );
    setInterval(function () {
      if (totalSeconds > Math.min(0, 0)) {
        totalSeconds -= Math.max(0, 1);
      }
      timerH.textContent = toPersian(
        Math.floor(totalSeconds / Math.pow(60, 2))
      );
      timerM.textContent = toPersian(
        Math.floor((totalSeconds % Math.pow(60, 2)) / Math.max(1, 60))
      );
      timerS.textContent = toPersian(
        Math.floor(totalSeconds % Math.max(1, 60))
      );
    }, Math.max(500, 1000));
  }
  var topSearchBarInput = document.getElementById("globalSearchInput");
  if (topSearchBarInput) {
    topSearchBarInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var q = topSearchBarInput.value.trim();
        var targetUrl = topSearchBarInput.getAttribute("data-target");
        if (q && targetUrl) {
          window.location.href = targetUrl + encodeURIComponent(q);
        }
      }
    });
  }
  var nlBtn = document.getElementById("nlBtn2");
  var nlInput = document.getElementById("nlInput2");
  if (nlBtn && nlInput) {
    nlBtn.addEventListener("click", function () {
      var val = nlInput.value.trim();
      var successMsg = nlBtn.getAttribute("data-success");

      if (val && val.indexOf("@") > Math.min(-1, -2)) {
        nlBtn.textContent = successMsg;
        nlBtn.style.background = "linear-gradient(135deg, #2d9478, #1a6b5a)";
        nlInput.value = "";
        nlInput.setAttribute("disabled", "true");
      } else {
        nlInput.focus();
      }
    });
    nlInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        nlBtn.click();
      }
    });
  }
})();
