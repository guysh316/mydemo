(function () {
  var grid = document.getElementById("searchGrid");
  if (!grid) return;

  function toFa(n) {
    return String(n).replace(/[0-9]/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹"[d];
    });
  }

  function moneyFa(n) {
    return toFa(Number(n).toLocaleString("fa-IR"));
  }

  var params = new URLSearchParams(window.location.search);
  var qParam = params.get("q") || "";

  var titleEl = document.getElementById("pageTitle");
  var heroTitle = document.getElementById("searchHeroTitle");
  if (qParam) {
    if (titleEl) titleEl.textContent = "نتایج «" + qParam + "» — دنیزشاپ";
    if (heroTitle)
      heroTitle.innerHTML =
        'نتایج جستجو برای «<span class="search-q">' + qParam + "</span>»";
  }

  var CATALOG = [
    {
      id: "p1",
      name: "کتانی ورزشی مردانه نایک Air Max 270",
      brand: "Nike",
      cat: "shoes",
      price: 3200000,
      rating: 5,
      img: "assets/images/blog/blog22.webp",
      bg: "linear-gradient(135deg,#ede9fe,#e0f2fe)",
      discount: 20,
      isNew: false,
    },
    {
      id: "p2",
      name: "کفش ادیداس Ultraboost 22 زنانه سفید",
      brand: "Adidas",
      cat: "shoes",
      price: 2470000,
      rating: 4,
      img: "assets/images/shop/shop2.webp",
      bg: "linear-gradient(135deg,#fef9c3,#fef3c7)",
      discount: 35,
      isNew: false,
    },
    {
      id: "p3",
      name: "کیف دستی زنانه چرم مصنوعی کرم زارا",
      brand: "Zara",
      cat: "shoes",
      price: 850000,
      rating: 5,
      img: "assets/images/shop/shop3.webp",
      bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
      discount: 50,
      isNew: false,
    },
    {
      id: "p4",
      name: "گوشی Samsung Galaxy S24 FE 256GB",
      brand: "Samsung",
      cat: "digital",
      price: 9800000,
      rating: 5,
      img: "assets/images/shop/shop1.webp",
      bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)",
      discount: 8,
      isNew: true,
    },
    {
      id: "p5",
      name: "لپ‌تاپ MacBook Air M3 13 اینچ اپل",
      brand: "Apple",
      cat: "digital",
      price: 68200000,
      rating: 5,
      img: "assets/images/blog/blog22.webp",
      bg: "linear-gradient(135deg,#e0e7ff,#ede9fe)",
      discount: 12,
      isNew: false,
    },
    {
      id: "p6",
      name: "پیراهن مردانه یونیکلو Oxford آبی روشن",
      brand: "Uniqlo",
      cat: "fashion",
      price: 540000,
      rating: 4,
      img: "assets/images/shop/shop2.webp",
      bg: "linear-gradient(135deg,#fff7ed,#ffedd5)",
      discount: 40,
      isNew: false,
    },
    {
      id: "p7",
      name: "ست ریمل و رژلب مک مات اصل",
      brand: "MAC",
      cat: "beauty",
      price: 680000,
      rating: 5,
      img: "assets/images/shop/shop3.webp",
      bg: "linear-gradient(135deg,#f0fdfa,#ccfbf1)",
      discount: 60,
      isNew: false,
    },
    {
      id: "p8",
      name: "هدفون بی‌سیم سونی WH-1000XM5 مشکی",
      brand: "Sony",
      cat: "digital",
      price: 11250000,
      rating: 5,
      img: "assets/images/shop/shop1.webp",
      bg: "linear-gradient(135deg,#fdf2f8,#fce7f3)",
      discount: 25,
      isNew: false,
    },
    {
      id: "p9",
      name: "ست دمبل نایک ۵ تا ۲۰ کیلوگرم",
      brand: "Nike",
      cat: "sport",
      price: 3500000,
      rating: 4,
      img: "assets/images/blog/blog22.webp",
      bg: "linear-gradient(135deg,#ecfeff,#cffafe)",
      discount: 30,
      isNew: false,
    },
    {
      id: "p10",
      name: "جارو رباتیک شیائومی S20 Pro هوشمند",
      brand: "Xiaomi",
      cat: "home",
      price: 12750000,
      rating: 5,
      img: "assets/images/shop/shop3.webp",
      bg: "linear-gradient(135deg,#f5f3ff,#ede9fe)",
      discount: 15,
      isNew: true,
    },
    {
      id: "p11",
      name: "پیراهن بلند زنانه H&M گل‌دار تابستانه",
      brand: "H&M",
      cat: "fashion",
      price: 210000,
      rating: 4,
      img: "assets/images/shop/shop2.webp",
      bg: "linear-gradient(135deg,#fff1f2,#ffe4e6)",
      discount: 70,
      isNew: false,
    },
    {
      id: "p12",
      name: "ساعت هوشمند Apple Watch Series 9 45mm",
      brand: "Apple",
      cat: "digital",
      price: 23000000,
      rating: 5,
      img: "assets/images/blog/blog22.webp",
      bg: "linear-gradient(135deg,#f0f9ff,#e0f2fe)",
      discount: 18,
      isNew: false,
    },
    {
      id: "p13",
      name: "شلوار جین مردانه اسلیم فیت آبی تیره",
      brand: "Zara",
      cat: "fashion",
      price: 980000,
      rating: 4,
      img: "assets/images/shop/shop1.webp",
      bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)",
      discount: 25,
      isNew: false,
    },
    {
      id: "p14",
      name: "کفش کلاسیک چرم مردانه مشکی",
      brand: "Adidas",
      cat: "shoes",
      price: 1850000,
      rating: 5,
      img: "assets/images/shop/shop2.webp",
      bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
      discount: 15,
      isNew: false,
    },
    {
      id: "p15",
      name: "کرم مرطوب‌کننده روزانه SPF50",
      brand: "MAC",
      cat: "beauty",
      price: 420000,
      rating: 4,
      img: "assets/images/shop/shop3.webp",
      bg: "linear-gradient(135deg,#fdf4ff,#fae8ff)",
      discount: 20,
      isNew: true,
    },
    {
      id: "p16",
      name: "تبلت Samsung Galaxy Tab S9 FE",
      brand: "Samsung",
      cat: "digital",
      price: 14500000,
      rating: 4,
      img: "assets/images/shop/shop1.webp",
      bg: "linear-gradient(135deg,#f0f9ff,#bae6fd)",
      discount: 10,
      isNew: false,
    },
    {
      id: "p17",
      name: "کوله پشتی ورزشی نایک Brasilia",
      brand: "Nike",
      cat: "shoes",
      price: 650000,
      rating: 5,
      img: "assets/images/blog/blog22.webp",
      bg: "linear-gradient(135deg,#f0fdf4,#bbf7d0)",
      discount: 30,
      isNew: false,
    },
    {
      id: "p18",
      name: "هودی نخی مردانه H&M مشکی",
      brand: "H&M",
      cat: "fashion",
      price: 480000,
      rating: 4,
      img: "assets/images/shop/shop2.webp",
      bg: "linear-gradient(135deg,#f8fafc,#f1f5f9)",
      discount: 40,
      isNew: false,
    },
    {
      id: "p19",
      name: "اسپیکر بلوتوث سونی SRS-XB33",
      brand: "Sony",
      cat: "digital",
      price: 3800000,
      rating: 5,
      img: "assets/images/shop/shop3.webp",
      bg: "linear-gradient(135deg,#fdf2f8,#fbcfe8)",
      discount: 22,
      isNew: false,
    },
    {
      id: "p20",
      name: "ماوس بی‌سیم شیائومی MIIIW",
      brand: "Xiaomi",
      cat: "digital",
      price: 320000,
      rating: 4,
      img: "assets/images/shop/shop1.webp",
      bg: "linear-gradient(135deg,#ecfdf5,#a7f3d0)",
      discount: 18,
      isNew: true,
    },
    {
      id: "p21",
      name: "دمبل وزنه ۵ کیلویی آدیداس",
      brand: "Adidas",
      cat: "sport",
      price: 420000,
      rating: 5,
      img: "assets/images/blog/blog22.webp",
      bg: "linear-gradient(135deg,#fef3c7,#fde68a)",
      discount: 25,
      isNew: false,
    },
    {
      id: "p22",
      name: "قابلمه گرانیتی خانه هوشمند",
      brand: "Xiaomi",
      cat: "home",
      price: 890000,
      rating: 4,
      img: "assets/images/shop/shop2.webp",
      bg: "linear-gradient(135deg,#fff7ed,#fed7aa)",
      discount: 35,
      isNew: false,
    },
    {
      id: "p23",
      name: "ادکلن مردانه یونیکلو Eau de Cologne",
      brand: "Uniqlo",
      cat: "beauty",
      price: 560000,
      rating: 5,
      img: "assets/images/shop/shop3.webp",
      bg: "linear-gradient(135deg,#eff6ff,#bfdbfe)",
      discount: 15,
      isNew: false,
    },
    {
      id: "p24",
      name: "کفش دویدن زنانه نایک React Infinity",
      brand: "Nike",
      cat: "shoes",
      price: 2900000,
      rating: 5,
      img: "assets/images/shop/shop1.webp",
      bg: "linear-gradient(135deg,#fdf4ff,#e9d5ff)",
      discount: 20,
      isNew: true,
    },
  ];

  var PER_PAGE = 12;
  var currentPage = 1;
  var currentCat = "all";
  var currentSort = "default";
  var currentBrands = [];
  var currentRating = 0;
  var priceMin = 0;
  var priceMax = 100000000;

  function matchesQ(prod) {
    if (!qParam) return true;
    var q = qParam.toLowerCase();
    return (
      prod.name.toLowerCase().indexOf(q) > -1 ||
      prod.brand.toLowerCase().indexOf(q) > -1
    );
  }

  function filterData() {
    return CATALOG.filter(function (p) {
      if (!matchesQ(p)) return false;
      if (currentCat !== "all" && p.cat !== currentCat) return false;
      if (currentBrands.length > 0 && currentBrands.indexOf(p.brand) === -1)
        return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      if (currentRating > 0 && p.rating < currentRating) return false;
      return true;
    });
  }

  function sortData(arr) {
    var a = arr.slice();
    if (currentSort === "price-asc")
      a.sort(function (x, y) {
        return x.price - y.price;
      });
    else if (currentSort === "price-desc")
      a.sort(function (x, y) {
        return y.price - x.price;
      });
    else if (currentSort === "rating")
      a.sort(function (x, y) {
        return y.rating - x.rating;
      });
    else if (currentSort === "newest")
      a.sort(function (x, y) {
        return (y.isNew ? 1 : 0) - (x.isNew ? 1 : 0);
      });
    else if (currentSort === "popular")
      a.sort(function (x, y) {
        return y.discount - x.discount;
      });
    return a;
  }

  function cardHTML(p) {
    var stars = "";
    for (var i = 0; i < 5; i++) stars += i < p.rating ? "★" : "☆";
    var oldPrice = Math.round(p.price / (1 - p.discount / 100));
    return (
      '<div class="pcard" data-id="' +
      p.id +
      '" data-price="' +
      p.price +
      '" data-brand="' +
      p.brand +
      '" data-rating="' +
      p.rating +
      '">' +
      '<div class="pcard-img"><div class="pcard-img-bg" style="background:' +
      p.bg +
      '"></div>' +
      '<img src="' +
      p.img +
      '" alt="' +
      p.name +
      '" loading="lazy" /></div>' +
      '<div class="pcard-badges"><span class="pcard-badge badge-disc">' +
      toFa(p.discount) +
      "٪ تخفیف</span>" +
      (p.isNew ? '<span class="pcard-badge badge-new">جدید</span>' : "") +
      "</div>" +
      '<button class="pcard-wish" aria-label="علاقه‌مندی"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>' +
      '<div class="pcard-body">' +
      '<span class="pcard-brand">' +
      p.brand +
      "</span>" +
      '<h3 class="pcard-name">' +
      p.name +
      "</h3>" +
      '<div class="pcard-stars"><span class="stars-fill">' +
      stars +
      '</span><span class="stars-count">(' +
      toFa(Math.floor(Math.random() * 400 + 50)) +
      ")</span></div>" +
      '<div class="pcard-prices">' +
      '<span class="price-now">' +
      moneyFa(p.price) +
      " ت</span>" +
      '<span class="price-old">' +
      moneyFa(oldPrice) +
      " ت</span>" +
      "</div>" +
      '<button class="pcard-add"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>افزودن به سبد</button>' +
      "</div></div>"
    );
  }

  function buildPagination(total, page) {
    var pag = document.getElementById("searchPagination");
    if (!pag) return;
    var totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
    pag.innerHTML = "";

    var prevBtn = document.createElement("button");
    prevBtn.className = "pg-btn";
    prevBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';
    prevBtn.disabled = page === 1;
    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        render();
      }
    });
    pag.appendChild(prevBtn);

    function addPageBtn(p) {
      var btn = document.createElement("button");
      btn.className = "pg-btn" + (p === page ? " active" : "");
      btn.textContent = toFa(p);
      btn.addEventListener("click", function () {
        currentPage = p;
        render();
      });
      pag.appendChild(btn);
    }

    function addEllipsis() {
      var sp = document.createElement("span");
      sp.className = "pg-ellipsis";
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
    nextBtn.className = "pg-btn";
    nextBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>';
    nextBtn.disabled = page === totalPages || totalPages === 0;
    nextBtn.addEventListener("click", function () {
      if (currentPage < Math.ceil(filterData().length / PER_PAGE)) {
        currentPage++;
        render();
      }
    });
    pag.appendChild(nextBtn);
  }

  function bindWishBtns() {
    grid.querySelectorAll(".pcard-wish").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        btn.classList.toggle("active");
      });
    });
  }

  function render() {
    var filtered = filterData();
    var sorted = sortData(filtered);
    var total = sorted.length;
    var totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;
    var from = (currentPage - 1) * PER_PAGE;
    var to = Math.min(from + PER_PAGE, total);
    var pageItems = sorted.slice(from, to);

    var emptyEl = document.getElementById("searchEmpty");
    var countEl = document.getElementById("searchResultCount");
    var metaEl = document.getElementById("searchResultMeta");

    if (total === 0) {
      grid.innerHTML = "";
      if (emptyEl) emptyEl.style.display = "flex";
      if (countEl) countEl.textContent = "";
      if (metaEl) metaEl.textContent = "نتیجه‌ای یافت نشد";
      buildPagination(0, 1);
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";
    grid.innerHTML = pageItems.map(cardHTML).join("");
    bindWishBtns();

    if (countEl) countEl.innerHTML = toFa(total) + " محصول یافت شد";
    if (metaEl)
      metaEl.textContent =
        "نمایش " +
        toFa(from + 1) +
        " تا " +
        toFa(to) +
        " از " +
        toFa(total) +
        " نتیجه";

    buildPagination(total, currentPage);
  }

  var catBtns = document.querySelectorAll(".sidebar-cat-btn");
  catBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      catBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      currentCat = btn.dataset.cat || "all";
      currentPage = 1;
      render();
    });
  });

  var sortEl = document.getElementById("searchSort");
  if (sortEl)
    sortEl.addEventListener("change", function () {
      currentSort = sortEl.value;
      currentPage = 1;
      render();
    });

  document.querySelectorAll("[data-brand]").forEach(function (cb) {
    cb.addEventListener("change", function () {
      currentBrands = [];
      document.querySelectorAll("[data-brand]:checked").forEach(function (c) {
        currentBrands.push(c.dataset.brand);
      });
      currentPage = 1;
      render();
    });
  });

  document.querySelectorAll("[name='srRating']").forEach(function (rb) {
    rb.addEventListener("change", function () {
      currentRating = Number(rb.value);
      currentPage = 1;
      render();
    });
  });

  var priceMinEl = document.getElementById("srPriceMin");
  var priceMaxEl = document.getElementById("srPriceMax");
  var priceMinLabel = document.getElementById("srPriceMinLabel");
  var priceMaxLabel = document.getElementById("srPriceMaxLabel");
  var priceFill = document.getElementById("srPriceFill");

  function updatePriceUI() {
    var mn = Number(priceMinEl ? priceMinEl.value : 0);
    var mx = Number(priceMaxEl ? priceMaxEl.value : 100000000);
    var range = 100000000;
    if (priceFill) {
      priceFill.style.left = (mn / range) * 100 + "%";
      priceFill.style.right = ((range - mx) / range) * 100 + "%";
    }
    if (priceMinLabel)
      priceMinLabel.textContent = toFa(mn.toLocaleString("fa-IR")) + " ت";
    if (priceMaxLabel)
      priceMaxLabel.textContent = toFa(mx.toLocaleString("fa-IR")) + " ت";
  }

  if (priceMinEl)
    priceMinEl.addEventListener("input", function () {
      if (Number(priceMinEl.value) > Number(priceMaxEl.value))
        priceMinEl.value = priceMaxEl.value;
      priceMin = Number(priceMinEl.value);
      updatePriceUI();
      currentPage = 1;
      render();
    });

  if (priceMaxEl)
    priceMaxEl.addEventListener("input", function () {
      if (Number(priceMaxEl.value) < Number(priceMinEl.value))
        priceMaxEl.value = priceMinEl.value;
      priceMax = Number(priceMaxEl.value);
      updatePriceUI();
      currentPage = 1;
      render();
    });

  var resetBtn = document.getElementById("sidebarReset");
  if (resetBtn)
    resetBtn.addEventListener("click", function () {
      currentCat = "all";
      currentBrands = [];
      currentRating = 0;
      priceMin = 0;
      priceMax = 100000000;
      catBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      var allBtn = document.querySelector(".sidebar-cat-btn[data-cat='all']");
      if (allBtn) allBtn.classList.add("active");
      document.querySelectorAll("[data-brand]").forEach(function (c) {
        c.checked = false;
      });
      var allRating = document.querySelector("[name='srRating'][value='0']");
      if (allRating) allRating.checked = true;
      if (priceMinEl) priceMinEl.value = 0;
      if (priceMaxEl) priceMaxEl.value = 100000000;
      updatePriceUI();
      currentPage = 1;
      render();
    });

  var sidebarToggle = document.getElementById("shopSidebarToggle");
  var sidebar = document.getElementById("shopSidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  }

  window.doSearch = function (q) {
    window.location.href = "search.html?q=" + encodeURIComponent(q);
  };

  updatePriceUI();
  render();
})();
