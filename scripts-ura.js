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

/*PRIDOBIVANJE ASTRONOMSKIH POSATKOV s AstronomyAPI*/
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

    const moonPhaseAngle = data.data.table.rows[1].cells[0].extraInfo.phase.angel;
        const kotnizasuk = moonPhaseAngle/360
        document.getElementById("resultKotLune").innerHTML = moonPhaseAngle;
    const moonPhaseFraction = data.data.table.rows[1].cells[0].extraInfo.phase.fraction;
        document.getElementById("resultOsvLune").innerHTML = moonPhaseFraction;

    console.log(`kot lunine mene: ${moonPhaseAngle}`);
    console.log(`delež lunine mene: ${moonPhaseFraction}`);
  })
  .catch(error => {
    console.error('Napaka pri pridobivanju podatkov:', error);
  });

/*PRIDOBIVANJE ASTRONOMSKIH POSATKOV s Sunrise-Sunset.org*/
const latitude = 46.11994444;
const longitude = 14.81533333;

// Uporaba Fetch API za pošiljanje GET zahtevka na API
fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0&tzld=Europe/Ljubljana`)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Tukaj lahko obdelate pridobljene podatke
    let sunrise = data.results.sunrise;
        sunrise = new Date(sunrise)
        sunriseure = sunrise.getHours().toString().padStart(2, '0')
        sunriseminute = sunrise.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultSonVzh").innerHTML = `${sunriseure}:${sunriseminute}`;
    let sunset = data.results.sunset;
        sunset = new Date(sunset)
        sunseture = sunset.getHours().toString().padStart(2, '0')
        sunsetminute = sunset.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultSonZah").innerHTML = `${sunseture}:${sunsetminute}`;
    /*const solar_noon = data.results.solar_noon;*/
    let solar_noon = data.results.solar_noon;
        solar_noon = new Date(solar_noon)
        solar_noonure = solar_noon.getHours().toString().padStart(2, '0')
        solar_noonminute = solar_noon.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultPoldne").innerHTML = `${solar_noonure}:${solar_noonminute}`;
    let day_length = data.results.day_length;
        day_length = new Date(day_length*1000)
        console.log(day_length)
        day_lengthure = day_length.getHours().toString().padStart(2, '0')
        day_lengthminute = day_length.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultDan").innerHTML = `${day_lengthure}:${day_lengthminute}`;
    let civil_twilight_begin = data.results.civil_twilight_begin;
        civil_twilight_begin = new Date(civil_twilight_begin)
        civil_twilight_beginure = civil_twilight_begin.getHours().toString().padStart(2, '0')
        civil_twilight_beginminute = civil_twilight_begin.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultMeSonVzh").innerHTML = `${civil_twilight_beginure}:${civil_twilight_beginminute}`;
    let civil_twilight_end = data.results.civil_twilight_end;
        civil_twilight_end = new Date(civil_twilight_end)
        civil_twilight_endure = civil_twilight_end.getHours().toString().padStart(2, '0')
        civil_twilight_endminute = civil_twilight_end.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultMeSonZah").innerHTML = `${civil_twilight_endure}:${civil_twilight_endminute}`;
    let nautical_twilight_begin = data.results.nautical_twilight_begin;
        nautical_twilight_begin = new Date(nautical_twilight_begin)
        nautical_twilight_beginure = nautical_twilight_begin.getHours().toString().padStart(2, '0')
        nautical_twilight_beginminute = nautical_twilight_begin.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultPoSonVzh").innerHTML = `${nautical_twilight_beginure}:${nautical_twilight_beginminute}`;
    let nautical_twilight_end = data.results.nautical_twilight_end;
        nautical_twilight_end = new Date(nautical_twilight_end)
        nautical_twilight_endure = nautical_twilight_end.getHours().toString().padStart(2, '0')
        nautical_twilight_endminute = nautical_twilight_end.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultPoSonZah").innerHTML = `${nautical_twilight_endure}:${nautical_twilight_endminute}`;
    let astronomical_twilight_begin = data.results.astronomical_twilight_begin;
        astronomical_twilight_begin = new Date(astronomical_twilight_begin)
        astronomical_twilight_beginure = astronomical_twilight_begin.getHours().toString().padStart(2, '0')
        astronomical_twilight_beginminute = astronomical_twilight_begin.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultAsSonVzh").innerHTML = `${astronomical_twilight_beginure}:${astronomical_twilight_beginminute}`;
    let astronomical_twilight_end = data.results.astronomical_twilight_end;
        astronomical_twilight_end = new Date(astronomical_twilight_end)
        astronomical_twilight_endure = astronomical_twilight_end.getHours().toString().padStart(2, '0')
        astronomical_twilight_endminute = astronomical_twilight_end.getMinutes().toString().padStart(2, '0')
        document.getElementById("resultAsSonZah").innerHTML = `${astronomical_twilight_endure}:${astronomical_twilight_endminute}`;

    console.log(`sončni vzhod: ${sunrise}`);
    console.log(`sončni zahod: ${sunset}`);
    console.log(`sončno opoldne: ${solar_noon}`);
    console.log(`dolžina dneva: ${day_length}`);
    console.log(`začetek meščanskega svitanja: ${civil_twilight_begin}`);
    console.log(`konec meščanskega mraka: ${civil_twilight_end}`);
    console.log(`začetek pomorskega svitanja: ${nautical_twilight_begin}`);
    console.log(`konec pomorskega mraka: ${nautical_twilight_end}`);
    console.log(`začetek zvezdoslovnega svitanja: ${astronomical_twilight_begin}`);
    console.log(`konec zvezdoslovnega mraka: ${astronomical_twilight_end}`);
  })
  .catch(error => {
    console.error('Napaka pri pridobivanju podatkov:', error);
  });

/*PRIDOBIVANJE ASTRONOMSKIH PODATKOV z IPGeolocation*//*
const apiKey = '2cff6d02877a4aa0a6cd34c937a2f8b4';

const latitude3 = 46.11994444;
const longitude3 = 14.81533333;

const apiUrl3 = `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&lat=${latitude3}&long=${longitude3}`;

fetch(apiUrl3)
  .then(response => {
    // Preveri, ali je odgovor uspešen (status code 200)
    if (!response.ok) {
      throw new Error(`Napaka pri pridobivanju podatkov: ${response.status}`);
    }

    // Pretvori odgovor v JSON
    return response.json();
  })
  .then(data => {
    // Tukaj obdelate pridobljene podatke
    console.log(data);
        const vzhodSonca = data.sunrise;
        const zahodSonca = data.sunset;
        const položajSonca = data.sun_status;
        const opoldneSonca = data.solar_noon;
        const dolžinadneva = data.day_length;
        const višinaSonca = data.sun_altitude;
        const oddaljenostSonca = data.sun_distance;
        const azimutSonca = data.sun_azimuth;
        const vzhodLune = data.moonrise;
        const zahodLune = data.moonset;
        const položajLune = data.moon_status;
        const višinaLune = data.moon_altitude;
        const oddaljenostLune = data.moon_distance;
        const azimutLune = data.moon_azimuth;
        const paralaktičnikotLune = data.moon_parallactic_angle;
  })
  .catch(error => {
    console.error('Napaka pri pridobivanju podatkov:', error);
  });*/


/*PRIDOBIVANJE ASTRONOMSKIH POSATKOV z RapidAPI*//*
const url = 'https://moon-phase.p.rapidapi.com/advanced?lat=51.4768&lon=-0.0004';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aa09649f8dmsh592bf854d98fbd5p1949a6jsn57ae4d5641e6',
		'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com'
	}
};

const queryString2 = new URLSearchParams(options).toString();

fetch(`${url}?${queryString2}`, {
  method: "GET",
  headers: {
    'X-RapidAPI-Key': 'aa09649f8dmsh592bf854d98fbd5p1949a6jsn57ae4d5641e6',
	'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com'
  },
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Tukaj obdelate pridobljene podatke
  })
  .catch(error => {
    console.error('Napaka pri pridobivanju podatkov:', error);
  });*/

/*PRIDOBIVANJE ASTRONOMSKIH PODATKOV z IPGeolocation*/
function getastronomicaldatas() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const API_KEY = '2cff6d02877a4aa0a6cd34c937a2f8b4';
            const latitude = position.coords.latitude; /*46.11994444*/
            const longitude = position.coords.latitude; /*14.81533333*/

            const apiUrl = `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&lat=${latitude}&long=${longitude}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Tukaj obdelam pridobljene podatke
                    console.log(data); //izpis poročila
                    const vzhodSonca = data.sunrise;
                    const zahodSonca = data.sunset;
                    const položajSonca = data.sun_status;
                    const opoldneSonca = data.solar_noon;
                    const dolžinadneva = data.day_length;
                    const višinaSonca = data.sun_altitude;
                    const oddaljenostSonca = data.sun_distance;
                    const azimutSonca = data.sun_azimuth;
                    const vzhodLune = data.moonrise;
                    const zahodLune = data.moonset;
                    const položajLune = data.moon_status;
                    const višinaLune = data.moon_altitude;
                    const oddaljenostLune = data.moon_distance;
                    const azimutLune = data.moon_azimuth;
                    const paralaktičnikotLune = data.moon_parallactic_angle;
                })
                .catch(error => {
                    console.error('Napaka pri pridobivanju podatkov:', error);
                });
        }, function (error) {
            console.error('Napaka pri pridobivanju zemljepisnega položaja:', error);
        });
    } else {
        console.error('Ta brskalnik ne podpira pridobivanja zemljepisnega položaja.');
    }
}




Date.prototype.getDayOfYear = function() {
    const startOfYear = new Date(this.getFullYear(), 0, 0);
    const diff = this - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};

function ugotoviprestopnost(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function nastaviUro() /*funkcija seurica, ki se kliče zgoraj ima tu svoje korake:*/ {
    const trenutnikrajevničas = Date.now();
    const zamikpasu = new Date().getTimezoneOffset();
    const trenutniUTC = trenutnikrajevničas - zamikpasu * 1000 * 60;
    const trenutno = new Date() /*ustvari element Date, ki predstavlja trenutni datum in čas*/

    const sekundnoRazmerje = trenutno.getSeconds() / 60 /*Izračuna razmerje sekundnega kazalca (v obliki razmerja sekund od 0 do 59)*/
    const minutnoRazmerje = (sekundnoRazmerje + trenutno.getMinutes()) / 60 /*Izračuna razmerje minutnega kazalca (v obliki razmerja minut od 0 do 59 + sekundno razmerje)*/
    const urebrezpolzamika = (trenutno.getUTCHours() + 1) % 24
    const urnoRazmerje = (minutnoRazmerje + urebrezpolzamika) / 24 /*Izračuna razmerje urnega kazalca (v obliki razmerja ur od 0 do 23 + minutno razmerje)*/

    const trenutnoleto = new Date().getFullYear();
    const dnevno = 360 / 365.2425 /*stopinjski obrat v enem dnevu*/;
    const letnazamuda = ((trenutnoleto * (0.2425 * dnevno) - Math.floor((trenutnoleto - 1) / 4) * dnevno + Math.floor((trenutnoleto - 1) / 100) * dnevno - Math.floor((trenutnoleto - 1) / 400) * dnevno) - (11 * dnevno)) / 360;

    const dolžinaLeta = ugotoviprestopnost(trenutno.getFullYear()) ? 366 : 365; // Poglejte, ali je trenutno leto prestopno
    const dnevnizasuk = (trenutno.getDayOfYear() + urnoRazmerje) / dolžinaLeta;

    const prviDanLeta = new Date(trenutno.getFullYear(), 0, 1); // 1. januar trenutnega leta
    const razlika = (trenutno - prviDanLeta)/ (1000 * 60 * 60 * 24) + 11
    const razmerje = razlika / 365.2425
    const dnevnoRazmerje = razmerje

    const letozvezde = ((trenutno - prviDanLeta)/ (1000 * 60 * 60 * 24) + 11)/365.2425*(-1)

    const zimObrat = new Date (trenutno.getFullYear(), 11, 21); //21. december tega leta - zimski sončev obrat
    const razlikazačetka = Date.UTC(2001, 0, 1) - Date.UTC(2000, 11, 21)
    let milisekundnarazlika; /*čas med zdaj in zimskim sončnim obratom, v milisekundah*/
        if (trenutno >= zimObrat) {
            milisekundnarazlika = trenutno - zimObrat;
        } else {
            milisekundnarazlika = trenutno - prviDanLeta + razlikazačetka;
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

    const sekunde = new Date().getSeconds().toString().padStart(2, '0');
    const minute = new Date().getMinutes().toString().padStart(2, '0');
    const ure = new Date().getHours().toString().padStart(2, '0');
    const dantedna = dnevitedna[new Date().getDay()];
    const danmeseca = new Date().getDate();
    /*const mesec = (new Date().getMonth() + 1) % 12 || 12;*/
    const mesec = meseci[new Date().getMonth()];
    const leto = new Date().getFullYear();

    resultElementCZZ.textContent = `${ure}:${minute}:${sekunde}, ${dantedna}, ${danmeseca}. ${mesec} ${leto}`;
    resultElementCBZ.textContent = `${urebrezpolzamika}:${minute}:${sekunde}`;

    const poletniprehod = (31 - (Math.floor(((5 * leto) / 4) + 4) % 7));
    const zimskiprehod = (31 - (Math.floor(((5 * leto) / 4) + 1) % 7));
    let poletni;
    let letop;
        if ((Date.UTC(leto, 2, poletniprehod)) >= trenutno) {
            poletni = poletniprehod;
            letop = leto;
        } else {
            poletni = (31 - (Math.floor(((5 * (leto + 1)) / 4) + 4) % 7));
            letop = leto + 1;
        }
    let zimski;
    let letoz;
        if ((Date.UTC(leto, 9, zimskiprehod)) >= trenutno) {
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
    const luninpoložaj = (časrazlika % astmesec)/astmesec /*celoštevilski (milisekundni) ostanek pri deljenju z dolžino meseca*/
    const premerlune = 6
    const kotnizasuk = luninpoložaj * 360

    let željenkot; //željen kot mora biti med 0 in 90 stopinj
        if (0 < kotnizasuk && kotnizasuk < 90) { //če je kotni zasuk med 0 in 90 stopinj...
            željenkot = 90 - kotnizasuk; //...je željen kot razlika med kotnim zasukom in 90 stopinj.
        } else if (90 < kotnizasuk && kotnizasuk < 180) {
            željenkot = kotnizasuk - 90;
        } else if (180 < kotnizasuk && kotnizasuk < 270) {
            željenkot = 90 - (kotnizasuk - 180);
        } else {
            željenkot = kotnizasuk - 270;
        }

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

nastaviUro() /*kliče funkcijo nastaviUro takoj po nalaganju strani, da se zagotovi, da se ure in kazalci pravilno nastavijo na začetku*/
