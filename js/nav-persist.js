/* Cross-page navigation polish: soft exit, bfcache recovery, smart Return */
(function () {
  const RETURN_KEY = "eg-portfolio-returning";

  function markReturning() {
    try { sessionStorage.setItem(RETURN_KEY, "1"); } catch (_) { /* ignore */ }
  }

  function resetVisibility() {
    document.documentElement.classList.remove("page-exit");
    document.body.style.opacity = "1";
    document.body.style.transform = "none";
    document.body.style.transition = "";
  }

  window.addEventListener("pageshow", (e) => {
    resetVisibility();
    if (e.persisted) document.documentElement.classList.add("nav-returning");
  });

  /** Soft navigate (View Transitions when available) */
  window.softNavigate = function softNavigate(url) {
    markReturning();
    const go = () => { window.location.href = url; };
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
   * bfcache can restore scroll without a hard reload. Otherwise soft-navigate.
   */
  window.smoothExit = function smoothExit(e, url) {
    if (e) e.preventDefault();

    let canBack = false;
    try {
      if (document.referrer) {
        const ref = new URL(document.referrer);
        const here = window.location;
        canBack = ref.origin === here.origin && /(^|\/)index(?:[\w.-]*)?\.html?$|\/$/.test(ref.pathname);
      }
    } catch (_) { /* ignore */ }

    if (canBack && window.history.length > 1) {
      const goBack = () => history.back();
      if (document.startViewTransition) document.startViewTransition(goBack);
      else {
        document.documentElement.classList.add("page-exit");
        setTimeout(goBack, 100);
      }
      return;
    }

    softNavigate(url);
  };
})();
