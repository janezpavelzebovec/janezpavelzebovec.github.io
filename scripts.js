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
  };

  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  };


/*SVETLI NAČIN*//*
    function myFunction() {
        var element = document.body;
        element.classList.toggle("light-mode");
    };
    document.querySelector('.theme-toggle-button').addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });*/
