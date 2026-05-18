// Syntax highlighting
document.addEventListener("DOMContentLoaded", () => {
  hljs.highlightAll();
  addCopyButtons();
  initTabs();
  initScrollSpy();
});

// ── Copy buttons ──────────────────────────────────────────────────────
function addCopyButtons() {
  document.querySelectorAll("pre").forEach(pre => {
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

  // Smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
}
