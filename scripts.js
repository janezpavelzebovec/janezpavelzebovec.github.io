//GOOGLOVA OZNAKA za beleženje obiskov
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

//ODPRE/ZAPRE STRANSKO PLOŠČO
    //odpre
      function openNav() {
        document.getElementById("myNav").style.width = "100%";
      };

      function closeNav() {
        document.getElementById("myNav").style.width = "0%";
      };


//ODPRE IN ZAPRE <DETAILS> MED :HOVER
    //var detailPredmeti = document.querySelectorAll("details, summary, summary::hover");
    /*var detail = document.querySelectorAll("details");

    document.querySelectorAll("details").forEach(function(detail) {
        detail.addEventListener("mouseenter", function(event) {
            if (!this.classList.contains("odprto")) { //če ne vsebuje razreda "odprto"
                this.setAttribute("open", "open"); // Odpre podrobnosti ob hooverju, če ni bilo kliknjeno nanj
            }
        });

        detail.addEventListener("mouseleave", function(event) {
            if (!this.classList.contains("odprto")) { //če ne vsebuje razreda "odprto"
                this.removeAttribute("open"); // Zapre podrobnosti ob odhodu miške, če ni bilo kliknjeno nanj
            }
        });

        detail.addEventListener("click", function() {
            if (this.classList.contains("odprto")) { //če vsebuje razreda "odprto"
                this.classList.remove("odprto"); // Odstrani razred "odprto", če je bil element že kliknjen
            } else {
                this.classList.add("odprto"); // Dodaj razred "odprto" ob kliku
            }
        });
    });*/

//ODPRE DREVESNI PRIKAZ
    //function odpriDrevo() {document.getElementById("drevesni").addAttribute("open");}
    /*function odpriDrevo() {
        // Poišči vse <ul> z razredom "drevesni"
        var drevesniSeznami = document.querySelectorAll("ul.drevesni");

        // Iteriraj skozi vse <ul> in preveri stanje vsakega <details>
        drevesniSeznami.forEach(function(drevesniSeznam) {
            var vsePodrobnosti = drevesniSeznam.querySelectorAll("details");

            // Iteriraj skozi vse <details> in preveri stanje
            vsePodrobnosti.forEach(function(podrobnosti) {
                if (podrobnosti.hasAttribute("open")) {
                    // Če je drevo odprto, zapri
                    podrobnosti.removeAttribute("open");
                } else {
                    // Če je drevo zaprto, odpri
                    podrobnosti.setAttribute("open", "");
                }
            });
        });
        // Premakni brskalnik na del strani z id-jem "details"
        //window.location = "#details";
    }*/
function odpriDrevo() {
    var drevesniSeznami = document.querySelectorAll("ul.drevesni");
    var odpriRod = document.getElementById("odpriRod");
    var odpriZapri = document.getElementById("odpriZapri");

    if (odpriRod.checked){
        drevesniSeznami.forEach(function(drevesniSeznam) {
            var vsePodrobnosti = drevesniSeznam.querySelectorAll("details");
            // Iteriraj skozi vse <details> in preveri stanje
            vsePodrobnosti.forEach(function(podrobnosti) {
                    podrobnosti.removeAttribute("open");
            });
        });
        odpriZapri.innerHTML = `Odpri`;
    } else {
        drevesniSeznami.forEach(function(drevesniSeznam) {
            var vsePodrobnosti = drevesniSeznam.querySelectorAll("details");
            // Iteriraj skozi vse <details> in preveri stanje
            vsePodrobnosti.forEach(function(podrobnosti) {
                    podrobnosti.setAttribute("open", "");
            });
        });
        odpriZapri.innerHTML = `Zapri`;
    }
};

//SPROTNO NALAGANJE SLIK
    if ("IntersectionObserver" in window)
    {
      // get all the lazy images
      var lazy_imgs = document.querySelectorAll('img[loading="lazy"]');

      if (lazy_imgs.length > 0)
      {

        function intersection_handler(observed_imgs, observer)
        {
          observed_imgs.forEach (
            (ev) => {
              // image rootMargin is intersecting the viewport
              if (ev.isIntersecting)
              {
                // remove the observer
                observer.unobserve(ev.target);

                // image hasn’t loaded yet so load it now
                if (ev.target && !ev.target.complete)
                {
                  ev.target.loading = "eager";
                }
              }
            }
          );
        }

        // calculate the desired rootMargins
        var rootVertical   = parseInt(window.innerHeight * 1.5);
        var rootHorizontal = parseInt(window.innerWidth * 1.5);

        let intersection_options = {
          root: null,
          rootMargin: `${rootVertical}px ${rootHorizontal}px`,
          threshold: 0.0
        }

        // create the observer
        let observer = new IntersectionObserver(
          intersection_handler,
          intersection_options
        );


        // attach observer to images
        for (var img of lazy_imgs)
        {
          observer.observe(img);
        }
      }
    }

//TEMNE IN SVETLE RAZLIČIVE SLIKE

/*    const updateSourceMedia = (colorPreference) => {
      const pictures = document.querySelectorAll('picture');

      pictures.forEach((picture) => {
        const sources = picture.querySelectorAll(`
          source[media*="prefers-color-scheme"],
          source[data-media*="prefers-color-scheme"]
        `);

        sources.forEach((source) => {
          // Preserve the source `media` as a data-attribute
          // to be able to switch between preferences
          if (source.media.includes('prefers-color-scheme')) {
            source.dataset.media = source.media;
          }

          // If the source element `media` target is the `preference`,
          // override it to 'all' to show
          // or set it to 'none' to hide
          if (source.dataset.media.includes(colorPreference)) {
            source.media = 'all';
          } else {
            source.media = 'none';
          }
        });
      });
    };

    // Izberite stikalo z novim ID-jem
    const toggle = document.querySelector('#stikaloNačina');

    // Nastavite začetno temo glede na vrednost v atributu data-mode stikala
    document.firstElementChild.setAttribute('data-theme', toggle.dataset.mode);

    // Dodajte poslušalca dogodkov na stikalo za preklapljanje tem
    toggle.addEventListener('click', () => {
      // Preverite trenutni način in preklopite na nasprotno
      const newMode = toggle.dataset.mode === 'light' ? 'dark' : 'light';
      toggle.dataset.mode = newMode;

      // Nastavite novo temo na <html> element
      document.firstElementChild.setAttribute('data-theme', newMode);

      // Posodobite slike glede na novo temo
      updateSourceMedia(newMode);
    });

    // Prvotno klicanje funkcije za nastavitev slik na podlagi trenutnega načina
    updateSourceMedia(toggle.dataset.mode);*/

//SVETLI NAČIN
// Funkcija za posodabljanje medijskih pogojev za slike
const updateSourceMedia = (colorPreference) => {
  const pictures = document.querySelectorAll('picture');

  pictures.forEach((picture) => {
    const sources = picture.querySelectorAll(`
      source[media*="prefers-color-scheme"],
      source[data-media*="prefers-color-scheme"]
    `);

    sources.forEach((source) => {
      if (source.media.includes('prefers-color-scheme')) {
        source.dataset.media = source.media;
      }

      if (source.dataset.media.includes(colorPreference)) {
        source.media = 'all';
      } else {
        source.media = 'none';
      }
    });
  });
}

// Preveri shranjeno temo v krajevni shrambi
let svetliNačin = localStorage.getItem('svetliNačin');

const svetliNačinToggle = document.querySelector('#stikaloNačina');

// Funkcija za omogočanje svetlega načina
const enablesvetliNačin = () => {
  document.body.classList.add('svetliNačin');
  localStorage.setItem('svetliNačin', 'enabled');
  document.firstElementChild.setAttribute('data-theme', 'light');
  updateSourceMedia('light');
}

// Funkcija za onemogočanje svetlega načina (temni način)
const disablesvetliNačin = () => {
  document.body.classList.remove('svetliNačin');
  localStorage.setItem('svetliNačin', null);
  document.firstElementChild.setAttribute('data-theme', 'dark');
  updateSourceMedia('dark');
}

// Inicializacija teme ob nalaganju strani
if (svetliNačin === 'enabled') {
  enablesvetliNačin();
} else {
  disablesvetliNačin();
}

// Ko uporabnik klikne na stikalo
svetliNačinToggle.addEventListener('click', () => {
  svetliNačin = localStorage.getItem('svetliNačin');

  if (svetliNačin !== 'enabled') {
    enablesvetliNačin();
  } else {
    disablesvetliNačin();
  }
});

//NAČIN ZA TISKANJE
    //pred tiskanjem spremeni v svetli način in odpre vse <details>
    window.addEventListener('beforeprint',() =>
    {
        //doda razred svetliNačin <body>
        document.body.classList.add('svetliNačin');
        //odpre vse <details> pred tiskanjem
        const allDetails = document.body.querySelectorAll('details');//izbere vse <details>
        for(let i=0; i<allDetails.length; i++)
        {
            if(allDetails[i].open)
            {
                allDetails[i].dataset.open = '1';
            }
            else
            {
                allDetails[i].setAttribute('open', '');
            }
        }
    });
    //po tiskanju vrne v prejšnje stanje
    window.addEventListener('afterprint',() =>
    {
        // preveri shranjene 'svetliNačin' v krajevni shrambi
        let svetliNačin = localStorage.getItem('svetliNačin');
        if (svetliNačin === 'enabled') {
          enablesvetliNačin();
        }
        else {
            disablesvetliNačin();
        }
        //po tiskanju zapre <details>, ki so bili pred tiskanjem zaprti
        const allDetails = document.body.querySelectorAll('details');
        for(let i=0; i<allDetails.length; i++)
        {
            if(allDetails[i].dataset.open)
            {
                allDetails[i].dataset.open = '';
            }
            else
            {
                allDetails[i].removeAttribute('open');
            }
        }
    });
