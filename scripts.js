//TEMA
(() => {
  const root = document.documentElement;
  const stikaloTeme = document.getElementById("stikaloTeme");

  // Ob nalaganju strani preveri, ali je uporabnik že izbral temo
  const tema = localStorage.getItem("tema");
  if (tema === "light") {
    root.classList.add("light");
  }

  // Ob kliku preklopi temo in shrani izbiro
  if (stikaloTeme) {
    stikaloTeme.addEventListener("click", function(event) {
      event.preventDefault();
      root.classList.toggle("light");

      // Shrani novo stanje
      if (root.classList.contains("light")) {
        localStorage.setItem("tema", "light");
      } else {
        localStorage.setItem("tema", "dark");
      }
    });
  }
})();

document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
  if (heading.id) {
    heading.style.cursor = 'pointer';
    heading.addEventListener('click', () => {
      window.location.hash = heading.id;
    });
  }
});

document.addEventListener("keydown", function(event) {
  // Preveri, da je Shift pritisnjen, Ctrl/Alt/Meta pa ne
  if (!event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;

  const key = event.key.toUpperCase(); // velike črke, ker Shift običajno pomeni velike

  switch (key) {
    case 'B':
      const stikaloTeme = document.getElementById("stikaloTeme");
      if (stikaloTeme) stikaloTeme.click();
      break;

    case 'M':
      const linkMD = document.getElementById("linkMD");
      if (linkMD) linkMD.click();
      break;

    case 'D':
      const domov = document.getElementById("domov");
      if (domov) domov.click();
      break;
  }
});
