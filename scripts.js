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

document.addEventListener("keydown", function(event) {
  // Preveri, da je Shift pritisnjen, Ctrl/Alt/Meta pa ne
  if (!event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;

  const key = event.key.toUpperCase(); // velike črke, ker Shift običajno pomeni velike

  switch (key) {
    case 'S':
      const stikaloTeme = document.getElementById("stikaloTeme");
      if (stikaloTeme) stikaloTeme.click();
      break;

    case 'M':
      const linkMD = document.getElementById("linkMD");
      if (linkMD) linkMD.click();
      break;

    case 'D':
      const linkDomov = document.getElementById("linkDomov");
      if (linkDomov) linkDomov.click();
      break;
  }
});
