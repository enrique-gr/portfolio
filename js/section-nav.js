(function initPageSectionNav() {
  const nav = document.querySelector("[data-page-sections]");
  if (!nav) return;

  const rail = nav.querySelector(".eg-h-rail");
  const header = document.querySelector("nav.fixed");
  const entries = Array.from(nav.querySelectorAll('a[href^="#"]'))
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(entry => entry.section);
  if (!entries.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollKeys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
  let active;
  let pending;
  let settleTimer;
  let syncFrame;

  function offset() {
    return Math.max(header ? header.getBoundingClientRect().bottom : 0,
                    nav.getBoundingClientRect().bottom) + 18;
  }

  function sectionTop(section) {
    // Layout offsets ignore the transform used by About's entrance animation.
    let top = 0;
    for (let node = section; node; node = node.offsetParent) {
      top += node.offsetTop + (node.offsetParent?.clientTop || 0);
    }
    return top;
  }

  function maxScroll() {
    return Math.max(0, document.scrollingElement.scrollHeight - window.innerHeight);
  }

  function setActive(entry) {
    if (entry === active) return;
    active = entry;
    for (const item of entries) {
      const selected = item === entry;
      item.link.classList.toggle("active", selected);
      item.link.classList.toggle("is-active", selected);
      if (selected) item.link.setAttribute("aria-current", "location");
      else item.link.removeAttribute("aria-current");
    }

    // Reveal the tab on narrow screens without scrolling the page a second time.
    if (!rail) return;
    const viewport = rail.getBoundingClientRect();
    const tab = entry.link.getBoundingClientRect();
    if (tab.left < viewport.left + 8) rail.scrollLeft += tab.left - viewport.left - 8;
    else if (tab.right > viewport.right - 8) rail.scrollLeft += tab.right - viewport.right + 8;
  }

  function queueSync() {
    if (syncFrame) return;
    syncFrame = requestAnimationFrame(() => {
      syncFrame = 0;
      if (pending) return;
      const bottom = maxScroll();
      // Font and media layout can move the bottom by a few pixels after scrolling.
      if (bottom > 0 && window.scrollY >= bottom - 12) {
        setActive(entries[entries.length - 1]);
        return;
      }
      const line = window.scrollY + offset() + 2;
      let visible = entries[0];
      for (const entry of entries) {
        if (sectionTop(entry.section) > line) break;
        visible = entry;
      }
      setActive(visible);
    });
  }

  function settleWhenIdle() {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      const destination = pending;
      pending = null;
      if (destination && Math.abs(window.scrollY - destinationTop(destination)) > 2) queueSync();
    }, 180);
  }

  function destinationTop(entry) {
    return Math.max(0, Math.min(maxScroll(), sectionTop(entry.section) - offset()));
  }

  function jump(entry, animate) {
    pending = entry;
    setActive(entry);
    window.scrollTo({ top: destinationTop(entry), behavior: animate && !reducedMotion.matches ? "smooth" : "instant" });
    settleWhenIdle();
  }

  function interruptJump() {
    if (!pending) return;
    clearTimeout(settleTimer);
    pending = null;
    queueSync();
  }

  for (const entry of entries) {
    entry.link.addEventListener("click", event => {
      if (event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      jump(entry, true);
    });
  }

  window.addEventListener("scroll", () => {
    if (pending) settleWhenIdle();
    else queueSync();
  }, { passive: true });
  window.addEventListener("wheel", interruptJump, { passive: true });
  window.addEventListener("touchmove", interruptJump, { passive: true });
  window.addEventListener("keydown", event => {
    if (scrollKeys.has(event.key) && !event.target.closest?.("input, textarea, select, button, [contenteditable]")) {
      interruptJump();
    }
  });
  window.addEventListener("resize", queueSync);
  const followHash = () => {
    const entry = entries.find(item => item.link.hash === window.location.hash);
    if (entry) jump(entry, false);
    else queueSync();
  };
  window.addEventListener("hashchange", followHash);
  followHash();
})();
