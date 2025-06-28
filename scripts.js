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
