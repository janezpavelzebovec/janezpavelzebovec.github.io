// Prenesemo gtag.js skripto asinhrono
var script = document.createElement('script');
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TR1FD0790Y';
script.async = true;
document.head.appendChild(script);

// Počakamo, da se skripta naloži, nato nastavimo konfiguracijo
script.onload = function () {
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'G-TR1FD0790Y');
};

/*KAZALO SPLETNEGA MESTA:*/
  function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

/*DEJAVEN UGNEZDEN SEZNAM:*/
var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}


/*SVETLI NAČIN*/
    function myFunction() {
        var element = document.body;
        element.classList.toggle("light-mode");
    }
document.querySelector('.theme-toggle-button').addEventListener('click', () => {
  document.body.classList.toggle('dark')

/*ASTRONOMSKA URA*/
  setInterval(setClock, 1000)

  const hourHand = document.querySelector('[data-hour-hand]')
  const minuteHand = document.querySelector('[data-minute-hand]')
  const secondHand = document.querySelector('[data-second-hand]')

  function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 24

    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);

    requestAnimationFrame(animateClock);
  }

  function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * -360 - 180);
  }

    setClock()
    animateClock()
