document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".hero-slider", {
    loop: true,
    speed: 1200,
    parallax: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: ["-20%", 0, -1],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  const supportBtn = document.querySelector(".support-toggle");
  if (supportBtn) {
    supportBtn.addEventListener("mouseenter", () => {
      supportBtn.style.transform = "scale(1.1)";
    });
    supportBtn.addEventListener("mouseleave", () => {
      supportBtn.style.transform = "scale(1)";
    });
  }

  const langWrapper = document.querySelector(".lang-wrapper");
  const langToggle = document.querySelector(".lang-toggle");
  const langItems = document.querySelectorAll(".lang-dropdown li");
  const currentLangSpan = document.querySelector(".current-lang");

  if (langToggle) {
    langToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      langWrapper.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!langWrapper.contains(e.target)) {
        langWrapper.classList.remove("active");
      }
    });

    langItems.forEach((item) => {
      item.addEventListener("click", () => {
        const selectedLang = item.getAttribute("data-lang").toUpperCase();
        currentLangSpan.textContent = selectedLang;
        langItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        langWrapper.classList.remove("active");
      });
    });
  }

  const themeBtn = document.getElementById("theme-btn");
  const htmlElement = document.documentElement;
  const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

  if (themeBtn && themeIcon) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    htmlElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "light") {
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      if (newTheme === "light") {
        themeIcon.classList.replace("fa-moon", "fa-sun");
      } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
      }
    });
  }
});

const counters = document.querySelectorAll(".counter");
const speed = 200;

const animateCounters = () => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
};

let counterSection = document.querySelector(".global-reach");
let options = { rootMargin: "0px", threshold: 0.5 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, options);

if (counterSection) {
  observer.observe(counterSection);
}

const statsCounters = document.querySelectorAll(".counter-num");
const statsSection = document.querySelector("#stats-trigger");

const animateStatsCounters = () => {
  statsCounters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace(/,/g, "");
      const inc = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStatsCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

// About Section Animation Observer
const aboutSection = document.querySelector("#about-trigger");
const aboutVisual = document.querySelector(".parsayan-visual-side");
const aboutContent = document.querySelector(".parsayan-content-side");

const aboutObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation classes
        if (aboutVisual) {
          aboutVisual.style.opacity = "0";
          aboutVisual.style.transform = "translateX(50px)";
          aboutVisual.style.transition =
            "all 1s cubic-bezier(0.2, 0.8, 0.2, 1)";

          setTimeout(() => {
            aboutVisual.style.opacity = "1";
            aboutVisual.style.transform = "translateX(0)";
          }, 100);
        }

        if (aboutContent) {
          aboutContent.style.opacity = "0";
          aboutContent.style.transform = "translateX(-50px)";
          aboutContent.style.transition =
            "all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s";

          setTimeout(() => {
            aboutContent.style.opacity = "1";
            aboutContent.style.transform = "translateX(0)";
          }, 100);
        }

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}
