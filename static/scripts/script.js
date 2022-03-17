/*** light and dark mode ***/

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
