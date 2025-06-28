/*uporabiTč
    -> rabaTč
    tč -> ič
uporabiIč
    -> rabaTč
    vnosIč -> ič

uporabiPoložajT
    -> rabaTpoložaj
    tzš -> izš
    tzd -> izd
uporabiPoložajI
    -> rabaTpoložaj
    vnosZš -> izš
    vnosZd -> izd

uporabiTčp
    -> rabaTčp
    tčpIme -> ičpIme
uporabiIčp
    -> rabaTčp
    vnosČp -> ičpIme
    

ustvariSvg          izračuna premer in ga uporabi za ustvarjanje SVG-ja, ko se kliče to funkcijo
    -> premer
    -> SVG

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ustvariGlobus       potrebuje premer, poldne, polnoc, zasuk, zem. položaj       za ustvarjanje globusa v SVG-ju
    premer
    poldne
    zasuk
    izd
    polnoc
    poldne
    izš
    -> globus

zemljaPrikaz        potrebuje zemlja.premer, zasuk, razlikaObratStop, prestopno - izriše celoten SVG naprave za prikaz Zemlje z vidika vesolja
    ustvariSvg()

    zasuk
    zemlja.premer
    razlikaObratStop
    prestopno

    ustvariGlobus()

neboPrikaz          ne ustvarja še ničesar, potem bo izrisovalo zemljevid neba
    ustvariSvg()

izpišiČase          dolg interval; izpiše dele dneva
    SunCalc()
    ič
    izš
    izd

izpiši              kratek interval; časi, položaji
    tč
    rabaTč
    ič
    SunCalc()
    izš
    izd

daljšiInterval
    rabaTč
    uporabiTč()
    rabaTpoložaj
    uporabiPoložajT()
    rabaTčp
    uporabiTčp
    zemljaPrikaz()
    neboPrikaz()
    izpiši()
    izpišiČase()

krajšiInterval
    izpis trenutnega časa in položajev - to je že funkcija izpiši()*/


const vnosIč = document.getElementById("vnosIč");
const vnosČp = document.getElementById("vnosČp");
//Ustvarjanje seznama v HTML za izbiro časovnega pasu
const tzs = Intl.supportedValuesOf("timeZone"); // Pridobi vse podprte časovne pasove (timezones supported)
tzs.forEach(tz => { // Dodaj možnost za vsak časovni pas
    const option = document.createElement('option');
    option.value = tz;
    option.textContent = tz;
    vnosČp.appendChild(option);
});
const vnosZš = document.getElementById("vnosZš");
const vnosZd = document.getElementById("vnosZd");
const btnUporabiPoložajT = document.getElementById("btnUporabiPoložajT");


//PRIVZETE VREDNOSTI///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////splošne astronomske stalnice
const dolžinaLeta = 365.2425;
const dan = 24*60*60*1000; //1 dan v milisekundah
const dneviTedna = ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"];
const meseci = ["prosinec", "svečan", "sušec", "mali traven", "veliki traven", "rožnik", "mali srpan", "veliki srpan", "kimavec", "vinotok", "listopad", "gruden"];
const astMesec = (((29*24+12)*60+44)*60+2.9)*1000; //astronomski mesec (29 dni, 12 ur, 44 minut in 2.9 sekund) v milisekundah
const astMesecDni = astMesec / dan;//astronomski mesec v dnevih
const nagOsi = 23.4392811; //nagnjenost Zemljine osi v stopinjah
const odZem = 149598023; //povprečna oddaljenost Zemlje od Sonca (v km)
const polmerSonca = 696000; //polmer Sonca (v km)
const polmerZemlje = 6356.752; //polmer Zemlje (na tečajih; v km)
const polmerLune = 3474; //polmer Lune (v km)
//matematično
function vradiane(stopinjskiKot) {
    return stopinjskiKot*(Math.PI/180);
}
function vstopinje(radianskiKot) {
    return radianskiKot*(180/Math.PI);
}

//Slog
const globusVelikost = 0.7;
const lunaVelikost = (0.85 - globusVelikost)/2;

//Trenutne vrednosti spremenljivk
let tzš; //trenutna zemljepisna širina
let tzd; //trenutna zemljepisna dolžina
let tč = new Date(); //trenutni čas
let tčpIme = Intl.DateTimeFormat().resolvedOptions().timeZone; //ime trenutnega časovnega pasu
let tUre = tč.getHours();
let tMin = tč.getMinutes();
let tSek = tč.getSeconds();
let tLeto = tč.getFullYear();
let tMesec = tč.getMonth();
    let tMesecBe = meseci[tMesec];
let tTedDan = tč.getDay();
    let tTedDanBe = dneviTedna[tTedDan];
let tDan = tč.getDate();
let tUreUTC = tč.getUTCHours();
let tMinUTC = tč.getUTCMinutes();
let tSekUTC = tč.getUTCSeconds();

let sVis; //višina Sonca na nebu v radianih
    let sVisStop;
let sAzi;
    let sAziStop;
let lVis;
    let lVisStop;
let lAzi;
    let lAziStop;
let lOdd;
let lPar; //Nagnjenost ravnine Luninega kroženja glede na navpičnico položaja opazovanja
    let lParStop;
let lOsv;
let lKot;
    let lKotStop;
let lMena;

let premer; //velikost posamezne naprave glede na velikost okna

//Izbrane vrednosti spremenljivk
let izš = 46.11994444; //izbrana zemljepisna širina - privzeto izbrana zemljepisna širina/višina (GeoSS)
vnosZš.value = izš;
let izd = 14.81533333; //izbrana zemljepisna dolžina - privzeto izbrana zemljepisna dolžina (GeoSS)
vnosZd.value = izd;
let rabaTpoložaj = false;
let rabaTč = true;
let ič = tč; //izbrani čas
vnosIč.value = `${ič.getFullYear().toString().padStart(4, '0')}-${(ič.getMonth()+1).toString().padStart(2, '0')}-${ič.getDate().toString().padStart(2, '0')}T${ič.getHours().toString().padStart(2, '0')}:${ič.getMinutes().toString().padStart(2, '0')}`;
let ičpIme = tčpIme; //"Europe/Ljubljana";
vnosČp.value = ičpIme;
let rabaTčp = true;
let prikazPollune = true;
let prikazZadPoloble = true;
let iUre = tUre;
let iMin = tMin;
let iSek = tSek;
let iLeto = tLeto;
let iMesec = tMesec;
    let iMesecBe = tMesecBe;
let iTedDan = tTedDan;
    let iTedDanBe = tTedDanBe;
let iDan = tDan;
let zamikPoldnevnikov = (tMinUTC+(tSekUTC/60))/60 *-15; //da poldnevniki kažejo kraje, kjer je ura polna
let polnoc = ((24 - tUreUTC)/24)*360; //na kateri zem. dolžini je trenutno polnoč
let poldne = (polnoc + 180)%360; //na kateri zem. dolžini je trenutno poldne
let zasuk;
let lunaZasuk = 0;
let prestopno;
let iDanLetaStop = 0;
let alfa = iDanLetaStop; // Zemljepisna dolžina za prikaz; sukanje globusa okoli Y-osi
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};
/*function getTimezoneOffset(timezone) {
    LocalDate = new Date();
    LocalDate.setMilliseconds(0);

    const LocalOffset = LocalDate.getTimezoneOffset();
    RemoteLocaleStr = LocalDate.toLocaleString('en-US', {timeZone: timezone});
    RemoteDate = new Date(RemoteLocaleStr);
    diff = (LocalDate.getTime()-RemoteDate.getTime()) / 1000 / 60 ;

    RemoteOffset = LocalOffset + diff;
    return RemoteOffset;
};*/
function getTimezoneOffsetFromUTC(timezone, date = new Date()) { //izračuna odmik poljubnega čas. pasu od UTC
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("Neveljaven datum.");
    }

    // Kopiramo datum in odstranimo milisekunde
    const LocalDate = new Date(date.getTime());
    LocalDate.setMilliseconds(0);

    // Pretvorimo lokalni čas v izbrani časovni pas
    const RemoteLocaleStr = LocalDate.toLocaleString('en-US', { timeZone: timezone });
    const RemoteDate = new Date(RemoteLocaleStr);

    // Preverimo, če je `RemoteDate` veljaven
    if (isNaN(RemoteDate.getTime())) {
        throw new Error(`Neveljaven časovni pas ali datum: ${timezone}`);
    }

    // Izračunamo razliko med časom v UTC in oddaljenim časom v minutah
    const utcTime = LocalDate.getTime() + (LocalDate.getTimezoneOffset() * 60 * 1000);
    const diffFromUTC = (utcTime - RemoteDate.getTime()) / (1000 * 60);

    return diffFromUTC;
}
function vrednostČasa(čas, id) {
    const časO = new Intl.DateTimeFormat('sl-SI', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: ičpIme
    }).format(new Date(čas));
    document.getElementById(id).innerHTML = časO;
};
//FUNKCIJE ZA KLICANJE IZ NASTAVITEV///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////IZBIRA ČASA (ič)
function uporabiTč() { //Uporabi trenutni čas za izbrani čas
    rabaTč = true;
    ič = tč;
    daljšiInterval();
};

function uporabiIč() { //Uporabi nek drug izbrani čas, ki ni trenuten
    rabaTč = false;
    ič = new Date(vnosIč.value);
        console.log("Izbrali ste čas:" + ič);
    daljšiInterval();
};
vnosIč.addEventListener('input', uporabiIč);

////IZBIRA ZEMLJEPISNEGA POLOŽAJA (izš, izd)
function uporabiPoložajT() { //Uporabi trenutni položaj
    // Preverite, ali je brskalnik omogočil geolokacijo:
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            tzš = position.coords.latitude;
            tzd = position.coords.longitude;
            const točnost = position.coords.accuracy;
                console.log("tr. zem. širina:" + tzš);
                console.log("tr. zem. dolžina:" + tzd);
                console.log("točnost: " + točnost + " m");
            izš = tzš;
            izd = tzd;
            rabaTpoložaj = true;
            daljšiInterval();
            document.getElementById("prPoložaj").style.display = "none";
        }, function(error) {
            console.error("Napaka pri pridobivanju trenutnega zemljepisnega položaja:", error);
        });
    } else {
        alert("Pridobivanje trenutnega zemljepisnega položaja ni podprto v tem brskalniku.");
    };
};
function uporabiPoložajI() {
    rabaTpoložaj = false;
    izš = vnosZš.value;
    izd = vnosZd.value;
    daljšiInterval();
    document.getElementById("prPoložaj").style.display = "none";
};
vnosZš.addEventListener('input', uporabiPoložajI); //ob spremembi zemljepisne širine
vnosZd.addEventListener('input', uporabiPoložajI); //ob spremembi zemljepisne dolžine

////IZBIRA ČASOVNEGA PASU
function uporabiTčp() {//izberi trenutni časovni pas
    rabaTčp = true;
    tčpIme = Intl.DateTimeFormat().resolvedOptions().timeZone;
    ičpIme = tčpIme;
    daljšiInterval();
};
function uporabiIčp() {
    rabaTčp = false;
    ičpIme = vnosČp.value;
    daljšiInterval();
}
vnosČp.addEventListener('input', uporabiIčp);

////IZBIRA POGLEDA LUNE
function pogledLune() {
    if (prikazLune.checked == true){
        prikazPollune = false;
        document.getElementById("prikazLunePravi").innerHTML = " - drugače kot vidna z njenega s. tečaja.";
    } else {
        prikazPollune = true;
        document.getElementById("prikazLunePravi").innerHTML = " - trenutno kot vidna z njenega s. tečaja.";
    }
    prikaži(); //posodobi prikaz
} prikazLune.addEventListener('input', pogledLune);

////IZBIRA PRIKAZA ZADNJE POLOBLE
function pogledZadnjePoloble() {
    if (prikazZadaj.checked == true){
        prikazZadPoloble = true;
    } else {
        prikazZadPoloble = false;
    }
    prikaži(); //posodobi prikaz
} prikazZadaj.addEventListener('input', pogledZadnjePoloble);
//VIZUALIZACIJA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ustvariSvg(svgId) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (h >= 2 * w) {
        premer = w;
    } else if (w >= 2 * h) {
        premer = h;
    } else {
        premer = w + h - Math.sqrt(2 * w * h);
    }

    // Počisti obstoječi SVG, če obstaja
    d3.select(`#${svgId}`).remove();

    // Ustvari nov SVG element
    const svg = d3.select("body")
        .append("svg")
        .attr("id", svgId)
        .attr("width", premer)
        .attr("height", premer)
        .attr("viewBox", `0 0 ${premer} ${premer}`) // Dodano za ohranjanje dimenzij
        .attr("class", "svg-clock")  // Dodelite skupni razred za vse SVG elemente

    return { svg, premer };
};

// Ustvari globus z D3-Globe
function ustvariGlobus(svg, premer) {
    // Nastavite projekcijo ortografske projekcije
    const projection = d3.geoOrthographic()
        .center([0, 0]) // Središče projekcije
        .scale(globusVelikost * premer / 2) // Scale za velikost globusa
        .clipAngle(90) // Nastavi privzeti kot rezanja
        .translate([premer / 2, premer / 2]);

    const path = d3.geoPath().projection(projection);

    // Nastavi rotacijo projekcije
    projection.rotate([poldne * (-1) + zasuk, -(90 - nagOsi), 0]);

    // Naloži podatke o svetu (GeoJSON)
    d3.json("https://raw.githubusercontent.com/epistler999/GeoLocation/master/world.json").then(function (data) {
        if (!data || !data.features) {
            console.error("GeoJSON podatki niso ustrezno naloženi!");
            return;
        }
        // Dodajanje ozadja za globus
        svg.append("circle")
            .attr("cx", premer / 2)
            .attr("cy", premer / 2)
            .attr("r", globusVelikost*premer / 2)
            .style("fill", "#121212")
            //.style("opacity", 1)
            .style("stroke", "black") // Barva obrobe
            .style("stroke-width", 1.0); // Debelina obrobe

        if (prikazZadPoloble) {
            // Zadnja stran globusa (mreža, morje, celinske oblike)
            projection.clipAngle(0); // Omogoči celotno risanje (brez klipanja)

            svg.append("path")
                .datum({ type: "Sphere" })
                .attr("class", "background")
                .attr("d", path)
                .style("fill", "rgba(0, 0, 255, 0.2)"); //morje

            svg.append("path")
                .datum(d3.geoGraticule10())
                .attr("class", "back-grid")
                .attr("d", path)
                .style("stroke", "rgba(0, 0, 0, 0.1)")
                .style("fill", "none");

            svg.selectAll(".celine-zadaj")
                .data(data.features)
                .enter().append("path")
                .attr("class", "celine-zadaj")
                .attr("d", path)
                .style("fill", "rgba(153, 178, 255, 0.3)")
                .style("stroke", "none");
            ;
            svg.selectAll(".poldnevniki-zadaj")
                .data(d3.range(zamikPoldnevnikov,  360 + zamikPoldnevnikov, 15).map(lon => {
                    return {
                        type: "LineString",
                        coordinates: d3.range(-90, 90, 1).map(lat => [lon, lat])
                    };
                }))
                .enter().append("path")
                .attr("class", "poldnevniki-zadaj")
                .attr("d", path)
                .style("stroke", "grey")
                .style("stroke-width", 1)
                .style("opacity", 0.3)
                .style("fill", "none");

            svg.selectAll(".vzporedniki-zadaj")
                .data([0, 23.44, -23.44, 66.56, -66.56].map(lat => {
                    return {
                        type: "LineString",
                        coordinates: d3.range(-180, 180, 1).map(lon => [lon, lat])
                    };
                }))
                .enter().append("path")
                .attr("class", "vzporedniki-zadaj")
                .attr("d", path)
                .style("stroke", "grey")
                .style("stroke-width", 1)
                .style("opacity", 0.3)
                .style("fill", "none");

            // Risanje poldnevnikov (meridianov) - polnoč in poldne
            const linesDataBack = [
                { type: "LineString", coordinates: [[izd, -90], [izd, 0], [izd, 90]], color: "red" }, // trenutna zem. dolžina
                { type: "LineString", coordinates: [[-180, izš], [0, izš], [180, izš]], color: "red" },  // trenutna zem. širina
                { type: "LineString", coordinates: [[polnoc, -90], [polnoc, 0], [polnoc, 90]], color: "blue" }, // Polnoč
                { type: "LineString", coordinates: [[poldne, -90], [poldne, 0], [poldne, 90]], color: "orange" },  // Poldne
            ];
            // Dodajanje poldnevnikov na globus
            var dodČrteZadaj = svg.selectAll(".črteZadaj")
                .data(linesDataBack);
            dodČrteZadaj.enter().append("path")
                .attr("class", "črteZadaj")
                .merge(dodČrteZadaj)
                .transition().duration(500)
                .attr("d", path)
                .attr("fill", "none")
                .attr("stroke", d => d.color)
                .style("opacity", 0.3)
                .attr("stroke-width", 2);
            dodČrteZadaj.exit().remove();
        };


        // Sprednja stran globusa
        projection.clipAngle(90); // Prikaz samo sprednje strani

        svg.append("circle")
            .attr("cx", premer / 2)
            .attr("cy", premer / 2)
            .attr("r", globusVelikost * premer / 2)
            .style("fill", "#121212")
            .style("opacity", 0.3)
            .style("stroke", "black")
            .style("stroke-width", 1.0);

        svg.selectAll(".land")
            .data(data.features)
            .enter().append("path")
            .attr("class", "land")
            .attr("d", path)
            .style("fill", "rgba(255, 255, 255, 1")
            .style("stroke", "#121212")
            .style("stroke-width", 0.5);

        svg.selectAll(".meridian")
            .data(d3.range(zamikPoldnevnikov,  360 + zamikPoldnevnikov, 15).map(lon => {
                return {
                    type: "LineString",
                    coordinates: d3.range(-90, 90, 1).map(lat => [lon, lat])
                };
            }))
            .enter().append("path")
            .attr("class", "meridian")
            .attr("d", path)
            .style("stroke", "grey")
            .style("stroke-width", 1)
            .style("fill", "none");

        svg.selectAll(".latitude")
            .data([0, 23.44, -23.44, 66.56, -66.56].map(lat => {
                return {
                    type: "LineString",
                    coordinates: d3.range(-180, 180, 1).map(lon => [lon, lat])
                };
            }))
            .enter().append("path")
            .attr("class", "latitude")
            .attr("d", path)
            .style("stroke", "grey")
            .style("stroke-width", 1)
            .style("fill", "none");

        // Risanje poldnevnikov (meridianov) - polnoč in poldne
        const linesData = [
            { type: "LineString", coordinates: [[izd, -90], [izd, 0], [izd, 90]], color: "red" }, // trenutna zem. dolžina
            { type: "LineString", coordinates: [[polnoc, -90], [polnoc, 0], [polnoc, 90]], color: "blue" }, // Polnoč
            { type: "LineString", coordinates: [[poldne, -90], [poldne, 0], [poldne, 90]], color: "orange" }  // Poldne
        ];
        // Dodajanje poldnevnikov na globus
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

        // Risanje vzporednikov (latitud) - ekvator, povratnik in tečajnik
        var additionalLatitudes = [izš];  // Dodatni vzporedniki
        var additionalLatitudesData = additionalLatitudes.map(function (latitude) {
            var coordinates = [];
            for (var lon = -180; lon <= 180; lon++) {
                coordinates.push([lon, latitude]);
            }
            return {
                type: "LineString",
                coordinates: coordinates
            };
        });
        // Določite barve za dodatne vzporednike
        svg.selectAll(".additional-latitude")
            .data(additionalLatitudesData)
            .enter().append("path")
            .attr("class", "additional-latitude")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", function(d, i) {
                // Različne barve za vsak vzporednik
                const colors = ["red"];
                return colors[i];
            })
            .style("stroke-width", 2);  // Širina linije za dodatne vzporednike

    }).catch(function (error) {
        console.error("Napaka pri nalaganju GeoJSON datoteke:", error);
    });
}

/*// Ustvari globus z D3-Globe
function ustvariGlobus(svg, premer) {
    // Nastavite projekcijo Airy
    const projection = d3.geoOrthographic()
        .center([0, 0]) // Središče projekcije je v Greenwichu (0° dolžine, 0° širine)
        .scale(globusVelikost*premer / 2) // Scale za primeren prikaz globusa
        .clipAngle(90) //90
        .translate([premer / 2, premer / 2]);
    const path = d3.geoPath().projection(projection); //uporablja projekcijo za pretvorbo geometrijskih podatkov (GeoJSON) v dejanske risarske poti za SVG

    //projection.rotate([alpha, beta, tilt]); aplpha - zem. dolžina (Y-os), beta - zem. širina (X-os), tilt - Z-os
    projection.rotate([poldne * (-1) + zasuk, -(90-nagOsi), 0]);

    // Naložite podatke o svetu (GeoJSON) in narišite zemljevid
    d3.json("https://raw.githubusercontent.com/epistler999/GeoLocation/master/world.json").then(function (data) {
        // Preverite, če so podatki naloženi
        if (!data || !data.features) {
            console.error("GeoJSON podatki niso ustrezno naloženi!");
            return;
        }
        // Dodajanje ozadja za globus
        svg.append("circle")
            .attr("cx", premer / 2)
            .attr("cy", premer / 2)
            .attr("r", globusVelikost*premer / 2)
            .style("fill", "#121212")
            //.style("opacity", 1)
            .style("stroke", "black") // Barva obrobe
            .style("stroke-width", 1.0); // Debelina obrobe

        // Narišite celinske oblike na osnovi GeoJSON podatkov
        svg.selectAll(".land")
            .data(data.features)
            .enter().append("path")
            .attr("class", "land")
            .attr("d", path)
            .style("fill", "white")
            .style("stroke", "#121212")
            .style("stroke-width", 0.5);

        // Risanje poldnevnikov (meridianov)
        var meridiansData = [];
        for (var lon = zamikPoldnevnikov; lon < 360 + zamikPoldnevnikov; lon += 15) {
            var coordinates = [];
            for (var lat = -90; lat <= 90; lat++) {
                coordinates.push([lon, lat]);
            }
            meridiansData.push({
                type: "LineString",
                coordinates: coordinates
            });
        }
        svg.selectAll(".meridian")
            .data(meridiansData)
            .enter().append("path")
            .attr("class", "meridian")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", "grey")
            .style("stroke-width", 1);
        // Risanje vzporednikov (latituda)
        var latitudes = [0, 23.44, -23.44, 66.56, -66.56];  // Ekvator, povratnik, tečajnik
        var latitudesData = latitudes.map(function (latitude) {
            var coordinates = [];
            for (var lon = -180; lon <= 180; lon++) {
                coordinates.push([lon, latitude]);
            }
            return {
                type: "LineString",
                coordinates: coordinates
            };
        });
        svg.selectAll(".latitude")
            .data(latitudesData)
            .enter().append("path")
            .attr("class", "latitude")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", "grey")  // Barva za vzporednike
            .style("stroke-width", 1);
        
        // Risanje poldnevnikov (meridianov) - polnoč in poldne
        const linesData = [
            { type: "LineString", coordinates: [[izd, -90], [izd, 0], [izd, 90]], color: "red" }, // trenutna zem. dolžina
            { type: "LineString", coordinates: [[polnoc, -90], [polnoc, 0], [polnoc, 90]], color: "blue" }, // Polnoč
            { type: "LineString", coordinates: [[poldne, -90], [poldne, 0], [poldne, 90]], color: "orange" }  // Poldne
        ];
        // Dodajanje poldnevnikov na globus
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

        // Risanje vzporednikov (latitud) - ekvator, povratnik in tečajnik
        var additionalLatitudes = [izš];  // Dodatni vzporedniki
        var additionalLatitudesData = additionalLatitudes.map(function (latitude) {
            var coordinates = [];
            for (var lon = -180; lon <= 180; lon++) {
                coordinates.push([lon, latitude]);
            }
            return {
                type: "LineString",
                coordinates: coordinates
            };
        });
        // Določite barve za dodatne vzporednike
        svg.selectAll(".additional-latitude")
            .data(additionalLatitudesData)
            .enter().append("path")
            .attr("class", "additional-latitude")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", function(d, i) {
                // Različne barve za vsak vzporednik
                const colors = ["red"];
                return colors[i];
            })
            .style("stroke-width", 2);  // Širina linije za dodatne vzporednike

    }).catch(function (error) {
        console.error("Napaka pri nalaganju GeoJSON datoteke:", error);
    });
}*/
// Funkcija za prikaz Zemlje (pogled iz vesolja)
function zemljaPrikaz() {
    const zemlja = ustvariSvg("zemljaPrikaz");

    var layer1 = zemlja.svg.append('g').attr('id', 'layer1');
    var layer2 = zemlja.svg.append('g').attr('id', 'layer2');
    var layer3 = zemlja.svg.append('g').attr('id', 'layer3');
    var layer4 = zemlja.svg.append('g').attr('id', 'layer4');
    var layer5 = zemlja.svg.append('g').attr('id', 'layer5');

    // Naloži zunanjo SVG datoteko in jo umesti v obstoječi SVG
    d3.xml("images/zvezdoslovna_ura/B-Sonce.svg").then(function (xml) {
        const importedSvg = d3.select(xml.documentElement); // Naloženi SVG kot D3 objekt
        //layer1.node().appendChild(importedSvg.node()); // Dodaj zunanji SVG v obstoječi SVG

        // Dodajte skupino (g) za transformacijo
        const gSonca = layer1.append("g").attr("id", "Sonce-group");

        // Dodajte naložen SVG kot otroka skupine
        gSonca.node().appendChild(importedSvg.node());

        // Prilagodite velikost in pozicijo zunanjega SVG
        importedSvg
            .attr("x", 0)  // X pozicija
            .attr("y", 0)  // Y pozicija
            .attr("width", zemlja.premer)  // Širina
            .attr("height", zemlja.premer)  // Višina
            .attr("id", "Sonce");

        // Nastavi transformacijo za skupino (zasuk za 193 stopinj)
        gSonca.attr("transform", `rotate(${(zasuk) *-1}, ${0.5 * zemlja.premer}, ${0.5 * zemlja.premer})`)
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    }); 

    // Naloži zunanjo SVG datoteko in jo umesti v obstoječi SVG
    d3.xml("images/zvezdoslovna_ura/B-letni_casi.svg").then(function (xml) {
        const importedSvg = d3.select(xml.documentElement); // Naloženi SVG kot D3 objekt
        layer2.node().appendChild(importedSvg.node()); // Dodaj zunanji SVG v obstoječi SVG

        // Prilagodite velikost in pozicijo zunanjega SVG
        importedSvg
            .attr("x", 0.05*zemlja.premer)  // X pozicija
            .attr("y", 0.05*zemlja.premer)  // Y pozicija
            .attr("width", 0.9*zemlja.premer)  // Širina
            .attr("height", 0.9*zemlja.premer)  // Višina
            .attr("id", "letniCasi");
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });


    // Naloži zunanjo SVG datoteko in jo umesti v obstoječi SVG
    d3.xml("images/zvezdoslovna_ura/S-letna_stevilcnica.svg").then(function (xml) {
        const importedSvg = d3.select(xml.documentElement); // Naloženi SVG kot D3 objekt
        //layer2.node().appendChild(importedSvg.node()); // Dodaj zunanji SVG v obstoječi SVG

        // Dodajte skupino (g) za transformacijo
        const gLetStev = layer2.append("g").attr("id", "letStev-group");

        // Dodajte naložen SVG kot otroka skupine
        gLetStev.node().appendChild(importedSvg.node());

        // Prilagodite velikost in pozicijo zunanjega SVG
        importedSvg
            .attr("x", 0)  // X pozicija
            .attr("y", 0)  // Y pozicija
            .attr("width", zemlja.premer)  // Širina
            .attr("height", zemlja.premer)  // Višina
            .attr("id", "letnaStevilcnica");
        // Nastavi transformacijo za skupino (zasuk za 193 stopinj)
        gLetStev.attr("transform", `rotate(${(razlikaObratStop + prestopno) *-1}, ${0.5 * zemlja.premer}, ${0.5 * zemlja.premer})`)
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });

    ustvariGlobus(layer3, zemlja.premer); // Klic funkcije za risanje globusa

    // Naloži zunanjo SVG datoteko in jo umesti v obstoječi SVG
    d3.xml("images/zvezdoslovna_ura/Senca.svg").then(function (xml) {
        const importedSvg = d3.select(xml.documentElement); // Naloženi SVG kot D3 objekt
        //layer3.node().appendChild(importedSvg.node()); // Dodaj zunanji SVG v obstoječi SVG

        // Dodajte skupino (g) za transformacijo
        const gElement = layer4.append("g").attr("id", "senca-group");

        // Dodajte naložen SVG kot otroka skupine
        gElement.node().appendChild(importedSvg.node());

        // Prilagodi dimenzije in transformacijo
        importedSvg
            .attr("x", (1-globusVelikost)/2 * zemlja.premer) // X pozicija
            .attr("y", (1-globusVelikost)/2 * zemlja.premer) // Y pozicija
            .attr("width", globusVelikost * zemlja.premer) // Širina
            .attr("height", globusVelikost * zemlja.premer) // Višina
            .attr("id", "senca");

        // Nastavi transformacijo za skupino (zasuk za 193 stopinj)
        gElement.attr("transform", `rotate(${(zasuk)*-1}, ${0.1 * zemlja.premer + 0.4 * zemlja.premer}, ${0.1 * zemlja.premer + 0.4 * zemlja.premer})`)
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });

    // Naloži zunanjo SVG datoteko in jo umesti v obstoječi SVG
    d3.xml("images/zvezdoslovna_ura/B-urna_stevilcnica2.svg").then(function (xml) {
        const importedSvg = d3.select(xml.documentElement); // Naloženi SVG kot D3 objekt
        //layer3.node().appendChild(importedSvg.node()); // Dodaj zunanji SVG v obstoječi SVG

        // Dodajte skupino (g) za transformacijo
        const gElement = layer4.append("g").attr("id", "urnaStev-group");

        // Dodajte naložen SVG kot otroka skupine
        gElement.node().appendChild(importedSvg.node());

        var velUSt = globusVelikost*1.07;
        // Prilagodi dimenzije in transformacijo
        importedSvg
            .attr("x", (1-velUSt)/2 * zemlja.premer) // X pozicija
            .attr("y", (1-velUSt)/2 * zemlja.premer) // Y pozicija
            .attr("width", velUSt * zemlja.premer) // Širina
            .attr("height", velUSt * zemlja.premer) // Višina
            .attr("id", "senca")
            .style("opacity", "0.5");

        // Nastavi transformacijo za skupino (zasuk za 193 stopinj)
        gElement.attr("transform", `rotate(${(zasuk)*-1}, ${0.1 * zemlja.premer + 0.4 * zemlja.premer}, ${0.1 * zemlja.premer + 0.4 * zemlja.premer})`)
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });

    izpiši();
    lunaZasuk = lMena*360;
        console.log("lunaZasuk%90 = ", lunaZasuk%90);
        console.log("vradiane(lunaZasuk%90) = ", vradiane(lunaZasuk%90));
    željenKot = 90 - (lunaZasuk%90)
    odmikMene = Math.cos(vradiane(željenKot));
        console.log("odmikMene: ", odmikMene);
    if (0.25 <= lMena && lMena < 0.75) {
        barvaMene = "white";
    } else {
        barvaMene = "black";
    }
    const lunaGroup = layer5.append("g")
        
    /*const lunaTir = lunaGroup.append("circle")
        .attr("cx", 0.5*zemlja.premer)
        .attr("cy", 0.5*zemlja.premer)
        .attr("r", 0.425*zemlja.premer)
        .style("fill", "none")
        .style("stroke", "blue") // Barva obrobe
        .style("stroke-width", 1.0); // Debelina obrobe*/

        // Naloži zunanjo SVG datoteko in jo umesti v obstoječi SVG
    d3.xml("images/zvezdoslovna_ura/polluna.svg").then(function (xml) {
        const importedSvg = d3.select(xml.documentElement); // Naloženi SVG kot D3 objekt
        //layer3.node().appendChild(importedSvg.node()); // Dodaj zunanji SVG v obstoječi SVG

        // Dodajte skupino (g) za transformacijo
        const gPolluna = lunaGroup.append("g").attr("id", "gPolluna");

        // Dodajte naložen SVG kot otroka skupine
        gPolluna.node().appendChild(importedSvg.node());

        // Prilagodi dimenzije in transformacijo
        importedSvg
            .attr("x", 0.5*zemlja.premer - lunaVelikost*zemlja.premer/2) // X pozicija
            .attr("y", 0.5*zemlja.premer + 0.425*zemlja.premer - lunaVelikost*zemlja.premer) // Y pozicija
            .attr("width", lunaVelikost*zemlja.premer) // Širina
            .attr("height", lunaVelikost*zemlja.premer) // Višina
            .attr("id", "polluna");
        if (!prikazPollune) {
            gPolluna.append("ellipse")
                .attr("cx", 0.5*zemlja.premer)   // Središče elipse (X koordinata)
                .attr("cy", 0.5*zemlja.premer + 0.425*zemlja.premer - lunaVelikost*zemlja.premer/2)   // Središče elipse (Y koordinata)
                .attr("rx", lunaVelikost*zemlja.premer/2)    // Vodoravni polmer
                .attr("ry", odmikMene * lunaVelikost*zemlja.premer/2)    // Navpični polmer
                .style("fill", barvaMene)      // Barva zapolnitve
                .style("stroke", "none")  // Barva obrobe
                .style("stroke-width", 0); // Debelina obrob
            gPolluna.attr("transform", `rotate(${90}, ${0.5*zemlja.premer}, ${0.5*zemlja.premer + 0.425*zemlja.premer - lunaVelikost*zemlja.premer/2})`)
        } else {
            gPolluna.attr("transform", `rotate(${lunaZasuk}, ${0.5*zemlja.premer}, ${0.5*zemlja.premer + 0.425*zemlja.premer - lunaVelikost*zemlja.premer/2})`)
        }
        lunaGroup.attr("transform", `rotate(${(lunaZasuk + zasuk)*-1}, ${0.5*zemlja.premer}, ${0.5*zemlja.premer})`);
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    }); 
}

// Funkcija za prikaz nebesnega svoda (pogled z Zemlje)
function neboPrikaz() {
    const nebo = ustvariSvg("neboPrikaz");
}

function izpiši() {
    tč = new Date();
    var tčO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
        hour: '2-digit',
        minute: '2-digit',
        //second: '2-digit',
        timeZone: ičpIme,
        hour12: false,
    }).format(tč);
    tLeto = tč.getFullYear().toString(); //.padStart(4, '0');
    tMesec = tč.getMonth()
        tMesecBe = meseci[tMesec];
    tTedDan = tč.getDay();
        tTedDanBe = dneviTedna[tTedDan];
    tDan = tč.getDate().toString(); //.padStart(2, '0');
    tUre = tč.getHours();
    tMin = tč.getMinutes();
    document.getElementById("tčP").innerHTML = `${tčO}, ${tDan}. ${tMesecBe} ${tLeto}, ${tTedDanBe}`;
    vnosIč.value = `${ič.getFullYear().toString().padStart(4, '0')}-${(ič.getMonth()+1).toString().padStart(2, '0')}-${ič.getDate().toString().padStart(2, '0')}T${ič.getHours().toString().padStart(2, '0')}:${ič.getMinutes().toString().padStart(2, '0')}`;
    
    var tProsinec = new Date(tč.getFullYear(), 11, 21); //za nas je to zima
        var tOdmik1 = getTimezoneOffsetFromUTC(ičpIme, tProsinec);
        //var tOdmik1 = tProsinec.getTimezoneOffset();
    var tRožnik = new Date(tč.getFullYear(), 5, 21); //za nas je to poletje
        var tOdmik2 = getTimezoneOffsetFromUTC(ičpIme, tRožnik);
        //var tOdmik2 = tRožnik.getTimezoneOffset();
    if (tOdmik1 !== tOdmik2) {
        tOdmikB = Math.min(Math.abs(tOdmik1), Math.abs(tOdmik2)); //izbere manjšega od odmikov
        tčB = new Date(tč.getTime() + tOdmikB * 60*1000);
        var tčBO = new Intl.DateTimeFormat('sl-SI', {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: 'UTC',  // Nastavite na UTC
            hour12: false,
        }).format(tčB);
        if (ičBO !== ičO) {
            document.getElementById("tčBP").innerHTML = `${tčBO}<span class="pripis"> - brez premika na poletni čas</span>`
        } else {
            document.getElementById("tčBP").innerHTML = `<span class="pripis">Poletni čas ni v veljavi.</span>`
        };
    } else if (tOdmik1 == tOdmik2) {
        document.getElementById("tčBP").innerHTML = '<span class="pripis">Izbrani čas. pas ne uporablja poletnega premika.</span>'
    };

    if (rabaTč) {
        document.getElementById("ičDP").style.display = "none";
        document.getElementById("pripisTč").innerHTML = "trenutni in izbrani čas";
    } else { 
        document.getElementById("ičDP").style.display = "initial";
        document.getElementById("pripisTč").innerHTML = "trenutni čas";
        var ičO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme,
            hour12: false,
        }).format(ič);
        iLeto = ič.getFullYear().toString(); //.padStart(4, '0');
        iMesec = ič.getMonth()
            iMesecBe = meseci[iMesec];
        iTedDan = ič.getDay();
            tTedDanBe = dneviTedna[iTedDan];
        iDan = ič.getDate().toString(); //.padStart(2, '0');
        document.getElementById("ičP").innerHTML = `${ičO}, ${iDan}. ${iMesecBe} ${iLeto}, ${iTedDanBe}`;

        var iOdmik = getTimezoneOffsetFromUTC(ičpIme, ič);
            console.log("iOdmik: ", iOdmik);

        var iProsinec = new Date(ič.getFullYear(), 11, 21); //za nas je to zima
            var iOdmik1 = getTimezoneOffsetFromUTC(ičpIme, iProsinec);
            //var iOdmik1 = iProsinec.getTimezoneOffset();
        var iRožnik = new Date(ič.getFullYear(), 5, 21); //za nas je to poletje
            var iOdmik2 = getTimezoneOffsetFromUTC(ičpIme, iRožnik);
            //var iOdmik2 = iRožnik.getTimezoneOffset();
        if (iOdmik1 !== iOdmik2) {
            iOdmikB = Math.min(Math.abs(iOdmik1), Math.abs(iOdmik2)); //izbere manjšega od odmikov
            ičB = new Date(ič.getTime() + iOdmikB * 60*1000);
            var ičBO = new Intl.DateTimeFormat('sl-SI', {
                hour: '2-digit',
                minute: '2-digit',
                //second: '2-digit',
                timeZone: 'UTC',  // Nastavite na UTC
                hour12: false,
            }).format(ičB);
            if (ičBO !== ičO) {
                document.getElementById("ičBP").innerHTML = `${ičBO}<span class="pripis"> - brez premika na poletni čas</span>`
            } else {
                document.getElementById("ičBP").innerHTML = `<span class="pripis">Poletni čas ni v veljavi.</span>`
            }
        } else if (iOdmik1 == iOdmik2) {
            document.getElementById("ičBP").innerHTML = '<span class="pripis">Izbrani čas. pas ne uporablja poletnega premika.</span>'
        };
    };

    ////SUNCALC - POLOŽAJI IN LUNA
    sPoložaj = SunCalc.getPosition(ič, izš, izd) //Položaj Sonca
        sVis = sPoložaj.altitude; //višina Sonca na nebu v radianih
            sVisStop = vstopinje(sVis);
            document.getElementById("sVisP").innerHTML = sVisStop.toFixed(4) + " °";
        sAzi = sPoložaj.azimuth;
            sAziStop = vstopinje(sAzi);
            document.getElementById("sAziP").innerHTML = sAziStop.toFixed(4) + " °";

    lPol = SunCalc.getMoonPosition(ič, izš, izd) //Položaj Lune
        lVis = lPol.altitude;
            lVisStop = vstopinje(lVis);
            document.getElementById("lVisP").innerHTML = lVisStop.toFixed(4) + " °";
        lAzi = lPol.azimuth;
            lAziStop = vstopinje(lAzi);
            document.getElementById("lAziP").innerHTML = lAziStop.toFixed(4) + " °";
        lOdd = lPol.distance; //Oddaljenost Lune
            document.getElementById("lOddP").innerHTML = lOdd.toFixed(0) + " km";
        lPar = lPol.parallacticAngle; //Nagnjenost ravnine Luninega kroženja glede na navpičnico položaja opazovanja
            lParStop = vstopinje(lPar);
            document.getElementById("lParP").innerHTML = lParStop.toFixed(4) + " °";

    lOsvetljenost = SunCalc.getMoonIllumination(ič); 
        lOsv = lOsvetljenost.fraction;
            document.getElementById("lOsvP").innerHTML = (lOsv*100).toFixed(1) + " %";
        lKot = lOsvetljenost.angle; //v radianih
            //document.getElementById("lKotP").innerHTML = lKot.toFixed(4);
            lKotStop = vstopinje(lKot);
            document.getElementById("lKotP").innerHTML = lKotStop.toFixed(4) + " °";
        lMena = lOsvetljenost.phase;
            document.getElementById("lMenaP").innerHTML = lMena.toFixed(4);
};
setInterval(izpiši, 1000); //Posodablja izpis podatkov vsako sekundo
izpiši();

function izpišiČase() {
    časi = SunCalc.getTimes(ič, izš, izd);

        var nočK = časi.nightEnd
            nočK = new Date(nočK)
        nočKO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(nočK);
        /*document.getElementById("resultNočKon").innerHTML = `${NočKon.getHours().toString().padStart(2, '0')}:${NočKon.getMinutes().toString().padStart(2, '0')}:${NočKon.getSeconds().toString().padStart(2, '0')}`;*/

        var poZoraZ = časi.nauticalDawn
            poZoraZ = new Date(poZoraZ)
        poZoraZO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(poZoraZ);
        /*document.getElementById("resultPomZora").innerHTML = `${PomZora.getHours().toString().padStart(2, '0')}:${PomZora.getMinutes().toString().padStart(2, '0')}:${PomZora.getSeconds().toString().padStart(2, '0')}`;*/

        var zoraZ = časi.dawn //začetek zore
            zoraZ = new Date(zoraZ);
        zoraZO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, { //oblikujemo čas zore
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(zoraZ); 
        /*document.getElementById("resultZora").innerHTML = `${Zora.getHours().toString().padStart(2, '0')}:${Zora.getMinutes().toString().padStart(2, '0')}:${Zora.getSeconds().toString().padStart(2, '0')}`;*/
        
        var sVzhodZ = časi.sunrise
            sVzhodZ = new Date(sVzhodZ)
        sVzhodZO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(sVzhodZ);
        /*document.getElementById("resultSonVzh").innerHTML = `${SonVzh.getHours().toString().padStart(2, '0')}:${SonVzh.getMinutes().toString().padStart(2, '0')}:${SonVzh.getSeconds().toString().padStart(2, '0')}`;*/
        
        var sVzhodK = časi.sunriseEnd
            sVzhodK = new Date(sVzhodK)
        sVzhodKO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(sVzhodK);
        /*document.getElementById("resultSonVzhKon").innerHTML = `${SonVzhKon.getHours().toString().padStart(2, '0')}:${SonVzhKon.getMinutes().toString().padStart(2, '0')}:${SonVzhKon.getSeconds().toString().padStart(2, '0')}`;*/

        var zlataK = časi.goldenHourEnd
            zlataK = new Date(zlataK)
        zlataKO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(zlataK);
        /*document.getElementById("resultZlataUraKon").innerHTML = `${zlataUraKon.getHours().toString().padStart(2, '0')}:${zlataUraKon.getMinutes().toString().padStart(2, '0')}:${zlataUraKon.getSeconds().toString().padStart(2, '0')}`;*/

        var poldne = časi.solarNoon
            poldne = new Date(poldne)
        poldneO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(poldne);
        /*document.getElementById("resultPoldne").innerHTML = `${Poldne.getHours().toString().padStart(2, '0')}:${Poldne.getMinutes().toString().padStart(2, '0')}:${Poldne.getSeconds().toString().padStart(2, '0')}`;*/

        var zlataZ = časi.goldenHour
            zlataZ = new Date(zlataZ)
        zlataZO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(zlataZ);
        /*document.getElementById("resultZlataUra").innerHTML = `${zlataUra.getHours().toString().padStart(2, '0')}:${zlataUra.getMinutes().toString().padStart(2, '0')}:${zlataUra.getSeconds().toString().padStart(2, '0')}`;*/

        var sZahodZ = časi.sunsetStart
            sZahodZ = new Date(sZahodZ)
        sZahodZO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(sZahodZ);

        var sZahodK = časi.sunset
            sZahodK = new Date(sZahodK)
        sZahodKO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(sZahodK);
        /*document.getElementById("resultSonZah").innerHTML = `${SonZah.getHours().toString().padStart(2, '0')}:${SonZah.getMinutes().toString().padStart(2, '0')}:${SonZah.getSeconds().toString().padStart(2, '0')}`;*/

        var mrakK = časi.dusk //konec mraka
            mrakK = new Date(mrakK)
        mrakKO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(mrakK);
        /*document.getElementById("resultMrak").innerHTML = `${Mrak.getHours().toString().padStart(2, '0')}:${Mrak.getMinutes().toString().padStart(2, '0')}:${Mrak.getSeconds().toString().padStart(2, '0')}`;*/
        
        var poMrakK = časi.nauticalDusk
            poMrakK = new Date(poMrakK)
        poMrakKO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(poMrakK);
        /*document.getElementById("resultPomMrak").innerHTML = `${PomMrak.getHours().toString().padStart(2, '0')}:${PomMrak.getMinutes().toString().padStart(2, '0')}:${PomMrak.getSeconds().toString().padStart(2, '0')}`;*/

        var nočZ = časi.night
            nočZ = new Date(nočZ)
        nočZO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(nočZ);
        /*document.getElementById("resultNoč").innerHTML = `${Noč.getHours().toString().padStart(2, '0')}:${Noč.getMinutes().toString().padStart(2, '0')}:${Noč.getSeconds().toString().padStart(2, '0')}`;*/
        
        var nadir = časi.nadir
            nadir = new Date(nadir)
        nadirO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
            hour: '2-digit',
            minute: '2-digit',
            //second: '2-digit',
            timeZone: ičpIme
        }).format(nadir);

    //Izpis
    document.getElementById("zvZoraP").innerHTML = `${nočKO} - ${poZoraZO}`;
    document.getElementById("poZoraP").innerHTML = `${poZoraZO} - ${zoraZO}`;
    document.getElementById("zoraP").innerHTML = `${zoraZO} - ${sVzhodZO}`;
    document.getElementById("soVzhodP").innerHTML = `${sVzhodZO} - ${sVzhodKO}`;
    document.getElementById("poldneP").innerHTML = `${poldneO}`;
    document.getElementById("soZahodP").innerHTML = `${sZahodZO} - ${sZahodKO}`;
    document.getElementById("mrakP").innerHTML = `${sZahodKO} - ${mrakKO}`;
    document.getElementById("poMrakP").innerHTML = `${mrakKO} - ${poMrakKO}`;
    document.getElementById("zvMrakP").innerHTML = `${poMrakKO} - ${nočZO}`;
    document.getElementById("nadir1P").innerHTML = `${nadirO}`;
    document.getElementById("nadir2P").innerHTML = `${nadirO}`;

    if (nadir < new Date(nadir.getFullYear(), nadir.getMonth(), nadir.getDate(), 12, 0, 0)) { //če je nadir pred poldnevom tega dne, torej po polnoči, zjutraj
        /*resultNadir1.innerHTML = `${Nadir.getHours().toString().padStart(2, '0')}:${Nadir.getMinutes().toString().padStart(2, '0')}:${Nadir.getSeconds().toString().padStart(2, '0')}`;*/
        document.getElementById("nadir1").style.display = 'table-row';
        document.getElementById("nadir2").style.display = 'none';
    } else {
        document.getElementById("nadir1").style.display = 'none';
        document.getElementById("nadir2").style.display = 'table-row';
    }

    lČasi = SunCalc.getMoonTimes(ič, izš, izd)
        if (lČasi.alwaysUp == true) {
            document.getElementById("lNebP").innerHTML = "ves dan nad obzorjem";
        } else if (lČasi.alwaysDown == true) {
            document.getElementById("lNebP").innerHTML = "ves dan pod obzorjem";
        } else {
            if (lČasi.rise) {
                var lVzhod = lČasi.rise
                    lVzhod = new Date(lVzhod)
                lVzhodO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
                    hour: '2-digit',
                    minute: '2-digit',
                    //second: '2-digit',
                    timeZone: ičpIme
                }).format(lVzhod);
                /*document.getElementById("resultVzhLune").innerHTML = `${VzhLune.getHours().toString().padStart(2, '0')}:${VzhLune.getMinutes().toString().padStart(2, '0')}:${VzhLune.getSeconds().toString().padStart(2, '0')}`;*/
            } else {
                var ičpd = new Date(ič)
                ičpd.setDate(ičpd.getDate() - 1); //izbrani čas prejšnjega dne
                lČasiPD = SunCalc.getMoonTimes(ičpd, izš, izd);
                var lVzhod = lČasiPD.rise
                    lVzhod = new Date(lVzhod)
                lVzhodO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
                    hour: '2-digit',
                    minute: '2-digit',
                    //second: '2-digit',
                    timeZone: ičpIme
                }).format(lVzhod);
                lVzhodO = `<span class="pripis">${lVzhodO}</span> PD`;
                //lVzhodO = "/"; //Danes ne vzhaja
            }
            if (lČasi.set) {
                var lZahod = lČasi.set;
                    lZahod = new Date(lZahod);
                lZahodO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
                    hour: '2-digit',
                    minute: '2-digit',
                    //second: '2-digit',
                    timeZone: ičpIme
                }).format(lZahod);
                /*document.getElementById("resultZahLune").innerHTML = `${ZahLune.getHours().toString().padStart(2, '0')}:${ZahLune.getMinutes().toString().padStart(2, '0')}:${ZahLune.getSeconds().toString().padStart(2, '0')}`;*/
                /*document.getElementById("resultSonZahZač").innerHTML = `${SonZahZač.getHours().toString().padStart(2, '0')}:${SonZahZač.getMinutes().toString().padStart(2, '0')}:${SonZahZač.getSeconds().toString().padStart(2, '0')}`;*/
            } else {
                var ičnd = new Date(ič)
                ičnd.setDate(ičnd.getDate() + 1); //izbrani čas naslednjega dne
                lČasiND = SunCalc.getMoonTimes(ičnd, izš, izd);
                var lZahod = lČasiND.set;
                    lZahod = new Date(lZahod);
                lZahodO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
                    hour: '2-digit',
                    minute: '2-digit',
                    //second: '2-digit',
                    timeZone: ičpIme
                }).format(lZahod);
                lZahodO = `ND <span class="pripis">${lZahodO}</span>`;
                //lZahodO = "/"; //Danes ne zahaja
            }
            if (lVzhod.getTime() < lZahod.getTime()) {
                document.getElementById("lNebP").innerHTML = `${lVzhodO} - ${lZahodO}`;
            } else if (lVzhod.getTime() > lZahod.getTime()) {
                document.getElementById("lNebP").innerHTML = `PD - ${lZahodO};  ${lVzhodO} - ND`;
            }
            lPoldne = new Date((lVzhod.getTime() + lZahod.getTime()) / 2);
            lPoldneO = new Intl.DateTimeFormat('sl-SI'/*'sl-SI'*/, {
                hour: '2-digit',
                minute: '2-digit',
                //second: '2-digit',
                timeZone: ičpIme
            }).format(lPoldne);
            document.getElementById("lPoldneP").innerHTML = `${lPoldneO}`;
        }
};




function daljšiInterval() { //Posodobi vse
    //POSODOBI TRENUTNE VREDNOSTI
    tč = new Date();
    if (rabaTč) {//Če se uporablja trenutni čas, posodobi ta trenutni čas
        ič = tč;
    };
    if (rabaTpoložaj) {//Če se uporablja trenutni zemljepisni položaj, posodobi ta trenutni položaj
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                tzš = position.coords.latitude;
                tzd = position.coords.longitude;
                izš = tzš;
                izd = tzd;
            }, function(error) {
                console.error("Napaka pri pridobivanju trenutnega zemljepisnega položaja:", error);
            });
        } else {
            alert("Pridobivanje trenutnega zemljepisnega položaja ni podprto v tem brskalniku.");
        };
    };
    vnosZš.value = izš;
    vnosZd.value = izd;
    if (rabaTčp) {//Če se uporablja trenutni časovni pas, posodobi ta trenutni časovni pas
        tčpIme = Intl.DateTimeFormat().resolvedOptions().timeZone;
        ičpIme = tčpIme;
    };
    vnosČp.value = ičpIme;

    iUre = ič.getHours();
    iMin = ič.getMinutes();
    iSek = ič.getSeconds();
    vnosIč.value = `${ič.getFullYear().toString().padStart(4, '0')}-${(ič.getMonth()+1).toString().padStart(2, '0')}-${ič.getDate().toString().padStart(2, '0')}T${ič.getHours().toString().padStart(2, '0')}:${ič.getMinutes().toString().padStart(2, '0')}`;
    
    iUreUTC = ič.getUTCHours();
    iMinUTC = ič.getUTCMinutes();
    iSekUTC = ič.getUTCSeconds();

    zamikPoldnevnikov = (iMinUTC+(iSekUTC/60))/60 *-15;
    polnoc = ((24 - iUreUTC)/24)*360 + zamikPoldnevnikov;
    poldne = (polnoc + 180)%360;
    var iPrviDanLeta = new Date(ič.getFullYear(), 0, 1);//1. prosinec izbranega leta
    var razlika = ič - iPrviDanLeta;// Izračun razlike med izbranim časom in prvim dnevom leta
    var iDanLeta = razlika / dan;
        console.log("iDanLeta:" + iDanLeta);
    iDanLetaStop = (360/dolžinaLeta)*(iDanLeta-1);
        console.log("iDanLetaStop:" + iDanLetaStop);
    razlikaObratStop = 11*360/dolžinaLeta; //razlika med zimskim sončevim obratom in začetkom koledarskega leta - teh 11 dni preračunanih v stopinje
    if (leapYear(ič.getFullYear())) {
        console.log("Leto je prestopno");
        prestopno = 360/dolžinaLeta;
    } else {
        prestopno = 0;
        console.log("Leto ni prestopno.");
    };
    zasuk = iDanLetaStop + razlikaObratStop + prestopno;

    var w = window.innerWidth;
    var h = window.innerHeight;
    if (h >= 2 * w) {
        premer = w;
    } else if (w >= 2 * h) {
        premer = h;
    } else {
        premer = w + h - Math.sqrt(2 * w * h);
    }

    zemljaPrikaz(); //Znova nariši napravo Zemlje
    neboPrikaz(); //Znova nariše napravo Neba
    izpiši(); //Posodobi izpis časa in položajev Sonca in Lune
    izpišiČase(); //Posodobi čase delov dneva
    console.log("lOsvetljenost: ", lOsvetljenost);
    console.log("časi: ", časi);
}
setInterval(daljšiInterval, 60*1000);
daljšiInterval();

// Funkcija za inicializacijo obeh prikazov
function prikaži() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (h >= 2 * w) {
        premer = w;
    } else if (w >= 2 * h) {
        premer = h;
    } else {
        premer = w + h - Math.sqrt(2 * w * h);
    }

    zemljaPrikaz(); //Znova nariši napravo Zemlje
    neboPrikaz(); //Znova nariše napravo Neba
}
window.addEventListener("resize", prikaži);
prikaži();
