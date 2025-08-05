
// Privzeto //////////////////////////////////////////////////////////////////////////////////////////////

let TČas = true;
let TČPas = true;
let TPol = true;
let TPolŠ = 0;
let TPolD = 0;
let decStop = 2;
let decOdst = 2;

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
        intČas: vnosIntČas.value * 1000,
        intPas: vnosIntPas.value * 1000,
        intPol: vnosIntPol.value * 1000,
        decStop: vnosDecStop.value,
        decOdst: vnosDecOdst.value,
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
    vnosIntČas.value = 30;
    intČas = 30000;
    poslji();
}
function uporabiPrivIntPas() {
    vnosIntPas.value = 600;
    intPas = 600000;
    poslji();
}
function uporabiPrivIntPol() {
    vnosIntPol.value = 300;
    intPol = 300000;
    poslji();
}
function uporabiPrivDecStop() {
    vnosDecStop.value = 2;
    decStop = 2;
    poslji();
}
function uporabiPrivDecOdst() {
    vnosDecOdst.value = 2;
    decOdst = 2;
    poslji();
}

// Naložitev strani - prikaži privzete vrednosti //////////////////////////////////////////////////////////////////////////////////////////////

posodobiČas();
posodobiČPas();
posodobiPol();

lunaZZemlje.checked = false;
zadnjaPolobla.checked = true;

vnosIntČas.value = 30;
vnosIntPas.value = 600;
vnosIntPol.value = 300;

vnosIntPol.value = 2;
vnosIntPol.value = 300;

vnosDecStop.value = 2;
vnosDecOdst.value = 2;

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
vnosIntČas.addEventListener('input', () => {
  poslji();
});
vnosIntPas.addEventListener('input', () => {
  poslji();
});
vnosIntPol.addEventListener('input', () => {
  poslji();
});

vnosDecStop.addEventListener('input', () => {
  poslji();
});
vnosDecOdst.addEventListener('input', () => {
  poslji();
});

// Vmesni čas //////////////////////////////////////////////////////////////////////////////////////////////

// Posodablja trenutne vrednosti na 30 sekund
setInterval(() => {
    if (TČas) { posodobiČas(); };
    if (TČPas) { posodobiČPas(); };
    if (TPol) { posodobiPol(); };
}, 30000);
