/* Cross-page navigation — SPA-style soft shell on the index.
   Outbound: keep index alive, show the target in a full-viewport frame.
   Return: close the frame instantly (zero document reload). */
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

      const hub = u.searchParams.get("hub");
      const section = (u.hash || "").replace(/^#/, "");
      markReturning({
        hub: hub || undefined,
        section: section || undefined,
        clearScroll: !!section
      });

      u.hash = "";
      return u.pathname + u.search;
    } catch (_) {
      return url;
    }
  }

  function canBackToIndex() {
    if (window.history.length <= 1) return false;
    try {
      return sessionStorage.getItem(SCROLL_KEY) !== null;
    } catch (_) {
      return false;
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

  /** Soft shell only works when parent can talk to the frame (not file://). */
  function softShellSupported() {
    return window.location.protocol === "http:" || window.location.protocol === "https:";
  }

  function isInSoftFrame() {
    try {
      return window.top !== window
        && window.top.__EG_SOFT
        && typeof window.top.__EG_SOFT.isActive === "function"
        && window.top.__EG_SOFT.isActive();
    } catch (_) {
      return false;
    }
  }

  /* ── Index soft shell ───────────────────────────────────────────────── */
  const Soft = {
    frame: null,
    lockedY: 0,
    opening: false,
    closing: false,

    isIndex() {
      return isIndexPath(window.location.pathname);
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
      frame.addEventListener("load", () => {
        if (!this.isActive() || this.closing) return;
        try {
          const childLoc = frame.contentWindow && frame.contentWindow.location;
          if (!childLoc || childLoc.href === "about:blank") return;
          const next = childLoc.pathname + childLoc.search + childLoc.hash;
          if (next && next !== window.location.pathname + window.location.search + window.location.hash) {
            history.replaceState({ egSoft: 1 }, "", next);
          }
          try {
            frame.contentWindow.__EG_IN_SOFT = true;
          } catch (_) { /* ignore */ }
        } catch (_) { /* cross-origin */ }
      });
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

    open(url, opts) {
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
      this.opening = true;
      // Paint black shell in the same turn — before network work.
      this.lockIndex();
      const frame = this.ensureFrame();

      // Seed an index history entry so the first Back always restores the hub.
      if (!history.state || !history.state.egIndex) {
        history.replaceState(
          { egIndex: 1, y: window.scrollY || 0 },
          "",
          window.location.pathname + window.location.search + window.location.hash
        );
      }

      if (!(opts && opts.skipPush)) {
        history.pushState({ egSoft: 1 }, "", abs);
      }

      if (frame.getAttribute("src") === abs) {
        try { frame.contentWindow.location.replace(abs); } catch (_) { frame.src = abs; }
      } else {
        frame.src = abs;
      }
      this.opening = false;
    },

    /**
     * Instant Return — tear the overlay down in this turn (Shield-level),
     * then sync history. Never wait on history.back() to reveal the index.
     */
    close() {
      if (!this.isActive() && !this.closing) return;
      const y = this.lockedY || window.scrollY || 0;
      const hadSoft = !!(history.state && history.state.egSoft);
      this.closing = true;
      this.teardown();
      if (hadSoft) {
        history.back();
        return;
      }
      try {
        history.replaceState({ egIndex: 1, y }, "", indexHref());
      } catch (_) { /* ignore */ }
      this.closing = false;
    },

    teardown() {
      const frame = this.frame || document.getElementById(FRAME_ID);
      if (frame) {
        // Hide first (same frame), blank src after so unload can't flash
        document.documentElement.classList.remove("eg-soft-away");
        try { frame.src = "about:blank"; } catch (_) { /* ignore */ }
      }
      this.unlockIndex();
      try {
        sessionStorage.removeItem(RETURN_KEY);
      } catch (_) { /* ignore */ }
    },

    onPopState(e) {
      if (!this.isIndex()) return;
      const state = e.state;

      // close() already revealed the index; just finish the history sync.
      if (this.closing) {
        this.closing = false;
        if (this.isActive()) this.teardown();
        if (state && typeof state.y === "number") window.scrollTo(0, state.y);
        return;
      }

      if (state && state.egSoft) {
        // Forward navigation back into a soft page
        this.lockIndex();
        const frame = this.ensureFrame();
        const abs = window.location.href;
        if (frame.getAttribute("src") !== abs) frame.src = abs;
        return;
      }

      // Browser Back from a soft page (button / swipe)
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
    window.location.href = normalizeIndexReturnUrl(url);
  };

  /**
   * Open a same-origin page without killing the index (Shield-level Return).
   * Used by index navigateTo(). Falls back to full navigation off-index.
   */
  window.softOpen = function softOpen(url) {
    Soft.open(url);
  };

  /**
   * Return: if we are inside the soft frame → close parent instantly.
   * Else history.back() into bfcache / softNavigate fallback.
   */
  window.smoothExit = function smoothExit(e, url) {
    if (e) e.preventDefault();
    const fallback = url || "index.html";

    let targetIsIndex = true;
    try {
      targetIsIndex = isIndexPath(new URL(fallback, window.location.href).pathname);
    } catch (_) { /* keep true */ }

    if (targetIsIndex && isInSoftFrame()) {
      try {
        window.top.__EG_SOFT.close();
        return;
      } catch (_) { /* fall through */ }
    }

    if (!targetIsIndex) {
      window.location.href = fallback;
      return;
    }

    if (canBackToIndex()) {
      markReturning();
      history.back();
      return;
    }

    softNavigate(fallback);
  };

  // Warm likely targets from the index (delegation covers JS-rendered cards)
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
