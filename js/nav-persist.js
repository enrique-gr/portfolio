/* Cross-page navigation: production-safe soft shell + Return.
   Soft shell: index stays alive under a full-viewport iframe.
   Return: always reveals the index (never URL-only / stuck-page). */
(function () {
  const RETURN_KEY  = "eg-portfolio-returning";
  const SCROLL_KEY  = "eg-portfolio-index-scroll";
  const HUB_KEY     = "eg-portfolio-hub";
  const SECTION_KEY = "eg-portfolio-return-section";
  const FRAME_ID    = "eg-soft-frame";

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
      if (extra && extra.clearScroll) sessionStorage.removeItem(SCROLL_KEY);
    } catch (_) { /* ignore */ }
  }

  function markReturningFromUrl(url) {
    try {
      const u = new URL(url, window.location.href);
      if (!isIndexPath(u.pathname)) return;
      markReturning({
        hub: u.searchParams.get("hub") || undefined,
        section: (u.hash || "").replace(/^#/, "") || undefined,
        clearScroll: !!(u.hash || "").replace(/^#/, "")
      });
    } catch (_) {
      markReturning();
    }
  }

  function resetVisibility() {
    document.documentElement.classList.remove("page-exit");
    document.body.style.opacity = "1";
    document.body.style.transform = "none";
    document.body.style.transition = "";
  }

  function normalizeIndexReturnUrl(url) {
    try {
      const u = new URL(url, window.location.href);
      if (!isIndexPath(u.pathname)) return url;
      markReturningFromUrl(url);
      u.hash = "";
      return u.pathname + u.search;
    } catch (_) {
      return url;
    }
  }

  function indexHref() {
    try {
      return new URL("index.html", window.location.href).href;
    } catch (_) {
      return "index.html";
    }
  }

  function sameOrigin(url) {
    try {
      return new URL(url, window.location.href).origin === window.location.origin;
    } catch (_) {
      return false;
    }
  }

  function softShellSupported() {
    return window.location.protocol === "http:" || window.location.protocol === "https:";
  }

  /** True when this document is the soft-shell iframe (or still hosted by it). */
  function isInSoftFrame() {
    try {
      if (window.top === window) return false;
      if (window.frameElement && window.frameElement.id === FRAME_ID) return true;
      if (window.top.__EG_SOFT && typeof window.top.__EG_SOFT.isActive === "function") {
        return window.top.__EG_SOFT.isActive();
      }
    } catch (_) { /* cross-origin */ }
    return false;
  }

  function closeSoftFromChild() {
    try {
      if (window.top && window.top.__EG_SOFT && typeof window.top.__EG_SOFT.close === "function") {
        window.top.__EG_SOFT.close();
        return true;
      }
    } catch (_) { /* ignore */ }
    // Last resort: break out of the frame to the index
    try {
      window.top.location.href = indexHref();
      return true;
    } catch (_) { /* ignore */ }
    return false;
  }

  /* ── Index soft shell ───────────────────────────────────────────────── */
  const Soft = {
    frame: null,
    lockedY: 0,
    closing: false,

    isIndex() {
      return isIndexPath(window.location.pathname) || !!document.getElementById("hero-section");
    },

    isActive() {
      return document.documentElement.classList.contains("eg-soft-away");
    },

    ensureFrame() {
      if (this.frame && this.frame.isConnected) return this.frame;
      let frame = document.getElementById(FRAME_ID);
      if (!frame) {
        frame = document.createElement("iframe");
        frame.id = FRAME_ID;
        frame.title = "Page";
        frame.setAttribute("aria-label", "Project page");
        frame.style.background = "#050505";
        document.body.appendChild(frame);
      }
      if (!frame.__egBound) {
        frame.__egBound = true;
        frame.addEventListener("load", () => {
          if (!this.isActive() || this.closing) return;
          try {
            const childLoc = frame.contentWindow && frame.contentWindow.location;
            if (!childLoc || childLoc.href === "about:blank") return;
            const next = childLoc.pathname + childLoc.search + childLoc.hash;
            const cur = window.location.pathname + window.location.search + window.location.hash;
            if (next && next !== cur) {
              history.replaceState(
                { ...(history.state && typeof history.state === "object" ? history.state : {}), egSoft: 1 },
                "",
                next
              );
            }
          } catch (_) { /* cross-origin */ }
        });
      }
      this.frame = frame;
      return frame;
    },

    lockIndex() {
      this.lockedY = window.scrollY || 0;
      document.documentElement.classList.add("eg-soft-away");
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    },

    unlockIndex() {
      document.documentElement.classList.remove("eg-soft-away");
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      const y = this.lockedY || 0;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, y);
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = "";
      });
    },

    open(url) {
      if (!this.isIndex() || !softShellSupported()) {
        window.location.href = url;
        return;
      }
      const abs = new URL(url, window.location.href).href;
      if (!sameOrigin(abs)) {
        window.location.href = abs;
        return;
      }

      this.closing = false;
      this.lockIndex();
      const frame = this.ensureFrame();

      if (!history.state || !history.state.egIndex) {
        history.replaceState(
          { egIndex: 1, y: window.scrollY || 0 },
          "",
          window.location.pathname + window.location.search + window.location.hash
        );
      }

      history.pushState({ egSoft: 1 }, "", abs);

      try {
        frame.contentWindow.location.replace(abs);
      } catch (_) {
        frame.src = abs;
      }
    },

    /**
     * Instant Return: reveal index first, then rewrite the current history
     * entry to the index URL. Never history.back(); that caused
     * "URL changed but still on project page" when the stack was messy.
     */
    close() {
      if (this.closing) return;
      this.closing = true;
      const y = this.lockedY || window.scrollY || 0;

      // 1) Visual close in this turn
      this.teardown();

      // 2) Force the address bar onto the index (same history entry)
      try {
        history.replaceState({ egIndex: 1, y }, "", indexHref());
      } catch (_) {
        try { history.replaceState({ egIndex: 1, y }, "", "./"); } catch (__) { /* ignore */ }
      }

      this.closing = false;
    },

    teardown() {
      const frame = this.frame || document.getElementById(FRAME_ID);
      document.documentElement.classList.remove("eg-soft-away");
      if (frame) {
        try { frame.src = "about:blank"; } catch (_) { /* ignore */ }
      }
      this.unlockIndex();
      try { sessionStorage.removeItem(RETURN_KEY); } catch (_) { /* ignore */ }
    },

    onPopState(e) {
      if (!this.isIndex()) return;
      const state = e.state;

      if (this.closing) {
        this.closing = false;
        if (this.isActive()) this.teardown();
        return;
      }

      if (state && state.egSoft) {
        // Browser Forward into a soft URL: reopen overlay
        this.lockIndex();
        const frame = this.ensureFrame();
        const abs = window.location.href;
        try {
          frame.contentWindow.location.replace(abs);
        } catch (_) {
          frame.src = abs;
        }
        return;
      }

      // Browser Back from a soft page
      if (this.isActive()) this.teardown();
      if (state && typeof state.y === "number") {
        this.lockedY = state.y;
        window.scrollTo(0, state.y);
      }
    },

    prefetch(url) {
      if (!softShellSupported() || !sameOrigin(url)) return;
      try {
        const abs = new URL(url, window.location.href).href;
        if (document.querySelector('link[data-eg-prefetch="' + abs + '"]')) return;
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = abs;
        link.setAttribute("data-eg-prefetch", abs);
        document.head.appendChild(link);
      } catch (_) { /* ignore */ }
    }
  };

  window.__EG_SOFT = Soft;
  window.__EG_NAV = { RETURN_KEY, SCROLL_KEY, HUB_KEY, SECTION_KEY, isIndexPath };

  window.addEventListener("popstate", (e) => Soft.onPopState(e));

  window.addEventListener("pageshow", (e) => {
    resetVisibility();
    if (e.persisted) document.documentElement.classList.add("nav-returning");
  });

  window.softNavigate = function softNavigate(url) {
    window.location.assign(normalizeIndexReturnUrl(url));
  };

  window.softOpen = function softOpen(url) {
    Soft.open(url);
  };

  /**
   * Production Return:
   * 1) Soft-frame child → close parent shell (instant)
   * 2) Top-level project → always assign(index), never blind history.back()
   */
  window.smoothExit = function smoothExit(e, url) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const fallback = url || "index.html";

    let targetIsIndex = true;
    try {
      targetIsIndex = isIndexPath(new URL(fallback, window.location.href).pathname);
    } catch (_) { /* keep true */ }

    // Soft shell iframe → close parent (never history.back on the iframe)
    if (targetIsIndex && (isInSoftFrame() || (window.frameElement && window.frameElement.id === FRAME_ID))) {
      if (closeSoftFromChild()) return;
    }

    if (!targetIsIndex) {
      window.location.assign(fallback);
      return;
    }

    // Top-level: reliable full navigation with restore flags.
    // Blind history.back() was leaving users on the same project page
    // when the stack pointed at another soft URL with the same path.
    markReturningFromUrl(fallback);
    softNavigate(fallback);
  };

  if (Soft.isIndex()) {
    document.addEventListener("pointerenter", (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      const a = t.closest("a[href]");
      if (a && a.target !== "_blank") {
        const href = a.getAttribute("href") || "";
        if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("http")) {
          Soft.prefetch(a.href);
        }
      }
      const card = t.closest("[onclick]");
      if (card) {
        const m = String(card.getAttribute("onclick") || "").match(/navigateTo\(['\"]([^'\"]+)['\"]\)/);
        if (m) Soft.prefetch(m[1]);
      }
    }, true);
  }
})();
