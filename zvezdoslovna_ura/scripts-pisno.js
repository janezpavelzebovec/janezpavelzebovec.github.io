/*const dneviTedna = ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"];
const meseci = ["prosinec", "svečan", "sušec", "mali traven", "veliki traven", "rožnik", "mali srpan", "veliki srpan", "kimavec", "vinotok", "listopad", "gruden"];*/

function vStopinje(rad) {
    return rad*(180/Math.PI);
}
function vRadiane(stop) {
    return stop*(Math.PI/180);
}

function fmtČas(čas, pas) {
    return čas ? new Intl.DateTimeFormat('sl-SI', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: pas
    }).format(new Date(čas)) : "--:--";
}
function fmtStopinje(rad) {
  return `${parseFloat(vStopinje(rad)).toFixed(4)} °`;
}
function fmtOdstotek(število) {
  return `${(parseFloat(število)*100).toFixed(2)} %`;
}


function izpišiPodatke(podatki) {
    if (podatki) {
        document.getElementById("časP").innerHTML = podatki.IČas;
        document.getElementById("čPasP").innerHTML = podatki.IČPas;
        document.getElementById("polP").innerHTML = `${parseFloat(podatki.IPolD).toFixed(4)}, ${parseFloat(podatki.IPolŠ).toFixed(4)}`;
        
        var polnoč = new Date(podatki.polnoč);
        const polnoč1P = document.getElementById("polnoč1P");
        const polnoč2P = document.getElementById("polnoč2P");
        let polnočNiz = new Intl.DateTimeFormat('sl-SI', { hour: '2-digit', minute: '2-digit', timeZone: podatki.IČPas }).format(polnoč);
        let prOpoldne = new Date(polnoč.getFullYear(), polnoč.getMonth(), polnoč.getDate(), 12, 0, 0);
        if (podatki.polnoč < prOpoldne) {
            polnoč1P.innerHTML = polnočNiz;
            polnoč2P.innerHTML  = "--:--";
        } else {
            polnoč1P.innerHTML  = "--:--";
            polnoč2P.innerHTML  = polnočNiz;
        }

        let nočKNiz = fmtČas(podatki.nočK, podatki.IČPas);
        let poZoraZNiz = fmtČas(podatki.poZoraZ, podatki.IČPas);
        let zoraZNiz = fmtČas(podatki.zoraZ, podatki.IČPas);
        let soVzhZNiz = fmtČas(podatki.soVzhZ, podatki.IČPas);
        let poldneNiz = fmtČas(podatki.poldne, podatki.IČPas);
        let soZahZNiz = fmtČas(podatki.soZahZ, podatki.IČPas);
        let soZahKNiz = fmtČas(podatki.soZahK, podatki.IČPas);
        let mrakKNiz = fmtČas(podatki.mrakK, podatki.IČPas);
        let poMrakKNiz = fmtČas(podatki.poMrakK, podatki.IČPas);
        let nočZNiz = fmtČas(podatki.nočZ, podatki.IČPas);
        
        document.getElementById("zvZoraP").innerHTML = `${nočKNiz} – ${poZoraZNiz}`;
        document.getElementById("poZoraP").innerHTML = `${poZoraZNiz} – ${zoraZNiz}`;
        document.getElementById("zoraP").innerHTML = `${zoraZNiz} – ${soVzhZNiz}`;
        document.getElementById("soVzhodP").innerHTML = `${soVzhZNiz} – ${poZoraZNiz}`;
        document.getElementById("poldneP").innerHTML = poldneNiz;
        document.getElementById("soZahodP").innerHTML = `${soZahZNiz} – ${soZahKNiz}`;
        document.getElementById("mrakP").innerHTML = `${soZahKNiz} – ${mrakKNiz}`;
        document.getElementById("poMrakP").innerHTML = `${mrakKNiz} – ${poMrakKNiz}`;
        document.getElementById("zvMrakP").innerHTML = `${poMrakKNiz} – ${nočZNiz}`;

        document.getElementById("visSonP").innerHTML = fmtStopinje(podatki.soViš);
        document.getElementById("aziSonP").innerHTML = fmtStopinje(podatki.soAzi);
        document.getElementById("visLunP").innerHTML = fmtStopinje(podatki.luViš);
        document.getElementById("aziLunP").innerHTML = fmtStopinje(podatki.luAzi);
        document.getElementById("oddLunP").innerHTML = `${parseFloat(podatki.luOdd).toFixed(0)} km`;
        document.getElementById("parLunP").innerHTML = fmtStopinje(podatki.luPar);
        document.getElementById("kotLunP").innerHTML = fmtStopinje(podatki.luKot);
        document.getElementById("menaLunP").innerHTML = fmtOdstotek(podatki.luMena);
        document.getElementById("osvLunP").innerHTML = fmtOdstotek(podatki.luOsv);

        let luVzhNiz = fmtČas(podatki.luVzh, podatki.IČPas);
        let luZahNiz = fmtČas(podatki.luZah, podatki.IČPas);
        let luNajvisje = fmtČas((podatki.luVzh.getTime() + podatki.luZah.getTime()) / 2, podatki.IČPas);

        document.getElementById("vidLunP").innerHTML = `${luVzhNiz} – ${luZahNiz}`;
        document.getElementById("najLunP").innerHTML = luNajvisje;
    }
}

window.addEventListener("message", (event) => {
    const podatki = event.data.podatki;
    console.log("Prejeti Podatki:", podatki);
    izpišiPodatke(podatki);
});
