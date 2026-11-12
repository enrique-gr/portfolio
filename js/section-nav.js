/**
 * Shared section-nav: smooth jump + scroll spy.
 * Matches About / Interests / VTOL / DBF behavior.
 */
(function initSectionNav() {
  const btns = Array.from(document.querySelectorAll(".section-nav-btn[data-target]"));
  if (!btns.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const offset = () => {
    const topNav = document.querySelector("nav.fixed, #site-nav");
    const secNav = document.querySelector(".section-nav");
    const topH = topNav ? topNav.getBoundingClientRect().height : 80;
    const secH = secNav ? secNav.getBoundingClientRect().height : 45;
    return topH + secH + 24;
  };

  const setActive = (id) => {
    btns.forEach((b) => {
      const on = b.getAttribute("data-target") === id;
      b.classList.toggle("active", on);
      b.classList.toggle("is-active", on);
    });
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset();
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    setActive(id);
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-target");
      if (id) scrollToId(id);
    });
  });

  // Expose for any legacy onclick="scrollToSection(...)"
  window.scrollToSection = function scrollToSection(id, btn) {
    if (btn) {
      btns.forEach((b) => {
        b.classList.remove("active", "is-active");
      });
      btn.classList.add("active", "is-active");
    }
    scrollToId(id);
  };

  const targets = btns
    .map((b) => document.getElementById(b.getAttribute("data-target")))
    .filter(Boolean);

  if (!targets.length || typeof IntersectionObserver === "undefined") return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
  );
  targets.forEach((el) => spy.observe(el));
})();
