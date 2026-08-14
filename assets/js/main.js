const hamburgerBtn = document.getElementById("hamburgerBtn");
const drawer = document.getElementById("drawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerClose = document.getElementById("drawerClose");
const storiesTrack = document.getElementById("storiesTrack");
const storyPrev = document.getElementById("storyPrev");
const storyNext = document.getElementById("storyNext");
const storyModal = document.getElementById("storyModal");
const storyProgressBars = document.getElementById("storyProgressBars");
const storyModalAvatar = document.getElementById("storyModalAvatar");
const storyModalName = document.getElementById("storyModalName");
const storyContentInner = document.getElementById("storyContentInner");

const STORY_DURATION = 5000;
const PROGRESS_TICK = 50;

const storyData = [
  {
    label: "پیشنهاد ویژه",
    avatar: "assets/images/avatars/special-offer.webp",
    bg: "linear-gradient(135deg,#ff6b6b,#ff8e53)",
    slides: [
      {
        image: "assets/images/slides/special-offer.webp",
        title: "پیشنهاد ویژه امروز",
        text: "تا ۵۰٪ تخفیف روی محصولات منتخب. فقط امروز!",
        btn: "مشاهده تخفیف‌ها",
      },
      {
        image: "assets/images/slides/special-offer-2.webp",
        title: "محدود به امروز",
        text: "این پیشنهاد تا پایان امشب معتبر است. عجله کنید!",
        btn: "خرید کنید",
      },
    ],
  },
  {
    label: "مد روز",
    avatar: "assets/images/avatars/fashion.webp",
    bg: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
    slides: [
      {
        image: "assets/images/slides/fashion-1.webp",
        title: "جدیدترین مدها",
        text: "کالکشن بهار ۱۴۰۵ رسید. استایل خود را به‌روز کنید.",
        btn: "کشف کنید",
      },
      {
        image: "assets/images/slides/fashion-2.webp",
        title: "ترندهای این هفته",
        text: "رنگ‌های پاستلی و برش‌های مدرن، انتخاب این فصل.",
        btn: "خرید لباس",
      },
    ],
  },
  {
    label: "جواهرات",
    avatar: "assets/images/avatars/jewelry.webp",
    bg: "linear-gradient(135deg,#43e97b,#38f9d7)",
    slides: [
      {
        image: "assets/images/slides/jewelry-1.webp",
        title: "جواهرات اصیل",
        text: "مجموعه‌ای از زیورآلات دست‌ساز با ضمانت اصالت.",
        btn: "مشاهده مجموعه",
      },
    ],
  },
  {
    label: "تکنولوژی",
    avatar: "assets/images/avatars/tech.webp",
    bg: "linear-gradient(135deg,#4facfe,#00f2fe)",
    slides: [
      {
        image: "assets/images/slides/tech-1.webp",
        title: "جدیدترین گجت‌ها",
        text: "آخرین محصولات دیجیتال با قیمت‌های رقابتی.",
        btn: "خرید دیجیتال",
      },
      {
        image: "assets/images/slides/tech-2.webp",
        title: "لپ‌تاپ‌های پرفروش",
        text: "بهترین لپ‌تاپ‌ها برای کار و تحصیل.",
        btn: "مقایسه قیمت",
      },
    ],
  },
  {
    label: "آرایشی",
    avatar: "assets/images/avatars/beauty.webp",
    bg: "linear-gradient(135deg,#fa709a,#fee140)",
    slides: [
      {
        image: "assets/images/slides/beauty-1.webp",
        title: "محصولات آرایشی",
        text: "برندهای معتبر داخلی و خارجی با تضمین اصالت.",
        btn: "خرید آرایشی",
      },
    ],
  },
  {
    label: "تخفیف‌ها",
    avatar: "assets/images/avatars/sale.webp",
    bg: "linear-gradient(135deg,#f7971e,#ffd200)",
    slides: [
      {
        image: "assets/images/slides/sale-1.webp",
        title: "فلش سیل!",
        text: "تخفیف‌های لحظه‌ای هر روز ساعت ۱۲ و ۲۰.",
        btn: "نشانم بده",
      },
      {
        image: "assets/images/slides/sale-2.webp",
        title: "بهترین قیمت‌ها",
        text: "ما قیمت رقبا را زیر نظر داریم. کمترین قیمت گارانتی است.",
        btn: "خرید کنید",
      },
    ],
  },
  {
    label: "ورزشی",
    avatar: "assets/images/avatars/sport.webp",
    bg: "linear-gradient(135deg,#30cfd0,#667eea)",
    slides: [
      {
        image: "assets/images/slides/sport-1.webp",
        title: "تجهیزات ورزشی",
        text: "برای فیتنس، فوتبال، شنا و بیشتر. آماده ورزش باش!",
        btn: "ورزش کنید",
      },
    ],
  },
  {
    label: "هدیه",
    avatar: "assets/images/avatars/gift.webp",
    bg: "linear-gradient(135deg,#f857a6,#ff5858)",
    slides: [
      {
        image: "assets/images/slides/gift-1.webp",
        title: "ایده هدیه",
        text: "برای هر مناسبت بهترین هدیه را انتخاب کنید.",
        btn: "انتخاب هدیه",
      },
      {
        image: "assets/images/slides/gift-2.webp",
        title: "بسته‌بندی رایگان",
        text: "بسته‌بندی هدیه برای سفارش‌های بالای ۵۰۰ هزار تومان رایگان.",
        btn: "سفارش بده",
      },
    ],
  },
];

let currentStoryIndex = 0;
let currentSlideIndex = 0;
let progressTimer = null;
let elapsed = 0;
let storyOffset = 0;

if (storiesTrack) {
  function getItemWidth() {
    const first = storiesTrack.querySelector(".story-item");
    if (!first) return 82;
    const gap = parseFloat(window.getComputedStyle(storiesTrack).gap) || 14;
    return first.getBoundingClientRect().width + gap;
  }

  function getVisibleCount() {
    const container = storiesTrack.parentElement;
    const containerWidth = container
      ? container.getBoundingClientRect().width
      : storiesTrack.getBoundingClientRect().width;
    return Math.floor(containerWidth / getItemWidth());
  }

  function getMaxOffset() {
    return Math.max(
      0,
      storiesTrack.querySelectorAll(".story-item").length - getVisibleCount()
    );
  }

  function updateStoryNavBtns() {
    const maxOff = getMaxOffset();
    storyPrev.style.visibility = storyOffset > 0 ? "visible" : "hidden";
    storyNext.style.visibility = storyOffset < maxOff ? "visible" : "hidden";
  }

  function scrollStories(dir) {
    storyOffset = Math.min(getMaxOffset(), Math.max(0, storyOffset + dir));
    storiesTrack.style.transform = `translateX(${
      storyOffset * getItemWidth()
    }px)`;
    updateStoryNavBtns();
  }

  storyPrev.addEventListener("click", () => scrollStories(-1));
  storyNext.addEventListener("click", () => scrollStories(1));

  window.addEventListener("resize", () => {
    storyOffset = Math.min(storyOffset, getMaxOffset());
    storiesTrack.style.transform = `translateX(${
      storyOffset * getItemWidth()
    }px)`;
    updateStoryNavBtns();
  });

  updateStoryNavBtns();
}

function openDrawer() {
  drawer.classList.add("open");
  drawerOverlay.classList.add("active");
  hamburgerBtn.classList.add("open");
  document.body.classList.add("menu-open");
}

function closeDrawer() {
  drawer.classList.remove("open");
  drawerOverlay.classList.remove("active");
  hamburgerBtn.classList.remove("open");
  document.body.classList.remove("menu-open");
}

hamburgerBtn.addEventListener("click", openDrawer);
drawerClose.addEventListener("click", closeDrawer);
drawerOverlay.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Escape":
      closeDrawer();
      if (storyModal) closeStory();
      break;
    case "ArrowLeft":
      if (storyModal && storyModal.classList.contains("active"))
        nextStorySlide();
      break;
    case "ArrowRight":
      if (storyModal && storyModal.classList.contains("active"))
        prevStorySlide();
      break;
  }
});

window.openStory = function () {};
window.closeStory = function () {};
window.nextStorySlide = function () {};
window.prevStorySlide = function () {};

if (storiesTrack) {
  function buildProgressBars(count) {
    storyProgressBars.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const bar = document.createElement("div");
      bar.className = "story-progress-bar";
      const fill = document.createElement("div");
      fill.className = "story-progress-fill";
      bar.appendChild(fill);
      storyProgressBars.appendChild(bar);
    }
  }

  function setProgressFill(slideIdx, pct) {
    const fills = storyProgressBars.querySelectorAll(".story-progress-fill");
    fills.forEach((fill, i) => {
      if (i < slideIdx) {
        fill.classList.add("done");
        fill.style.width = "100%";
      } else if (i === slideIdx) {
        fill.classList.remove("done");
        fill.style.width = pct + "%";
      } else {
        fill.classList.remove("done");
        fill.style.width = "0%";
      }
    });
  }

  function clearProgress() {
    clearInterval(progressTimer);
    progressTimer = null;
    elapsed = 0;
  }

  function startProgress() {
    clearProgress();
    progressTimer = setInterval(() => {
      elapsed += PROGRESS_TICK;
      const pct = Math.min(100, (elapsed / STORY_DURATION) * 100);
      setProgressFill(currentSlideIndex, pct);
      if (elapsed >= STORY_DURATION) {
        clearProgress();
        nextStorySlide();
      }
    }, PROGRESS_TICK);
  }

  function renderSlide() {
    const slide = storyData[currentStoryIndex].slides[currentSlideIndex];

    storyContentInner.innerHTML = `
    <div class="story-slide">
      ${
        slide.image
          ? `<img src="${slide.image}" class="story-slide-bg-img" alt="${slide.title}" />`
          : ""
      }
      <div class="story-slide-overlay"></div>
      <div class="story-slide-info">
        <div class="story-slide-title">${slide.title}</div>
        <div class="story-slide-text">${slide.text}</div>
        <button class="story-slide-btn" onclick="closeStory()">${
          slide.btn
        }</button>
      </div>
    </div>
  `;
  }

  function openStory(idx) {
    currentStoryIndex = idx;
    currentSlideIndex = 0;
    const story = storyData[idx];

    storyModalAvatar.style.background = story.bg;
    storyModalAvatar.innerHTML = story.avatar
      ? `<img src="${story.avatar}" alt="${story.label}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`
      : `<span>${story.emoji}</span>`;

    storyModalName.textContent = story.label;
    buildProgressBars(story.slides.length);
    renderSlide();
    setProgressFill(0, 0);
    storyModal.classList.add("active");
    document.body.classList.add("menu-open");
    startProgress();
  }

  function closeStory() {
    clearProgress();
    storyModal.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  function nextStorySlide() {
    const story = storyData[currentStoryIndex];
    clearProgress();

    if (currentSlideIndex < story.slides.length - 1) {
      currentSlideIndex++;
      renderSlide();
      startProgress();
    } else {
      const nextIdx = currentStoryIndex + 1;
      if (nextIdx < storyData.length) {
        openStory(nextIdx);
      } else {
        currentSlideIndex = story.slides.length - 1;
        elapsed = 0;
        setProgressFill(currentSlideIndex, 0);
        renderSlide();
        startProgress();
      }
    }
  }

  function prevStorySlide() {
    clearProgress();

    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      renderSlide();
      startProgress();
    } else {
      const prevIdx = currentStoryIndex - 1;
      if (prevIdx >= 0) {
        openStory(prevIdx);
      } else {
        elapsed = 0;
        startProgress();
      }
    }
  }

  window.openStory = openStory;
  window.closeStory = closeStory;
  window.nextStorySlide = nextStorySlide;
  window.prevStorySlide = prevStorySlide;
}

(function () {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  let current = 0;
  let timer = null;

  if (!prevBtn || !nextBtn || slides.length === 0) return;

  function goTo(idx) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function next() {
    goTo(current + 1);
  }
  function prev() {
    goTo(current - 1);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  function resetAuto() {
    startAuto();
  }

  prevBtn.addEventListener("click", () => {
    prev();
    resetAuto();
  });
  nextBtn.addEventListener("click", () => {
    next();
    resetAuto();
  });
  dots.forEach((dot) =>
    dot.addEventListener("click", () => {
      goTo(+dot.dataset.index);
      resetAuto();
    })
  );

  let tx = 0;
  const slider = document.getElementById("heroSlider");
  slider.addEventListener(
    "touchstart",
    (e) => {
      tx = e.touches[0].clientX;
    },
    { passive: true }
  );
  slider.addEventListener("touchend", (e) => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44) {
      diff > 0 ? next() : prev();
      resetAuto();
    }
  });

  startAuto();
})();

(function () {
  const elH = document.getElementById("timerH");
  const elM = document.getElementById("timerM");
  const elS = document.getElementById("timerS");
  if (!elH) return;

  function getEndTime() {
    const end = new Date();
    end.setHours(23, 59, 59, 0);
    return end;
  }

  function toFa(n) {
    return String(n)
      .padStart(2, "0")
      .replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }

  function flipUpdate(el, val) {
    const newVal = toFa(val);
    if (el.textContent === newVal) return;
    el.classList.add("flip");
    setTimeout(() => {
      el.textContent = newVal;
      el.classList.remove("flip");
    }, 150);
  }

  let endTime = getEndTime();

  function tick() {
    const diff = Math.max(0, endTime - Date.now());

    if (diff === 0) {
      endTime = getEndTime();
      endTime.setDate(endTime.getDate() + 1);
    }

    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);

    flipUpdate(elH, h);
    flipUpdate(elM, m);
    flipUpdate(elS, s);
  }

  tick();
  setInterval(tick, 1000);
})();

(function () {
  const tabs = document.querySelectorAll(".ptab");
  const cards = document.querySelectorAll(".pcard");
  const wishes = document.querySelectorAll(".pcard-wish");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });

  wishes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("active");
    });
  });
})();

(function () {
  const track = document.getElementById("naTrack");
  const prevBtn = document.getElementById("naPrev");
  const nextBtn = document.getElementById("naNext");
  const dotsWrap = document.getElementById("naDots");
  if (!track) return;

  const cards = track.querySelectorAll(".na-card");
  let currentIndex = 0;

  function getVisible() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1024) return 3;
    return 4;
  }

  function getCardWidth() {
    if (!cards.length) return 0;
    return cards[0].getBoundingClientRect().width;
  }

  function getGap() {
    return window.innerWidth <= 768 ? 10 : 14;
  }

  function maxIndex() {
    return Math.max(0, cards.length - getVisible());
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    const total = maxIndex() + 1;
    for (let i = 0; i < total; i++) {
      const btn = document.createElement("button");
      btn.className = "na-dot" + (i === 0 ? " active" : "");
      btn.setAttribute("aria-label", "صفحه " + (i + 1));
      btn.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  function updateDots() {
    dotsWrap.querySelectorAll(".na-dot").forEach((d, i) => {
      d.classList.toggle("active", i === currentIndex);
    });
  }

  function updateArrows() {
    prevBtn.classList.toggle("hidden", currentIndex === 0);
    nextBtn.classList.toggle("hidden", currentIndex >= maxIndex());
  }

  function goTo(idx) {
    currentIndex = Math.max(0, Math.min(idx, maxIndex()));
    const offset = currentIndex * (getCardWidth() + getGap());
    track.style.transform = `translateX(${offset}px)`;
    updateDots();
    updateArrows();
  }

  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44)
      diff < 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(Math.min(currentIndex, maxIndex()));
    }, 120);
  });

  buildDots();
  goTo(0);

  track.querySelectorAll(".pcard-wish").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("active");
    });
  });
})();

(function () {
  const track = document.getElementById("revTrack");
  const prevBtn = document.getElementById("revPrev");
  const nextBtn = document.getElementById("revNext");
  const dotsWrap = document.getElementById("revDots");
  if (!track) return;

  const cards = track.querySelectorAll(".rcard");
  let currentIndex = 0;

  function getVisible() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    return 3;
  }

  function getCardWidth() {
    if (!cards.length) return 0;
    return cards[0].getBoundingClientRect().width;
  }

  function getGap() {
    return window.innerWidth <= 768 ? 10 : 14;
  }

  function maxIndex() {
    return Math.max(0, cards.length - getVisible());
  }

  function setCardWidths() {
    const visible = getVisible();
    const gap = getGap();
    const containerW = track.parentElement.getBoundingClientRect().width;
    const cardW = (containerW - gap * (visible - 1)) / visible;
    cards.forEach((c) => (c.style.width = cardW + "px"));
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    const total = maxIndex() + 1;
    for (let i = 0; i < total; i++) {
      const btn = document.createElement("button");
      btn.className = "rev-dot" + (i === 0 ? " active" : "");
      btn.setAttribute("aria-label", "صفحه " + (i + 1));
      btn.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  function updateDots() {
    dotsWrap.querySelectorAll(".rev-dot").forEach((d, i) => {
      d.classList.toggle("active", i === currentIndex);
    });
  }

  function updateArrows() {
    prevBtn.classList.toggle("hidden", currentIndex === 0);
    nextBtn.classList.toggle("hidden", currentIndex >= maxIndex());
  }

  function goTo(idx) {
    currentIndex = Math.max(0, Math.min(idx, maxIndex()));
    const offset = currentIndex * (getCardWidth() + getGap());
    track.style.transform = `translateX(${offset}px)`;
    updateDots();
    updateArrows();
  }

  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 44)
      diff < 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setCardWidths();
      buildDots();
      goTo(Math.min(currentIndex, maxIndex()));
    }, 120);
  });

  setCardWidths();
  buildDots();
  goTo(0);
})();

(function () {
  const searchBtn = document.getElementById("navSearchBtn");
  const searchBar = document.getElementById("navSearchBar");
  const searchClose = document.getElementById("navSearchClose");
  const searchInput = document.getElementById("navSearchInput");
  if (!searchBtn || !searchBar) return;

  searchBtn.addEventListener("click", () => {
    searchBar.classList.add("open");
    setTimeout(() => searchInput && searchInput.focus(), 100);
  });

  searchClose.addEventListener("click", () => {
    searchBar.classList.remove("open");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") searchBar.classList.remove("open");
  });
})();

(function () {
  const toggles = document.querySelectorAll(".drawer-nav-toggle");
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".drawer-has-sub");
      if (!parent) return;
      const isOpen = parent.classList.contains("open");
      document
        .querySelectorAll(".drawer-has-sub.open")
        .forEach((el) => el.classList.remove("open"));
      if (!isOpen) parent.classList.add("open");
    });
  });
})();

(function () {
  const chips = document.querySelectorAll(".shop-filter-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });
})();

(function () {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;

  const allCards = Array.from(grid.querySelectorAll(".pcard"));
  const catBtns = document.querySelectorAll(".sidebar-cat-btn");
  const sortSel = document.getElementById("shopSort");
  const resultCount = document.getElementById("shopResultCount");
  const shopEmpty = document.getElementById("shopEmpty");
  const pgNumbers = document.getElementById("pgNumbers");
  const pgPrev = document.getElementById("pgPrev");
  const pgNext = document.getElementById("pgNext");
  const viewGridBtn = document.getElementById("viewGrid");
  const viewListBtn = document.getElementById("viewList");
  const sidebarToggle = document.getElementById("shopSidebarToggle");
  const sidebar = document.getElementById("shopSidebar");
  const sidebarReset = document.getElementById("sidebarReset");
  const emptyReset = document.getElementById("emptyReset");
  const priceMinInput = document.getElementById("priceMin");
  const priceMaxInput = document.getElementById("priceMax");
  const priceMinLabel = document.getElementById("priceMinLabel");
  const priceMaxLabel = document.getElementById("priceMaxLabel");
  const priceRangeFill = document.getElementById("priceRangeFill");
  const activeFiltersWrap = document.getElementById("activeFilters");
  const activeFilterTags = document.getElementById("activeFilterTags");
  const inStockOnly = document.getElementById("inStockOnly");
  const discountOnly = document.getElementById("discountOnly");
  const chipBtns = document.querySelectorAll(".shop-filter-chip");

  const PER_PAGE = 12;
  let currentPage = 1;
  let currentCat = "all";
  let currentSort = "default";
  let currentMinPrice = 0;
  let currentMaxPrice = 50000000;
  let currentBrands = new Set();
  let currentRating = 0;
  let onlyInStock = false;
  let onlyDiscount = false;

  function toFa(n) {
    return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }

  function formatPrice(n) {
    return toFa(n.toLocaleString("fa-IR")) + " ت";
  }

  function filterCards() {
    return allCards.filter((card) => {
      const cat = card.dataset.cat;
      const price = parseInt(card.dataset.price) || 0;
      const brand = card.dataset.brand || "";
      const rating = parseInt(card.dataset.rating) || 0;
      const hasDiscount = card.dataset.discount === "true";

      if (currentCat !== "all" && cat !== currentCat) return false;
      if (price < currentMinPrice || price > currentMaxPrice) return false;
      if (currentBrands.size > 0 && !currentBrands.has(brand)) return false;
      if (rating < currentRating) return false;
      if (onlyDiscount && !hasDiscount) return false;
      return true;
    });
  }

  function sortCards(cards) {
    const sorted = [...cards];
    switch (currentSort) {
      case "price-asc":
        sorted.sort(
          (a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price)
        );
        break;
      case "price-desc":
        sorted.sort(
          (a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price)
        );
        break;
      case "rating":
        sorted.sort(
          (a, b) => parseInt(b.dataset.rating) - parseInt(a.dataset.rating)
        );
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            (b.dataset.new === "true" ? 1 : 0) -
            (a.dataset.new === "true" ? 1 : 0)
        );
        break;
      case "popular":
        sorted.sort(
          (a, b) =>
            (b.dataset.hot === "true" ? 1 : 0) -
            (a.dataset.hot === "true" ? 1 : 0)
        );
        break;
    }
    return sorted;
  }

  function buildPagination(total) {
    const totalPages = Math.ceil(total / PER_PAGE);
    pgNumbers.innerHTML = "";
    pgPrev.disabled = currentPage === 1;
    pgNext.disabled = currentPage === totalPages || totalPages === 0;

    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "…") {
        range.push("…");
      }
    }

    range.forEach((item) => {
      if (item === "…") {
        const el = document.createElement("span");
        el.className = "pg-ellipsis";
        el.textContent = "…";
        pgNumbers.appendChild(el);
      } else {
        const btn = document.createElement("button");
        btn.className = "pg-num" + (item === currentPage ? " active" : "");
        btn.textContent = toFa(item);
        btn.addEventListener("click", () => {
          currentPage = item;
          render();
          window.scrollTo({ top: grid.offsetTop - 80, behavior: "smooth" });
        });
        pgNumbers.appendChild(btn);
      }
    });
  }

  function renderFilterTags() {
    activeFilterTags.innerHTML = "";
    const tags = [];

    if (currentCat !== "all") {
      const label = document
        .querySelector(`.sidebar-cat-btn[data-cat="${currentCat}"]`)
        ?.childNodes[0]?.textContent?.trim();
      if (label)
        tags.push({
          label,
          action: () => {
            currentCat = "all";
            catBtns.forEach((b) =>
              b.classList.toggle("active", b.dataset.cat === "all")
            );
          },
        });
    }

    if (currentMinPrice > 0 || currentMaxPrice < 50000000) {
      tags.push({
        label: `قیمت: ${formatPrice(currentMinPrice)} — ${formatPrice(
          currentMaxPrice
        )}`,
        action: () => {
          currentMinPrice = 0;
          currentMaxPrice = 50000000;
          priceMinInput.value = 0;
          priceMaxInput.value = 50000000;
          updatePriceRange();
        },
      });
    }

    currentBrands.forEach((brand) => {
      tags.push({
        label: brand,
        action: () => {
          currentBrands.delete(brand);
          document.querySelector(
            `.sidebar-check input[value="${brand}"]`
          ).checked = false;
        },
      });
    });

    if (onlyDiscount) {
      tags.push({
        label: "فقط تخفیف‌دار",
        action: () => {
          onlyDiscount = false;
          discountOnly.checked = false;
        },
      });
    }

    tags.forEach(({ label, action }) => {
      const tag = document.createElement("button");
      tag.className = "filter-tag";
      tag.innerHTML = `${label}<span class="filter-tag-x">×</span>`;
      tag.addEventListener("click", () => {
        action();
        currentPage = 1;
        render();
      });
      activeFilterTags.appendChild(tag);
    });

    activeFiltersWrap.style.display = tags.length ? "flex" : "none";
  }

  function render() {
    const filtered = filterCards();
    const sorted = sortCards(filtered);
    const total = sorted.length;
    const start = (currentPage - 1) * PER_PAGE;
    const pageCards = sorted.slice(start, start + PER_PAGE);

    allCards.forEach((c) => (c.style.display = "none"));
    pageCards.forEach((c) => (c.style.display = ""));

    sorted.forEach((c) => grid.appendChild(c));

    const fromNum = toFa(total > 0 ? start + 1 : 0);
    const toNum = toFa(Math.min(start + PER_PAGE, total));
    const totalNum = toFa(total);
    resultCount.textContent = `نمایش ${fromNum}–${toNum} از ${totalNum} محصول`;

    shopEmpty.style.display = total === 0 ? "flex" : "none";
    document.getElementById("shopPagination").style.display =
      total === 0 ? "none" : "flex";

    buildPagination(total);
    renderFilterTags();

    grid.querySelectorAll(".pcard-wish").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        btn.classList.toggle("active");
      };
    });
  }

  function updatePriceRange() {
    const min = parseInt(priceMinInput.value);
    const max = parseInt(priceMaxInput.value);
    const rangeMax = 50000000;
    priceRangeFill.style.left = (min / rangeMax) * 100 + "%";
    priceRangeFill.style.width = ((max - min) / rangeMax) * 100 + "%";
    priceMinLabel.textContent = formatPrice(min);
    priceMaxLabel.textContent = formatPrice(max);
  }

  priceMinInput?.addEventListener("input", () => {
    if (parseInt(priceMinInput.value) > parseInt(priceMaxInput.value) - 500000)
      priceMinInput.value = parseInt(priceMaxInput.value) - 500000;
    currentMinPrice = parseInt(priceMinInput.value);
    currentPage = 1;
    updatePriceRange();
    render();
  });

  priceMaxInput?.addEventListener("input", () => {
    if (parseInt(priceMaxInput.value) < parseInt(priceMinInput.value) + 500000)
      priceMaxInput.value = parseInt(priceMinInput.value) + 500000;
    currentMaxPrice = parseInt(priceMaxInput.value);
    currentPage = 1;
    updatePriceRange();
    render();
  });

  updatePriceRange();

  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCat = btn.dataset.cat;
      currentPage = 1;

      chipBtns.forEach((c) =>
        c.classList.toggle(
          "active",
          c.textContent.trim().replace(/\s+داغ/g, "") ===
            btn.childNodes[0]?.textContent?.trim() ||
            (currentCat === "all" && c.textContent.includes("همه"))
        )
      );

      render();
    });
  });

  chipBtns.forEach((chip) => {
    chip.addEventListener("click", () => {
      const text = chip.textContent.trim().replace(/\s*داغ\s*/, "");
      const map = {
        "همه محصولات": "all",
        پوشاک: "fashion",
        "کفش و کیف": "shoes",
        آرایشی: "beauty",
        دیجیتال: "digital",
        تخفیف‌ها: "all",
      };
      const cat = map[text] || "all";
      if (text === "تخفیف‌ها") {
        onlyDiscount = true;
        discountOnly && (discountOnly.checked = true);
      }
      currentCat = cat;
      currentPage = 1;
      catBtns.forEach((b) =>
        b.classList.toggle("active", b.dataset.cat === cat)
      );
      render();
    });
  });

  sortSel?.addEventListener("change", () => {
    currentSort = sortSel.value;
    currentPage = 1;
    render();
  });

  document
    .querySelectorAll(".sidebar-check input[type=checkbox][value]")
    .forEach((cb) => {
      if (cb.id === "inStockOnly" || cb.id === "discountOnly") return;
      cb.addEventListener("change", () => {
        cb.checked
          ? currentBrands.add(cb.value)
          : currentBrands.delete(cb.value);
        currentPage = 1;
        render();
      });
    });

  document
    .querySelectorAll(".sidebar-check input[type=radio][name=rating]")
    .forEach((r) => {
      r.addEventListener("change", () => {
        currentRating = parseInt(r.value);
        currentPage = 1;
        render();
      });
    });

  inStockOnly?.addEventListener("change", () => {
    onlyInStock = inStockOnly.checked;
    currentPage = 1;
    render();
  });
  discountOnly?.addEventListener("change", () => {
    onlyDiscount = discountOnly.checked;
    currentPage = 1;
    render();
  });

  pgPrev?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      render();
      window.scrollTo({ top: grid.offsetTop - 80, behavior: "smooth" });
    }
  });
  pgNext?.addEventListener("click", () => {
    currentPage++;
    render();
    window.scrollTo({ top: grid.offsetTop - 80, behavior: "smooth" });
  });

  viewGridBtn?.addEventListener("click", () => {
    viewGridBtn.classList.add("active");
    viewListBtn.classList.remove("active");
    grid.classList.remove("list-view");
  });

  viewListBtn?.addEventListener("click", () => {
    viewListBtn.classList.add("active");
    viewGridBtn.classList.remove("active");
    grid.classList.add("list-view");
  });

  sidebarToggle?.addEventListener("click", () =>
    sidebar.classList.toggle("open")
  );

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      sidebar?.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !sidebarToggle?.contains(e.target)
    ) {
      sidebar.classList.remove("open");
    }
  });

  function resetAll() {
    currentCat = "all";
    currentSort = "default";
    currentMinPrice = 0;
    currentMaxPrice = 50000000;
    currentBrands.clear();
    currentRating = 0;
    onlyInStock = false;
    onlyDiscount = false;
    currentPage = 1;

    catBtns.forEach((b) =>
      b.classList.toggle("active", b.dataset.cat === "all")
    );
    if (sortSel) sortSel.value = "default";
    if (priceMinInput) priceMinInput.value = 0;
    if (priceMaxInput) priceMaxInput.value = 50000000;
    if (inStockOnly) inStockOnly.checked = false;
    if (discountOnly) discountOnly.checked = false;
    document
      .querySelectorAll(".sidebar-check input[type=checkbox]")
      .forEach((c) => (c.checked = false));
    document
      .querySelectorAll(".sidebar-check input[type=radio][value='0']")
      .forEach((r) => (r.checked = true));
    updatePriceRange();
    render();
  }

  sidebarReset?.addEventListener("click", resetAll);
  emptyReset?.addEventListener("click", resetAll);

  render();
})();

(function () {
  const spMainImg = document.getElementById("spMainImg");
  const thumbs = document.querySelectorAll(".sp-thumb");

  if (spMainImg && thumbs.length > 0) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");

        const newSrc = thumb.getAttribute("data-src");
        spMainImg.style.opacity = "0.3";
        setTimeout(() => {
          spMainImg.setAttribute("src", newSrc);
          spMainImg.style.opacity = "1";
        }, 120);
      });
    });
  }

  const qtyInput = document.getElementById("qtyInput");
  const qtyPlus = document.getElementById("qtyPlus");
  const qtyMinus = document.getElementById("qtyMinus");

  if (qtyInput && qtyPlus && qtyMinus) {
    const toEn = (n) =>
      String(n).replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const toFa = (n) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

    qtyPlus.addEventListener("click", () => {
      let currentVal = parseInt(toEn(qtyInput.value)) || 1;
      qtyInput.value = toFa(currentVal + 1);
    });

    qtyMinus.addEventListener("click", () => {
      let currentVal = parseInt(toEn(qtyInput.value)) || 1;
      if (currentVal > 1) {
        qtyInput.value = toFa(currentVal - 1);
      }
    });
  }

  const colorBtns = document.querySelectorAll(".sp-color-btn");
  const selectedColorName = document.getElementById("selectedColorName");

  colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (selectedColorName) {
        selectedColorName.textContent = btn.getAttribute("data-name");
      }
    });
  });

  const sizeBtns = document.querySelectorAll(".sp-size-btn:not(:disabled)");
  const selectedSizeName = document.getElementById("selectedSizeName");

  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (selectedSizeName) {
        selectedSizeName.textContent = btn.textContent;
      }
    });
  });

  const tabBtns = document.querySelectorAll(".sp-tab-btn");
  const tabPanels = document.querySelectorAll(".sp-tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  const spWishlistBtn = document.getElementById("spWishlistBtn");
  if (spWishlistBtn) {
    spWishlistBtn.addEventListener("click", () => {
      spWishlistBtn.classList.toggle("active");
    });
  }

  const starSpans = document.querySelectorAll("#interactiveStars span");
  starSpans.forEach((star, index) => {
    star.addEventListener("click", () => {
      starSpans.forEach((s, i) => {
        s.classList.toggle("selected", i <= index);
      });
    });
  });
})();

(function () {
  const catGrid = document.getElementById("categoryGrid");
  if (!catGrid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const catSlug = urlParams.get("cat") || "women-fashion";

  const CATEGORY_MAP = {
    "women-fashion": {
      title: "پوشاک زنانه",
      sub: "جدیدترین مدل‌های لباس، پیراهن و مانتو",
      img: "assets/images/blog/blog1.webp",
      subcats: [
        "پیراهن و مجلسی",
        "مانتو و رویه",
        "شلوار و دامن",
        "شومیز و بلوز",
      ],
      brands: ["Zara", "Mango", "H&M", "Breshka"],
      products: [
        {
          id: 1,
          name: "پیراهن بلند گلدار نخی طرح تابستانی",
          brand: "Zara",
          price: 1250000,
          oldPrice: 1500000,
          rating: 5,
          rCount: 42,
          isNew: true,
          isHot: false,
          hasDiscount: true,
          inStock: true,
          img: "assets/images/arrivals/dress.webp",
          subcat: "پیراهن و مجلسی",
        },
        {
          id: 2,
          name: "شومیز حریر مجلسی یقه کراواتی",
          brand: "Mango",
          price: 890000,
          oldPrice: 0,
          rating: 4,
          rCount: 128,
          isNew: false,
          isHot: true,
          hasDiscount: false,
          inStock: true,
          img: "assets/images/shop/shop8.webp",
          subcat: "شومیز و بلوز",
        },
        {
          id: 3,
          name: "مانتو کتی ژاکارد مجلسی",
          brand: "Zara",
          price: 2100000,
          oldPrice: 0,
          rating: 5,
          rCount: 65,
          isNew: true,
          isHot: false,
          hasDiscount: false,
          inStock: true,
          img: "assets/images/blog/blog2.webp",
          subcat: "مانتو و رویه",
        },
        {
          id: 4,
          name: "شلوار جین مام استایل زغالی",
          brand: "H&M",
          price: 1150000,
          oldPrice: 1450000,
          rating: 4,
          rCount: 210,
          isNew: false,
          isHot: true,
          hasDiscount: true,
          inStock: true,
          img: "assets/images/shop/shop9.webp",
          subcat: "شلوار و دامن",
        },
        {
          id: 5,
          name: "دامن پلیسه بلند کلاسیک",
          brand: "Breshka",
          price: 780000,
          oldPrice: 0,
          rating: 3,
          rCount: 15,
          isNew: false,
          isHot: false,
          hasDiscount: false,
          inStock: true,
          img: "assets/images/shop/shop10.webp",
          subcat: "شلوار و دامن",
        },
        {
          id: 6,
          name: "تونیک نخی خنک تابستانه",
          brand: "Mango",
          price: 650000,
          oldPrice: 850000,
          rating: 4,
          rCount: 334,
          isNew: false,
          isHot: false,
          hasDiscount: true,
          inStock: false,
          img: "assets/images/shop/shop11.webp",
          subcat: "شومیز و بلوز",
        },
      ],
    },
  };

  const data = CATEGORY_MAP[catSlug] || CATEGORY_MAP["women-fashion"];

  document.getElementById(
    "pageTitle"
  ).textContent = `DENIZSHOP | ${data.title}`;
  document.getElementById("catHeroTitle").textContent = data.title;
  document.getElementById("catHeroSub").textContent = data.sub;
  document.getElementById("catBreadcrumb").textContent = data.title;
  const heroImg = document.getElementById("catHeroImg");
  if (heroImg) heroImg.src = data.img;

  const subcatsWrap = document.getElementById("catSubcats");
  if (subcatsWrap) {
    subcatsWrap.innerHTML = `<li><button class="sidebar-cat-btn active" data-sub="all">همه محصولات <span class="sidebar-cat-count">${toFa(
      data.products.length
    )}</span></button></li>`;
    data.subcats.forEach((sub) => {
      const count = data.products.filter((p) => p.subcat === sub).length;
      subcatsWrap.innerHTML += `<li><button class="sidebar-cat-btn" data-sub="${sub}">${sub} <span class="sidebar-cat-count">${toFa(
        count
      )}</span></button></li>`;
    });
  }

  const brandsWrap = document.getElementById("catBrands");
  if (brandsWrap) {
    brandsWrap.innerHTML = "";
    data.brands.forEach((b) => {
      brandsWrap.innerHTML += `<label class="sidebar-check"><input type="checkbox" value="${b}" /><span class="check-box"></span>${b}</label>`;
    });
  }

  const catSortSel = document.getElementById("catShopSort");
  const catResultCount = document.getElementById("catShopResultCount");
  const catShopEmpty = document.getElementById("catShopEmpty");
  const catPgNumbers = document.getElementById("catPgNumbers");
  const catPgPrev = document.getElementById("catPgPrev");
  const catPgNext = document.getElementById("catPgNext");
  const catViewGridBtn = document.getElementById("catViewGrid");
  const catViewListBtn = document.getElementById("catViewList");
  const catSidebarToggle = document.getElementById("catShopSidebarToggle");
  const catSidebar = document.getElementById("shopSidebar");
  const catSidebarReset = document.getElementById("catSidebarReset");
  const catEmptyReset = document.getElementById("catEmptyReset");
  const catPriceMinInput = document.getElementById("catPriceMin");
  const catPriceMaxInput = document.getElementById("catPriceMax");
  const catPriceMinLabel = document.getElementById("catPriceMinLabel");
  const catPriceMaxLabel = document.getElementById("catPriceMaxLabel");
  const catPriceRangeFill = document.getElementById("catPriceRangeFill");
  const catActiveFiltersWrap = document.getElementById("catActiveFilters");
  const catActiveFilterTags = document.getElementById("catActiveFilterTags");
  const catInStockOnly = document.getElementById("catInStockOnly");
  const catDiscountOnly = document.getElementById("catDiscountOnly");

  const PER_PAGE = 12;
  let currentPage = 1;
  let currentSub = "all";
  let currentSort = "default";
  let currentMinPrice = 0;
  let currentMaxPrice = 10000000;
  let currentBrands = new Set();
  let currentRating = 0;
  let onlyInStock = false;
  let onlyDiscount = false;

  function toFa(n) {
    return String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }

  function formatPrice(n) {
    return toFa(n.toLocaleString("fa-IR")) + " ت";
  }

  function renderStars(rating) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += i <= rating ? "★" : "☆";
    }
    return html;
  }

  function buildCardHTML(p) {
    const pBrand = p.brand;
    const pName = p.name;
    const priceNow = formatPrice(p.price);
    const priceOld = p.oldPrice ? formatPrice(p.oldPrice) : "";
    const stars = renderStars(p.rating);
    const rCount = toFa(p.rCount);

    let badgeHTML = "";
    if (p.isNew) badgeHTML = `<span class="pcard-badge badge-new">جدید</span>`;
    else if (p.isHot)
      badgeHTML = `<span class="pcard-badge badge-hot">پرفروش</span>`;
    else if (p.hasDiscount && p.oldPrice) {
      const pct = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
      badgeHTML = `<span class="pcard-badge badge-disc">${toFa(
        pct
      )}٪ تخفیف</span>`;
    }

    const priceHTML = p.oldPrice
      ? `<span class="price-now">${priceNow}</span><span class="price-old">${priceOld}</span>`
      : `<span class="price-now">${priceNow}</span>`;

    return `
      <div class="pcard">
        <div class="pcard-img">
          <div class="pcard-img-bg" style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb)"></div>
          <img src="${p.img}" alt="${pName}" />
          <button class="pcard-wish" aria-label="علاقه‌مندی">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          ${badgeHTML}
        </div>
        <div class="pcard-body">
          <span class="pcard-brand">${pBrand}</span>
          <h3 class="pcard-name">${pName}</h3>
          <div class="pcard-stars">
            <span class="stars-fill">${stars}</span>
            <span class="stars-count">(${rCount})</span>
          </div>
          <div class="pcard-prices">${priceHTML}</div>
          <button class="pcard-add">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            افزودن به سبد
          </button>
        </div>
      </div>
    `;
  }

  function filterData() {
    return data.products.filter((p) => {
      if (currentSub !== "all" && p.subcat !== currentSub) return false;
      if (p.price < currentMinPrice || p.price > currentMaxPrice) return false;
      if (currentBrands.size > 0 && !currentBrands.has(p.brand)) return false;
      if (p.rating < currentRating) return false;
      if (onlyInStock && !p.inStock) return false;
      if (onlyDiscount && !p.hasDiscount) return false;
      return true;
    });
  }

  function sortData(arr) {
    const sorted = [...arr];
    switch (currentSort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
        sorted.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
        break;
    }
    return sorted;
  }

  function buildPagination(total) {
    const totalPages = Math.ceil(total / PER_PAGE);
    if (catPgNumbers) catPgNumbers.innerHTML = "";
    if (catPgPrev) catPgPrev.disabled = currentPage === 1;
    if (catPgNext)
      catPgNext.disabled = currentPage === totalPages || totalPages === 0;

    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "…") {
        range.push("…");
      }
    }

    range.forEach((item) => {
      if (item === "…") {
        const el = document.createElement("span");
        el.className = "pg-ellipsis";
        el.textContent = "…";
        if (catPgNumbers) catPgNumbers.appendChild(el);
      } else {
        const btn = document.createElement("button");
        btn.className = "pg-num" + (item === currentPage ? " active" : "");
        btn.textContent = toFa(item);
        btn.addEventListener("click", () => {
          currentPage = item;
          render();
          window.scrollTo({ top: catGrid.offsetTop - 80, behavior: "smooth" });
        });
        if (catPgNumbers) catPgNumbers.appendChild(btn);
      }
    });
  }

  function renderFilterTags() {
    if (!catActiveFilterTags || !catActiveFiltersWrap) return;
    catActiveFilterTags.innerHTML = "";
    const tags = [];

    if (currentSub !== "all") {
      tags.push({
        label: currentSub,
        action: () => {
          currentSub = "all";
          document
            .querySelectorAll("#catSubcats .sidebar-cat-btn")
            .forEach((b) => {
              b.classList.toggle("active", b.dataset.sub === "all");
            });
        },
      });
    }

    if (currentMinPrice > 0 || currentMaxPrice < 10000000) {
      tags.push({
        label: `قیمت: ${formatPrice(currentMinPrice)} — ${formatPrice(
          currentMaxPrice
        )}`,
        action: () => {
          currentMinPrice = 0;
          currentMaxPrice = 10000000;
          catPriceMinInput.value = 0;
          catPriceMaxInput.value = 10000000;
          updatePriceRange();
        },
      });
    }

    currentBrands.forEach((brand) => {
      tags.push({
        label: brand,
        action: () => {
          currentBrands.delete(brand);
          const cb = document.querySelector(
            `#catBrands input[value="${brand}"]`
          );
          if (cb) cb.checked = false;
        },
      });
    });

    if (onlyInStock) {
      tags.push({
        label: "فقط موجود",
        action: () => {
          onlyInStock = false;
          catInStockOnly.checked = false;
        },
      });
    }

    if (onlyDiscount) {
      tags.push({
        label: "فقط تخفیف‌دار",
        action: () => {
          onlyDiscount = false;
          catDiscountOnly.checked = false;
        },
      });
    }

    tags.forEach(({ label, action }) => {
      const tag = document.createElement("button");
      tag.className = "filter-tag";
      tag.innerHTML = `${label}<span class="filter-tag-x">×</span>`;
      tag.addEventListener("click", () => {
        action();
        currentPage = 1;
        render();
      });
      catActiveFilterTags.appendChild(tag);
    });

    catActiveFiltersWrap.style.display = tags.length ? "flex" : "none";
  }

  function render() {
    const filtered = filterData();
    const sorted = sortData(filtered);
    const total = sorted.length;
    const start = (currentPage - 1) * PER_PAGE;
    const pageCards = sorted.slice(start, start + PER_PAGE);

    catGrid.innerHTML = pageCards.map(buildCardHTML).join("");

    const fromNum = toFa(total > 0 ? start + 1 : 0);
    const toNum = toFa(Math.min(start + PER_PAGE, total));
    const totalNum = toFa(total);
    if (catResultCount)
      catResultCount.textContent = `نمایش ${fromNum}–${toNum} از ${totalNum} محصول`;

    if (catShopEmpty)
      catShopEmpty.style.display = total === 0 ? "flex" : "none";
    const pgWrap = document.getElementById("catShopPagination");
    if (pgWrap) pgWrap.style.display = total === 0 ? "none" : "flex";

    buildPagination(total);
    renderFilterTags();

    catGrid.querySelectorAll(".pcard-wish").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        btn.classList.toggle("active");
      };
    });
  }

  function updatePriceRange() {
    if (!catPriceMinInput || !catPriceMaxInput) return;
    const min = parseInt(catPriceMinInput.value);
    const max = parseInt(catPriceMaxInput.value);
    const rangeMax = 10000000;
    if (catPriceRangeFill) {
      catPriceRangeFill.style.left = (min / rangeMax) * 100 + "%";
      catPriceRangeFill.style.width = ((max - min) / rangeMax) * 100 + "%";
    }
    if (catPriceMinLabel) catPriceMinLabel.textContent = formatPrice(min);
    if (catPriceMaxLabel) catPriceMaxLabel.textContent = formatPrice(max);
  }

  if (catPriceMinInput) {
    catPriceMinInput.addEventListener("input", () => {
      if (
        parseInt(catPriceMinInput.value) >
        parseInt(catPriceMaxInput.value) - 100000
      )
        catPriceMinInput.value = parseInt(catPriceMaxInput.value) - 100000;
      currentMinPrice = parseInt(catPriceMinInput.value);
      currentPage = 1;
      updatePriceRange();
      render();
    });
  }

  if (catPriceMaxInput) {
    catPriceMaxInput.addEventListener("input", () => {
      if (
        parseInt(catPriceMaxInput.value) <
        parseInt(catPriceMinInput.value) + 100000
      )
        catPriceMaxInput.value = parseInt(catPriceMinInput.value) + 100000;
      currentMaxPrice = parseInt(catPriceMaxInput.value);
      currentPage = 1;
      updatePriceRange();
      render();
    });
  }

  updatePriceRange();

  document.querySelectorAll("#catSubcats .sidebar-cat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll("#catSubcats .sidebar-cat-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentSub = btn.dataset.sub;
      currentPage = 1;
      render();
    });
  });

  if (catSortSel) {
    catSortSel.addEventListener("change", () => {
      currentSort = catSortSel.value;
      currentPage = 1;
      render();
    });
  }

  if (brandsWrap) {
    brandsWrap.querySelectorAll("input[type=checkbox]").forEach((cb) => {
      cb.addEventListener("change", () => {
        cb.checked
          ? currentBrands.add(cb.value)
          : currentBrands.delete(cb.value);
        currentPage = 1;
        render();
      });
    });
  }

  document
    .querySelectorAll("input[type=radio][name=catRating]")
    .forEach((r) => {
      r.addEventListener("change", () => {
        currentRating = parseInt(r.value);
        currentPage = 1;
        render();
      });
    });

  if (catInStockOnly) {
    catInStockOnly.addEventListener("change", () => {
      onlyInStock = catInStockOnly.checked;
      currentPage = 1;
      render();
    });
  }

  if (catDiscountOnly) {
    catDiscountOnly.addEventListener("change", () => {
      onlyDiscount = catDiscountOnly.checked;
      currentPage = 1;
      render();
    });
  }

  if (catPgPrev) {
    catPgPrev.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        render();
        window.scrollTo({ top: catGrid.offsetTop - 80, behavior: "smooth" });
      }
    });
  }

  if (catPgNext) {
    catPgNext.addEventListener("click", () => {
      currentPage++;
      render();
      window.scrollTo({ top: catGrid.offsetTop - 80, behavior: "smooth" });
    });
  }

  if (catViewGridBtn) {
    catViewGridBtn.addEventListener("click", () => {
      catViewGridBtn.classList.add("active");
      catViewListBtn.classList.remove("active");
      catGrid.classList.remove("list-view");
    });
  }

  if (catViewListBtn) {
    catViewListBtn.addEventListener("click", () => {
      catViewListBtn.classList.add("active");
      catViewGridBtn.classList.remove("active");
      catGrid.classList.add("list-view");
    });
  }

  if (catSidebarToggle) {
    catSidebarToggle.addEventListener("click", () =>
      catSidebar.classList.toggle("open")
    );
  }

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      catSidebar &&
      catSidebar.classList.contains("open") &&
      !catSidebar.contains(e.target) &&
      catSidebarToggle &&
      !catSidebarToggle.contains(e.target)
    ) {
      catSidebar.classList.remove("open");
    }
  });

  function resetAll() {
    currentSub = "all";
    currentSort = "default";
    currentMinPrice = 0;
    currentMaxPrice = 10000000;
    currentBrands.clear();
    currentRating = 0;
    onlyInStock = false;
    onlyDiscount = false;
    currentPage = 1;

    document.querySelectorAll("#catSubcats .sidebar-cat-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.sub === "all");
    });
    if (catSortSel) catSortSel.value = "default";
    if (catPriceMinInput) catPriceMinInput.value = 0;
    if (catPriceMaxInput) catPriceMaxInput.value = 10000000;
    if (catInStockOnly) catInStockOnly.checked = false;
    if (catDiscountOnly) catDiscountOnly.checked = false;
    if (brandsWrap) {
      brandsWrap
        .querySelectorAll("input[type=checkbox]")
        .forEach((c) => (c.checked = false));
    }
    document
      .querySelectorAll("input[type=radio][name=catRating][value='0']")
      .forEach((r) => (r.checked = true));

    updatePriceRange();
    render();
  }

  if (catSidebarReset) catSidebarReset.addEventListener("click", resetAll);
  if (catEmptyReset) catEmptyReset.addEventListener("click", resetAll);

  render();
})();

(function () {
  const coSubmitBtn = document.getElementById("coSubmitBtn");
  if (!coSubmitBtn) return;

  const coSubmitLabel = document.getElementById("coSubmitLabel");
  const coSubmitTotal = document.getElementById("coSubmitTotal");
  const coSuccessOverlay = document.getElementById("coSuccessOverlay");
  const coOrderCode = document.getElementById("coOrderCode");
  const coSuccessTotal = document.getElementById("coSuccessTotal");
  const coSuccessShip = document.getElementById("coSuccessShip");
  const coTotal = document.getElementById("coTotal");
  const coShipping = document.getElementById("coShipping");
  const coSubtotal = document.getElementById("coSubtotal");
  const coCodRow = document.getElementById("coCodRow");
  const shipPriceExpress = document.getElementById("shipPriceExpress");
  const termsCheck = document.getElementById("termsCheck");

  const SUBTOTAL = 5410000;
  const SHIPPING_STANDARD = 35000;
  const SHIPPING_SAME_DAY = 80000;
  const COD_FEE = 20000;

  function toFa(n) {
    return String(n).replace(/[0-9]/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹"[d];
    });
  }

  function formatPrice(n) {
    return toFa(n.toLocaleString("fa-IR")) + " ت";
  }

  function generateOrderCode() {
    var rand = Math.floor(10000 + Math.random() * 89999);
    return "DS-۱۴۰۵-" + toFa(rand);
  }

  function getSelectedShipping() {
    var radios = document.querySelectorAll('input[name="shippingMethod"]');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
    return "express";
  }

  function getSelectedPayment() {
    var radios = document.querySelectorAll('input[name="paymentMethod"]');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
    return "online";
  }

  function getShippingCost(method) {
    if (method === "standard") return SHIPPING_STANDARD;
    if (method === "same-day") return SHIPPING_SAME_DAY;
    return 0;
  }

  function getShippingLabel(method) {
    if (method === "standard")
      return "ارسال عادی — " + formatPrice(SHIPPING_STANDARD);
    if (method === "same-day")
      return "ارسال فوری — " + formatPrice(SHIPPING_SAME_DAY);
    return "پیشتاز — رایگان";
  }

  function calcTotal() {
    var ship = getSelectedShipping();
    var pay = getSelectedPayment();
    var shipCost = getShippingCost(ship);
    var codCost = pay === "cod" ? COD_FEE : 0;
    return SUBTOTAL + shipCost + codCost;
  }

  function updateSummary() {
    var ship = getSelectedShipping();
    var pay = getSelectedPayment();
    var shipCost = getShippingCost(ship);
    var total = calcTotal();

    if (coShipping) {
      if (shipCost === 0) {
        coShipping.textContent = "رایگان";
        coShipping.classList.add("co-free");
      } else {
        coShipping.textContent = formatPrice(shipCost);
        coShipping.classList.remove("co-free");
      }
    }

    if (coCodRow) {
      coCodRow.style.display = pay === "cod" ? "" : "none";
    }

    if (coTotal) coTotal.textContent = formatPrice(total);
    if (coSubmitTotal) coSubmitTotal.textContent = formatPrice(total);

    if (shipPriceExpress) {
      shipPriceExpress.textContent = "رایگان";
    }
  }

  var shippingRadios = document.querySelectorAll(
    'input[name="shippingMethod"]'
  );
  var paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');

  shippingRadios.forEach(function (radio) {
    radio.addEventListener("change", updateSummary);
  });

  paymentRadios.forEach(function (radio) {
    radio.addEventListener("change", updateSummary);
  });

  updateSummary();

  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function setError(id, msg) {
    var el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function clearError(id) {
    var el = document.getElementById(id);
    if (el) el.textContent = "";
  }

  function markInput(id, hasError) {
    var el = document.getElementById(id);
    if (!el) return;
    if (hasError) {
      el.classList.add("co-input-error");
    } else {
      el.classList.remove("co-input-error");
    }
  }

  function validatePhone(v) {
    var cleaned = v.replace(/[۰-۹]/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹".indexOf(d);
    });
    return /^09[0-9]{9}$/.test(cleaned);
  }

  function validateEmail(v) {
    return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function validatePostalCode(v) {
    var cleaned = v.replace(/[۰-۹]/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹".indexOf(d);
    });
    return !cleaned || /^[0-9]{10}$/.test(cleaned);
  }

  function validateForm() {
    var ok = true;

    var firstName = getVal("firstName");
    if (!firstName) {
      setError("errFirstName", "نام الزامی است");
      markInput("firstName", true);
      ok = false;
    } else {
      clearError("errFirstName");
      markInput("firstName", false);
    }

    var lastName = getVal("lastName");
    if (!lastName) {
      setError("errLastName", "نام خانوادگی الزامی است");
      markInput("lastName", true);
      ok = false;
    } else {
      clearError("errLastName");
      markInput("lastName", false);
    }

    var phone = getVal("phone");
    if (!phone) {
      setError("errPhone", "شماره موبایل الزامی است");
      markInput("phone", true);
      ok = false;
    } else if (!validatePhone(phone)) {
      setError("errPhone", "شماره موبایل معتبر نیست (مثال: ۰۹۱۲...)");
      markInput("phone", true);
      ok = false;
    } else {
      clearError("errPhone");
      markInput("phone", false);
    }

    var email = getVal("email");
    if (!validateEmail(email)) {
      setError("errEmail", "آدرس ایمیل معتبر نیست");
      markInput("email", true);
      ok = false;
    } else {
      clearError("errEmail");
      markInput("email", false);
    }

    var province = getVal("province");
    if (!province) {
      setError("errProvince", "انتخاب استان الزامی است");
      markInput("province", true);
      ok = false;
    } else {
      clearError("errProvince");
      markInput("province", false);
    }

    var city = getVal("city");
    if (!city) {
      setError("errCity", "نام شهر الزامی است");
      markInput("city", true);
      ok = false;
    } else {
      clearError("errCity");
      markInput("city", false);
    }

    var postalCode = getVal("postalCode");
    if (!validatePostalCode(postalCode)) {
      setError("errPostalCode", "کد پستی باید ۱۰ رقم باشد");
      markInput("postalCode", true);
      ok = false;
    } else {
      clearError("errPostalCode");
      markInput("postalCode", false);
    }

    var address = getVal("address");
    if (!address) {
      setError("errAddress", "آدرس کامل الزامی است");
      markInput("address", true);
      ok = false;
    } else {
      clearError("errAddress");
      markInput("address", false);
    }

    var terms = termsCheck && termsCheck.checked;
    if (!terms) {
      setError("errTerms", "پذیرش قوانین و مقررات الزامی است");
      ok = false;
    } else {
      clearError("errTerms");
    }

    return ok;
  }

  var liveFields = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "province",
    "city",
    "postalCode",
    "address",
  ];

  liveFields.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", function () {
      if (el.classList.contains("co-input-error")) {
        markInput(id, false);
        clearError("err" + id.charAt(0).toUpperCase() + id.slice(1));
      }
    });
    el.addEventListener("blur", function () {
      if (!el.value.trim()) return;
      markInput(id, false);
      clearError("err" + id.charAt(0).toUpperCase() + id.slice(1));
    });
  });

  if (termsCheck) {
    termsCheck.addEventListener("change", function () {
      if (termsCheck.checked) clearError("errTerms");
    });
  }

  coSubmitBtn.addEventListener("click", function () {
    if (!validateForm()) {
      var firstErr = document.querySelector(".co-input-error");
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErr.focus();
      }
      return;
    }

    coSubmitBtn.classList.add("co-loading");
    if (coSubmitLabel) coSubmitLabel.textContent = "در حال پردازش...";

    setTimeout(function () {
      var code = generateOrderCode();
      var total = calcTotal();
      var ship = getSelectedShipping();

      if (coOrderCode) coOrderCode.textContent = code;
      if (coSuccessTotal) coSuccessTotal.textContent = formatPrice(total);
      if (coSuccessShip) coSuccessShip.textContent = getShippingLabel(ship);

      coSubmitBtn.classList.remove("co-loading");
      if (coSubmitLabel) coSubmitLabel.textContent = "پرداخت و ثبت سفارش";

      if (coSuccessOverlay) {
        coSuccessOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    }, 1600);
  });

  if (coSuccessOverlay) {
    coSuccessOverlay.addEventListener("click", function (e) {
      if (e.target === coSuccessOverlay) {
        coSuccessOverlay.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      coSuccessOverlay &&
      coSuccessOverlay.style.display !== "none"
    ) {
      coSuccessOverlay.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  var successTrackBtn = document.querySelector(".co-success-track");
  if (successTrackBtn) {
    successTrackBtn.addEventListener("click", function () {
      if (coSuccessOverlay) {
        coSuccessOverlay.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
})();

(function () {
  var inp = document.getElementById("navSearchInput");
  if (!inp) return;
  function goSearch() {
    var q = inp.value.trim();
    if (q) window.location.href = "search.html?q=" + encodeURIComponent(q);
  }
  inp.addEventListener("keydown", function (e) {
    if (e.key === "Enter") goSearch();
  });
  var submitBtn = document.querySelector(
    ".nav-search-inner button:not(.nav-search-close)"
  );
  if (submitBtn) submitBtn.addEventListener("click", goSearch);
})();

(function () {
  var SESSION_KEY = "denizshop_user";
  var user = null;
  try {
    user = JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {}
  if (!user || !user.loggedIn) return;

  var nameEl = document.querySelector(".drawer-user-name");
  var linkEl = document.querySelector(".drawer-user-link");

  if (nameEl) nameEl.textContent = user.name || "کاربر";
  if (linkEl) {
    linkEl.textContent = "حساب کاربری";
    linkEl.href = "dashboard.html";
  }

  document
    .querySelectorAll('a.icon-btn[href="signup.html"]')
    .forEach(function (a) {
      a.href = "dashboard.html";
    });

  var toFa = function (n) {
    return String(n).replace(/[0-9]/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹"[d];
    });
  };
  try {
    var cart = JSON.parse(localStorage.getItem("denizshop_cart")) || {};
    var total = Object.values(cart).reduce(function (s, i) {
      return s + (i.qty || 1);
    }, 0);
    if (total > 0) {
      document.querySelectorAll(".cart-badge").forEach(function (b) {
        b.textContent = toFa(total);
      });
    }
  } catch {}
})();

(function () {
  var WISH_KEY = "denizshop_wishlist";

  function loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
    } catch {
      return [];
    }
  }
  function saveWishlist(list) {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(list));
    } catch {}
  }

  function getProductData(btn) {
    var card = btn.closest(".pcard");
    if (!card) return null;
    var name = (card.querySelector(".pcard-name") || {}).textContent || "";
    var id =
      card.dataset.id ||
      (card.dataset.brand || "") + "-" + name.trim().slice(0, 16);
    var price = card.dataset.price || "";
    var img = (card.querySelector(".pcard-img img") || {}).src || "";
    return { id: id, name: name.trim(), price: price, img: img };
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".pcard-wish");
    if (!btn || btn.dataset.wishId) return;
    e.stopPropagation();
    var prod = getProductData(btn);
    if (!prod) {
      btn.classList.toggle("active");
      return;
    }
    var list = loadWishlist();
    var idx = list.findIndex(function (p) {
      return p.id === prod.id;
    });
    if (idx > -1) {
      list.splice(idx, 1);
      btn.classList.remove("active");
    } else {
      list.push(prod);
      btn.classList.add("active");
    }
    saveWishlist(list);
  });

  var list = loadWishlist();
  document
    .querySelectorAll(".pcard-wish:not([data-wish-id])")
    .forEach(function (btn) {
      var prod = getProductData(btn);
      if (
        prod &&
        list.some(function (p) {
          return p.id === prod.id;
        })
      ) {
        btn.classList.add("active");
      }
    });
})();

(function () {
  if (!document.querySelector(".bl-hero")) return;

  const grid = document.getElementById("blogGrid");
  const chips = document.querySelectorAll(".bl-chip[data-cat]");
  const catItems = document.querySelectorAll(".bl-cat-item[data-cat]");
  const sortSelect = document.getElementById("blSortSelect");
  const heroSearchInput = document.getElementById("heroSearchInput");
  const heroSearchBtn = document.getElementById("heroSearchBtn");
  const sidebarSearchInput = document.getElementById("sidebarSearchInput");
  const sidebarSearchBtn = document.getElementById("sidebarSearchBtn");

  let activeCat = "all";
  let activeSort = "newest";
  let searchQuery = "";

  function getCards() {
    return Array.from(grid.querySelectorAll(".bl-card"));
  }

  function applyFilter() {
    const cards = getCards();

    cards.forEach(function (card) {
      const cat = card.getAttribute("data-cat") || "";
      const title = card.querySelector(".bl-card-title")
        ? card.querySelector(".bl-card-title").textContent.toLowerCase()
        : "";
      const excerpt = card.querySelector(".bl-card-excerpt")
        ? card.querySelector(".bl-card-excerpt").textContent.toLowerCase()
        : "";
      const q = searchQuery.trim().toLowerCase();

      const catMatch = activeCat === "all" || cat === activeCat;
      const searchMatch =
        q === "" || title.indexOf(q) !== -1 || excerpt.indexOf(q) !== -1;

      if (catMatch && searchMatch) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  function applySort() {
    const cards = getCards().filter(function (c) {
      return !c.classList.contains("hidden");
    });

    const sorted = cards.slice().sort(function (a, b) {
      if (activeSort === "popular") {
        return (
          parseInt(b.getAttribute("data-views") || "0", 10) -
          parseInt(a.getAttribute("data-views") || "0", 10)
        );
      }
      if (activeSort === "comments") {
        return (
          parseInt(b.getAttribute("data-comments") || "0", 10) -
          parseInt(a.getAttribute("data-comments") || "0", 10)
        );
      }
      return (
        parseInt(b.getAttribute("data-date") || "0", 10) -
        parseInt(a.getAttribute("data-date") || "0", 10)
      );
    });

    sorted.forEach(function (card) {
      grid.appendChild(card);
    });
  }

  function syncCatUI(cat) {
    chips.forEach(function (c) {
      c.classList.toggle("active", c.getAttribute("data-cat") === cat);
    });
    catItems.forEach(function (c) {
      c.classList.toggle("active", c.getAttribute("data-cat") === cat);
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      activeCat = chip.getAttribute("data-cat") || "all";
      syncCatUI(activeCat);
      applyFilter();
      applySort();
    });
  });

  catItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      activeCat = item.getAttribute("data-cat") || "all";
      syncCatUI(activeCat);
      applyFilter();
      applySort();
    });
  });

  sortSelect.addEventListener("change", function () {
    activeSort = sortSelect.value;
    applySort();
  });

  function doSearch(q) {
    searchQuery = q;
    applyFilter();
    applySort();
  }

  heroSearchBtn.addEventListener("click", function () {
    doSearch(heroSearchInput.value);
  });

  heroSearchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") doSearch(heroSearchInput.value);
  });

  heroSearchInput.addEventListener("input", function () {
    doSearch(heroSearchInput.value);
  });

  sidebarSearchBtn.addEventListener("click", function () {
    doSearch(sidebarSearchInput.value);
  });

  sidebarSearchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") doSearch(sidebarSearchInput.value);
  });

  sidebarSearchInput.addEventListener("input", function () {
    doSearch(sidebarSearchInput.value);
  });

  const pgBtns = document.querySelectorAll(".bl-pg-btn");
  pgBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.querySelector("svg") || btn.disabled) return;
      pgBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });
})();

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutElastic = (t) =>
  t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) +
      1;

const animateElementHeight = (el, start, end, duration) => {
  let startTime = null;
  el.style.overflow = "hidden";

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.style.height = `${start + (end - start) * easeOutExpo(progress)}px`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.style.height = end === 0 ? "0px" : "auto";
    }
  };
  window.requestAnimationFrame(step);
};

document.querySelectorAll(".contact-faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".contact-faq-item");
    const content = btn.nextElementSibling;
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".contact-faq-item").forEach((i) => {
      if (i !== item && i.classList.contains("open")) {
        i.classList.remove("open");
        const otherContent =
          i.querySelector(".contact-faq-q").nextElementSibling;
        animateElementHeight(otherContent, otherContent.scrollHeight, 0, 500);
      }
    });

    if (!isOpen) {
      item.classList.add("open");
      content.style.display = "block";
      animateElementHeight(content, 0, content.scrollHeight, 500);
    } else {
      item.classList.remove("open");
      animateElementHeight(content, content.scrollHeight, 0, 500);
    }
  });
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = this.querySelector(".contact-submit-btn");
    let startTime = null;

    const animateBtn = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 800, 1);
      const scale = 1 + 0.05 * easeOutElastic(progress);

      btn.style.transform = `scale(${scale})`;

      if (progress < 1) {
        window.requestAnimationFrame(animateBtn);
      } else {
        btn.textContent = "✓ پیام شما ارسال شد";
        btn.style.background = "linear-gradient(135deg, #34d399, #10b981)";
        btn.disabled = true;
      }
    };
    window.requestAnimationFrame(animateBtn);
  });
}

(function () {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(function (item) {
    const q = item.querySelector(".faq-item-q");
    q.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      items.forEach(function (el) {
        el.classList.remove("open");
        el.querySelector(".faq-item-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
      }
    });
    q.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        q.click();
      }
    });
  });

  const catBtns = document.querySelectorAll(".faq-cat-btn");
  const sections = document.querySelectorAll(".faq-section");
  const noResults = document.getElementById("faqNoResults");
  const ctaCard = document.getElementById("faqCtaCard");
  const searchInput = document.getElementById("faqSearch");
  const clearBtn = document.getElementById("faqSearchClear");

  let currentCat = "all";
  let currentQuery = "";

  function normalize(str) {
    return str.replace(/[\u200c\u200d]/g, "").replace(/[‌​]/g, "");
  }

  function applyFilters() {
    const q = normalize(currentQuery.trim().toLowerCase());
    let totalVisible = 0;

    sections.forEach(function (sec) {
      const secCat = sec.dataset.section;
      const catMatch = currentCat === "all" || currentCat === secCat;

      if (!catMatch) {
        sec.classList.add("hidden");
        return;
      }

      const secItems = sec.querySelectorAll(".faq-item");
      let secVisible = 0;

      secItems.forEach(function (item) {
        if (currentCat !== "all" && item.dataset.cat !== currentCat) {
          item.style.display = "none";
          return;
        }
        if (q) {
          const qText = normalize(
            item.querySelector(".faq-item-q-text").textContent.toLowerCase()
          );
          const aText = normalize(
            item.querySelector(".faq-item-a-text")
              ? item.querySelector(".faq-item-a-text").textContent.toLowerCase()
              : ""
          );
          if (!qText.includes(q) && !aText.includes(q)) {
            item.style.display = "none";
            return;
          }
        }
        item.style.display = "";
        secVisible++;
        totalVisible++;
      });

      if (secVisible === 0) {
        sec.classList.add("hidden");
      } else {
        sec.classList.remove("hidden");
      }
    });

    if (totalVisible === 0) {
      noResults.classList.add("visible");
      noResults.querySelector("#faqNoResultsText").textContent = q
        ? "سوالی با عبارت «" +
          currentQuery +
          "» یافت نشد. با پشتیبانی تماس بگیرید."
        : "سوالی در این دسته‌بندی یافت نشد.";
      ctaCard.style.opacity = "0.6";
    } else {
      noResults.classList.remove("visible");
      ctaCard.style.opacity = "";
    }
  }

  catBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      catBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      currentCat = btn.dataset.cat;

      sections.forEach(function (sec) {
        sec.querySelectorAll(".faq-item").forEach(function (it) {
          it.style.display = "";
        });
      });

      applyFilters();
    });
  });

  searchInput.addEventListener("input", function () {
    currentQuery = searchInput.value;
    clearBtn.classList.toggle("visible", currentQuery.length > 0);

    if (currentQuery.length > 0 && currentCat !== "all") {
      currentCat = "all";
      catBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      catBtns[0].classList.add("active");
      sections.forEach(function (sec) {
        sec.querySelectorAll(".faq-item").forEach(function (it) {
          it.style.display = "";
        });
      });
    }

    applyFilters();
  });

  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    currentQuery = "";
    clearBtn.classList.remove("visible");
    sections.forEach(function (sec) {
      sec.classList.remove("hidden");
      sec.querySelectorAll(".faq-item").forEach(function (it) {
        it.style.display = "";
      });
    });
    noResults.classList.remove("visible");
    ctaCard.style.opacity = "";
  });

  const searchBtn = document.getElementById("searchBtn");
  const navSearchBar = document.getElementById("navSearchBar");
  const navSearchClose = document.getElementById("navSearchClose");
  const navSearchInput = document.getElementById("navSearchInput");

  if (searchBtn && navSearchBar) {
    searchBtn.addEventListener("click", function () {
      navSearchBar.classList.add("open");
      if (navSearchInput) navSearchInput.focus();
    });
    navSearchClose.addEventListener("click", function () {
      navSearchBar.classList.remove("open");
    });
  }

  const drawerToggles = document.querySelectorAll(".drawer-nav-toggle");
  drawerToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const parent = toggle.closest(".drawer-has-sub");
      if (parent) parent.classList.toggle("open");
    });
  });
})();

document
  .getElementById("submitTrackBtn")
  .addEventListener("click", function () {
    const orderId = document.getElementById("orderIdInput").value.trim();
    const phone = document.getElementById("orderPhoneInput").value.trim();
    const errorBox = document.getElementById("trackErrorBox");
    const resultCard = document.getElementById("trackResultCard");

    errorBox.classList.remove("active");
    errorBox.textContent = "";
    resultCard.classList.remove("active");

    const phoneRegex = /^09\d{9}$/;

    if (!orderId) {
      errorBox.textContent = "لطفاً شماره سفارش را وارد کنید.";
      errorBox.classList.add("active");
      return;
    }

    if (!phoneRegex.test(phone)) {
      errorBox.textContent =
        "شماره موبایل نامعتبر است. لطفاً یک شماره ۱۱ رقمی صحیح وارد کنید (مثال: 09123456789).";
      errorBox.classList.add("active");
      return;
    }

    resultCard.classList.add("active");

    setTimeout(() => {
      document.documentElement.style.setProperty("--timeline-progress", "66%");
    }, 100);

    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

(function () {
  var ACCOUNT_KEY = "denizshop_account";
  var SESSION_KEY = "denizshop_user";

  function showTab(tab) {
    var isLogin = tab === "login";
    document.getElementById("formLogin").style.display = isLogin ? "" : "none";
    document.getElementById("formRegister").style.display = isLogin
      ? "none"
      : "";
    document.getElementById("tabLogin").classList.toggle("active", isLogin);
    document.getElementById("tabRegister").classList.toggle("active", !isLogin);
    document
      .getElementById("tabLogin")
      .setAttribute("aria-selected", isLogin ? "true" : "false");
    document
      .getElementById("tabRegister")
      .setAttribute("aria-selected", isLogin ? "false" : "true");
  }

  document.getElementById("tabLogin").addEventListener("click", function () {
    showTab("login");
  });
  document.getElementById("tabRegister").addEventListener("click", function () {
    showTab("register");
  });
  document.getElementById("switchToReg").addEventListener("click", function () {
    showTab("register");
  });
  document
    .getElementById("switchToLogin")
    .addEventListener("click", function () {
      showTab("login");
    });

  function toggleEye(inputId, btn) {
    var inp = document.getElementById(inputId);
    if (!inp) return;
    inp.type = inp.type === "password" ? "text" : "password";
  }
  document.getElementById("loginEye").addEventListener("click", function () {
    toggleEye("loginPass", this);
  });
  document.getElementById("regEye").addEventListener("click", function () {
    toggleEye("regPass", this);
  });
  document.getElementById("regEye2").addEventListener("click", function () {
    toggleEye("regPass2", this);
  });

  function setErr(id, msg) {
    var el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrs(ids) {
    ids.forEach(function (id) {
      setErr(id, "");
    });
  }
  function markErr(inputId, errId, msg) {
    var inp = document.getElementById(inputId);
    if (inp) inp.classList.add("has-error");
    setErr(errId, msg);
  }

  function getAccount() {
    try {
      return JSON.parse(localStorage.getItem(ACCOUNT_KEY));
    } catch (ex) {
      return null;
    }
  }

  function saveSession(account) {
    var session = {
      name: account.name,
      phone: account.phone,
      email: account.email,
      loggedIn: true,
    };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (ex) {}
  }

  document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrs(["loginPhoneErr", "loginPassErr"]);
    document.querySelectorAll("#formLogin .auth-input").forEach(function (i) {
      i.classList.remove("has-error");
    });

    var phone = document.getElementById("loginPhone").value.trim();
    var pass = document.getElementById("loginPass").value;
    var ok = true;
    if (!phone) {
      markErr(
        "loginPhone",
        "loginPhoneErr",
        "شماره موبایل یا ایمیل را وارد کنید"
      );
      ok = false;
    }
    if (!pass) {
      markErr("loginPass", "loginPassErr", "رمز عبور را وارد کنید");
      ok = false;
    }
    if (!ok) return;

    var account = getAccount();
    if (!account || (account.phone !== phone && account.email !== phone)) {
      markErr("loginPhone", "loginPhoneErr", "کاربری با این مشخصات یافت نشد");
      return;
    }
    if (account.pass !== pass) {
      markErr("loginPass", "loginPassErr", "رمز عبور اشتباه است");
      return;
    }

    saveSession(account);
    window.location.href = "dashboard.html";
  });

  document
    .getElementById("formRegister")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrs([
        "regNameErr",
        "regPhoneErr",
        "regEmailErr",
        "regPassErr",
        "regPass2Err",
        "regTermsErr",
      ]);
      document
        .querySelectorAll("#formRegister .auth-input")
        .forEach(function (i) {
          i.classList.remove("has-error");
        });

      var name = document.getElementById("regName").value.trim();
      var phone = document.getElementById("regPhone").value.trim();
      var email = document.getElementById("regEmail").value.trim();
      var pass = document.getElementById("regPass").value;
      var pass2 = document.getElementById("regPass2").value;
      var terms = document.getElementById("regTerms").checked;
      var ok = true;

      if (!name) {
        markErr("regName", "regNameErr", "نام و نام خانوادگی الزامی است");
        ok = false;
      }
      if (!phone || !/^(0|\+98)9[0-9]{9}$/.test(phone.replace(/\s/g, ""))) {
        markErr("regPhone", "regPhoneErr", "شماره موبایل معتبر وارد کنید");
        ok = false;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        markErr("regEmail", "regEmailErr", "ایمیل معتبر وارد کنید");
        ok = false;
      }
      if (!pass || pass.length < 8) {
        markErr("regPass", "regPassErr", "رمز عبور باید حداقل ۸ کاراکتر باشد");
        ok = false;
      }
      if (pass !== pass2) {
        markErr("regPass2", "regPass2Err", "رمزهای عبور مطابقت ندارند");
        ok = false;
      }
      if (!terms) {
        setErr("regTermsErr", "پذیرفتن قوانین الزامی است");
        ok = false;
      }
      if (!ok) return;

      var account = {
        name: name,
        phone: phone,
        email: email,
        pass: pass,
      };
      try {
        localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
      } catch (ex) {}

      saveSession(account);
      window.location.href = "dashboard.html";
    });

  var p = new URLSearchParams(window.location.search);
  if (p.get("tab") === "register") showTab("register");
})();

(function () {
  var progressFill = document.getElementById("progressFill");
  var readProgressFill = document.getElementById("readProgressFill");
  var progressPct = document.getElementById("progressPct");
  var article = document.getElementById("articleContent");

  function toFarsiNum(n) {
    return n.toString().replace(/\d/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹"[d];
    });
  }

  function updateProgress() {
    if (!article) return;
    var rect = article.getBoundingClientRect();
    var articleTop = rect.top + window.scrollY;
    var articleH = article.offsetHeight;
    var scrolled = window.scrollY + window.innerHeight - articleTop;
    var pct = Math.min(100, Math.max(0, (scrolled / articleH) * 100));
    var pctInt = Math.round(pct);
    if (progressFill) progressFill.style.width = pct + "%";
    if (readProgressFill) readProgressFill.style.width = pct + "%";
    if (progressPct) progressPct.textContent = toFarsiNum(pctInt) + "٪";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  var saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    var saved = false;
    saveBtn.addEventListener("click", function () {
      saved = !saved;
      if (saved) {
        saveBtn.style.background =
          "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(167,139,250,0.12))";
        saveBtn.style.color = "var(--brand-1)";
        saveBtn.style.borderColor = "rgba(108,99,255,0.3)";
        saveBtn.querySelector("svg").setAttribute("fill", "currentColor");
      } else {
        saveBtn.style.background = "";
        saveBtn.style.color = "";
        saveBtn.style.borderColor = "";
        saveBtn.querySelector("svg").setAttribute("fill", "none");
      }
    });
  }

  var shareBtns = document.querySelectorAll(".sp-share-btn");
  shareBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      btn.style.color = "var(--brand-1)";
      setTimeout(function () {
        btn.style.color = "";
      }, 1200);
    });
  });

  var replyBtns = document.querySelectorAll(".sp-comment-reply-btn");
  replyBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var form = document.querySelector(".sp-comment-form");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        var ta = form.querySelector("textarea");
        if (ta) ta.focus();
      }
    });
  });
})();

function doSearch() {
  var q = document.getElementById("e404SearchInput").value.trim();
  if (q) window.location.href = "search.html?q=" + encodeURIComponent(q);
}
document
  .getElementById("e404SearchInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") doSearch();
  });

var total = 30;
var minEl = document.getElementById("e503Min");
var secEl = document.getElementById("e503Sec");

function toPersian(n) {
  return String(n).replace(/\d/g, function (d) {
    return "۰۱۲۳۴۵۶۷۸۹"[d];
  });
}

function pad(n) {
  return n < 10 ? "0" + n : String(n);
}

function tick() {
  if (total <= 0) {
    location.reload();
    return;
  }
  total--;
  var m = Math.floor(total / 60);
  var s = total % 60;
  minEl.textContent = toPersian(pad(m));
  secEl.textContent = toPersian(pad(s));
}

setInterval(tick, 1000);

function doNotify() {
  var email = document.getElementById("e503Email").value.trim();
  if (!email || !email.includes("@")) return;
  document.getElementById("e503NotifyWrap").style.display = "none";
  document.getElementById("e503Success").classList.add("visible");
}

document.getElementById("e503Email").addEventListener("keydown", function (e) {
  if (e.key === "Enter") doNotify();
});
