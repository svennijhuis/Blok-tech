/***************************/
/*** light and dark mode ***/
/***************************/

const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const bodyDarkLight = document.querySelector("body");
const currentTheme = localStorage.getItem("theme");
const lightTheme = "light-theme";
const darkTheme = "dark-theme";
let theme;

if (currentTheme == "dark") {
  bodyDarkLight.classList.toggle(darkTheme);
} else if (currentTheme == "light") {
  bodyDarkLight.classList.toggle(lightTheme);
}

btn.addEventListener("click", () => {
  if (prefersDarkScheme.matches) {
    bodyDarkLight.classList.toggle(lightTheme);
    theme = bodyDarkLight.classList.contains(lightTheme) ? "light" : "dark";
  } else {
    bodyDarkLight.classList.toggle(darkTheme);
    theme = bodyDarkLight.classList.contains(darkTheme) ? "dark" : "light";
  }
  localStorage.setItem("theme", theme);
});

/***************************/
/*** Animtion  Intersection Observer ***/
/***************************/

const options = {
  threshold: 0.4,
};

const OppasSection = document.querySelectorAll(".background-person");

const observer = new IntersectionObserver( (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("sectionfadein");
  }, options);
});

OppasSection.forEach((section) => {
  observer.observe(section)
});

/***************************/
/*** Nieuwsbrief popup ***/
/***************************/
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');

btnsOpenModal.addEventListener("click", () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
 
btnCloseModal.addEventListener("click", () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

overlay.addEventListener("click", () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
});






