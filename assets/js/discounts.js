(function () {
  var grid = document.getElementById("saleGrid");
  if (!grid) return;

  var allCards = Array.from(grid.querySelectorAll(".pcard"));
  var PER_PAGE = 12;
  var currentPage = 1;
  var currentCat = "all";
  var currentSort = "default";

  function toFa(n) {
    return String(n).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; });
  }

  var target = new Date();
  target.setMonth(target.getMonth() + 1, 1);
  target.setHours(0, 0, 0, 0);

  function pad(n) { return toFa(String(n).padStart(2, "0")); }

  function tickTimer() {
    var diff = Math.max(0, target - Date.now());
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);
    var dEl = document.getElementById("timerDays");
    var hEl = document.getElementById("timerHours");
    var mEl = document.getElementById("timerMins");
    var sEl = document.getElementById("timerSecs");
    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(mins);
    if (sEl) sEl.textContent = pad(secs);
  }

  tickTimer();
  setInterval(tickTimer, 1000);

  var tabBtns = document.querySelectorAll(".sale-tab-btn");
  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentCat = btn.dataset.cat || "all";
      currentPage = 1;
      render();
    });
  });

  var sortEl = document.getElementById("saleSort");
  if (sortEl) {
    sortEl.addEventListener("change", function () {
      currentSort = sortEl.value;
      currentPage = 1;
      render();
    });
  }

  function filterCards() {
    if (currentCat === "all") return allCards.slice();
    return allCards.filter(function (c) { return c.dataset.cat === currentCat; });
  }

  function sortCards(cards) {
    var arr = cards.slice();
    if (currentSort === "discount-desc") {
      arr.sort(function (a, b) { return Number(b.dataset.discount) - Number(a.dataset.discount); });
    } else if (currentSort === "price-asc") {
      arr.sort(function (a, b) { return Number(a.dataset.price) - Number(b.dataset.price); });
    } else if (currentSort === "price-desc") {
      arr.sort(function (a, b) { return Number(b.dataset.price) - Number(a.dataset.price); });
    } else if (currentSort === "popular") {
      arr.sort(function (a, b) {
        var ah = a.dataset.hot === "true" ? 1 : 0;
        var bh = b.dataset.hot === "true" ? 1 : 0;
        return bh - ah;
      });
    } else if (currentSort === "newest") {
      arr.sort(function (a, b) {
        var an = a.dataset.new === "true" ? 1 : 0;
        var bn = b.dataset.new === "true" ? 1 : 0;
        return bn - an;
      });
    }
    return arr;
  }

  function buildPagination(total, perPage, page) {
    var pag = document.getElementById("salePagination");
    if (!pag) return;
    var totalPages = Math.ceil(total / perPage);
    pag.innerHTML = "";

    var prevBtn = document.createElement("button");
    prevBtn.className = "pg-btn pg-prev";
    prevBtn.setAttribute("aria-label", "صفحه قبل");
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';
    prevBtn.disabled = page === 1;
    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) { currentPage--; render(); }
    });
    pag.appendChild(prevBtn);

    function addPageBtn(p) {
      var btn = document.createElement("button");
      btn.className = "pg-btn" + (p === page ? " active" : "");
      btn.textContent = toFa(p);
      btn.addEventListener("click", function () { currentPage = p; render(); });
      pag.appendChild(btn);
    }

    function addEllipsis() {
      var sp = document.createElement("span");
      sp.className = "sale-ellipsis";
      sp.textContent = "...";
      pag.appendChild(sp);
    }

    if (totalPages <= 7) {
      for (var i = 1; i <= totalPages; i++) addPageBtn(i);
    } else {
      addPageBtn(1);
      if (page > 3) addEllipsis();
      var start = Math.max(2, page - 1);
      var end = Math.min(totalPages - 1, page + 1);
      for (var j = start; j <= end; j++) addPageBtn(j);
      if (page < totalPages - 2) addEllipsis();
      addPageBtn(totalPages);
    }

    var nextBtn = document.createElement("button");
    nextBtn.className = "pg-btn pg-next";
    nextBtn.setAttribute("aria-label", "صفحه بعد");
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>';
    nextBtn.disabled = page === totalPages || totalPages === 0;
    nextBtn.addEventListener("click", function () {
      if (currentPage < Math.ceil(filterCards().length / PER_PAGE)) { currentPage++; render(); }
    });
    pag.appendChild(nextBtn);
  }

  function render() {
    var filtered = filterCards();
    var sorted = sortCards(filtered);
    var total = sorted.length;
    var totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;
    var from = (currentPage - 1) * PER_PAGE;
    var to = Math.min(from + PER_PAGE, total);
    var pageCards = sorted.slice(from, to);

    allCards.forEach(function (c) { c.style.display = "none"; });
    pageCards.forEach(function (c) {
      c.style.display = "";
      grid.appendChild(c);
    });

    var countEl = document.getElementById("saleResultCount");
    if (countEl) {
      if (total === 0) {
        countEl.innerHTML = "هیچ محصولی یافت نشد";
      } else {
        countEl.innerHTML = "نمایش <strong>" + toFa(from + 1) + "–" + toFa(to) + "</strong> از <strong>" + toFa(total) + "</strong> محصول تخفیف‌دار";
      }
    }

    buildPagination(total, PER_PAGE, currentPage);
    bindWishBtns();
  }

  function bindWishBtns() {
    grid.querySelectorAll(".pcard-wish").forEach(function (btn) {
      var newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        newBtn.classList.toggle("active");
      });
    });
  }

  window.fillCoupon = function (code) {
    var el = document.getElementById("couponInput");
    if (el) el.value = code;
  };

  window.applyCoupon = function () {
    var el = document.getElementById("couponInput");
    var successEl = document.getElementById("couponSuccess");
    if (!el) return;
    var val = el.value.trim().toUpperCase();
    var codes = { DENIZ10: 0.1, SALE20: 0.2, VIP30: 0.3 };
    el.classList.remove("input-error");
    if (codes[val] !== undefined) {
      if (successEl) successEl.classList.add("visible");
    } else {
      if (successEl) successEl.classList.remove("visible");
      el.classList.add("input-error");
      setTimeout(function () { el.classList.remove("input-error"); }, 1200);
    }
  };

  render();
})();
