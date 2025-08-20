const dneviTedna = ["ned.","pon.","tor.","sre.","čet.","pet.","sob."];
const meseci = ["prosinec", "svečan", "sušec", "mali traven", "veliki traven", "rožnik", "mali srpan", "veliki srpan", "kimavec", "vinotok", "listopad", "gruden"];

let decStop = 2;
let decOdst = 2;

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
function fmtStopinje(rad, decStop) {
  return `${parseFloat(vStopinje(rad)).toFixed(decStop)} °`;
}
function fmtOdstotek(število, decOdst) {
  return `${(parseFloat(število)*100).toFixed(decOdst)} %`;
}
function izpiši(id, vsebina) {
  document.getElementById(id).innerHTML = vsebina;
}

function izpišiPodatke(podatki) {
    if (podatki) {
        console.log("dec. mesta:", decStop, decOdst);
        decStop = podatki.decStop;
        decOdst = podatki.decOdst;
        
        IČas = podatki.IČas;
        let časLeto = IČas.getFullYear();
        let časMesec = String(IČas.getMonth() + 1).padStart(2, "0");
        let časDan = String(IČas.getDate()).padStart(2, "0");
        let časDanTedna = dneviTedna[IČas.getDay()];
        let časUre = String(IČas.getHours()).padStart(2, "0");
        let časMin = String(IČas.getMinutes()).padStart(2, "0");
        izpiši("časP", `${časLeto}-${časMesec}-${časDan}, ${časDanTedna}, ${časUre}:${časMin}`);

        izpiši("čPasP", podatki.IČPas);
        izpiši("polP", `${parseFloat(podatki.IPolD).toFixed(4)}, ${parseFloat(podatki.IPolŠ).toFixed(4)}`);
        
        var polnoč = new Date(podatki.polnoč);
        const polnoč1P = document.getElementById("polnoč1P");
        const polnoč2P = document.getElementById("polnoč2P");
        let polnočNiz = new Intl.DateTimeFormat('sl-SI', { hour: '2-digit', minute: '2-digit', timeZone: podatki.IČPas }).format(polnoč);
        let prOpoldne = new Date(polnoč.getFullYear(), polnoč.getMonth(), polnoč.getDate(), 12, 0, 0);
        if (podatki.polnoč < prOpoldne) {
            izpiši("polnoč1P", polnočNiz);
            izpiši("polnoč2P", "--:--");
        } else {
            izpiši("polnoč1P", "--:--");
            izpiši("polnoč2P", polnočNiz);
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
        
        izpiši("zvZoraP", `${nočKNiz}–${poZoraZNiz}`);
        izpiši("poZoraP", `${poZoraZNiz}–${zoraZNiz}`);
        izpiši("zoraP", `${zoraZNiz}–${soVzhZNiz}`);
        izpiši("soVzhodP", `${soVzhZNiz}–${poZoraZNiz}`);
        izpiši("poldneP", poldneNiz);
        izpiši("soZahodP", `${soZahZNiz}–${soZahKNiz}`);
        izpiši("mrakP", `${soZahKNiz}–${mrakKNiz}`);
        izpiši("poMrakP", `${mrakKNiz}–${poMrakKNiz}`);
        izpiši("zvMrakP", `${poMrakKNiz}–${nočZNiz}`);

        izpiši("visSonP", fmtStopinje(podatki.soViš, decStop));
        izpiši("aziSonP", fmtStopinje(podatki.soAzi, decStop));
        izpiši("visLunP", fmtStopinje(podatki.luViš, decStop));
        izpiši("aziLunP", fmtStopinje(podatki.luAzi, decStop));
        izpiši("oddLunP", `${parseFloat(podatki.luOdd).toFixed(0)} km`);
        izpiši("parLunP", fmtStopinje(podatki.luPar, decStop));
        izpiši("kotLunP", fmtStopinje(podatki.luKot, decStop));
        izpiši("menaLunP", fmtOdstotek(podatki.luMena, decOdst));
        izpiši("osvLunP", fmtOdstotek(podatki.luOsv, decOdst));

        let luVzhNiz = fmtČas(podatki.luVzh, podatki.IČPas);
        let luZahNiz = fmtČas(podatki.luZah, podatki.IČPas);
   
        if (podatki.luVzh < podatki.luZah) {
            document.getElementById("vidLunP").innerHTML = `${luVzhNiz}–${luZahNiz}`;
        } else if (podatki.luZah < podatki.luVzh) {
            document.getElementById("vidLunP").innerHTML = `PD–${luZahNiz}, ${luVzhNiz}–ND`;
        };

        let luNajvisje = fmtČas((podatki.luVzh.getTime() + podatki.luZah.getTime()) / 2, podatki.IČPas);
        document.getElementById("najLunP").innerHTML = luNajvisje;
    }
}

window.addEventListener("message", (event) => {
    const podatki = event.data.podatki;
    console.log("Prejeti Podatki:", podatki);
    izpišiPodatke(podatki);
});
