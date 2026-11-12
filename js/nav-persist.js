/* Cross-page navigation: soft exit, bfcache recovery, smart Return.
   Single source of truth for smoothExit / softNavigate — do not redefine on pages. */
(function () {
  const RETURN_KEY  = "eg-portfolio-returning";
  const SCROLL_KEY  = "eg-portfolio-index-scroll";
  const HUB_KEY     = "eg-portfolio-hub";
  const SECTION_KEY = "eg-portfolio-return-section";

  function isIndexPath(pathname) {
    const path = String(pathname || "").replace(/\\/g, "/");
    return /(^|\/)index(?:[\w.-]*)?\.html?$|\/$/.test(path)
      || /\/Portfolio\/?$/i.test(path)
      || /\/portfolio\/?$/i.test(path);
  }

  function markReturning(extra) {
    try {
      sessionStorage.setItem(RETURN_KEY, "1");
      if (extra && extra.hub) sessionStorage.setItem(HUB_KEY, extra.hub);
      if (extra && extra.section) sessionStorage.setItem(SECTION_KEY, extra.section);
    } catch (_) { /* ignore */ }
  }

  function resetVisibility() {
    document.documentElement.classList.remove("page-exit");
    document.body.style.opacity = "1";
    document.body.style.transform = "none";
    document.body.style.transition = "";
  }

  /** One exit path — short opacity fade. Avoids stacking View Transitions. */
  function fadeThen(go, ms) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      go();
      return;
    }
    document.documentElement.classList.add("page-exit");
    document.body.style.transition = "opacity 0.16s ease, transform 0.16s ease";
    document.body.style.opacity = "0";
    document.body.style.transform = "translateY(3px)";
    setTimeout(go, typeof ms === "number" ? ms : 160);
  }

  function normalizeIndexReturnUrl(url) {
    try {
      const u = new URL(url, window.location.href);
      if (!isIndexPath(u.pathname)) return url;

      const hub = u.searchParams.get("hub");
      const section = (u.hash || "").replace(/^#/, "");
      markReturning({
        hub: hub || undefined,
        section: section || undefined
      });

      // Hash is restored via SECTION_KEY / SCROLL_KEY — avoid browser hash jump on load
      u.hash = "";
      return u.pathname + u.search;
    } catch (_) {
      return url;
    }
  }

  /** True only when the previous document was the portfolio index. */
  function referrerIsIndex() {
    try {
      if (!document.referrer) return false;
      const ref = new URL(document.referrer);
      return ref.origin === window.location.origin && isIndexPath(ref.pathname);
    } catch (_) {
      return false;
    }
  }

  window.addEventListener("pageshow", (e) => {
    resetVisibility();
    if (e.persisted) document.documentElement.classList.add("nav-returning");
  });

  /** Soft navigate (fade out, then assign location). */
  window.softNavigate = function softNavigate(url) {
    const target = normalizeIndexReturnUrl(url);
    try {
      const u = new URL(target, window.location.href);
      if (!isIndexPath(u.pathname)) markReturning();
    } catch (_) {
      markReturning();
    }
    fadeThen(() => { window.location.href = target; });
  };

  /**
   * Prefer history.back() only when the prior page is the index (bfcache + exact scroll).
   * About → Interests → Return must soft-navigate to index, not back to About.
   */
  window.smoothExit = function smoothExit(e, url) {
    if (e) e.preventDefault();
    const fallback = url || "index.html";

    let targetIsIndex = true;
    try {
      targetIsIndex = isIndexPath(new URL(fallback, window.location.href).pathname);
    } catch (_) { /* keep true */ }

    if (targetIsIndex && referrerIsIndex() && window.history.length > 1) {
      markReturning();
      fadeThen(() => { history.back(); }, 140);
      return;
    }

    softNavigate(fallback);
  };

  window.__EG_NAV = { RETURN_KEY, SCROLL_KEY, HUB_KEY, SECTION_KEY, isIndexPath };
})();
