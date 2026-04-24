const sections = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav a");
const progressBar = document.querySelector(".scroll-progress-bar");
const countUps = document.querySelectorAll("[data-countup]");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleLabel = document.querySelector(".theme-toggle-label");
const copyEmailButton = document.querySelector(".copy-email");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const themeStorageKey = "portfolio-theme";

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

if (prefersReducedMotion) {
  sections.forEach((section) => section.classList.add("is-visible"));
} else {
  sections.forEach((section) => revealObserver.observe(section));
}

const setScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (!id) {
        return;
      }

      const link = document.querySelector(`.nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((navLink) => navLink.classList.remove("is-current"));
        link?.classList.add("is-current");
      }
    });
  },
  {
    threshold: 0.45,
  }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

const animateCount = (element) => {
  const target = Number(element.dataset.countup || "0");
  const suffix = element.textContent.includes("+") ? "+" : "";
  let frame = 0;
  const totalFrames = 36;

  const tick = () => {
    frame += 1;
    const value = Math.round((target * frame) / totalFrames);
    element.textContent = `${value}${suffix}`;
    if (frame < totalFrames) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

if (!prefersReducedMotion) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.8,
    }
  );

  countUps.forEach((counter) => counterObserver.observe(counter));
}

const setTheme = (theme) => {
  const isNight = theme === "night";
  document.body.classList.toggle("theme-night", isNight);
  themeToggle?.setAttribute("aria-pressed", String(isNight));

  if (themeToggleLabel) {
    themeToggleLabel.textContent = isNight ? "Night Mode" : "Warm Mode";
  }

  window.localStorage.setItem(themeStorageKey, theme);
};

const savedTheme = window.localStorage.getItem(themeStorageKey);
if (savedTheme === "night" || savedTheme === "warm") {
  setTheme(savedTheme);
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("theme-night")
    ? "warm"
    : "night";
  setTheme(nextTheme);
});

copyEmailButton?.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.copy || "";
  const originalLabel = copyEmailButton.textContent;

  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = "Copied";
  } catch {
    copyEmailButton.textContent = email;
  }

  window.setTimeout(() => {
    copyEmailButton.textContent = originalLabel;
  }, 1600);
});

window.addEventListener("scroll", setScrollProgress, { passive: true });
setScrollProgress();
