const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const yearTarget = document.querySelector("#year");
const bookingForm = document.querySelector("#booking-form");
const formMessage = document.querySelector("#form-message");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("is-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    });
  });
}

const revealItems = document.querySelectorAll(".section-reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (bookingForm && formMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const name = (formData.get("name") || "").toString().trim();
    formMessage.textContent = `Díky, ${name || "kliente"}! Ozveme se ti co nejdříve.`;
    bookingForm.reset();
  });
}
