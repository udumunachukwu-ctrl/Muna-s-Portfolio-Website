// ===================================================================
// Shared behavior across all pages: nav toggle, active link, reveal-on-scroll
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => links.classList.remove("open"));
    });
  }

  // Highlight current page in nav
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // Reveal-on-scroll for elements marked .reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Skill bar fill animation (About page)
  const skillFills = document.querySelectorAll(".skill-fill");
  if (skillFills.length && "IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.style.width = target.dataset.level + "%";
            skillObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.4 }
    );
    skillFills.forEach((el) => skillObserver.observe(el));
  } else {
    skillFills.forEach((el) => (el.style.width = el.dataset.level + "%"));
  }
});
