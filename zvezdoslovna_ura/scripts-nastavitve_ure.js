let IČas;
let TČas = true;
let IČPas;
let TČPas = true;
let IPolŠ = 0;
let IPolD = 0;
let TPol = true;
let lunaPrikaz;
let lunaZZemlje;
let zadnjaPolobla;
let polDneNočPrikaz;
let polPrikaz;
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
let proj;

const vnosČas = document.getElementById("vnosČas");
const vnosČPas = document.getElementById("vnosČPas");
const vnosPolŠ = document.getElementById("vnosPolŠ");
const vnosPolD = document.getElementById("vnosPolD");
const vnosLunaPrikaz = document.getElementById("vnosLunaPrikaz");
const vnosLunaZZemlje = document.getElementById("vnosLunaZZemlje");
const vnosZadnjaPolobla = document.getElementById("vnosZadnjaPolobla");
const vnosPolDneNočPrikaz = document.getElementById("vnosPolDneNočPrikaz");
const vnosPolPrikaz = document.getElementById("vnosPolPrikaz");
const vnosIntČas = document.getElementById("vnosIntČas");
const vnosIntPas = document.getElementById("vnosIntPas");
const vnosIntPol = document.getElementById("vnosIntPol");
const vnosDecStop = document.getElementById("vnosDecStop");
const vnosDecOdst = document.getElementById("vnosDecOdst");
const vnosProsSence = document.getElementById("vnosProsSence");
const vnosProj = document.getElementById("vnosProj");

// Ustvari seznam podprtih časovnih pasov
const ČPasPodprti = Intl.supportedValuesOf("timeZone"); // Pridobi vse podprte časovne pasove (timezones supported)
ČPasPodprti.forEach(čp => { // Dodaj možnost za vsak časovni pas
    const option = document.createElement('option');
    option.value = čp;
    option.textContent = čp;
    vnosČPas.appendChild(option);
});

/*const projekcije = [
    {value: "airy",        label: "airy"},
    {value: "aitoff",        label: "aitoff"},
    {value: "mercator",      label: "mercator"},
    {value: "mollweide",     label: "mollweide"},
    {value: "orthographic",  label: "ortographic"},
    {value: "stereographic", label: "stereographic"},
    {value: "equirectangular", label: "equirectangular"}
];*/
const projekcije = [
  { value: "airy", label: "Airy’s Minimum Error (hemi)" },
  { value: "aitoff", label: "Aitoff" },
  { value: "armadillo", label: "Armadillo" },
  { value: "august", label: "August" },
  { value: "azimuthalEqualArea", label: "Azimuthal Equal Area (hemi)" },
  { value: "azimuthalEquidistant", label: "Azimuthal Equidistant (hemi)" },
  { value: "baker", label: "Baker Dinomic" },
  { value: "berghaus", label: "Berghaus Star (hemi)" },
  { value: "boggs", label: "Boggs Eumorphic" },
  { value: "bonne", label: "Bonne" },
  { value: "bromley", label: "Bromley" },
  { value: "cassini", label: "Cassini (hemi)" },
  { value: "collignon", label: "Collignon" },
  { value: "craig", label: "Craig Retroazimuthal (hemi)" },
  { value: "craster", label: "Craster Parabolic" },
  { value: "cylindricalEqualArea", label: "Cylindrical Equal Area" },
  { value: "cylindricalStereographic", label: "Cylindrical Stereographic" },
  { value: "eckert1", label: "Eckert I" },
  { value: "eckert2", label: "Eckert II" },
  { value: "eckert3", label: "Eckert III" },
  { value: "eckert4", label: "Eckert IV" },
  { value: "eckert5", label: "Eckert V" },
  { value: "eckert6", label: "Eckert VI" },
  { value: "eisenlohr", label: "Eisenlohr" },
  { value: "equirectangular", label: "Equirectangular" },
  { value: "fahey", label: "Fahey" },
  { value: "mtFlatPolarParabolic", label: "Flat Polar Parabolic" },
  { value: "mtFlatPolarQuartic", label: "Flat Polar Quartic" },
  { value: "mtFlatPolarSinusoidal", label: "Flat Polar Sinusoidal" },
  { value: "foucaut", label: "Foucaut" },
  { value: "ginzburg4", label: "Ginzburg IV" },
  { value: "ginzburg5", label: "Ginzburg V" },
  { value: "ginzburg6", label: "Ginzburg VI" },
  { value: "ginzburg8", label: "Ginzburg VIII" },
  { value: "ginzburg9", label: "Ginzburg IX" },
  { value: "homolosine", label: "Goode Homolosine" },
  { value: "hammer", label: "Hammer" },
  { value: "hatano", label: "Hatano" },
  { value: "healpix", label: "HEALPix" },
  { value: "hill", label: "Hill Eucyclic" },
  { value: "kavrayskiy7", label: "Kavrayskiy VII" },
  { value: "lagrange", label: "Lagrange" },
  { value: "larrivee", label: "l'Arrivée" },
  { value: "laskowski", label: "Laskowski Tri-Optimal" },
  { value: "loximuthal", label: "Loximuthal" },
  { value: "mercator", label: "Mercator" },
  { value: "miller", label: "Miller" },
  { value: "mollweide", label: "Mollweide" },
  { value: "naturalEarth", label: "Natural Earth" },
  { value: "nellHammer", label: "Nell Hammer" },
  { value: "orthographic", label: "Orthographic (hemi)" },
  { value: "patterson", label: "Patterson Cylindrical" },
  { value: "polyconic", label: "Polyconic" },
  { value: "quincuncial", label: "Quincuncial" },
  { value: "rectangularPolyconic", label: "Rectangular Polyconic" },
  { value: "robinson", label: "Robinson" },
  { value: "sinusoidal", label: "Sinusoidal" },
  { value: "stereographic", label: "Stereographic (hemi)" },
  { value: "times", label: "Times" },
  { value: "twoPointEquidistant", label: "Two-Point Equidistant (hemi)" },
  { value: "vanDerGrinten", label: "van Der Grinten" },
  { value: "vanDerGrinten2", label: "van Der Grinten II" },
  { value: "vanDerGrinten3", label: "van Der Grinten III" },
  { value: "vanDerGrinten4", label: "van Der Grinten IV" },
  { value: "wagner4", label: "Wagner IV" },
  { value: "wagner6", label: "Wagner VI" },
  { value: "wagner7", label: "Wagner VII" },
  { value: "wiechel", label: "Wiechel (hemi)" },
  { value: "winkel3", label: "Winkel Tripel" }
];

projekcije.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.value;
    opt.textContent = p.label;
    vnosProj.appendChild(opt);
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
        lunaPrikaz: Boolean(vnosLunaPrikaz.checked),
        lunaZZemlje: Boolean(vnosLunaZZemlje.checked),
        zadnjaPolobla: Boolean(vnosZadnjaPolobla.checked),
        polDneNočPrikaz: Boolean(vnosPolDneNočPrikaz.checked),
        polPrikaz: Boolean(vnosPolPrikaz.checked),
        intČas: Number(vnosIntČas.value) * 1000,
        intPas: Number(vnosIntPas.value) * 1000,
        intPol: Number(vnosIntPol.value) * 1000,
        decStop: Number(vnosDecStop.value),
        decOdst: Number(vnosDecOdst.value),
        prosSence: Number(vnosProsSence.value) / 100,
        proj: vnosProj.value,
    };
    console.log("Poslane bodo nastavitve:", nastavitve);

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

// Izbira Celestial.reproject({projection:<see above>})vrednosti
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

vnosLunaPrikaz.addEventListener('input', () => {
    lunaPrikaz = vnosLunaPrikaz.checked;
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
vnosPolDneNočPrikaz.addEventListener('input', () => {
    polDneNočPrikaz = vnosPolDneNočPrikaz.checked;
    poslji();
});
vnosPolPrikaz.addEventListener('input', () => {
    polPrikaz = vnosPolPrikaz.checked;
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

vnosProj.addEventListener('input', () => {
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
        lunaPrikaz = vnosLunaPrikaz.checked = Boolean(nastavitve.lunaPrikaz);
        lunaZZemlje = vnosLunaZZemlje.checked = Boolean(nastavitve.lunaZZemlje);
        zadnjaPolobla = vnosZadnjaPolobla.checked = Boolean(nastavitve.zadnjaPolobla);
        polDneNočPrikaz = vnosPolDneNočPrikaz.checked = Boolean(nastavitve.polDneNočPrikaz);
        polPrikaz = vnosPolPrikaz.checked = Boolean(nastavitve.polPrikaz);
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
        proj = vnosProj.value = nastavitve.proj;
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
