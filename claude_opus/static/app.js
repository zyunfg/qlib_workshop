// Syntax highlighting
document.addEventListener("DOMContentLoaded", () => {
  hljs.highlightAll();
  addCopyButtons();
  initTabs();
  initScrollSpy();
  initMermaid();
});

// ── Mermaid (dark theme tuned to site palette) ────────────────────────
function initMermaid() {
  if (typeof mermaid === "undefined") return;
  mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    themeVariables: {
      background: "#0f1117",
      primaryColor: "#1e2433",
      primaryTextColor: "#e2e8f0",
      primaryBorderColor: "#4f8ef7",
      lineColor: "#8892a4",
      secondaryColor: "#161b27",
      tertiaryColor: "#1a1f2e",
      clusterBkg: "rgba(255,255,255,0.025)",
      clusterBorder: "#2a3145",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    flowchart: {
      curve: "basis",
      htmlLabels: true,
      padding: 14,
    },
  });
}

// ── Copy buttons ──────────────────────────────────────────────────────
function addCopyButtons() {
  document.querySelectorAll("pre:not(.mermaid)").forEach(pre => {
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    pre.style.position = "relative";
    pre.appendChild(btn);

    btn.addEventListener("click", () => {
      const code = pre.querySelector("code");
      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 1800);
      });
    });
  });
}

// ── Tab switching ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll(".tabs").forEach(tabGroup => {
    const groupName = tabGroup.dataset.tabGroup;
    const buttons = tabGroup.querySelectorAll(".tab-btn");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;

        // Update button state
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Show correct content
        document.querySelectorAll(`[data-tab-content]`).forEach(content => {
          if (content.dataset.tabContent === tab) {
            content.classList.add("active");
          } else {
            // only hide contents in the same group
            const siblingBtn = tabGroup.querySelector(`[data-tab="${content.dataset.tabContent}"]`);
            if (siblingBtn) content.classList.remove("active");
          }
        });
      });
    });
  });
}

// ── Scroll spy ────────────────────────────────────────────────────────
function initScrollSpy() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach(s => observer.observe(s));

  // Smooth scroll on nav click — only for in-page anchors
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;   // let real links navigate
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
}
