
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
        IČas: new Date(vnosČas.value),
        TČas,
        IČPas: vnosČPas.value,
        TČPas,
        IPolŠ: vnosPolŠ.value,
        IPolD: vnosPolD.value,
        TPol,
        lunaZZemlje,
        zadnjaPolobla,
        intČas,
        intPas,
        intPol,
    };

    window.opener?.sprejmiNastavitve?.(nastavitve);
}

// Pridobi trenutne vrednosti in jih nastavi
function posodobiČas() {
    const zdaj = new Date();
    vnosČas.value = `${zdaj.getFullYear().toString().padStart(4, '0')}-` +
                    `${(zdaj.getMonth()+1).toString().padStart(2, '0')}-` +
                    `${zdaj.getDate().toString().padStart(2, '0')}T` +
                    `${zdaj.getHours().toString().padStart(2, '0')}:` +
                    `${zdaj.getMinutes().toString().padStart(2, '0')}`;
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

            vnosPolŠ.value = TPolŠ;
            vnosPolD.value = TPolD;

            const točnost = position.coords.accuracy;

            console.log("Položaj se je posodobil.");
            console.log("tr. zem. širina:" + TPolŠ);
            console.log("tr. zem. dolžina:" + TPolD);
            console.log("točnost: " + točnost + " m");

        }, function(error) {
            console.error("Napaka pri pridobivanju trenutnega zemljepisnega položaja:", error);
        });
    } else {
        alert("Pridobivanje trenutnega zemljepisnega položaja ni podprto v tem brskalniku.");
    };
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

function uporabiPrivIntČas() {
    intČas.value = 30;
    intČas = 30000;
    poslji();
}
function uporabiPrivIntPas() {
    intPas.value = 600;
    intPas = 600000;
    poslji();
}
function uporabiPrivIntPol() {
    intPol.value = 300;
    intPol = 300000;
    poslji();
}

// Naložitev strani - prikaži privzete vrednosti //////////////////////////////////////////////////////////////////////////////////////////////

posodobiČas();
posodobiČPas();
posodobiPol();

lunaZZemlje.checked = false;
zadnjaPolobla.checked = true;

intČas.value = 30;
intPas.value = 600;
intPol.value = 300;


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

lunaZZemlje.addEventListener('input', () => {
    if (lunaZZemlje.checked) {
        lunaZZemlje = true;
    } else {
        lunaZZemlje = false;
    }
    poslji();
});
zadnjaPolobla.addEventListener('input', () => {
    if (zadnjaPolobla.checked) {
        zadnjaPolobla = true;
    } else {
        zadnjaPolobla = false;
    }
    poslji();
});

// Vmesni čas //////////////////////////////////////////////////////////////////////////////////////////////

// Posodablja trenutne vrednosti na 30 sekund
setInterval(() => {
    if (TČas) { posodobiČas(); };
    if (TČPas) { posodobiČPas(); };
    if (TPol) { posodobiPol(); };
}, 30000);
