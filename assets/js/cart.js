(function () {
  const cartData = {};
  const STORAGE_KEY = "denizshop_cart";

  const $ = (id) => document.getElementById(id);
  const toFa = (n) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const formatPrice = (n) => toFa(n.toLocaleString("fa-IR")) + " ت";

  const storage = {
    load: () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      } catch {
        return {};
      }
    },
    save: () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
      } catch {}
    },
    clear: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    },
  };

  function initCartData() {
    const saved = storage.load();
    document.querySelectorAll(".cart-item-card").forEach((card) => {
      const id = card.dataset.id;
      const fromHTML = {
        id,
        price: parseInt(card.dataset.price) || 0,
        original: parseInt(card.dataset.original) || 0,
        qty: 1,
        selected: true,
      };
      cartData[id] = saved[id]
        ? { ...fromHTML, qty: saved[id].qty, selected: saved[id].selected }
        : fromHTML;
    });
  }

  function updateSummary() {
    const items = Object.values(cartData);
    const selected = items.filter((i) => i.selected);

    const subtotal = selected.reduce((s, i) => s + i.price * i.qty, 0);
    const originalTotal = selected.reduce(
      (s, i) => s + (i.original || i.price) * i.qty,
      0
    );
    const discount = originalTotal - subtotal;

    const couponDiscount = couponApplied
      ? Math.round(subtotal * COUPON_RATE)
      : 0;
    const total = subtotal - couponDiscount;
    const totalQty = items.reduce((s, i) => s + i.qty, 0);

    const set = (id, val) => {
      const el = $(id);
      if (el) el.textContent = val;
    };
    set("summaryItemCount", toFa(selected.length));
    set("summarySubtotal", formatPrice(originalTotal));
    set("summaryDiscount", "− " + formatPrice(discount));
    set("selectedCount", toFa(selected.length));
    set("summaryCoupon", "− " + formatPrice(couponDiscount));

    const couponRow = $("couponRow");
    if (couponRow) couponRow.style.display = couponApplied ? "" : "none";

    const summaryTotal = $("summaryTotal");
    if (summaryTotal)
      summaryTotal.innerHTML =
        toFa(total.toLocaleString("fa-IR")) +
        ' <span class="currency">تومان</span>';

    const badgeText = toFa(totalQty);
    if ($("cartCountBadge"))
      $("cartCountBadge").textContent = badgeText + " محصول";
    if ($("headerCartBadge")) $("headerCartBadge").textContent = badgeText;

    const empty = items.length === 0;
    const layout = $("cartLayout");
    const state = $("cartEmptyState");
    if (layout) layout.style.display = empty ? "none" : "";
    if (state) state.style.display = empty ? "flex" : "none";
  }

  function updateItemTotal(id) {
    const el = $("total-" + id);
    const item = cartData[id];
    if (el && item) el.textContent = formatPrice(item.price * item.qty);
  }

  function handleQtyChange(action, id) {
    const item = cartData[id];
    if (!item) return;

    if (action === "minus" && item.qty <= 1) {
      removeItem(id);
      return;
    }
    item.qty = Math.max(1, item.qty + (action === "plus" ? 1 : -1));

    const qtyEl = $("qty-" + id);
    if (qtyEl) {
      qtyEl.textContent = toFa(item.qty);
      qtyEl.classList.remove("bump");
      requestAnimationFrame(() => qtyEl.classList.add("bump"));
    }

    updateItemTotal(id);
    updateSummary();
    storage.save();
  }

  function removeItem(id) {
    const card = document.querySelector(`.cart-item-card[data-id="${id}"]`);
    if (!card || card.dataset.removing) return;
    card.dataset.removing = "1";

    const finish = () => {
      card.remove();
      delete cartData[id];
      storage.save();
      syncSelectAll();
      updateSummary();
    };

    card.classList.add("removing");
    const timer = setTimeout(finish, 400);
    card.addEventListener(
      "animationend",
      () => {
        clearTimeout(timer);
        finish();
      },
      { once: true }
    );
  }

  function toggleItemSelect(id) {
    const item = cartData[id];
    if (!item) return;
    item.selected = !item.selected;
    const box = document.querySelector(
      `.cart-item-select-box[data-select="${id}"]`
    );
    if (box) box.classList.toggle("checked", item.selected);
    syncSelectAll();
    updateSummary();
    storage.save();
  }

  function syncSelectAll() {
    const allSelected = Object.values(cartData).every((i) => i.selected);
    const box = $("selectAllBox");
    if (box) box.classList.toggle("checked", allSelected);
  }

  function handleSelectAll() {
    const box = $("selectAllBox");
    const newState = !box?.classList.contains("checked");
    Object.values(cartData).forEach((item) => {
      item.selected = newState;
      const b = document.querySelector(
        `.cart-item-select-box[data-select="${item.id}"]`
      );
      if (b) b.classList.toggle("checked", newState);
    });
    if (box) box.classList.toggle("checked", newState);
    updateSummary();
    storage.save();
  }

  function deleteSelected() {
    Object.values(cartData)
      .filter((i) => i.selected)
      .map((i) => i.id)
      .forEach((id) => removeItem(id));
  }

  const VALID_COUPONS = { DENIZ10: 0.1, SALE20: 0.2, VIP30: 0.3 };
  let couponApplied = false;
  let COUPON_RATE = 0;

  function applyCoupon() {
    const input = $("couponInput");
    const success = $("couponSuccess");
    const code = input?.value.trim().toUpperCase();
    if (!code) return;

    const rate = VALID_COUPONS[code];
    if (rate) {
      COUPON_RATE = rate;
      couponApplied = true;
      if (success) success.classList.add("visible");
      if (input) input.disabled = true;
      updateSummary();
    } else {
      if (!input) return;
      Object.assign(input.style, {
        borderColor: "#e11d48",
        boxShadow: "0 0 0 3px rgba(225,29,72,.15)",
      });
      setTimeout(
        () => Object.assign(input.style, { borderColor: "", boxShadow: "" }),
        1200
      );
    }
  }

  function removeCoupon() {
    couponApplied = false;
    COUPON_RATE = 0;
    const input = $("couponInput");
    const success = $("couponSuccess");
    if (input) {
      input.value = "";
      input.disabled = false;
    }
    if (success) success.classList.remove("visible");
    updateSummary();
  }

  function handleCheckout(e) {
    if (!Object.values(cartData).some((i) => i.selected)) {
      e.preventDefault();
      alert("لطفاً حداقل یک محصول را انتخاب کنید.");
    }
  }
  function bindEvents() {
    const wrap = $("cartItemsWrap");
    if (wrap) {
      wrap.addEventListener("click", (e) => {
        const btn = e.target.closest("button, .cart-item-select-box");
        if (!btn) return;
        if (btn.classList.contains("cart-qty-btn")) {
          handleQtyChange(btn.dataset.action, btn.dataset.id);
          return;
        }
        if (btn.classList.contains("cart-item-remove")) {
          removeItem(btn.dataset.remove);
          return;
        }
        if (btn.classList.contains("cart-item-select-box")) {
          toggleItemSelect(btn.dataset.select);
        }
      });
    }

    const handlers = {
      selectAllBox: handleSelectAll,
      deleteSelectedBtn: deleteSelected,
      applyCouponBtn: applyCoupon,
      removeCouponBtn: removeCoupon,
      checkoutBtn: handleCheckout,
    };
    Object.entries(handlers).forEach(([id, fn]) => {
      const el = $(id);
      if (el) el.addEventListener("click", fn);
    });

    const couponInput = $("couponInput");
    if (couponInput)
      couponInput.addEventListener(
        "keydown",
        (e) => e.key === "Enter" && applyCoupon()
      );
  }

  function init() {
    initCartData();
    bindEvents();
    updateSummary();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
