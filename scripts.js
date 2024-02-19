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

//ODPRE DREVESNI PRIKAZ
    //function odpriDrevo() {document.getElementById("drevesni").addAttribute("open");}
    function odpriDrevo() {
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
    }

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

//SVETLI NAČIN
    // preveri shranjene 'svetliNačin' v krajevni shrambi
    let svetliNačin = localStorage.getItem('svetliNačin');

    const svetliNačinToggle = document.querySelector('#stikaloNačina');

    const enablesvetliNačin = () => {
      // 1. Add the class to the body
      document.body.classList.add('svetliNačin');
      // 2. Update svetliNačin in localStorage
      localStorage.setItem('svetliNačin', 'enabled');
    }

    const disablesvetliNačin = () => {
      // 1. Remove the class from the body
      document.body.classList.remove('svetliNačin');
      // 2. Update svetliNačin in localStorage
      localStorage.setItem('svetliNačin', null);
    }

    // If the user already visited and enabled svetliNačin
    // start things off with it on
    if (svetliNačin === 'enabled') {
      enablesvetliNačin();
    }

    // When someone clicks the button
    svetliNačinToggle.addEventListener('click', () => {
      // get their svetliNačin setting
      svetliNačin = localStorage.getItem('svetliNačin');

      // if it not current enabled, enable it
      if (svetliNačin !== 'enabled') {
        enablesvetliNačin();
      // if it has been enabled, turn it off
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
