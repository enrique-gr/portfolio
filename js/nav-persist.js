/* Cross-page navigation: soft exit, bfcache recovery, smart Return.
   Single source of truth for smoothExit / softNavigate — do not redefine on pages. */
(function () {
  const RETURN_KEY = "eg-portfolio-returning";
  const SCROLL_KEY = "eg-portfolio-index-scroll";
  const HUB_KEY = "eg-portfolio-hub";
  const SECTION_KEY = "eg-portfolio-return-section";

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

  /** Build a hash-free index URL; hub/section are restored via sessionStorage. */
  function normalizeIndexReturnUrl(url) {
    try {
      const u = new URL(url, window.location.href);
      const path = u.pathname.replace(/\\/g, "/");
      const isIndex = /(^|\/)index(?:[\w.-]*)?\.html?$|\/$/.test(path) || path.endsWith("/Portfolio/") || path.endsWith("/portfolio/");
      if (!isIndex) return url;

      const hub = u.searchParams.get("hub");
      const section = (u.hash || "").replace(/^#/, "");
      markReturning({
        hub: hub || undefined,
        section: section || undefined
      });

      u.hash = "";
      return u.pathname + u.search;
    } catch (_) {
      return url;
    }
  }

  function referrerIsIndex() {
    try {
      if (!document.referrer) return false;
      const ref = new URL(document.referrer);
      const here = window.location;
      if (ref.origin !== here.origin) return false;
      return /(^|\/)index(?:[\w.-]*)?\.html?$|\/$/.test(ref.pathname);
    } catch (_) {
      return false;
    }
  }

  window.addEventListener("pageshow", (e) => {
    resetVisibility();
    if (e.persisted) document.documentElement.classList.add("nav-returning");
  });

  /** Soft navigate (View Transitions when available) */
  window.softNavigate = function softNavigate(url) {
    markReturning();
    const target = normalizeIndexReturnUrl(url);
    const go = () => { window.location.href = target; };
    if (document.startViewTransition) {
      document.startViewTransition(go);
    } else {
      document.documentElement.classList.add("page-exit");
      document.body.style.transition = "opacity 0.18s ease, transform 0.18s ease";
      document.body.style.opacity = "0";
      document.body.style.transform = "translateY(4px)";
      setTimeout(go, 180);
    }
  };

  /**
   * Prefer history.back() when the prior page was same-origin index so
   * bfcache can restore scroll without a hard reload. Otherwise soft-navigate
   * to a hash-free index URL and let index restore the saved scrollY.
   */
  window.smoothExit = function smoothExit(e, url) {
    if (e) e.preventDefault();

    markReturning();

    if (referrerIsIndex() && window.history.length > 1) {
      const goBack = () => history.back();
      if (document.startViewTransition) document.startViewTransition(goBack);
      else {
        document.documentElement.classList.add("page-exit");
        setTimeout(goBack, 100);
      }
      return;
    }

    softNavigate(url || "index.html");
  };

  // Expose keys for index restore helpers (optional)
  window.__EG_NAV = { RETURN_KEY, SCROLL_KEY, HUB_KEY, SECTION_KEY };
})();
