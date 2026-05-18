const tabs = document.querySelectorAll(".tab");
const labs = document.querySelectorAll(".lab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.lab;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    labs.forEach((lab) => lab.classList.toggle("active", lab.id === target));
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = "Copied";
      button.classList.add("copied");
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove("copied");
      }, 1200);
    } catch {
      button.textContent = button.dataset.copy;
    }
  });
});
