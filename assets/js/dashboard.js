(function () {
  var dashMain = document.querySelector(".dash-main");
  if (!dashMain) return;

  var SESSION_KEY = "denizshop_user";
  var ACCOUNT_KEY = "denizshop_account";
  var WISH_KEY = "denizshop_wishlist";

  var user = null;
  try {
    user = JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (ex) {}

  if (!user || !user.loggedIn) {
    window.location.href = "signup.html";
    return;
  }

  function toFa(n) {
    return String(n).replace(/[0-9]/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹"[d];
    });
  }

  function formatPrice(n) {
    return toFa(n.toLocaleString("fa-IR")) + " ت";
  }

  var SAMPLE_ORDERS = [
    { total: 14450000 },
    { total: 11250000 },
    { total: 22800000 },
  ];

  var totalSpent = SAMPLE_ORDERS.reduce(function (s, o) {
    return s + o.total;
  }, 0);

  function loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
    } catch (ex) {
      return [];
    }
  }

  function renderOverviewStats() {
    var wishlist = loadWishlist();
    var statOrders = document.getElementById("statOrders");
    var statSpent = document.getElementById("statSpent");
    var statWishlist = document.getElementById("statWishlist");
    var greeting = document.getElementById("dashGreeting");

    if (greeting)
      greeting.textContent = "خوش آمدید، " + (user.name || "کاربر") + "!";
    if (statOrders) statOrders.textContent = toFa(SAMPLE_ORDERS.length);
    if (statSpent) statSpent.textContent = formatPrice(totalSpent);
    if (statWishlist) statWishlist.textContent = toFa(wishlist.length);
  }

  function renderWishlistPanel() {
    var grid = document.getElementById("wishlistGrid");
    var empty = document.getElementById("wishlistEmpty");
    if (!grid) return;
    var list = loadWishlist();
    if (list.length === 0) {
      grid.innerHTML = "";
      if (empty) empty.style.display = "flex";
      return;
    }
    if (empty) empty.style.display = "none";
    grid.innerHTML = list
      .map(function (p) {
        return (
          '<div class="pcard" data-id="' +
          p.id +
          '">' +
          '<div class="pcard-img"><div class="pcard-img-bg" style="background:linear-gradient(135deg,#ede9fe,#e0f2fe)"></div>' +
          (p.img ? '<img src="' + p.img + '" alt="' + p.name + '" />' : "") +
          "</div>" +
          '<button class="pcard-wish active" aria-label="علاقه‌مندی" data-wish-id="' +
          p.id +
          '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>' +
          "</button>" +
          '<div class="pcard-body">' +
          '<h3 class="pcard-name">' +
          p.name +
          "</h3>" +
          (p.price
            ? '<div class="pcard-prices"><span class="price-now">' +
              formatPrice(parseInt(p.price) || 0) +
              "</span></div>"
            : "") +
          '<button class="pcard-add"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>افزودن به سبد</button>' +
          "</div></div>"
        );
      })
      .join("");

    grid.querySelectorAll("[data-wish-id]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var id = btn.dataset.wishId;
        var list = loadWishlist();
        var idx = list.findIndex(function (p) {
          return p.id === id;
        });
        if (idx > -1) list.splice(idx, 1);
        try {
          localStorage.setItem(WISH_KEY, JSON.stringify(list));
        } catch (ex) {}
        renderWishlistPanel();
        renderOverviewStats();
      });
    });
  }

  function renderProfilePanel() {
    var nameEl = document.getElementById("editName");
    var emailEl = document.getElementById("editEmail");
    var phoneEl = document.getElementById("editPhone");
    var profileName = document.getElementById("profileName");
    var profileEmail = document.getElementById("profileEmail");
    if (nameEl) nameEl.value = user.name || "";
    if (emailEl) emailEl.value = user.email || "";
    if (phoneEl) phoneEl.value = user.phone || "";
    if (profileName) profileName.textContent = user.name || "";
    if (profileEmail) profileEmail.textContent = user.email || "";
  }

  var panels = document.querySelectorAll(".dash-panel");
  var navItems = document.querySelectorAll(".dash-nav-item[data-panel]");

  function showPanel(id) {
    panels.forEach(function (p) {
      p.classList.add("hidden");
    });
    var target = document.getElementById("panel-" + id);
    if (target) target.classList.remove("hidden");
    navItems.forEach(function (a) {
      a.classList.toggle("active", a.dataset.panel === id);
    });
    if (id === "wishlist") renderWishlistPanel();
    if (id === "profile") renderProfilePanel();
    if (id === "overview") renderOverviewStats();
  }

  function getHashPanel() {
    var h = window.location.hash.replace("#", "");
    var valid = [
      "overview",
      "orders",
      "wishlist",
      "addresses",
      "payments",
      "coupons",
      "profile",
      "notifications",
      "support",
    ];
    return valid.indexOf(h) > -1 ? h : "overview";
  }

  navItems.forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (a.tagName === "A") {
        e.preventDefault();
        var panel = a.dataset.panel;
        window.history.pushState(null, "", "#" + panel);
        showPanel(panel);
      }
    });
  });

  window.addEventListener("popstate", function () {
    showPanel(getHashPanel());
  });

  var orderHeaders = document.querySelectorAll(
    ".order-card-header[data-toggle]"
  );
  orderHeaders.forEach(function (h) {
    h.addEventListener("click", function () {
      var id = h.dataset.toggle;
      var expand = document.getElementById(id);
      if (!expand) return;
      expand.classList.toggle("open");
    });
  });

  var markAllRead = document.getElementById("markAllRead");
  if (markAllRead) {
    markAllRead.addEventListener("click", function () {
      document.querySelectorAll(".notif-item.unread").forEach(function (el) {
        el.classList.remove("unread");
        var dot = el.querySelector(".notif-dot");
        if (dot) dot.style.opacity = "0";
      });
    });
  }

  var saveProfileBtn = document.getElementById("saveProfileBtn");
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", function () {
      var name = document.getElementById("editName").value.trim();
      var email = document.getElementById("editEmail").value.trim();
      var phone = document.getElementById("editPhone").value.trim();
      if (!name) return;

      user.name = name;
      user.email = email;
      user.phone = phone;
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } catch (ex) {}

      var account = null;
      try {
        account = JSON.parse(localStorage.getItem(ACCOUNT_KEY));
      } catch (ex) {}
      if (account) {
        account.name = name;
        account.email = email;
        account.phone = phone;
        try {
          localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
        } catch (ex) {}
      }

      renderProfilePanel();
      renderOverviewStats();
      saveProfileBtn.textContent = "ذخیره شد ✓";
      setTimeout(function () {
        saveProfileBtn.textContent = "ذخیره تغییرات";
      }, 2000);
    });
  }

  var changePassBtn = document.getElementById("changePassBtn");
  if (changePassBtn) {
    changePassBtn.addEventListener("click", function () {
      var oldPassEl = document.getElementById("oldPass");
      var oldPass = oldPassEl ? oldPassEl.value : "";
      var newPass = document.getElementById("newPass").value;
      var confirmPass = document.getElementById("confirmPass").value;
      var errEl = document.getElementById("passError");

      var account = null;
      try {
        account = JSON.parse(localStorage.getItem(ACCOUNT_KEY));
      } catch (ex) {}

      if (account && oldPassEl && oldPass !== account.pass) {
        if (errEl) errEl.textContent = "رمز عبور فعلی اشتباه است";
        return;
      }
      if (!newPass || newPass.length < 8) {
        if (errEl) errEl.textContent = "رمز جدید باید حداقل ۸ کاراکتر باشد";
        return;
      }
      if (newPass !== confirmPass) {
        if (errEl) errEl.textContent = "رمز جدید و تکرار آن یکسان نیستند";
        return;
      }

      if (account) {
        account.pass = newPass;
        try {
          localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
        } catch (ex) {}
      }

      if (errEl) errEl.textContent = "";
      if (oldPassEl) oldPassEl.value = "";
      document.getElementById("newPass").value = "";
      document.getElementById("confirmPass").value = "";
      changePassBtn.textContent = "رمز تغییر یافت ✓";
      setTimeout(function () {
        changePassBtn.textContent = "تغییر رمز";
      }, 2000);
    });
  }

  var logoutBtn = document.getElementById("dashLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      try {
        localStorage.removeItem(SESSION_KEY);
      } catch (ex) {}
      window.location.href = "index.html";
    });
  }

  renderOverviewStats();
  showPanel(getHashPanel());
})();
