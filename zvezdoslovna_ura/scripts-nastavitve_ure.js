let IČas;
let TČas = true;
let IČPas;
let TČPas = true;
let IPolŠ = 0;
let IPolD = 0;
let TPol = true;
let lunaZZemlje = false;
let zadnjaPolobla;
let intČas;
    let pIntČas;
let intPas;
    let pIntPas;
let intPol;
    let pIntPol;
let decStop;
    let pDecStop;
let decOdst;
    let pDecOdst;
let prosSence;
    let pProsSence;
let polUre;

const vnosČas = document.getElementById("vnosČas");
const vnosČPas = document.getElementById("vnosČPas");
const vnosPolŠ = document.getElementById("vnosPolŠ");
const vnosPolD = document.getElementById("vnosPolD");
const vnosLunaZZemlje = document.getElementById("vnosLunaZZemlje");
const vnosZadnjaPolobla = document.getElementById("vnosZadnjaPolobla");
const vnosIntČas = document.getElementById("vnosIntČas");
const vnosIntPas = document.getElementById("vnosIntPas");
const vnosIntPol = document.getElementById("vnosIntPol");
const vnosDecStop = document.getElementById("vnosDecStop");
const vnosDecOdst = document.getElementById("vnosDecOdst");
const vnosProsSence = document.getElementById("vnosProsSence");

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
        IPolŠ: Number(vnosPolŠ.value),
        IPolD: Number(vnosPolD.value),
        TPol,
        lunaZZemlje: Boolean(vnosLunaZZemlje.checked),
        zadnjaPolobla: Boolean(vnosZadnjaPolobla.checked),
        intČas: Number(vnosIntČas.value) * 1000,
        intPas: Number(vnosIntPas.value) * 1000,
        intPol: Number(vnosIntPol.value) * 1000,
        decStop: Number(vnosDecStop.value),
        decOdst: Number(vnosDecOdst.value),
        prosSence: Number(vnosProsSence.value) / 100,
        polUre,
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
    vnosIntČas.value = pIntČas;
    intČas = pIntČas;
    poslji();
}
function uporabiPrivIntPas() {
    vnosIntPas.value = pIntPas;
    intPas = pIntPas;
    poslji();
}
function uporabiPrivIntPol() {
    vnosIntPol.value = pIntPol;
    intPol = pIntPol;
    poslji();
}
function uporabiPrivDecStop() {
    vnosDecStop.value = pDecStop;
    decStop = pDecStop;
    poslji();
}
function uporabiPrivDecOdst() {
    vnosDecOdst.value = pDecOdst;
    decOdst = pDecOdst;
    poslji();
}
function uporabiPrivProsSence() {
    vnosProsSence.value = pProsSence * 100;
    prosSence = pProsSence;
    poslji();
}

// Naložitev strani - prikaži privzete vrednosti //////////////////////////////////////////////////////////////////////////////////////////////

posodobiČas();
posodobiČPas();
posodobiPol();

/*lunaZZemlje.checked = false;
zadnjaPolobla.checked = true;

vnosIntČas.value = 30;
vnosIntPas.value = 600;
vnosIntPol.value = 300;

vnosIntPol.value = 2;
vnosIntPol.value = 300;

vnosDecStop.value = 2;
vnosDecOdst.value = 2;
vnosProsSence.value = 80;*/

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

vnosLunaZZemlje.addEventListener('input', () => {
    lunaZZemlje = vnosLunaZZemlje.checked;
    poslji();
});
vnosZadnjaPolobla.addEventListener('input', () => {
    zadnjaPolobla = vnosZadnjaPolobla.checked;
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
vnosProsSence.addEventListener('input', () => {
  poslji();
});

// Vmesni čas //////////////////////////////////////////////////////////////////////////////////////////////

// Posodablja trenutne vrednosti na 30 sekund
setInterval(() => {
    if (TČas) { posodobiČas(); };
    if (TČPas) { posodobiČPas(); };
    if (TPol) { posodobiPol(); };
}, 30000);

window.addEventListener("load", function () {
    if (window.opener) {
        window.opener.postMessage("ready-nastavitve", "*");
    }
});

// Posluša prejete nastavitve
window.addEventListener("message", function (event) {
    if (event.data && event.data.nastavitve) {
        const nastavitve = event.data.nastavitve;
        console.log("Prejete nastavitve:", nastavitve);
    
        IČas = new Date(nastavitve.IČas);
        vnosČas.value = `${IČas.getFullYear().toString().padStart(4, '0')}-` +
                    `${(IČas.getMonth()+1).toString().padStart(2, '0')}-` +
                    `${IČas.getDate().toString().padStart(2, '0')}T` +
                    `${IČas.getHours().toString().padStart(2, '0')}:` +
                    `${IČas.getMinutes().toString().padStart(2, '0')}`;

        TČas = nastavitve.TČas;
        IČPas = vnosČPas.value = nastavitve.IČPas;
        TČPas = nastavitve.TČPas;
        IPolD = vnosPolD.value = nastavitve.IPolD;
        IPolŠ = vnosPolŠ.value = nastavitve.IPolŠ;
        TPol = nastavitve.TPol;
        lunaZZemlje = vnosLunaZZemlje.checked = Boolean(nastavitve.lunaZZemlje);
        zadnjaPolobla = vnosZadnjaPolobla.checked = Boolean(nastavitve.zadnjaPolobla);
        intČas = nastavitve.intČas;
            vnosIntČas.value = pIntČas = nastavitve.intČas / 1000;
        intPas = nastavitve.intPas;
            vnosIntPas.value = pIntPas = nastavitve.intPas / 1000;
        intPol = nastavitve.intPol;
            vnosIntPol.value = pIntPol = nastavitve.intPol / 1000;
        decStop = vnosDecStop.value = pDecStop = nastavitve.decStop;
        decOdst = vnosDecOdst.value = pDecOdst = nastavitve.decOdst;
        prosSence = pProsSence = nastavitve.prosSence;
            vnosProsSence.value = nastavitve.prosSence * 100;
        polUre = nastavitve.polUre;
    }
});
/*window.addEventListener("message", (event) => {
    const nastavitve = event.data.nastavitve;
    console.log("Prejete Nastavitve:", nastavitve);
    
    IČas = nastavitve.IČas;
    TČas = nastavitve.TČas;
    IČPas = nastavitve.IČPas;
    TČPas = nastavitve.TČPas;
    IPolD = nastavitve.IPolD;
    IPolŠ = nastavitve.IPolŠ;
    TPol = nastavitve.TPol;
    lunaZZemlje = nastavitve.lunaZZemlje;
    zadnjaPolobla = nastavitve.zadnjaPolobla;
    intČas = nastavitve.intČas;
    intPas = nastavitve.intPas;
    intPol = nastavitve.intPol;
    decStop = nastavitve.decStop;
    decOdst = nastavitve.decOdst;
    prosSence = nastavitve.prosSence;
    polUre = nastavitve.polUre;
});*/
