/////////////////PREDMETI
////stranski prikaz
const ČasKNiz = document.getElementById('ČasKNiz');//prikaz krajevnega izbranega časa (v izbranem časovnem pasu)
const ČasIzB = document.getElementById('ČasIzB');//prikaz izbranega časa (v UTC)
const ČasUTCNiz = document.getElementById('ČasUTCNiz');//prikaz izbranega časa (v UTC)

const vnosČasPas = document.getElementById('vnosČasPas');//za izbiro časovnega pasu
    // Pridobi vse podprte časovne pasove
    const tzs = Intl.supportedValuesOf("timeZone");
    // Dodaj možnost za vsak časovni pas
    tzs.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz;
        vnosČasPas.appendChild(option);
    });
const vnosČasIz = document.getElementById('vnosČasa');//za izbiro časa ČasIz
/*const vnosPredznaka = document.getElementById('vnosPredznaka');//vnos predznaka za odmik časovnega pasu od UTC
const prikazPredznaka = document.getElementById('prikazPredznaka');//za prikaz predznaka izbranega časovnega pasu ČasPasu
const uporabiOdmik = document.getElementById('uporabiOdmik');//za izbiro odmika časovnega pasu od UTC*/
const kazTedna = document.getElementById("kazTedna");//za kazalec, kažoč dan v tednu
const krajUrniKaz = document.getElementById("krajUrniKaz");//za kazalec, kažoč uro v dnevu
const krajLetKaz = document.getElementById("krajLetKaz");
const napravi = document.querySelectorAll('[data-naprava]');//ura Sonca in ura neba
const vnosŠirina = document.getElementById("vnosŠirina");//vnos zemljepisne širine
const vnosDolžina = document.getElementById("vnosDolžina");//vnos zemljepisne dolžine

////ura Sonca
const letnoSonca = document.getElementById("letnoSonca");
const urnaŠt = document.getElementById("urnaŠt");
const dneviLune = document.getElementById("dneviLune");
const neboLetno = document.getElementById("neboLetno");
const neboObzorje = document.getElementById("neboObzorje");

////ura neba
const lunino = document.getElementById("lunino");//za kroženje Lune okoli Zemlje
const poletniZasuk = document.getElementById("poletniZasuk");//za ujemanje urne številčnice s poletnim premikom ali ne
const prikazLune = document.getElementById("prikazLune");//za način prikaza pogleda Lune od zgoraj ali z Zemlje
const pollunaPred = document.getElementById("pollunaPred");//Luna od zgoraj

/////////////////PRIVZETE VREDNOSTI
////matematične
const vradiane = 2*Math.PI /360 //pretvorba v radiane ([vrednost v stopinjah]*vradiane)
const vstopinje = 360/2*Math.PI //pretvorba v stopinje ([vrednost v radianih]*vstopinje)

////splošne astronomske
const dneviTedna = ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"];
const meseci = ["prosinec", "svečan", "sušec", "mali traven", "veliki traven", "rožnik", "mali srpan", "veliki srpan", "kimavec", "vinotok", "listopad", "gruden"];
const astMesec = 29*24*60*60*1000 + 12*60*60*1000 + 44*60*1000 + 2.9*1000; //astronomski mesec (29 dni, 12 ur, 44 minut in 2.9 sekund) v milisekundah
const astMesecDni = astMesec/(1000*60*60*24);//astronomski mesec v dnevih
const dolžinaLeta = 365.2425;
const dan = 24*60*60*1000; //1 dan v milisekundah
const nagOsi = 23.4392811; //nagnjenost Zemljine osi v stopinjah
const odZem = 149598023; //povprečna oddaljenost Zemlje od Sonca (v km)
const polmerSonca = 696000; //polmer Sonca (v km)
const polmerZemlje = 6356.752; //polmer Zemlje (na tečajih; v km)
const polmerLune = 3474; //polmer Lune (v km)

////trenutne
let ČasT = new Date();//trenutni krajevni čas
let prviDanLeta = new Date(ČasT.getFullYear(), 0, 0);
/*let zimaT = new Date(ČasT.getFullYear(), 11, 21);
    let odmikZimaT = zimaT.getTimezoneOffset(); //odmik brez poletnega časa
let poletjeT = new Date(ČasT.getFullYear(), 5, 21);
    let odmikPoletjeT = poletjeT.getTimezoneOffset(); //odmik poletnega časa
let odmikT = ČasT.getTimezoneOffset(); //odmik trenutnega časovnega pasu od UTC
let odmikTB = odmikZimaT; //brez upoštevanja poletnega načina
let predznakPoz; //če je predznak časovnega pasu pozitiven
if (odmikT < 0) {
    predznakPoz = true;
} else {
    predznakPoz = false;
}
let poletniT = false;//ali je trenutno v rabi poletni čas
let SPol = undefined;//ali je na severni polobli (oz. je poletni čas uro naprej)
let časPas;*/
let ZVT; //trenutna zemljepisna višina
let ZDT; //trenutna zemljepisna dolžina

let pasImeT = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log("pasImeT: " + pasImeT)

////izbrane
let ČasIz = ČasT; //privzeti čas je trenutni krajevni čas
let rabaČasT = true;//za izbrani čas ČasIz uporabljaj trenutni čas ČasT
let časi; //časi preko dneva (vzhodi, zahodi...)
let ZVIz = 46.11994444; //privzeto izbrana zemljepisna širina/višina (GeoSS)
let ZDIz = 14.81533333; //privzeto izbrana zemljepisna dolžina (GeoSS)
let prikazPollunePred = true; //ali je Luna prikazana od zgoraj - privzeto je prikazana od zgoraj (ne pogled z Zemlje)
let poletniPremik = false;//ali je prikazano v poletnem načinu

let letoČasIz = ČasIz.getFullYear();
let mesecČasIz = ČasIz.getMonth();
let danČasIz = ČasIz.getDate();
let uraČasIz = ČasIz.getHours();
let minČasIz = ČasIz.getMinutes();
let sekČasIz = ČasIz.getSeconds();

/*let rabaOdmikT = true;
let zimaIz = zimaT;
    let odmikZimaIz = odmikZimaT;
let poletjeIz = poletjeT
    let odmikPoletjeIz = odmikPoletjeT;
let odmikIz = odmikT;
let odmikIzB = odmikTB; //brez upoštevanja poletnega načina*/
let pasImeIz = pasImeT;//oznaka/ime izbranega časovnega pasu

////uporabne
let urniZasukIzStop = 0;
let danLeta = 0;

/////////////////PREDPRIDOBIVANJE PODATKOV
/*setInterval(stalno, 1000);
function stalno() {
    ČasT = new Date(); //trenutni krajevni čas
        console.log("ČasT:" + ČasT);
        var ČasTm = new Date(Date.now());
        console.log("Date.now():" + Date.now());
    ČasISO = ČasT.toISOString();
        console.log("ČasISO:" + ČasISO); // format: 2022-01-01T12:34:56.789Z

    časPas = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log(časPas)

    odmikT = ČasT.getTimezoneOffset(); //odmik trenutnega časovnega pasu od UTC
    zimaT = new Date(ČasT.getFullYear(), 11, 21);
        odmikZimaT = zimaT.getTimezoneOffset(); //odmik brez poletnega časa
    poletjeT = new Date(ČasT.getFullYear(), 5, 21);
        odmikPoletjeT = poletjeT.getTimezoneOffset(); //odmik poletnega časa
    if (odmikZimaT < odmikPoletjeT) {
        SPolT = true
    } else if (odmikZimaT > odmikPoletjeT) {
        SPolT = false
    };

    if (odmikT = odmikZimaT) {
        poletniT = false
    } else if (odmikT = odmikPoletjeT) {
        poletniT = true
    };

    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        timeZoneName: 'short',
        timeZone: 'Europe/Ljubljana',
        hour12: false,
    };
    // Funkcija za pridobitev starega slovenskega imena meseca
    function getOldSlovenianMonth(monthIndex) {
        return meseci[monthIndex];
    }
    // Formatirajte datum brez meseca
    const formattedDate = new Intl.DateTimeFormat('default', options).formatToParts(now).map(({ type, value }) => {
        if (type === 'month') {
            // Zamenjajte ime meseca z starim slovenskim imenom
            const monthIndex = now.getMonth();
            return getOldSlovenianMonth(monthIndex);
        }
        return value;
    }).join('');
    console.log(formattedDate);

    časPas = ČasIz.toLocaleString('sl-SI', { timeZone: pasImeIz });
    console.log(časPas);

    odmikTB = odmikZimaT; //brez upoštevanja poletnega načina
/*var odmik = "+0600"
    console.log("toLocaleTimeString:" + ČasT.toLocaleTimeString(undefined, {timeZone: odmik}))
    console.log("toLocaleString:" + ČasT.toLocaleString(undefined, {timeZone: odmik}))*/

    /*letoČasT = ČasT.getFullYear().toString().padStart(4, '0');
    mesecČasT = meseci[ČasT.getMonth()];
    tednaČasT = dneviTedna[ČasT.getDay()];
    danČasT = ČasT.getDate().toString().padStart(2, '0');
    uraČasT = ČasT.getHours().toString().padStart(2, '0');
    minČasT = ČasT.getMinutes().toString().padStart(2, '0');
    sekČasT = ČasT.getSeconds().toString().padStart(2, '0');

    letoČasUTCNiz = ČasT.getUTCFullYear().toString().padStart(4, '0');
    mesecČasUTCNiz = ČasT.getUTCMonth();
    /*tednaČasUTCNiz = ČasT.getUTCDay();*/
    /*danČasUTCNiz = ČasT.getUTCDate().toString().padStart(2, '0');
    uraČasUTCNiz = ČasT.getUTCHours().toString().padStart(2, '0');
    minČasUTCNiz = ČasT.getUTCMinutes().toString().padStart(2, '0');
    sekČasUTCNiz = ČasT.getUTCSeconds().toString().padStart(2, '0');

    ČasKNiz.innerHTML = `${uraČasT}:${minČasT}:${sekČasT}, ${tednaČasT}, ${danČasT}. ${mesecČasT}. ${letoČasT}`;
    ČasUTCNiz.innerHTML = `${uraČasUTCNiz}:${minČasUTCNiz}:${sekČasUTCNiz}, ${danČasUTCNiz}. ${mesecČasUTCNiz}. ${letoČasUTCNiz}`;
}*/

/////////////////IZBIRANJE
////IZBIRA ČASA (ČasIz)
function uporabiČasT() {
    ČasIz = ČasT;
    rabaČasT = true;
    pridobiČase();
    nariši();
}
function pridobiČasIz() {
    ČasIz = new Date(vnosČasIz.value);
        console.log("Izbrali ste čas:" + ČasIz);
    rabaČasT = false;
    pridobiČase();
    nariši();
} vnosČasIz.addEventListener('input', pridobiČasIz);

/*////IZBIRA ČASOVNEGA PASU (odmikIz)
function uporabiOdmikT() {
    odmikIz = odmikT;
    rabaOdmikT = true;
    pridobiČase();
    nariši();
}
function uporabiUTCpas() {
    odmikIz = 0;
    rabaOdmikT = false;
    pridobiČase();
    nariši();
}
function izberiOdmik() {
    rabaOdmikT = false;
    var vredOdmikIz = uporabiOdmik.value;
        console.log("vredOdmikIz:" + vredOdmikIz);
    //Razčlenitev vnesenega časa v ure in minute:
    var ureOdmikIz = parseInt(vredOdmikIz.split(":")[0]);
    var minOdmikIz = parseInt(vredOdmikIz.split(":")[1]);
    //Pridobitev predznaka
    if (vnosPredznaka.checked == true){
        predznakPoz = true;
        predznakIz = 1;
        prikazPredznaka.value = `+`
    } else {
        predznakPoz = false;
        predznakIz = -1;
        prikazPredznaka.value = `−`
    }
    odmikIz = (ureOdmikIz*60 + minOdmikIz)*predznakIz;
        console.log("odmikIz izbran:" + odmikIz);
    pridobiČase();
    nariši();
} vnosPredznaka.addEventListener('input', izberiOdmik); //ob spremembi predznaka
uporabiOdmik.addEventListener('input', izberiOdmik); //ob spremembi absolutnega odmika*/

////IZBIRA ZEMLJEPISNEGA POLOŽAJA (ZVIz, ZDIz)
function uporabiPoložajT() {
/*btnUporabiTrPol.addEventListener("click", function() {*/
    // Preverite, ali je brskalnik omogočil geolokacijo
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            ZVT = position.coords.latitude;
            ZDT = position.coords.longitude;
            const točnost = position.coords.accuracy;
                console.log("ZVT:" + ZVT);
                console.log("ZDT:" + ZDT);
                console.log("točnost:" + točnost);
            ZVIz = ZVT;
            ZDIz = ZDT;
        }, function(error) {
            console.error("Napaka pri pridobivanju trenutnega zemljepisnega položaja:", error);
        });
    } else {
        alert("Pridobivanje trenutnega zemljepisnega položaja ni podprto v tem brskalniku.");
    }
    pridobiČase();
    nariši();
};
function izberiPoložaj() {
    ZVIz = vnosŠirina.value;
    ZDIz = vnosDolžina.value;
    pridobiČase();
    nariši();
} vnosŠirina.addEventListener('input', izberiPoložaj); //ob spremembi zemljepisne širine
vnosDolžina.addEventListener('input', izberiPoložaj); //ob spremembi zemljepisne dolžine

////IZBIRA ČASOVNEGA PASU
function izberiČasPasT() {//izberi trenutni časovni pas
    pasImeIz = pasImeT;
    pridobiČase()
};
function izberiČasPas() {
    pasImeIz = vnosČasPas.value;
    pridobiČase()
} vnosČasPas.addEventListener('input', izberiČasPas);

////IZBIRA POGLEDA LUNE
function pogledLune() {
    if (prikazLune.checked == true){
        prikazPollunePred = false;
    } else {
        prikazPollunePred = true;
    }
} prikazLune.addEventListener('input', pogledLune);

////IZBIRA PRIKAZA Z UPOŠTEVANJEM POLETNEGA NAČINA
function zasučiPoletno() {
    if (poletniZasuk.checked == true){
        poletiZasukano = true;
    } else {
        poletiZasukano = false;
    }
} poletniZasuk.addEventListener('input', zasučiPoletno);

/*////PRIKAZ V ČASOVNEM PASU
function oblikujVČasPasu(datum, odmik) {
    // Pridobi trenutno lokalni časovni zamik v minutah
    odmikRazlika = datum.getTimezoneOffset() *-1;

    // Preračunaj časovni zamik
    const skupniOdmik = odmik * 60 - odmikRazlika;

    // Ustvari nov datum z ustreznim zamikom
    const noviDatum = new Date(datum.getTime() + skupniOdmik * 60 * 1000);

    // Ustvari formatiran niz datuma in časa
    const možnosti = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    // Formatiraj datum v želeni obliki
    //return noviDatum.toLocaleString(undefined/*'en-GB'*//*, možnosti).replace(',', '');

    // Pridobi posamezne dele datuma in časa
    const hours = noviDatum.getHours().toString().padStart(2, '0');
    const minutes = noviDatum.getMinutes().toString().padStart(2, '0');
    const seconds = noviDatum.getSeconds().toString().padStart(2, '0');

    const weekday = getSloveneWeekday(newDate.getDay());
    const day = noviDatum.getDate();
    const month = getSloveneMonth(newDate.getMonth());
    const year = noviDatum.getFullYear();

    // Sestavi formatiran niz datuma in časa
    return `${hours}:${minutes}:${seconds}, ${weekday}, ${day}. ${month} ${year}`;*/
/*}*/

///////////////////DOKONČNA IZVEDBA
setInterval(izvedi, 1000);
function izvedi() {
    zimaIz = new Date(ČasIz.getFullYear(), 11, 21);
        odmikZimaIz = zimaIz.getTimezoneOffset(); //odmik brez poletnega časa
    poletjeIz = new Date(ČasIz.getFullYear(), 5, 21);
        odmikPoletjeIz = poletjeIz.getTimezoneOffset(); //odmik poletnega časa
    odmikIz = ČasIz.getTimezoneOffset(); //odmik trenutnega časovnega pasu od UTC
        console.log("odmikPoletjeIz: " + odmikPoletjeIz);
        console.log("odmikZimaIz: " + odmikZimaIz);
        console.log("odmikIz: " + odmikIz);

    vnosČasPas.value = pasImeIz;

    leČasKNiz = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: pasImeIz // UTC+1 during standard time
    }).format(ČasIz);

    letoČasIz = ČasIz.getFullYear().toString().padStart(4, '0');
    mesecČasIz = ČasIz.getMonth();
    mesecČasIzBe = meseci[mesecČasIz];
    tednaČasIz = ČasIz.getDay();
    tednaČasIzBe = dneviTedna[tednaČasIz];
    danČasIz = ČasIz.getDate().toString().padStart(2, '0');
    uraČasIz = ČasIz.getHours().toString().padStart(2, '0');
    minČasIz = ČasIz.getMinutes().toString().padStart(2, '0');
    sekČasIz = ČasIz.getSeconds().toString().padStart(2, '0');

    /*ČasKNiz.innerHTML = `${uraČasIz}:${minČasIz}:${sekČasIz}, ${tednaČasIzBe}, ${danČasIz}. ${mesecČasIzBe}. ${letoČasIz}`;*/
    ČasKNiz.innerHTML = `${leČasKNiz}, ${tednaČasIzBe}, ${danČasIz}. ${mesecČasIzBe}. ${letoČasIz}`;

    // Razčlenitev niza časa
    let [originalHours, originalMinutes, originalSeconds] = leČasKNiz.split(':').map(Number);
    // Zmanjšanje ure za eno uro
    let newHours = (originalHours === 0) ? 23 : originalHours - 1;
    // Sestava novega niza časa
    let newTimeString = `${newHours.toString().padStart(2, '0')}:${originalMinutes.toString().padStart(2, '0')}:${originalSeconds.toString().padStart(2, '0')}`;

    if (odmikPoletjeIz < odmikZimaIz && odmikIz == odmikPoletjeIz) {//v rabi je torej poletni način 1 uro naprej
        ČasIzB.innerHTML = `${newTimeString}, ${tednaČasIzBe}, ${danČasIz}. ${mesecČasIzBe}. ${letoČasIz}`;
    } else if (odmikPoletjeIz > odmikZimaIz && odmikIz == odmikZimaIz){//v rabi je torej zimski način 1 uro naprej
        ČasIzB.innerHTML = `${newTimeString}, ${tednaČasIzBe}, ${danČasIz}. ${mesecČasIzBe}. ${letoČasIz}`;
    } else {
        ČasIzB.innerHTML = `${leČasKNiz}, ${tednaČasIzBe}, ${danČasIz}. ${mesecČasIzBe}. ${letoČasIz}`;
    }

    letoČasUTC = ČasIz.getUTCFullYear().toString().padStart(4, '0');
    mesecČasUTC = ČasIz.getUTCMonth();
    mesecČasUTCBe = meseci[mesecČasIz];
    tednaČasUTC = ČasIz.getUTCDay();
    tednaČasUTCBe = dneviTedna[tednaČasUTC];
    danČasUTC = ČasIz.getUTCDate().toString().padStart(2, '0');
    uraČasUTC = ČasIz.getUTCHours().toString().padStart(2, '0');
    minČasUTC = ČasIz.getUTCMinutes().toString().padStart(2, '0');
    sekČasUTC = ČasIz.getUTCSeconds().toString().padStart(2, '0');

    ČasUTCNiz.innerHTML = `${uraČasUTC}:${minČasUTC}:${sekČasUTC}, ${tednaČasUTCBe}, ${danČasUTC}. ${mesecČasUTCBe}. ${letoČasUTC}`;

    /*console.log(`odmikIz: ${odmikIz}`);
    const formattedDate = oblikujVČasPasu(ČasIz, odmikIz);
    console.log(`Datum in čas v časovnem pasu odmikIz je ${formattedDate}`);*/

    ////Prikaz Lune v izbranem načinu
    if (prikazPollunePred/* == true*/){
        pollunaPred.style.display = 'initial';
    } else {
        pollunaPred.style.display = 'none';
    }

    ////Prikaz izbranega časa ČasIz
    vnosČasa.value = `${letoČasIz.toString().padStart(4, '0')}-${(mesecČasIz+1).toString().padStart(2, '0')}-${danČasIz.toString().padStart(2, '0')}T${uraČasIz.toString().padStart(2, '0')}:${minČasIz.toString().padStart(2, '0')}`

    /*////Prikaz izbranega odmika od UTC odmikIz
    if (predznakPoz){
        prikazPredznaka.innerHTML = `+`
    } else {
        prikazPredznaka.innerHTML = `−`
    }*/
    /*var ureOdmikIz = Math.floor(Math.abs(odmikIz)/60);
    var minOdmikIz = Math.abs(odmikIz) % 60;*/
    /*uporabiOdmik.value = `${ureOdmikIz.toString().padStart(2, '0')}:${minOdmikIz.toString().padStart(2, '0')}`*/

    ////Prikaz izbranega zemljepisnega položaja
    vnosŠirina.value = ZVIz;
    vnosDolžina.value = ZDIz;

    ////Izračun in uporaba urnega zasuka
    console.log("uraČasIz: " + uraČasIz);
    console.log("minČasIz: " + minČasIz);
    console.log("sekČasIz: " + sekČasIz);
    deležDneva = ((uraČasIz + ((minČasIz + (sekČasIz/60))/60))/24)/10;
    console.log("deležDneva: " + deležDneva);
    urniZasukIzStop = deležDneva *360;
    neboObzorje.style.transform = `rotate(${urniZasukIzStop*1}deg)`;
    krajUrniKaz.style.transform = `rotate(${urniZasukIzStop*-1}deg)`;

    ////Izračun in uporaba letnega zasuka
    var prviDanLeta = new Date(ČasIz.getFullYear(), 0, 0);
    var danLeta = (ČasIz - prviDanLeta)/dan;
    letniZasukIzStop = danLeta *360/dolžinaLeta
    var danLetaE = danLeta + 11;
    let danLeta183E;
    if (danLetaE < 183) {
        danLeta183E = danLetaE;
    } else if (danLetaE > 366) {
        danLeta183E = danLetaE - 366;
    } else {
        danLeta183E = 366 - danLetaE;
    }
    krajLetKaz.style.width = `${danLeta183E/183}%`;
    krajLetKaz.style.height = `${danLeta183E/183}%`;

    ////Izračun in uporaba tednega zasuka
    console.log("urniZasukIzStop: " + urniZasukIzStop)
    console.log("tednaČasIz: " + tednaČasIz)
    var tedenskiZasukIzStop = tednaČasIz*(360/7) + urniZasukIzStop/7
    console.log("tedenskiZasukIzStop: " + tedenskiZasukIzStop)
    kazTedna.style.transform = `rotate(${tedenskiZasukIzStop}deg)`;

    ////SUNCALC - POLOŽAJI IN LUNA
    polSonca = SunCalc.getPosition(ČasIz, ZVIz, ZDIz) //Položaj Sonca
        const višinaSonca = polSonca.altitude; //višina Sonca na nebu v radianih
            const višinaSoncaStop = višinaSonca * 180 / Math.PI;
            document.getElementById("resultVišinaSonca").innerHTML = (višinaSoncaStop).toFixed(4);
        const azimutSonca = polSonca.azimuth
            const azimutSoncaStop = azimutSonca * 180 / Math.PI
            document.getElementById("resultAzimutSonca").innerHTML = (azimutSoncaStop).toFixed(4);

    polLune = SunCalc.getMoonPosition(ČasIz, ZVIz, ZDIz) //Položaj Lune
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

    OsvLune = SunCalc.getMoonIllumination(ČasIz)
        const osvLune = OsvLune.fraction
            document.getElementById("resultOsvLune").innerHTML = (osvLune*100).toFixed(1) + "%";
        const kotLune = OsvLune.angle //v radianih
            //document.getElementById("resultKotLune").innerHTML = (kotLune).toFixed(4);
            const kotLuneStop = kotLune * 180 / Math.PI
            document.getElementById("resultKotLuneStop").innerHTML = (kotLuneStop).toFixed(4);
        var menaLune = OsvLune.phase
            document.getElementById("resultMenaLune").innerHTML = (menaLune).toFixed(4);
    ////PRIKAZ LUNE
    const željenKot90 = (menaLune*2*Math.PI)/*kot med 0 in 360 stopinj v radianih (mena krat 360 stopinj v radianih)*/ % (Math.PI / 2);//ostanek pri deljenju z 90 stopinj v radianih - kot med 0 in 90 stopinj v radianih
    let premerMene;//kot delež od celotnega premera Lune
        if (menaLune === 0) { //nova Luna
            premerMene = 1;
        } else if (menaLune === 0.25) { //prvi krajec
            premerMene = 0;
        } else if (menaLune === 0.5) { //polna luna / ščip
            premerMene = 1;
        } else if (menaLune === 0.75) { //zadnji krajec
            premerMene = 0;
        } else if (menaLune === 1) { //mlaj
            premerMene = 1;
        } else {
            premerMene = Math.cos(željenKot90)
        }
        //document.querySelector(".del").style.width = premerMene;
        const premerMeneOdSto = premerMene*100;//krat 100%, da dobimo vrednost v odstotkih, ne deležu
        delLune.style.width = `${premerMeneOdSto}%`;
        const odRobaDel = (100 - premerMeneOdSto)/2;//odmik od roba (da je del poravnan na sredino celotne Lune)
        delLune.style.left = `${odRobaDel}%`;
        delLune.style.right = `${odRobaDel}%`;

    let barvaLune;
        if (0 <= menaLune && menaLune < 0.25) { //če je kotni zasuk med 0 in 90 stopinj...
            barvaLune = "black"; //...je luna bela (in mena črna)
        } else if (0.25 <= menaLune && menaLune < 0.75) {
            barvaLune = "white";
        } else /*if (0.75 <= menaLune && menaLune <= 1)*/ {
            barvaLune = "black";
        }
        delLune.style.backgroundColor = `${barvaLune}`;

        if (0.5 <= menaLune && menaLune <= 1) {
            polluna.style.transform = `rotate(${180}deg)`;
        }
    const zasukLune = menaLune*360
        lunino.style.transform = `rotate(${zasukLune*-1}deg)`;
    const zasukPollunePred = zasukLune - 90//Zasuk prikaza Lune od zgoraj
        pollunaPred.style.transform = `rotate(${zasukPollunePred}deg)`;

        luninihDni = (astMesecDni*zasukLune)/360;//približno število pretečenih dni od mlaja
        deležDnevaNaMeno = luninihDni - Math.floor(luninihDni);//od števila odštejemo celi del (dneve) - dobimo decimalni del
        deležaDnevaRazlika = deležDnevaNaMeno - deležDneva;
        luninDanStop = 360/astMesec;
        zasukZaMlaj = deležaDnevaRazlika *luninDanStop;
        dneviLune.style.transform = `rotate(${zasukZaMlaj}deg)`;
///////////SENCA ZEMLJE
    var širLuna = document.getElementById('lunino').clientWidth;//širina Lune na prikazu (v px)
            console.log("širLuna:" + širLuna + "px");
    var vPxLuna = širLuna/(polmerLune*2); //za pretvorbo kilometrov v slikovne točke za Zemljino senco - torej na podlagi širine prikaza Lune
    //Senca Zemlje
    var dolZemSence = odZem*polmerZemlje/(polmerSonca - polmerZemlje); //dolžina Zemljine sence (od Zemljinega središča; v km)
            console.log("dolžina Zemljine sence:" + dolZemSence);
    var kotZemSence = Math.asin(polmerZemlje/dolZemSence); //polovični kot Zemljine sence
    var kotZemSenceStop = kotZemSence*vstopinje;
            console.log("kot Zemljine sence (v stop.):" + kotZemSenceStop);
        document.getElementById("krakZemSence1").style.transform = `rotate(${kotZemSenceStop*-1}deg)`;
        document.getElementById("krakZemSence2").style.transform = `rotate(${kotZemSenceStop}deg)`;
    var odŽarZemSenceZSLune = dolZemSence - oddalLune - polmerLune;//oddaljenost žarišča Zemljine sence od zadnje strani Lune; pozitivno - za Luno, negativno - pred Luno (v km)
            console.log("odŽarZemSenceZSLune:" + odŽarZemSenceZSLune);
    var odKrZemSenZSLune = odŽarZemSenceZSLune*Math.tan(kotZemSence);//oddaljenost kraka Zemljine sence od zadnje strani Lune, pravokotno na srednico sence
        document.getElementById("krakZemSence1").style.right = `calc(50% + ${odKrZemSenZSLune*vPxLuna}px)`;
        document.getElementById("krakZemSence2").style.left = `calc(50% + ${odKrZemSenZSLune*vPxLuna}px)`;
    //Polsenca Zemlje
    var odŽarZemPolsence = (odZem*polmerZemlje)/(polmerSonca+polmerZemlje);//oddaljenost žarišča Zemljine polsence od (središča) Zemlje
    var kotZemPolsence = Math.asin(polmerZemlje/odŽarZemPolsence); //polovični kot Zemljine polsence (v rd)
    var kotZemPolsenceStop = kotZemPolsence*vstopinje;
            console.log("kot Zemljine polsence (v stop.):" + kotZemPolsenceStop);
        document.getElementById("krakZemPolsence1").style.transform = `rotate(${kotZemPolsenceStop}deg)`;
        document.getElementById("krakZemPolsence2").style.transform = `rotate(${kotZemPolsenceStop*-1}deg)`;
    var odŽarZemPolsenceZSLune = odŽarZemPolsence+oddalLune+polmerLune;//oddaljenost žarišča Zemljine polsence od zadnje strani Lune
            console.log("odŽarZemPolsenceZSLune:" + odŽarZemPolsenceZSLune);
    var odKrZemPolsenZSLune = odŽarZemPolsenceZSLune*Math.tan(kotZemPolsence);//oddaljenost kraka Zemljine polsence od zadnje strani Lune, pravokotno na srednico sence
        document.getElementById("krakZemPolsence1").style.right = `calc(50% + ${odKrZemPolsenZSLune*vPxLuna}px)`;
        document.getElementById("krakZemPolsence2").style.left = `calc(50% + ${odKrZemPolsenZSLune*vPxLuna}px)`;
};

///////////////////PRIDOBIVANJE ČASOV (sončni vzhodi/zahodi, oz. deli dneva)
setInterval(pridobiČase, 10*60*1000);//na 10 minut
function pridobiČase() {
    prviDanLeta = new Date(ČasIz.getFullYear(), 0, 1);//1. prosinec izbranega leta
    const razlika = ČasIz - prviDanLeta;// Izračun razlike med izbranim časom in prvim dnevom leta
    danLeta = razlika / dan;
        console.log("danLeta:" + danLeta);
    danLetaStop = (-360/dolžinaLeta)*(danLeta-1) - 180 - 11*360/dolžinaLeta
    letnoSonca.style.transform = `rotate(${danLetaStop}deg)`;
    neboLetno.style.transform = `rotate(${(danLetaStop +180)*-1}deg)`;

    časi = SunCalc.getTimes(ČasIz, ZVIz, ZDIz);
        console.log("časi:" + časi);
        var Zora = časi.dawn
            Zora = new Date(Zora);
        resultZoraE = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(Zora);
        document.getElementById("resultZora").innerHTML = resultZoraE;
        document.getElementById("resultZora2").innerHTML = resultZoraE;

            /*document.getElementById("resultZora").innerHTML = `${Zora.getHours().toString().padStart(2, '0')}:${Zora.getMinutes().toString().padStart(2, '0')}:${Zora.getSeconds().toString().padStart(2, '0')}`;*/
        var Mrak = časi.dusk
            Mrak = new Date(Mrak)
        resultMrakE = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(Mrak);
        document.getElementById("resultMrak").innerHTML = resultMrakE;
        document.getElementById("resultMrak2").innerHTML = resultMrakE;

            /*document.getElementById("resultMrak").innerHTML = `${Mrak.getHours().toString().padStart(2, '0')}:${Mrak.getMinutes().toString().padStart(2, '0')}:${Mrak.getSeconds().toString().padStart(2, '0')}`;*/
        var PomZora = časi.nauticalDawn
            PomZora = new Date(PomZora)
        resultPomZoraE = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(PomZora);
        document.getElementById("resultPomZora").innerHTML = resultPomZoraE;
        document.getElementById("resultPomZora2").innerHTML = resultPomZoraE;

            /*document.getElementById("resultPomZora").innerHTML = `${PomZora.getHours().toString().padStart(2, '0')}:${PomZora.getMinutes().toString().padStart(2, '0')}:${PomZora.getSeconds().toString().padStart(2, '0')}`;*/
        var PomMrak = časi.nauticalDusk
            PomMrak = new Date(PomMrak)
        resultPomMrakE = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(PomMrak);
        document.getElementById("resultPomMrak").innerHTML = resultPomMrakE;
        document.getElementById("resultPomMrak2").innerHTML = resultPomMrakE;

            /*document.getElementById("resultPomMrak").innerHTML = `${PomMrak.getHours().toString().padStart(2, '0')}:${PomMrak.getMinutes().toString().padStart(2, '0')}:${PomMrak.getSeconds().toString().padStart(2, '0')}`;*/
        var zlataUra = časi.goldenHour
            zlataUra = new Date(zlataUra)
        document.getElementById("resultZlataUra").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(zlataUra);
            /*document.getElementById("resultZlataUra").innerHTML = `${zlataUra.getHours().toString().padStart(2, '0')}:${zlataUra.getMinutes().toString().padStart(2, '0')}:${zlataUra.getSeconds().toString().padStart(2, '0')}`;*/
        var zlataUraKon = časi.goldenHourEnd
            zlataUraKon = new Date(zlataUraKon)
        document.getElementById("resultZlataUraKon").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(zlataUraKon);
            /*document.getElementById("resultZlataUraKon").innerHTML = `${zlataUraKon.getHours().toString().padStart(2, '0')}:${zlataUraKon.getMinutes().toString().padStart(2, '0')}:${zlataUraKon.getSeconds().toString().padStart(2, '0')}`;*/

        var Nadir = časi.nadir;
            Nadir = new Date(Nadir);
            const resultNadir1 = document.getElementById("resultNadir1");
            const resultNadir2 = document.getElementById("resultNadir2");
            const nadiropis1 = document.getElementById("nadiropis1");
            const nadiropis2 = document.getElementById("nadiropis2");

            if (Nadir < new Date(Nadir.getFullYear(), Nadir.getMonth(), Nadir.getDate(), 12, 0, 0)) {
                resultNadir1.innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: pasImeIz
                }).format(Nadir);
                /*resultNadir1.innerHTML = `${Nadir.getHours().toString().padStart(2, '0')}:${Nadir.getMinutes().toString().padStart(2, '0')}:${Nadir.getSeconds().toString().padStart(2, '0')}`;*/
                resultNadir2.style.display = 'none';
                nadiropis2.style.display = 'none';
            } else {
                resultNadir2.innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: pasImeIz
                }).format(Nadir);
                /*resultNadir2.innerHTML = `${Nadir.getHours().toString().padStart(2, '0')}:${Nadir.getMinutes().toString().padStart(2, '0')}:${Nadir.getSeconds().toString().padStart(2, '0')}`;*/
                resultNadir1.style.display = 'none';
                nadiropis1.style.display = 'none';
            }
        var Noč = časi.night
            Noč = new Date(Noč)
        document.getElementById("resultNoč").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(Noč);
            /*document.getElementById("resultNoč").innerHTML = `${Noč.getHours().toString().padStart(2, '0')}:${Noč.getMinutes().toString().padStart(2, '0')}:${Noč.getSeconds().toString().padStart(2, '0')}`;*/
        var NočKon = časi.nightEnd
            NočKon = new Date(NočKon)
        document.getElementById("resultNočKon").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(NočKon);
            /*document.getElementById("resultNočKon").innerHTML = `${NočKon.getHours().toString().padStart(2, '0')}:${NočKon.getMinutes().toString().padStart(2, '0')}:${NočKon.getSeconds().toString().padStart(2, '0')}`;*/
        var Poldne = časi.solarNoon
            Poldne = new Date(Poldne)
        document.getElementById("resultPoldne").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(Poldne);
            /*document.getElementById("resultPoldne").innerHTML = `${Poldne.getHours().toString().padStart(2, '0')}:${Poldne.getMinutes().toString().padStart(2, '0')}:${Poldne.getSeconds().toString().padStart(2, '0')}`;*/
        
    var SonVzh = časi.sunrise
            SonVzh = new Date(SonVzh)
        resultSonVzhE = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(SonVzh);
        document.getElementById("resultSonVzh").innerHTML = resultSonVzhE;
        document.getElementById("resultSonVzh2").innerHTML = resultSonVzhE;

            /*document.getElementById("resultSonVzh").innerHTML = `${SonVzh.getHours().toString().padStart(2, '0')}:${SonVzh.getMinutes().toString().padStart(2, '0')}:${SonVzh.getSeconds().toString().padStart(2, '0')}`;*/
        var SonVzhKon = časi.sunriseEnd
            SonVzhKon = new Date(SonVzhKon)
        document.getElementById("resultSonVzhKon").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(SonVzhKon);
            /*document.getElementById("resultSonVzhKon").innerHTML = `${SonVzhKon.getHours().toString().padStart(2, '0')}:${SonVzhKon.getMinutes().toString().padStart(2, '0')}:${SonVzhKon.getSeconds().toString().padStart(2, '0')}`;*/
        
    var SonZah = časi.sunset
            SonZah = new Date(SonZah)
        resultSonZahE = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(SonZah);
        document.getElementById("resultSonZah").innerHTML = resultSonZahE;
        document.getElementById("resultSonZah2").innerHTML = resultSonZahE;

            /*document.getElementById("resultSonZah").innerHTML = `${SonZah.getHours().toString().padStart(2, '0')}:${SonZah.getMinutes().toString().padStart(2, '0')}:${SonZah.getSeconds().toString().padStart(2, '0')}`;*/
        var SonZahZač = časi.sunsetStart
            SonZahZač = new Date(SonZahZač)
        document.getElementById("resultSonZahZač").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(SonZahZač);

    VzhZahLune = SunCalc.getMoonTimes(ČasIz, ZVIz, ZDIz)
        console.log("vzhod/zahod Lune:" + VzhZahLune);
    var VzhLune = VzhZahLune.rise
        VzhLune = new Date(VzhLune)
        document.getElementById("resultVzhLune").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(VzhLune);
        /*document.getElementById("resultVzhLune").innerHTML = `${VzhLune.getHours().toString().padStart(2, '0')}:${VzhLune.getMinutes().toString().padStart(2, '0')}:${VzhLune.getSeconds().toString().padStart(2, '0')}`;*/
    var ZahLune = VzhZahLune.set
        ZahLune = new Date(ZahLune)
        document.getElementById("resultZahLune").innerHTML = new Intl.DateTimeFormat('default'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: pasImeIz
        }).format(ZahLune);
        /*document.getElementById("resultZahLune").innerHTML = `${ZahLune.getHours().toString().padStart(2, '0')}:${ZahLune.getMinutes().toString().padStart(2, '0')}:${ZahLune.getSeconds().toString().padStart(2, '0')}`;*/
            /*document.getElementById("resultSonZahZač").innerHTML = `${SonZahZač.getHours().toString().padStart(2, '0')}:${SonZahZač.getMinutes().toString().padStart(2, '0')}:${SonZahZač.getSeconds().toString().padStart(2, '0')}`;*/

            poldneLune = new Date((ZahLune + VzhLune)/2)
                console.log("poldneLune:" + poldneLune);

/////////////////////ZEMLJEVID////////////////////////////////////////////////////////////////////////
		setInterval(nariši, 60000);//na minuto
		function nariši() {
		    var svg = d3.select("#D3zemljevid"),
			    width = +svg.node().getBoundingClientRect().width,
			    height = +svg.node().getBoundingClientRect().height;

		    var scale = Math.min(width, height) / 2;

            // Ustvarjanje projekcije in poti enkrat, da se jih lahko posodablja
            var projection = d3.geoOrthographic()
			    .center([0, 0])
			    .scale(scale)
			    .clipAngle(90)
			    .translate([width / 2, height / 2]);

		    var path = d3.geoPath().projection(projection);

            /*// Dodajanje krožnega ozadja SVG-ju
		    svg.append("circle")
			    .attr("cx", width / 2)
			    .attr("cy", height / 2)
			    .attr("r", projection.scale())
			    .attr("fill", "white");*/

            // Posodobitev časa
            const ČasIz = new Date();
            const ureIz = ČasIz.getHours();
            const minIz = ČasIz.getMinutes();
            const sekIz = ČasIz.getSeconds();

            ureUTC = ČasIz.getUTCHours();
            minUTC = ČasIz.getUTCMinutes();
            sekUTC = ČasIz.getUTCSeconds();

        console.log("danLetaStop3:" + danLetaStop);

            zasukZemljevida = (ureUTC + minUTC / 60 + sekUTC / (60 * 60)) * 360 / 24 - danLetaStop
                console.log("zasukZemljevida:" + zasukZemljevida);
            zamikPoldnevnikov = (minUTC+(sekUTC/60))/60 *-15
                console.log("zamikPoldnevnikov:" + zamikPoldnevnikov);

            polnoč = ((24-ureUTC)/24)*360 + zamikPoldnevnikov
                console.log("polnoč:" + polnoč);
            poldne = (polnoč + 180)%360
                console.log("poldne:" + poldne);

			var alpha = (zasukZemljevida); // Zemljepisna dolžina; okoli Y-osi
			var beta = -66.56; // Zemljepisna širina; okoli X-osi
			var tilt = 0; // Nagnjenost; okoli Z-osi

            // Posodabljanje rotacije projekcije
			projection.rotate([alpha, beta, tilt]);

            d3.json("https://raw.githubusercontent.com/epistler999/GeoLocation/master/world.json", function (data) {
                // Posodabljanje zemljevida
                var map = svg.selectAll(".land")
                    .data(data.features);

                map.enter().append("path")
                    .attr("class", "land")
                    .merge(map)
                    .transition().duration(500)
                    .attr("d", path)
                    .attr("fill", "grey")
                    .style("stroke", "#0000");

                map.exit().remove();

                spredaj = 360 - zasukZemljevida
                zadaj = (spredaj + 180)%360
                var polygon = {
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [90, -spredaj],
                            [0, 0],
                            [-90, zadaj],
                            [180, 0],
                            [90, -spredaj]
                        ]]
                    }
                };

                var polygonPath = svg.selectAll(".polygon")
                    .data([polygon]);

                polygonPath.enter().append("path")
                    .attr("class", "polygon")
                    .merge(polygonPath)
                    .transition().duration(500)
                    .attr("d", path)
                    .attr("fill", "rgba(0, 0, 0, 0.3)");

                polygonPath.exit().remove();

                var linesData = [
                    { type: "LineString", coordinates: [[ZDIz, -90], [ZDIz, 0], [ZDIz, 90]], color: "red" },
                    { type: "LineString", coordinates: [[polnoč, -90], [polnoč, 0], [polnoč, 90]], color: "yellow" },
                    { type: "LineString", coordinates: [[poldne, -90], [poldne, 0], [poldne, 90]], color: "yellow" }
                ];

                var lines = svg.selectAll(".line")
                    .data(linesData);

                lines.enter().append("path")
                    .attr("class", "line")
                    .merge(lines)
                    .transition().duration(500)
                    .attr("d", path)
                    .attr("fill", "none")
                    .attr("stroke", d => d.color)
                    .attr("stroke-width", 2);

                lines.exit().remove();

                var latitudes = [
                    { value: ZVIz, color: "rgba(255, 0, 0, 1)" },
                    { value: -66.56, color: "rgba(0, 0, 255, 0.5)" },
                    { value: 66.56, color: "rgba(0, 0, 255, 0.5)" },
                    { value: -23.44, color: "rgba(0, 0, 255, 0.5)" },
                    { value: 23.44, color: "rgba(0, 0, 255, 0.5)" },
                    { value: 0, color: "rgba(0, 0, 255, 0.5)" }
                ];

                function drawLatitudeRing(latitude, color) {
                    var coordinates = [];
                    for (var lon = -180; lon <= 180; lon++) {
                        coordinates.push([lon, latitude]);
                    }

                    return {
                        type: "LineString",
                        coordinates: coordinates,
                        color: color
                    };
                }

                var latitudesData = latitudes.map(d => drawLatitudeRing(d.value, d.color));

                var latitudeLines = svg.selectAll(".latitude")
                    .data(latitudesData);

                latitudeLines.enter().append("path")
                    .attr("class", "latitude")
                    .merge(latitudeLines)
                    .transition().duration(500)
                    .attr("d", path)
                    .attr("fill", "none")
                    .attr("stroke", d => d.color)
                    .attr("stroke-width", 1);

                latitudeLines.exit().remove();

                function drawMeridians(startLongitude, interval, color) {
                    var longitudes = [];
                    for (var lon = startLongitude; lon < 360 + startLongitude; lon += interval) {
                        longitudes.push(drawLongitudeRing(lon % 360, color));
                    }

                    return longitudes;
                }

                function drawLongitudeRing(longitude, color) {
                    var coordinates = [];
                    for (var lat = -90; lat <= 90; lat++) {
                        coordinates.push([longitude, lat]);
                    }

                    return {
                        type: "LineString",
                        coordinates: coordinates,
                        color: color
                    };
                }

            console.log("zamikPoldnevnikov:" + zamikPoldnevnikov);
                var meridiansData = drawMeridians(zamikPoldnevnikov, 15, "rgba(0, 0, 0, 0.3)");

                var meridianLines = svg.selectAll(".meridian")
                    .data(meridiansData);

                meridianLines.enter().append("path")
                    .attr("class", "meridian")
                    .merge(meridianLines)
                    .transition().duration(500)
                    .attr("d", path)
                    .attr("fill", "none")
                    .attr("stroke", d => d.color)
                    .attr("stroke-width", 1);

                meridianLines.exit().remove();
            });
        };
////////////////////NAPRAVI - za nadzor velikosti naprav ob spreminjanju formata okna
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
};
zaslon(napravi);
window.addEventListener("resize", function() {
    zaslon(napravi);
    nariši();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////KLIČEMO FUKCIJE OB NALAGANJU
pridobiČase();
nariši();
