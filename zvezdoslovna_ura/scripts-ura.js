let IČas = new Date();
let TČas = true;
let IČPas = "Europe/Ljubljana"
let TČPas = true;
let IPolD = 0;
let IPolŠ = 0;
let TPol = true;
 
let soVzhZ = null;
let soVzhK = null;
let zlataK = null;
let poldne = null;
let zlataZ = null;
let soZahZ = null;
let soZahK = null;
let mrakK = null;
let poMrakK = null;
let nočZ = null;
let polnoč = null;
let nočK = null;
let poZoraZ = null;
let zoraZ = null;
let soViš = null;
let soAzi = null;
let luVzh = null;
let luZah = null;
let luGor = null;
let luDol = null;
let luViš = null;
let luAzi = null;
let luOdd = null;
let luPar = null;
let luOsv = null;
let luMena = null;
let luKot = null;

let podatki = null;

let oknoPisno = null;
let oknoNastavitve = null;

let intČas = 30000; // 30 sek;
let intPas = 600000; // 10 min;
let intPol = 300000; // 5 min;

let intervalČas = null;
let intervalČPas = null;
let intervalPol = null;

let decStop = 2;
let decOdst = 2;

//////////////////////////////////////////////////////////////////////////////////////////////////

function nariši(IČas) {
    document.getElementById("prikaz-casa").innerHTML = new Date(IČas);
}

// Pošlji podatke oknu Pisno
function pošlji(podatki) {
    if (oknoPisno && !oknoPisno.closed) {
        oknoPisno.postMessage({ podatki }, "*");
    }
}

// Uporabi SunCalc za izračun podatkov
function izračunPodatkov(IČas, IPolŠ, IPolD, IČPas) {
    const časiSon = SunCalc.getTimes(new Date(IČas), IPolŠ, IPolD);
    console.log("časi Sonca:", časiSon);
    soVzhZ = new Date(časiSon.sunrise);
    soVzhK = new Date(časiSon.sunriseEnd);
    zlataK = new Date(časiSon.goldenHourEnd);
    poldne = new Date(časiSon.solarNoon);
    zlataZ = new Date(časiSon.goldenHour);
    soZahZ = new Date(časiSon.sunsetStart);
    soZahK = new Date(časiSon.sunset);
    mrakK = new Date(časiSon.dusk);
    poMrakK = new Date(časiSon.nauticalDusk);
    nočZ = new Date(časiSon.night);
    polnoč= new Date(časiSon.nadir);
    nočK = new Date(časiSon.nightEnd);
    poZoraZ = new Date(časiSon.nauticalDawn);
    zoraZ = new Date(časiSon.dawn);

    const polSon = SunCalc.getPosition(new Date(IČas), IPolŠ, IPolD);
    console.log("položaj Sonca:", polSon);
    soViš = polSon.altitude;
    soAzi = polSon.azimuth;

    const časiLun = SunCalc.getMoonTimes(new Date(IČas), IPolŠ, IPolD);
    console.log("časi Lune:", časiLun);
    luVzh = new Date(časiLun.rise);
    luZah = new Date(časiLun.set);
    luGor = časiLun.alwaysUp;
    luDol = časiLun.alwaysDown;

    const polLun = SunCalc.getMoonPosition(new Date(IČas), IPolŠ, IPolD);
    console.log("položaj Lune:", polLun);
    luViš = polLun.altitude;
    luAzi = polLun.azimuth;
    luOdd= polLun.distance;
    luPar = polLun.parallacticAngle;

    const osvLun = SunCalc.getMoonIllumination(new Date(IČas), IPolŠ, IPolD);
    console.log("osvetljenost Lune:", osvLun);
    luOsv = osvLun.fraction;
    luMena = osvLun.phase;
    luKot = osvLun.angle;

    nariši(IČas);

    podatki = {
        IČas, IPolŠ, IPolD, IČPas,
        soVzhZ, soVzhK, zlataK, poldne, zlataZ, soZahZ, soZahK, mrakK, poMrakK, nočZ, polnoč, nočK, poZoraZ, zoraZ,
        soViš, soAzi,
        luVzh, luZah, luGor, luDol,
        luViš, luAzi, luOdd, luPar,
        luOsv, luMena, luKot,
        decStop, decOdst,
    };
    console.log("Poslani bodo podatki:", podatki);
    pošlji(podatki);
};

function odpriNastavitve() {
    const sirina90 = Math.floor(window.innerWidth * 0.9);
    const visina90 = Math.floor(window.innerHeight * 0.9);
    oknoNastavitve = window.open(
        '/zvezdoslovna_ura/nastavitve_ure.html',
        'oknoNastavitve', // ime okna
        `width=${sirina90},height=${visina90}`
    );
}
function odpriPisno() {
    const sirina90 = Math.floor(window.innerWidth * 0.9);
    const visina90 = Math.floor(window.innerHeight * 0.9);
    oknoPisno = window.open(
        '/zvezdoslovna_ura/pisno.html',
        'oknoPisno', // ime okna
        `width=${sirina90},height=${visina90}`
    );

    oknoPisno.addEventListener("load", () => { // Počakaj, da se okno naloži, nato pošlji podatke
        izračunPodatkov(IČas, IPolŠ, IPolD, IČPas);
    });
}

function sprejmiNastavitve(nastavitve) {
    console.log("Prejete nastavitve:", nastavitve);
    nastaviIntervale(nastavitve.TČas, nastavitve.TČPas, nastavitve.TPol, nastavitve.intČas, nastavitve.intPas, nastavitve.intPol);
    decStop = nastavitve.decStop;
    decOdst = nastavitve.decOdst;
    izračunPodatkov(nastavitve.IČas, nastavitve.IPolŠ, nastavitve.IPolD, nastavitve.IČPas);
}

// Pridobi trenutne vrednosti in jih nastavi
function posodobiČas() {
    IČas = new Date();
    izračunPodatkov(IČas, IPolŠ, IPolD, IČPas);
};
function posodobiČPas() {
    const IČPasIme = Intl.DateTimeFormat().resolvedOptions().timeZone;
    izračunPodatkov(IČas, IPolŠ, IPolD, IČPas);
};
function posodobiPol() {
    // Preverite, ali je brskalnik omogočil geolokacijo:
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            IPolŠ = position.coords.latitude;
            IPolD = position.coords.longitude;
            const točnost = position.coords.accuracy
            ;
            console.log("tr. zem. širina:" + IPolŠ);
            console.log("tr. zem. dolžina:" + IPolD);
            console.log("točnost: " + točnost + " m");
            
            izračunPodatkov(IČas, IPolŠ, IPolD, IČPas);

        }, function(error) {
            console.error("Napaka pri pridobivanju trenutnega zemljepisnega položaja:", error);
        });
    } else {
        alert("Pridobivanje trenutnega zemljepisnega položaja ni podprto v tem brskalniku.");
    };
};

function nastaviIntervale(TČas, TČPas, TPol, novIntČas, novIntPas, novIntPol) {
    // Čas
    if (TČas) {
        if (!intervalČas || novIntČas !== intČas) {
            if (intervalČas) clearInterval(intervalČas);
            intČas = novIntČas;
            console.log("Interval za čas nastavljen na:", intČas);
            posodobiČas();
            intervalČas = setInterval(posodobiČas, intČas);
        }
    } else if (intervalČas) {
        clearInterval(intervalČas);
        intervalČas = null;
    }

    // Časovni pas
    if (TČPas) {
        if (!intervalČPas || novIntPas !== intPas) {
            if (intervalČPas) clearInterval(intervalČPas);
            intPas = novIntPas;
            posodobiČPas();
            intervalČPas = setInterval(posodobiČPas, intPas);
        }
    } else if (intervalČPas) {
        clearInterval(intervalČPas);
        intervalČPas = null;
    }

    // Položaj
    if (TPol) {
        if (!intervalPol || novIntPol !== intPol) {
            if (intervalPol) clearInterval(intervalPol);
            intPol = novIntPol;
            posodobiPol();
            intervalPol = setInterval(posodobiPol, intPol);
        }
    } else if (intervalPol) {
        clearInterval(intervalPol);
        intervalPol = null;
    }
};

izračunPodatkov(IČas, IPolŠ, IPolD, IČPas);
nastaviIntervale(TČas, TČPas, TPol, intČas, intPas, intPol);
