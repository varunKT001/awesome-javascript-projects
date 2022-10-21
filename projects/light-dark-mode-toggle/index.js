const checkbox = document.querySelector('input[name=mode]');

// Checkbox change event listener
checkbox.addEventListener('change', function (ev) {
  const newTheme = this.checked ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme)
});

// Get default color scheme
const getColorScheme = () => window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"

// Init function
function init() {
  const theme = localStorage.getItem('theme') ?? getColorScheme()
  document.documentElement.setAttribute('data-theme', theme);
  checkbox.checked = theme !== 'light'
}
init()