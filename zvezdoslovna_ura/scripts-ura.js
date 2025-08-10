// Zvezdoslovne stalnice ////////////////////////
const dolžinaLeta = 365.2425;
const dan = 24*60*60*1000; //1 dan v milisekundah
const astMesec = (((29*24+12)*60+44)*60+2.9)*1000; //astronomski mesec (29 dni, 12 ur, 44 minut in 2.9 sekund) v milisekundah
const astMesecDni = astMesec / dan;//astronomski mesec v dnevih
const nagOsi = 23.4392811; //nagnjenost Zemljine osi v stopinjah
const odZem = 149598023; //povprečna oddaljenost Zemlje od Sonca (v km)
const polmerSonca = 696000; //polmer Sonca (v km)
const polmerZemlje = 6356.752; //polmer Zemlje (na tečajih; v km)
const polmerLune = 3474; //polmer Lune (v km)

// Nastavitve ////////////////////////////////////////////////
let IČas = new Date();
let TČas = true;
let IČPas = "Europe/Ljubljana"
let TČPas = true;
let IPolD = 0;
let IPolŠ = 0;
let TPol = true;

let lunaZZemlje = false;
let zadnjaPolobla = true;

let intČas = 30000; // 30 sek;
let intPas = 600000; // 10 min;
let intPol = 300000; // 5 min;

let decStop = 2;
let decOdst = 2;

let prosSence = 0.7; // prosojnost sence
let polUre = true;

// nenastavljive
const premerGlob = 0.7; // premer globusa
const lunaVelikost = (0.85 - premerGlob)/2;

// Izračunani podatki ////////////////////////////////////////
let podatki = null;

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

/////////////////////////////////////////////////////////////

let oknoPisno = null;
let oknoNastavitve = null;

let intervalČas = null; // ali se posodablja
let intervalČPas = null; // ali se posodablja
let intervalPol = null; // ali se posodablja

let zamikPoldnevnikov;
let zamikLeta = 11*360/dolžinaLeta;
let letniZasuk = 0;

////////////////////////////////////////////////////////////////

function vStopinje(rad) {
    return rad*(180/Math.PI);
}
function vRadiane(stop) {
    return stop*(Math.PI/180);
}

function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};

function ustvariSVG(id) {
    let premer;
    d3.select(`#${id}`).remove(); // Počisti obstoječi SVG, če obstaja

    var main = document.querySelector('main');
    var w = main.offsetWidth; //window.innerWidth;
    var h = main.offsetHeight; //window.innerHeight;
    if (polUre) {
        premer = Math.min(w, h);
    } else {
        if (h >= 2 * w) {
            premer = w;
        } else if (w >= 2 * h) {
            premer = h;
        } else {
            premer = w + h - Math.sqrt(2 * w * h);
        }
    }

    // Ustvari nov SVG element
    const svg = d3.select("main")
        .append("svg")
        .attr("id", id)
        .attr("width", premer)
        .attr("height", premer)
        .attr("viewBox", `0 0 ${premer} ${premer}`)
        .attr("class", "part")

    return { svg, premer };
};

// Ustvari globus z D3-Globe
function narišiGlobus(svg, premer, zamikPoldnevnikov, polnoc, poldne) {
    // Nastavite projekcijo ortografske projekcije
    const projection = d3.geoOrthographic()
        .center([0, 0]) // Središče projekcije
        .scale(premerGlob * premer / 2) // Scale za velikost globusa
        .clipAngle(90) // Nastavi privzeti kot rezanja
        .translate([premer / 2, premer / 2]);

    const path = d3.geoPath().projection(projection);

    // Nastavi rotacijo projekcije
    projection.rotate([poldne * (-1) + letniZasuk, -(90 - nagOsi), 0]);

    // Naloži podatke o svetu (GeoJSON)
    d3.json("world.json").then(function (data) {
        if (!data || !data.features) {
            console.error("GeoJSON podatki niso ustrezno naloženi!");
            return;
        }
        // Dodajanje ozadja za globus
        svg.append("circle")
            .attr("cx", premer / 2)
            .attr("cy", premer / 2)
            .attr("r", premerGlob*premer / 2)
            .style("fill", "#121212")
            //.style("opacity", 1)
            .style("stroke", "black") // Barva obrobe
            .style("stroke-width", 1.0); // Debelina obrobe

        if (zadnjaPolobla) {
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
                .style("stroke", "rgba(0, 0, 0, 0.2)")
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
                { type: "LineString", coordinates: [[IPolD, -90], [IPolD, 0], [IPolD, 90]], color: "red" }, // trenutna zem. dolžina
                { type: "LineString", coordinates: [[-180, IPolŠ], [0, IPolŠ], [180, IPolŠ]], color: "red" },  // trenutna zem. širina
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
            .attr("r", premerGlob * premer / 2)
            .style("fill", "grey")
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
            { type: "LineString", coordinates: [[IPolD, -90], [IPolD, 0], [IPolD, 90]], color: "red" }, // trenutna zem. dolžina
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
        var additionalLatitudes = [IPolŠ];  // Dodatni vzporedniki
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
function poglejZemljo(letniZasuk, zamikPoldnevnikov, polnoc, poldne) {
    const naZemljo = ustvariSVG("naZemljo");

    var layer1 = naZemljo.svg.append('g').attr('id', 'layer1');
    var layer2 = naZemljo.svg.append('g').attr('id', 'layer2');
    var layer3 = naZemljo.svg.append('g').attr('id', 'layer3');
    var layer4 = naZemljo.svg.append('g').attr('id', 'layer4');
    var layer5 = naZemljo.svg.append('g').attr('id', 'layer5');

    /*naZemljo.svg.append("circle")
        .attr("cx", 0.5*naZemljo.premer)
        .attr("cy", 0.5*naZemljo.premer)
        .attr("r", 0.5*naZemljo.premer)
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", 1);*/

    // Naloži zunanjo SVG datoteko in jo umesti v obstoječi SVG
    d3.xml("images/Sonce.svg").then(function (xml) {
        const importedSVG = d3.select(xml.documentElement); 
        const gSonca = layer1.append("g").attr("id", "gSonce");
        gSonca.node().appendChild(importedSVG.node());

        importedSVG
            .attr("x", 0)  // X pozicija
            .attr("y", 0)  // Y pozicija
            .attr("width", naZemljo.premer)
            .attr("height", naZemljo.premer)
            .attr("id", "Sonce");

        gSonca.attr("transform", `rotate(${(letniZasuk) *-1}, ${0.5 * naZemljo.premer}, ${0.5 * naZemljo.premer})`)
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });

    d3.xml("images/letni_casi.svg").then(function (xml) {
        const importedSVG = d3.select(xml.documentElement);
        layer2.node().appendChild(importedSVG.node());

        importedSVG
            .attr("x", 0.05*naZemljo.premer)  // X pozicija
            .attr("y", 0.05*naZemljo.premer)  // Y pozicija
            .attr("width", 0.9*naZemljo.premer)
            .attr("height", 0.9*naZemljo.premer)
            .attr("id", "letniCasi");
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });

    d3.xml("images/letna_stevilcnica.svg").then(function (xml) {
        const importedSVG = d3.select(xml.documentElement);
        const gLetStev = layer2.append("g").attr("id", "gLetStev");
        gLetStev.node().appendChild(importedSVG.node());

        importedSVG
            .attr("x", 0)  // X pozicija
            .attr("y", 0)  // Y pozicija
            .attr("width", naZemljo.premer)
            .attr("height", naZemljo.premer)
            .attr("id", "letnaStevilcnica");

        gLetStev.attr("transform", `rotate(${zamikLeta *-1}, ${0.5 * naZemljo.premer}, ${0.5 * naZemljo.premer})`)
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });

    narišiGlobus(layer3, naZemljo.premer, zamikPoldnevnikov, polnoc, poldne);

    d3.xml("images/Senca.svg").then(function (xml) {
        const importedSVG = d3.select(xml.documentElement);
        const gSenca = layer4.append("g").attr("id", "gSenca");
        gSenca.node().appendChild(importedSVG.node());

        importedSVG
            .attr("x", (1-premerGlob)/2 * naZemljo.premer) // X pozicija
            .attr("y", (1-premerGlob)/2 * naZemljo.premer) // Y pozicija
            .attr("width", premerGlob * naZemljo.premer) // Širina
            .attr("height", premerGlob * naZemljo.premer) // Višina
            .attr("id", "senca")
            .style("opacity", prosSence);

        gSenca.attr("transform", `rotate(${(letniZasuk) *-1}, ${0.5 * naZemljo.premer}, ${0.5 * naZemljo.premer})`)

    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });

    d3.xml("images/urna_stevilcnica.svg").then(function (xml) {
        const importedSVG = d3.select(xml.documentElement);
        const gUrnaStev = layer4.append("g").attr("id", "gUrnaStev");
        gUrnaStev.node().appendChild(importedSVG.node());
        var premerUrnaStev = premerGlob*1.07;

        importedSVG
            .attr("x", (1 - premerUrnaStev)/2 * naZemljo.premer) // X pozicija
            .attr("y", (1 - premerUrnaStev)/2 * naZemljo.premer) // Y pozicija
            .attr("width", premerUrnaStev * naZemljo.premer)
            .attr("height", premerUrnaStev * naZemljo.premer)
            .attr("id", "urna_stevilcnica")
            .style("opacity", "0.5");

        gUrnaStev.attr("transform", `rotate(${(letniZasuk) *-1}, ${0.5 * naZemljo.premer}, ${0.5 * naZemljo.premer})`)

        //gElement.attr("transform", `rotate(${(letniZasuk)*-1}, ${0.1 * zemlja.premer + 0.4 * zemlja.premer}, ${0.1 * zemlja.premer + 0.4 * zemlja.premer})`)
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });

    console.log("mena lune:", luMena);
    var lunaZasuk = luMena*360;
        console.log("lunaZasuk:", lunaZasuk);
    // var željenKot = 90 - (lunaZasuk%90)
    var željenKot = lunaZasuk % 180;
    console.log("željen kot <= 180:", željenKot);
    if (željenKot > 90) {
        željenKot = 180 - željenKot;
    }

        console.log("željen kot:", željenKot);
    var odmikMene = Math.cos(vRadiane(željenKot));
        console.log("odmikMene: ", odmikMene);
    let barvaMene;
    if (0.25 <= luMena && luMena < 0.75) {
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

    d3.xml("images/polluna.svg").then(function (xml) {
        const importedSVG = d3.select(xml.documentElement); // Naloženi SVG kot D3 objekt
        //layer3.node().appendChild(importedSvg.node()); // Dodaj zunanji SVG v obstoječi SVG
        const gPolluna = lunaGroup.append("g").attr("id", "gPolluna");
        gPolluna.node().appendChild(importedSVG.node());

        importedSVG
            .attr("x", 0.5*naZemljo.premer - lunaVelikost*naZemljo.premer/2) // X pozicija
            .attr("y", 0.5*naZemljo.premer + 0.425*naZemljo.premer - lunaVelikost*naZemljo.premer) // Y pozicija
            .attr("width", lunaVelikost*naZemljo.premer) // Širina
            .attr("height", lunaVelikost*naZemljo.premer) // Višina
            .attr("id", "polluna");
        if (lunaZZemlje) {
            gPolluna.append("ellipse")
                .attr("cx", 0.5*naZemljo.premer)   // Središče elipse (X koordinata)
                .attr("cy", 0.5*naZemljo.premer + 0.425*naZemljo.premer - lunaVelikost*naZemljo.premer/2)   // Središče elipse (Y koordinata)
                .attr("rx", lunaVelikost*naZemljo.premer/2)    // Vodoravni polmer
                .attr("ry", odmikMene * lunaVelikost*naZemljo.premer/2)    // Navpični polmer
                .style("fill", barvaMene)
                .style("stroke", "none")  // Barva obrobe
                .style("stroke-width", 0);
            gPolluna.attr("transform", `rotate(${90}, ${0.5*naZemljo.premer}, ${0.5*naZemljo.premer + 0.425*naZemljo.premer - lunaVelikost*naZemljo.premer/2})`)
        } else {
            gPolluna.attr("transform", `rotate(${lunaZasuk}, ${0.5*naZemljo.premer}, ${0.5*naZemljo.premer + 0.425*naZemljo.premer - lunaVelikost*naZemljo.premer/2})`)
        }
        lunaGroup.attr("transform", `rotate(${(lunaZasuk + letniZasuk)*-1}, ${0.5*naZemljo.premer}, ${0.5*naZemljo.premer})`);
    }).catch(function (error) {
        console.error("Napaka pri nalaganju SVG datoteke:", error);
    });
}

function nariši(IČas) {
    /*document.getElementById("prikaz-casa").innerHTML = new Date(IČas);*/

    var ure = IČas.getHours();
    var ureUTC = IČas.getUTCHours();
    var min = IČas.getMinutes();
    var sek = IČas.getSeconds();

    zamikPoldnevnikov = (min + (sek/60)) / 60 *-15;
    polnoc = ((24 - ureUTC)/24)*360 + zamikPoldnevnikov;
    poldne = (polnoc + 180)%360;

    var prviDanLeta = new Date(IČas.getFullYear(), 0, 1); // 1. prosinec leta
    var razlika = IČas - prviDanLeta;
    var danLeta = razlika / dan;
    console.log("dan v letu:", danLeta);
    var danLetaStop = (360/dolžinaLeta) * danLeta;
    letniZasuk = danLetaStop + zamikLeta
    poglejZemljo(letniZasuk, zamikPoldnevnikov, polnoc, poldne);
}

/////////////////////////////////////////////////////////////////////////////

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

/*function pošljiNastavitve(nastavitve) {
    if (oknoNastavitve && !oknoNastavitve.closed) {
        oknoNastavitve.postMessage({ nastavitve }, "*");
    }
}*/
function odpriNastavitve() {
    const sirina90 = Math.floor(window.innerWidth * 0.9);
    const visina90 = Math.floor(window.innerHeight * 0.9);
    oknoNastavitve = window.open(
        '/zvezdoslovna_ura/nastavitve_ure.html',
        'oknoNastavitve', // ime okna
        `width=${sirina90},height=${visina90}`
    );
    
    var privzeteNastavitve = {
        IČas, TČas, IČPas, TČPas, IPolD, IPolŠ, TPol,
        lunaZZemlje, zadnjaPolobla,
        intČas, intPas, intPol, decStop, decOdst,
        prosSence, polUre,
    };

    window.addEventListener("message", function (event) {
        if (event.data === "ready-nastavitve" && oknoNastavitve) {
            oknoNastavitve.postMessage({ nastavitve: privzeteNastavitve }, "*");
        }
    });

    /*console.log("Poslane bodo nastavitve", nastavitve);
    pošljiNastavitve(nastavitve);*/
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
    decStop = nastavitve.decStop ?? decStop;
    decOdst = nastavitve.decOdst ?? decOdst;
    lunaZZemlje = nastavitve.lunaZZemlje ?? lunaZZemlje;
    zadnjaPolobla = nastavitve.zadnjaPolobla ?? zadnjaPolobla;
    izračunPodatkov(nastavitve.IČas, nastavitve.IPolŠ, nastavitve.IPolD, nastavitve.IČPas);
    prosSence = nastavitve.prosSence;
}

// Pridobi trenutne vrednosti in jih nastavi
function posodobiČas() {
    IČas = new Date();
    izračunPodatkov(IČas, IPolŠ, IPolD, IČPas);
};
function posodobiČPas() {
    IČPasIme = Intl.DateTimeFormat().resolvedOptions().timeZone;
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

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer); // počisti star časovnik
    resizeTimer = setTimeout(() => { // pokliči funkcijo po ~250 ms
        nariši(IČas);
    }, 250);
});

