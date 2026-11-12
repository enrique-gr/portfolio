/**
 * Live favicon — cross-browser “systems up” pulse on the brand mark.
 *
 * Strategy:
 *  1) HTML ships favicon.png (same mark Chrome + Edge should show).
 *  2) This script draws a smoother PNG pulse via canvas where dynamic icons work.
 *  3) Safari gets slower updates + link-element replacement (href-only is flaky).
 *  4) prefers-reduced-motion / missing canvas → leave the static PNG alone.
 *
 * Asset paths resolve from this script’s URL so /demos/* pages work too.
 */
(function initLiveFavicon() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  if (!canvas.getContext) return;

  const scriptEl =
    document.currentScript ||
    document.querySelector('script[src*="live-favicon"]');
  const scriptSrc = (scriptEl && scriptEl.src) || "";
  const root = scriptSrc
    ? scriptSrc.replace(/\/js\/live-favicon\.js(?:\?.*)?$/i, "/")
    : "/";

  const PNG_SRC = root + "assets/brand/favicon.png";
  const SIZE = 32;
  const ua = navigator.userAgent || "";
  const isSafari =
    /safari/i.test(ua) && !/chrome|chromium|crios|android/i.test(ua);
  const FPS_VISIBLE = isSafari ? 4 : 8;
  const FPS_HIDDEN = 2;

  const img = new Image();
  // Same-origin assets; avoid CORS taint on file:// where possible.
  try {
    img.crossOrigin = "anonymous";
  } catch (_) {
    /* ignore */
  }

  const start = () => {
    if (!img.naturalWidth) return;

    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let link = null;
    let lastBlobUrl = "";
    let last = 0;
    let raf = 0;
    let framesSinceReplace = 0;

    const ensureLink = (forceNew) => {
      if (!forceNew && link && link.isConnected) return link;

      const next = document.createElement("link");
      next.setAttribute("data-live-favicon", "1");
      next.rel = "icon";
      next.type = "image/png";
      next.sizes = "32x32";

      document.querySelectorAll('link[data-live-favicon="1"]').forEach((el) => {
        el.remove();
      });

      // Drop static tab icons so only the live icon competes; keep apple-touch.
      const staticIcons = document.querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"]'
      );
      const anchor = staticIcons[0] || null;
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(next, anchor);
      } else {
        document.head.appendChild(next);
      }
      staticIcons.forEach((el) => {
        el.remove();
      });

      link = next;
      return link;
    };

    const publish = (url) => {
      const el = ensureLink(isSafari && framesSinceReplace >= 6);
      if (isSafari && framesSinceReplace >= 6) framesSinceReplace = 0;
      el.href = url;
      framesSinceReplace += 1;
    };

    const paint = (t) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.drawImage(img, 0, 0, SIZE, SIZE);

      const breath = 0.55 + 0.45 * Math.sin(t * 0.0034);
      const x = SIZE - 5.5;
      const y = SIZE - 5.5;
      const r = 1.7 + breath * 0.35;

      ctx.beginPath();
      ctx.arc(x, y, r + 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(52, 211, 153," + (0.14 + breath * 0.2) + ")";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(16, 185, 129," + (0.55 + breath * 0.4) + ")";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x - 0.35, y - 0.35, Math.max(0.5, r * 0.32), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(236, 253, 245," + (0.4 + breath * 0.4) + ")";
      ctx.fill();
    };

    const applyFrame = (t) => {
      paint(t);

      const finish = (url) => {
        if (lastBlobUrl && lastBlobUrl.indexOf("blob:") === 0) {
          try {
            URL.revokeObjectURL(lastBlobUrl);
          } catch (_) {
            /* ignore */
          }
        }
        lastBlobUrl = url;
        publish(url);
      };

      if (canvas.toBlob) {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              finish(canvas.toDataURL("image/png"));
              return;
            }
            finish(URL.createObjectURL(blob));
          },
          "image/png"
        );
      } else {
        finish(canvas.toDataURL("image/png"));
      }
    };

    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      const fps = document.hidden ? FPS_HIDDEN : FPS_VISIBLE;
      if (t - last < 1000 / fps) return;
      last = t;
      applyFrame(t);
    };

    ensureLink(true);
    applyFrame(0);
    raf = requestAnimationFrame(frame);

    window.addEventListener(
      "pagehide",
      () => {
        if (raf) cancelAnimationFrame(raf);
        if (lastBlobUrl && lastBlobUrl.indexOf("blob:") === 0) {
          try {
            URL.revokeObjectURL(lastBlobUrl);
          } catch (_) {
            /* ignore */
          }
        }
      },
      { once: true }
    );
  };

  const boot = () => {
    if (img.decode) {
      img.decode().then(start).catch(start);
    } else {
      start();
    }
  };

  img.addEventListener("error", () => {
    /* Keep GIF/PNG from HTML — no canvas animation. */
  });

  if (img.complete && img.naturalWidth) {
    boot();
  } else {
    img.addEventListener("load", boot, { once: true });
  }

  img.src = PNG_SRC;
})();
