const GSSš = 46.11994444; //Geometrično Središče Slovenije - zemljepisna širina/višina
const GSSd = 14.81533333; //Geometrično Središče Slovenije - zemljepisna dolžina

const x = document.getElementById("demo");
function requestLocationPermission() {
    if (navigator.geolocation && navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state === 'granted' || result.state === 'prompt') {
                    navigator.geolocation.watchPosition(showPosition);
                } else {
                    x.innerHTML = "Dovolite nam dostop do vašega zemljepisnega položaja, da ga lahko prikažemo.";
                }
            });
    } else {
        x.innerHTML = "Ta brskalnik ne podpira pridobivanja zemljepisnega položaja.";
    }
}
function showPosition(position) {
    x.innerHTML = "tvoj položaj: " + position.coords.latitude + " ° g. š., " + position.coords.longitude + " ° g. d.";
}

setInterval(nastaviUro, 1000)/* s setInterval vsako sekundo (1000 milisekund) kličemo funkcijo nastaviUro*/

const urniKazalec = document.querySelector('[data-urni-kazalec]') /*izbere vrstico, ki ima atribut data-urni-kazalec*/
const minutniKazalec = document.querySelector('[data-minutni-kazalec]') /*izbere vrstico, ki ima atribut data-minutni-kazalec*/
const sekundniKazalec = document.querySelector('[data-sekundni-kazalec]') /*izbere vrstico, ki ima atribut data-sekundni-kazalec*/
const dnevnaUra = document.querySelector('[data-dnevnaUra]')
const lunazasuk = document.querySelector('[data-lunazasuk]')
const lunamenaodmik = document.querySelector('[data-lunamenaodmik]')
const lunamenapremer = document.querySelector('[data-lunamenapremer]')
const menabarva = document.querySelector('[data-menabarva]')
const lunabarva = document.querySelector('[data-lunabarva]')
const dnevilune = document.querySelector('[data-lunadnevi]')
const letnaStevilcnica = document.querySelector('[data-letnaStevilcnica]')
const kazalka = document.querySelector('[data-kazalka]')

const resultElementCZZ = document.getElementById("resultCZZ") /*ura, dan in datum z upoštevanjem poletnega zamika ure*/
const resultElementCBZ = document.getElementById("resultCBZ") /*ura, dan in datum brez upoštevanja poletnega zamika ure*/
const resultElementPP = document.getElementById("resultPP") /*čas prvega premika ure*/
const resultElementDP = document.getElementById("resultDP") /*čas drugega premika ure*/

const zvezdeleto = document.querySelector('[data-zvezdeleto]')
const zvezdedan = document.querySelector('[data-zvezdedan]')

const napravi = document.querySelectorAll('[data-napravi]')


Date.prototype.getDayOfYear = function() {
    const startOfYear = new Date(this.getFullYear(), 0, 0);
    const diff = this - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24; //1 dan v milisekundah
    return Math.floor(diff / oneDay);
};

function ugotoviprestopnost(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

    /*PRIDOBIVANJE ASTRONOMSKIH POSATKOV s AstronomyAPI (https://astronomyapi.com/; https://docs.astronomyapi.com/)*/
    const apiUrl = "https://api.astronomyapi.com/api/v2/bodies/positions";
    const params = {
      longitude: 46.11994444,
      latitude: 14.81533333,
      elevation: 1,
      from_date: "2023-12-26",
      to_date: "2023-12-26",
      time: "21:19:47",
    };

    const queryString = new URLSearchParams(params).toString();

    fetch(`${apiUrl}?${queryString}`, {
      method: "GET",
      headers: {
        "Authorization": "Basic NzI4M2RiNWMtNGZlZS00YzQ1LWI3MWUtNGMyNDg3MDAxZjAwOjI5Y2UyYmIzZDQ3MGVlMjRhMTU1OWM2OWYwNjE4Y2E3OWUwNzRlMTFlYWIzYzA0NWQyZjFhYjI2NTA4MjA2MjQ2MzdlOWFhYzg0ZTkwOTQ1YTU4YjIyNzYzYWRmODQ1ZTI1ZDlkNjI2M2FkZmNmYTg1YTI0MWYzNDJhNDExZWFjNWIxMjViMTJmYzBlY2VmMDg2MzJmMjRkYjMzNzY3Zjg4MGRlNTFmOWRlMDZkOWFjNGQ2NDVjYWRiYzQ3OWRmMGJjZTQwMGYxZDVlZTQzZTMwODY0YjZkYWEyY2M0Y2E0",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Tukaj obdelate pridobljene podatke

        /*const moonPhaseAngle = data.data.table.rows[1].cells[0].extraInfo.phase.angel;
            const kotnizasuk = moonPhaseAngle/360
            document.getElementById("resultKotLune").innerHTML = moonPhaseAngle;
        const moonPhaseFraction = data.data.table.rows[1].cells[0].extraInfo.phase.fraction;
            document.getElementById("resultOsvLune").innerHTML = moonPhaseFraction;

        console.log(`kot lunine mene: ${moonPhaseAngle}`);
        console.log(`delež lunine mene: ${moonPhaseFraction}`);*/
      })
      .catch(error => {
        console.error('Napaka pri pridobivanju podatkov:', error);
      });

    var data
    var časi
    var polSonca
    var polLune
    var VzhZahLune
    var OsvLune
function nastaviUro() /*funkcija seurica, ki se kliče zgoraj ima tu svoje korake:*/ {

    const msČas = Date.now(); //število milisekund od 1. januarja 1970
    const zamikpasu = new Date().getTimezoneOffset(); //zamik časovnega pasu od UTC v minutah
    const trenutniUTC = msČas - zamikpasu * 1000 * 60; //trenutni stanradni (UTC) čas
    const trSLOčas = new Date()
        trSLOčas.setHours(new Date().getHours() + 1) //trenutni čas v Sloveniji brez poletnega premika ure
    const trSLOčasP = new Date()// trenutni čas v Sloveniji z vključenim poletnim premikom ure


    /*PRIDOBIVANJE ASTRONOMSKIH PODATKOV z SunCalc (https://github.com/mourner/suncalc/tree/master) resultPoSonVzh*/
    časi = SunCalc.getTimes(trSLOčas, GSSš, GSSd);
        var Zora = časi.dawn
            Zora = new Date(Zora)
            document.getElementById("resultZora").innerHTML = `${Zora.getHours().toString().padStart(2, '0')}:${Zora.getMinutes().toString().padStart(2, '0')}:${Zora.getSeconds().toString().padStart(2, '0')}`;
        var Mrak = časi.dusk
            Mrak = new Date(Mrak)
            document.getElementById("resultMrak").innerHTML = `${Mrak.getHours().toString().padStart(2, '0')}:${Mrak.getMinutes().toString().padStart(2, '0')}:${Mrak.getSeconds().toString().padStart(2, '0')}`;
        var PomZora = časi.nauticalDawn
            PomZora = new Date(PomZora)
            document.getElementById("resultPomZora").innerHTML = `${PomZora.getHours().toString().padStart(2, '0')}:${PomZora.getMinutes().toString().padStart(2, '0')}:${PomZora.getSeconds().toString().padStart(2, '0')}`;
        var PomMrak = časi.nauticalDusk
            PomMrak = new Date(PomMrak)
            document.getElementById("resultPomMrak").innerHTML = `${PomMrak.getHours().toString().padStart(2, '0')}:${PomMrak.getMinutes().toString().padStart(2, '0')}:${PomMrak.getSeconds().toString().padStart(2, '0')}`;
        var zlataUra = časi.goldenHour
            zlataUra = new Date(zlataUra)
            document.getElementById("resultZlataUra").innerHTML = `${zlataUra.getHours().toString().padStart(2, '0')}:${zlataUra.getMinutes().toString().padStart(2, '0')}:${zlataUra.getSeconds().toString().padStart(2, '0')}`;
        var zlataUraKon = časi.goldenHourEnd
            zlataUraKon = new Date(zlataUraKon)
            document.getElementById("resultZlataUraKon").innerHTML = `${zlataUraKon.getHours().toString().padStart(2, '0')}:${zlataUraKon.getMinutes().toString().padStart(2, '0')}:${zlataUraKon.getSeconds().toString().padStart(2, '0')}`;

        var Nadir = časi.nadir;
            Nadir = new Date(Nadir);
            const resultNadir1 = document.getElementById("resultNadir1");
            const resultNadir2 = document.getElementById("resultNadir2");
            const nadiropis1 = document.getElementById("nadiropis1");
            const nadiropis2 = document.getElementById("nadiropis2");

            if (Nadir < new Date(Nadir.getFullYear(), Nadir.getMonth(), Nadir.getDate(), 12, 0, 0)) {
                resultNadir1.innerHTML = `${Nadir.getHours().toString().padStart(2, '0')}:${Nadir.getMinutes().toString().padStart(2, '0')}:${Nadir.getSeconds().toString().padStart(2, '0')}`;
                resultNadir2.style.display = 'none';
                nadiropis2.style.display = 'none';
            } else {
                resultNadir2.innerHTML = `${Nadir.getHours().toString().padStart(2, '0')}:${Nadir.getMinutes().toString().padStart(2, '0')}:${Nadir.getSeconds().toString().padStart(2, '0')}`;
                resultNadir1.style.display = 'none';
                nadiropis1.style.display = 'none';
            }
        var Noč = časi.night
            Noč = new Date(Noč)
            document.getElementById("resultNoč").innerHTML = `${Noč.getHours().toString().padStart(2, '0')}:${Noč.getMinutes().toString().padStart(2, '0')}:${Noč.getSeconds().toString().padStart(2, '0')}`;
        var NočKon = časi.nightEnd
            NočKon = new Date(NočKon)
            document.getElementById("resultNočKon").innerHTML = `${NočKon.getHours().toString().padStart(2, '0')}:${NočKon.getMinutes().toString().padStart(2, '0')}:${NočKon.getSeconds().toString().padStart(2, '0')}`;
        var Poldne = časi.solarNoon
            Poldne = new Date(Poldne)
            document.getElementById("resultPoldne").innerHTML = `${Poldne.getHours().toString().padStart(2, '0')}:${Poldne.getMinutes().toString().padStart(2, '0')}:${Poldne.getSeconds().toString().padStart(2, '0')}`;
        var SonVzh = časi.sunrise
            SonVzh = new Date(SonVzh)
            document.getElementById("resultSonVzh").innerHTML = `${SonVzh.getHours().toString().padStart(2, '0')}:${SonVzh.getMinutes().toString().padStart(2, '0')}:${SonVzh.getSeconds().toString().padStart(2, '0')}`;
        var SonVzhKon = časi.sunriseEnd
            SonVzhKon = new Date(SonVzhKon)
            document.getElementById("resultSonVzhKon").innerHTML = `${SonVzhKon.getHours().toString().padStart(2, '0')}:${SonVzhKon.getMinutes().toString().padStart(2, '0')}:${SonVzhKon.getSeconds().toString().padStart(2, '0')}`;
        var SonZah = časi.sunset
            SonZah = new Date(SonZah)
            document.getElementById("resultSonZah").innerHTML = `${SonZah.getHours().toString().padStart(2, '0')}:${SonZah.getMinutes().toString().padStart(2, '0')}:${SonZah.getSeconds().toString().padStart(2, '0')}`;
        var SonZahZač = časi.sunsetStart
            SonZahZač = new Date(SonZahZač)
            document.getElementById("resultSonZahZač").innerHTML = `${SonZahZač.getHours().toString().padStart(2, '0')}:${SonZahZač.getMinutes().toString().padStart(2, '0')}:${SonZahZač.getSeconds().toString().padStart(2, '0')}`;

    polSonca = SunCalc.getPosition(trSLOčas, GSSš, GSSd) //Položaj Sonca
        const višinaSonca = polSonca.altitude
            const višinaSoncaStop = višinaSonca * 180 / Math.PI
            document.getElementById("resultVišinaSonca").innerHTML = (višinaSoncaStop).toFixed(4);
        const azimutSonca = polSonca.azimuth
            const azimutSoncaStop = azimutSonca * 180 / Math.PI
            document.getElementById("resultAzimutSonca").innerHTML = (azimutSoncaStop).toFixed(4);

    polLune = SunCalc.getMoonPosition(trSLOčas, GSSš, GSSd) //Položaj Lune
        const višinaLune = polLune.altitude
            const višinaLuneStop = višinaLune * 180 / Math.PI
            document.getElementById("resultVišinaLune").innerHTML = (višinaLuneStop).toFixed(4);
        const azimutLune = polLune.azimuth
            const azimutLuneStop = azimutLune * 180 / Math.PI
            document.getElementById("resultAzimutLune").innerHTML = (azimutLuneStop).toFixed(4);
        const oddalLune = polLune.distance //Oddaljenost Lune
            document.getElementById("resultOddalLune").innerHTML = (oddalLune).toFixed(0);
        const parLune = polLune.parallacticAngle //Nagnjenost ravnine Luninega kroženja glede na navpičnico položaja opazovanja
            const parLuneStop = parLune * 180 / Math.PI
            document.getElementById("resultParLune").innerHTML = (parLuneStop).toFixed(4);

    OsvLune = SunCalc.getMoonIllumination(trSLOčas)
        const osvLune = OsvLune.fraction
            document.getElementById("resultOsvLune").innerHTML = (osvLune*100).toFixed(0) + "%";
        const kotLune = OsvLune.angle
            document.getElementById("resultKotLune").innerHTML = (kotLune).toFixed(4);
            const kotLuneStop = kotLune * 180 / Math.PI
            document.getElementById("resultKotLuneStop").innerHTML = (kotLuneStop).toFixed(4);
        const menaLune = OsvLune.phase
            document.getElementById("resultMenaLune").innerHTML = (menaLune).toFixed(4);

    VzhZahLune = SunCalc.getMoonTimes(trSLOčas, GSSš, GSSd)
        var VzhLune = VzhZahLune.rise
            VzhLune = new Date(VzhLune)
            document.getElementById("resultVzhLune").innerHTML = `${VzhLune.getHours().toString().padStart(2, '0')}:${VzhLune.getMinutes().toString().padStart(2, '0')}:${VzhLune.getSeconds().toString().padStart(2, '0')}`;
        var ZahLune = VzhZahLune.set
            ZahLune = new Date(ZahLune)
            document.getElementById("resultZahLune").innerHTML = `${ZahLune.getHours().toString().padStart(2, '0')}:${ZahLune.getMinutes().toString().padStart(2, '0')}:${ZahLune.getSeconds().toString().padStart(2, '0')}`;


    const sekundnoRazmerje = trSLOčas.getSeconds() / 60 /*Izračuna razmerje sekundnega kazalca (v obliki razmerja sekund od 0 do 59)*/
    const minutnoRazmerje = (sekundnoRazmerje + trSLOčas.getMinutes()) / 60 /*Izračuna razmerje minutnega kazalca (v obliki razmerja minut od 0 do 59 + sekundno razmerje)*/
    const urebrezpolzamika = (trSLOčas.getUTCHours()) % 24
    const urnoRazmerje = (minutnoRazmerje + urebrezpolzamika) / 24 /*Izračuna razmerje urnega kazalca (v obliki razmerja ur od 0 do 23 + minutno razmerje)*/

    const trenutnoleto = trSLOčas.getFullYear();
    const dnevno = 360 / 365.2425 /*stopinjski obrat v enem dnevu*/;
    const letnazamuda = ((trenutnoleto * (0.2425 * dnevno) - Math.floor((trenutnoleto - 1) / 4) * dnevno + Math.floor((trenutnoleto - 1) / 100) * dnevno - Math.floor((trenutnoleto - 1) / 400) * dnevno) - (11 * dnevno)) / 360;

    const dolžinaLeta = ugotoviprestopnost(trSLOčas.getFullYear()) ? 366 : 365; // Poglejte, ali je trenutno leto prestopno
    const dnevnizasuk = (trSLOčas.getDayOfYear() + urnoRazmerje) / dolžinaLeta;

    const prviDanLeta = new Date(trSLOčas.getFullYear(), 0, 1); // 1. januar trenutnega leta
    const razlika = (trSLOčas - prviDanLeta)/ (1000 * 60 * 60 * 24) + 11
    const razmerje = razlika / 365.2425
    const dnevnoRazmerje = razmerje

    const letozvezde = razlika / 365.2425 * (-1)

    const zimObrat = new Date (trSLOčas.getFullYear(), 11, 21); //21. december tega leta - zimski sončev obrat
    const razlikazačetka = Date.UTC(2001, 0, 1) - Date.UTC(2000, 11, 21)
    let milisekundnarazlika; /*čas med zdaj in zimskim sončnim obratom, v milisekundah*/
        if (trSLOčas >= zimObrat) {
            milisekundnarazlika = trSLOčas - zimObrat;
        } else {
            milisekundnarazlika = trSLOčas - prviDanLeta + razlikazačetka;
        }
    const dan366 = Math.floor(milisekundnarazlika / (24 * 60 * 60 * 1000)) + 1; //delite s številom milisekund na dan (24 * 60 * 60 * 1000) in zaokrožite rezultat navzdol. Na koncu dodate 1, saj štejemo dneve od 1 do 366.
    let dan183;
        if (dan366 <= 183) {
            dan183 = dan366;
        } else {
            dan183 = 183 - (dan366 % 183);
        }

    const dnevitedna = ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"];
    const meseci = ["prosinec (1.)", "svečan (2.)", "sušec (3.)", "mali traven (4.)", "veliki traven (5.)", "rožnik (6.)", "mali srpan (7.)", "veliki srpan (8.)", "kimavec (9.)", "vinotok (10.)", "listopad (11.)", "gruden (12.)"];

    const sekunde = trSLOčasP.getSeconds().toString().padStart(2, '0');
    const sekundeB = trSLOčas.getSeconds().toString().padStart(2, '0');
    const minute = trSLOčasP.getMinutes().toString().padStart(2, '0');
    const minuteB = trSLOčas.getMinutes().toString().padStart(2, '0');
    const ure = trSLOčasP.getHours().toString().padStart(2, '0');
    const dantedna = dnevitedna[trSLOčasP.getDay()];
    const danmeseca = trSLOčasP.getDate();
    /*const mesec = (trSLOčas.getMonth() + 1) % 12 || 12;*/
    const mesec = meseci[trSLOčasP.getMonth()];
    const leto = trSLOčas.getFullYear();

    resultElementCZZ.textContent = `${ure}:${minute}:${sekunde}, ${dantedna}, ${danmeseca}. ${mesec} ${leto}`;
    resultElementCBZ.textContent = `${urebrezpolzamika}:${minuteB}:${sekundeB}`;//prikaz ure brez poletnega zamika

    const poletniprehod = (31 - (Math.floor(((5 * leto) / 4) + 4) % 7));
    const zimskiprehod = (31 - (Math.floor(((5 * leto) / 4) + 1) % 7));
    let poletni;
    let letop;
        if ((Date.UTC(leto, 2, poletniprehod)) >= trSLOčas) {
            poletni = poletniprehod;
            letop = leto;
        } else {
            poletni = (31 - (Math.floor(((5 * (leto + 1)) / 4) + 4) % 7));
            letop = leto + 1;
        }
    let zimski;
    let letoz;
        if ((Date.UTC(leto, 9, zimskiprehod)) >= trSLOčas) {
            zimski = zimskiprehod;
            letoz = leto;
        } else {
            zimski = (31 - (Math.floor(((5 * (leto + 1)) / 4) + 1) % 7));
            letoz = leto + 1;
        }
    let prehod1;
    let prehod2;
        if ((Date.UTC(letoz, 9, zimski)) > (Date.UTC(letop, 2, poletni))) {
            prehod1 = `prehod na poletni čas: nedelja, ${poletni}. marec ${letop} ob 2:00`;
            prehod2 = `prehod na zimski čas: nedelja, ${zimski}. oktober ${letoz} ob 2:00`;
        } else {
            prehod1 = `prehod na zimski čas: nedelja, ${zimski}. oktober ${letoz} ob 2:00`;
            prehod2 = `prehod na poletni čas: nedelja, ${poletni}. marec ${letop} ob 2:00`;
        }
    resultElementPP.textContent = `${prehod1}`;
    resultElementDP.textContent = `${prehod2}`;

    const juldan = 0
    const T = (juldan - 2451545)/36525  //2451545 = 1. januar 2000

    const astmesec = (29 * 24 * 60 * 60 *1000) + (12 * 60 * 60 * 1000) + (44 * 60 *1000) + (2.8016 * 1000) /*29 dni, 12 ur, 44 minut in 2.9 sekund v milisekundah */
    const časmlaja = Date.UTC(2023, 0, 21, 21, 53); /*čas nekega mlaja, 21. jan. 2023, 21:53*/
    const časrazlika = trenutniUTC - časmlaja;
    /*const luninpoložaj = (časrazlika % astmesec)/astmesec /*celoštevilski (milisekundni) ostanek pri deljenju z dolžino meseca*/
    const luninpoložaj = menaLune
    const premerlune = 6
    const kotnizasuk = luninpoložaj * 360

    let željenkot; //željen kot mora biti med 0 in 90 stopinj
        if (0 < kotnizasuk && kotnizasuk < 90) { //če je kotni zasuk med 0 in 90 stopinj...
            željenkot = kotnizasuk; //...je željen kot razlika med kotnim zasukom in 90 stopinj.
        } else if (90 < kotnizasuk && kotnizasuk < 180) {
            željenkot = kotnizasuk - 90;
        } else if (180 < kotnizasuk && kotnizasuk < 270) {
            željenkot = 90 - (kotnizasuk - 180);
        } else {
            željenkot = kotnizasuk - 270;
        }
        console.log(željenkot);

    const željenkotrad = željenkot * Math.PI / 180
    const sinkota = Math.sin(željenkot * Math.PI / 180)
    const rlune = premerlune/2
    const rad = Math.PI / 180
    const premermene = rlune * Math.sin(željenkotrad) + rlune * Math.tan(90 - (2 * (Math.atan(Math.sin(željenkotrad)))))
    //  const premermene = premerlune / (Math.sin(2* Math.atan((premerlune / 2) / (premerlune * Math.sin(željenkot * Math.PI / 180)))))
    //  const odmikmene = (premerlune / 2) - ((premerlune /2) * Math.sin(željenkot * Math.PI / 180)) + (premermene/2)
    let stranmene;
        if (0 < kotnizasuk && kotnizasuk < 90) { //če je kotni zasuk med 0 in 90 stopinj...
            stranmene = -1; //...je mena na desni
        } else if (90 < kotnizasuk && kotnizasuk < 180) {
            stranmene = 1;
        } else if (180 < kotnizasuk && kotnizasuk < 270) {
            stranmene = -1;
        } else {
            stranmene = 1;
        }
    const odmikmene = (rlune - rlune*sinkota + (premermene/2 - rlune))*stranmene
    let barvamene;
        if (0 < kotnizasuk && kotnizasuk < 90) { //če je kotni zasuk med 0 in 90 stopinj...
            barvamene = "black"; //...je mena črna
        } else if (90 < kotnizasuk && kotnizasuk < 180) {
            barvamene = "white";
        } else if (180 < kotnizasuk && kotnizasuk < 270) {
            barvamene = "white";
        } else {
            barvamene = "black";
        }
    let barvalune;
        if (0 < kotnizasuk && kotnizasuk < 90) { //če je kotni zasuk med 0 in 90 stopinj...
            barvalune = "white"; //...je luna bela (in mena črna)
        } else if (90 < kotnizasuk && kotnizasuk < 180) {
            barvalune = "black";
        } else if (180 < kotnizasuk && kotnizasuk < 270) {
            barvalune = "black";
        } else {
            barvalune = "white";
        }

    const prvilunindan = (luninpoložaj /*= celoštevilski (milisekundni) ostanek pri deljenju časa od nekega mlaja do trenutno z dolžino meseca*/ % (24*60*60*1000)/*1 dan v ms*/)/*ostanek pri deljenju mesta Lune v meni z 1 dnevom - vrednost je manjša od 1 dneva*/ / astmesec


    zasukaj(sekundniKazalec, sekundnoRazmerje) /*Kliče funkcijo zasukaj za kazalec sekundniKazalec, da posodobi njegove rotacije na osnovi izračunanih razmerij*/
    zasukaj(minutniKazalec, minutnoRazmerje) /*Kliče funkcijo zasukaj za kazalec minutniKazalec, da posodobi njegove rotacije na osnovi izračunanih razmerij*/
    zasukaj(urniKazalec, urnoRazmerje) /*Kliče funkcijo zasukaj za kazalec urniKazalec, da posodobi njegove rotacije na osnovi izračunanih razmerij*/
    zasukaj(dnevnaUra, dnevnoRazmerje)
    zasukaj(letnaStevilcnica, letnazamuda)
    zasukaj(lunazasuk, luninpoložaj)
    setPolletje(kazalka, dan183)
    meneodmik(lunamenaodmik, odmikmene)
    menepremer(lunamenapremer, premermene)
    barva(menabarva, barvamene)
    barva(lunabarva, barvalune)
    zasukaj(dnevilune, prvilunindan)
    zasukaj(zvezdeleto, letozvezde)
    zasukaj(zvezdedan, urnoRazmerje)
}
nastaviUro() /*kliče funkcijo nastaviUro takoj po nalaganju strani, da se zagotovi, da se ure in kazalci pravilno nastavijo na začetku*/
    console.log(časi);
    console.log(polSonca);
    console.log(polLune);
    console.log(VzhZahLune);
    console.log(OsvLune);

function zasukaj(element, rotationRatio) /*funkcija, ki posodablja rotacijo določenega elementa (kazalca)*/ {
    element.style.setProperty ('--rotation', rotationRatio * -360)
} /*V tem primeru se uporablja CSS spremenljivka --rotation, ki določa stopnjo rotacije elementa. Spremenljivka rotationRatio je razmerje, ki ga prejme funkcija nastaviUro za vsak kazalec. Ta razmerja so pomnožena z -360, ker se CSS rotacija izvaja v stopinjah, negativna vrednost pa pomeni sukanje v nasprotni smeri urinega kazalca*/

function setPolletje(element, razmerje) /*funkcija, ki posodablja rotacijo določenega elementa (kazalca)*/ {
    element.style.setProperty ('--odmik', razmerje)
}
function meneodmik(element, razmerje) /*funkcija, ki posodablja rotacijo določenega elementa (kazalca)*/ {
    element.style.setProperty ('--odmikmene', razmerje)
}
function menepremer(element, razmerje) /*funkcija, ki posodablja rotacijo določenega elementa (kazalca)*/ {
    element.style.setProperty ('--premermene', razmerje)
}
function barva(element, izbira) /*funkcija, ki posodablja barvo elementa*/ {
    element.style.setProperty ('--barva', izbira)
}


function zaslon(elementi){
    const w = window.innerWidth
    const h = window.innerHeight
    let premer;
        if (window.innerHeight >= 2*window.innerWidth) {
            premer = window.innerWidth;
        } else if (window.innerWidth >= 2*window.innerHeight) {
            premer = window.innerHeight;
        } else {
            premer = w + h - Math.sqrt(2*w*h);
        }
    for (const element of elementi) {
        element.style.width = premer + "px"
        element.style.height = premer + "px"
    }
}
zaslon(napravi);
window.addEventListener("resize", function() {
    zaslon(napravi);
});
