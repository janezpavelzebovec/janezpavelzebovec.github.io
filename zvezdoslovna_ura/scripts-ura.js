IČas = new Date();
TČas = true;
IČPas = "Europe/Ljubljana"
TČPas = true;
IPolD = 0;
IPolŠ = 0;
TPol = true;

let oknoPisno = null;
let oknoNastavitve = null;

//////////////////////////////////////////////////////////////////////////////////////////////////

function nariši() {
    if (IČas) {
        document.getElementById("prikaz-casa").textContent = IČas;
        // posodobi uro glede na cas
    }
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
    var soVzhZ = new Date(časiSon.sunrise);
    var soVzhK = new Date(časiSon.sunriseEnd);
    var zlataK = new Date(časiSon.goldenHourEnd);
    var poldne = new Date(časiSon.solarNoon);
    var zlataZ = new Date(časiSon.goldenHour);
    var soZahZ = new Date(časiSon.sunsetStart);
    var soZahK = new Date(časiSon.sunset);
    var mrakK = new Date(časiSon.dusk);
    var poMrakK = new Date(časiSon.nauticalDusk);
    var nočZ = new Date(časiSon.night);
    var polnoč= new Date(časiSon.nadir);
    var nočK = new Date(časiSon.nightEnd);
    var poZoraZ = new Date(časiSon.nauticalDawn);
    var zoraZ = new Date(časiSon.dawn);

    const polSon = SunCalc.getPosition(new Date(IČas), IPolŠ, IPolD);
    console.log("položaj Sonca:", polSon);
    var soViš = polSon.altitude;
    var soAzi = polSon.azimuth;

    const časiLun = SunCalc.getMoonTimes(new Date(IČas), IPolŠ, IPolD);
    console.log("časi Lune:", časiLun);
    var luVzh = new Date(časiLun.rise);
    var luZah = new Date(časiLun.set);
    var luGor = časiLun.alwaysUp;
    var luDol = časiLun.alwaysDown;

    const polLun = SunCalc.getMoonPosition(new Date(IČas), IPolŠ, IPolD);
    console.log("položaj Lune:", polLun);
    var luViš = polLun.altitude;
    var luAzi = polLun.azimuth;
    var luOdd= polLun.distance;
    var luPar = polLun.parallacticAngle;

    const osvLun = SunCalc.getMoonIllumination(new Date(IČas), IPolŠ, IPolD);
    console.log("osvetljenost Lune:", osvLun);
    var luOsv = osvLun.fraction;
    var luMena = osvLun.phase;
    var luKot = osvLun.angle;

    const podatki = {
        IČas, IPolŠ, IPolD, IČPas,
        soVzhZ, soVzhK, zlataK, poldne, zlataZ, soZahZ, soZahK, mrakK, poMrakK, nočZ, polnoč, nočK, poZoraZ, zoraZ,
        soViš, soAzi,
        luVzh, luZah, luGor, luDol,
        luViš, luAzi, luOdd, luPar,
        luOsv, luMena, luKot
    };

    nariši();
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
}

function sprejmiNastavitve(nastavitve) {
    console.log("Prejete nastavitve:", nastavitve);
    izračunPodatkov(nastavitve.IČas, nastavitve.IPolŠ, nastavitve.IPolD, nastavitve.IČPas);
}

izračunPodatkov(IČas, IPolŠ, IPolD, IČPas);
nariši();
