//TEMA
let root = document.querySelector(":root");
let stikaloTeme = document.querySelector("#stikaloTeme");

stikaloTeme.addEventListener('click', () => {
  event.preventDefault();
  root.classList.toggle('light');
})

//GOOGLOVA OZNAKA za beleženje obiskov
setTimeout(() => {
  let script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TR1FD0790Y';
  script.async = true;
  document.head.appendChild(script);

  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-TR1FD0790Y');
  };
}, 3000); // Naloži 3 sekunde po prikazu
