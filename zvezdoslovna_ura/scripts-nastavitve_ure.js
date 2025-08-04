
// Privzeto //////////////////////////////////////////////////////////////////////////////////////////////

let TČas = true;
let TČPas = true;
let TPol = true;
let TPolŠ = 0;
let TPolD = 0;

// Ustvari seznam podprtih časovnih pasov
const ČPasPodprti = Intl.supportedValuesOf("timeZone"); // Pridobi vse podprte časovne pasove (timezones supported)
ČPasPodprti.forEach(čp => { // Dodaj možnost za vsak časovni pas
    const option = document.createElement('option');
    option.value = čp;
    option.textContent = čp;
    vnosČPas.appendChild(option);
});

// Funkcije //////////////////////////////////////////////////////////////////////////////////////////////

// Pošlji nastavitve glavnemu oknu
function poslji() {
    const nastavitve = {
        IČas: vnosČas.value,
        TČas,
        IČPas: vnosČPas.value,
        TČPas,
        IPolŠ: vnosPolŠ.value,
        IPolD: vnosPolD.value,
        TPol,
    };

    window.opener?.sprejmiNastavitve?.(nastavitve);
}

// Pridobi trenutne vrednosti in jih nastavi
function posodobiČas() {
  const zdaj = new Date().toISOString().slice(0, 16);
  vnosČas.value = zdaj;
}
function posodobiČPas() {
  const TČPasIme = Intl.DateTimeFormat().resolvedOptions().timeZone;
  vnosČPas.value = TČPasIme;
    console.log("tr. časovni pas:" + TČPasIme);
}
function posodobiPol() {
    // Preverite, ali je brskalnik omogočil geolokacijo:
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            TPolŠ = position.coords.latitude;
            TPolD = position.coords.longitude;
            const točnost = position.coords.accuracy;
                console.log("tr. zem. širina:" + TPolŠ);
                console.log("tr. zem. dolžina:" + TPolD);
                console.log("točnost: " + točnost + " m");
        }, function(error) {
            console.error("Napaka pri pridobivanju trenutnega zemljepisnega položaja:", error);
        });
    } else {
        alert("Pridobivanje trenutnega zemljepisnega položaja ni podprto v tem brskalniku.");
    };

    vnosPolŠ.value = TPolŠ;
    vnosPolD.value = TPolD;

    console.log("Položaj se je posodobil.");
}

// Gumbi za izbiro trenutnih vrednosti
function uporabiTČas() {
  posodobiČas();
  TČas=true;
  poslji();
}
function uporabiTČPas() {
  posodobiČPas();
  TČPas=true;
  poslji();
}
function uporabiTPol() {
  posodobiPol();
  TPol=true;
  console.log("Poslal bom trenutni položaj.");
  poslji();
}

// Drugo
function uporabiLjubljana() {
    vnosČPas.value = "Europe/Ljubljana";
    TČPas=false;
    poslji();
}
function uporabiGEOSS() {
    vnosPolŠ.value = 46.11994444;
    vnosPolD.value = 14.81533333;
    TPol=false;
    poslji();
}

// Naložitev strani //////////////////////////////////////////////////////////////////////////////////////////////

posodobiČas();
posodobiČPas();
posodobiPol();

// Dejanja //////////////////////////////////////////////////////////////////////////////////////////////

// Izbira vrednosti
vnosČas.addEventListener('input', () => {
  TČas = false;
  poslji();
});
vnosČPas.addEventListener('input', () => {
  TČPas = false;
  poslji();
});
vnosPolŠ.addEventListener('input', () => {
  TPol = false;
  poslji();
});
vnosPolD.addEventListener('input', () => {
  TPol = false;
  poslji();
});

// Vmesni čas //////////////////////////////////////////////////////////////////////////////////////////////

// Posodablja trenutne vrednosti na 30 sekund
setInterval(() => {
  if (TČas === true) {
    posodobiČas();
  }
  if (TČPas === true) {
      posodobiČPas();
  }
  if (TPol === true) {
      posodobiPol();
  }
}, 30000);


