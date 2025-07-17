---
title: Linux
date: 2025-07-17
description:
keywords: programska oprema, Linux, programi
author: Janez Pavel Žebovec
---

# Linux

- `sudo shutdown` - ugasni se
- `sudo reboot` - ponovno se zaženi
    - `sudo shutdown -r now` - potem, ko se ugasneš, se znova prižgi (precej enako zgornjemu)
- `startx` - zažene strežnik X, oz. privzeti grafični prikaz (to je lahko DWM, GNOME, KDE,...); prebere datoteko `~/xinitrc`, kjer so ukazi, ki naj se izvršijo med zagonom, tudi ukaz za zagon grafičnega okolja (`startx &`)

- `locale` - preveri lokalizacijo sistema (jezik, enote, ...)
- `chmod` - spreminjanje dovoljenj datotek
    - `chmod +x datoteka` - dodeli datoteki izvšilne pravice, da jo lahko recimo zaženeš kot ukaz v terminalu
- `python 3 datoteka.py` - zaženi Python datoteko
- `live server` - zažene lokalni strežnik, brez dodatnih opredelitev odpre *index.html* v mapi, kjer je bil ukaz izveden
    - `live server --open=pot/do/datoteke` - zažene lokalni strežnik in odpre izbrano datoteko
- `sudo dmidecode -t system` - izpiše lastnosti računalniške opreme (diski, spomin, model računalnika, ...)

## Upravljanje programov

- `sudo apt install ime-programa` - namesti program
- `sudo apt update` - posodobi seznam nameščenih paketov
- `sudo apt upgrade` - posodobi programe
- `dpkg -l | grep ime-programa` - izpiše seznam vseh paketov, katerih ime ustreza izbranemu
- `ime-programa --version` -  izpiše različico programa
- `which ime-programa` -  izpiše kraj shrambe programa (običajno /usr/bin/)
- `sudo apt remove ime-programa` -  odstrani program, a ohrani nastavitvene datoteke (npr. /etc)
- `sudo apt purge ime-programa` -  odstrani program z vsemi nastavitvenimi datotekami
- `apt purge --remove ime-programa` -  odstrani program z vsemi nastavitvenimi datotekami
- `sudo apt clean` -  čiščenje predpomnilnika paketov, ki ga APT ustvari pri nameščanju ali posodabljanju programske opreme
- `sudo apt autoremove` - očisti nepotrebne pakete, ki so bili nameščeni kot odvisnosti

### Nameščanje programov iz vira

- `make` - izvozi program, oz. prebere datoteko `makefile`
    - `sudo make install` - izvozi in naloži program
        - `sudo make clean install` - naloži program in odstrani namestitvene datoteke (datoteke *build*)

## Mape in datoteke v Linuxu

Mape:

- **~/** = **/home/[uporabniško-ime]** - domača mapa - tu praviloma hraniš vse osebne zadeve
- **~/.config** -  tu so praviloma nastavitvene datoteke programov
- **~/.local/bin/** -  tu so praviloma osebni programčki
- **~/-local/share/applications/** -  tu so datoteke za slovarske datoteke programov

Datoteke:

-**~/.xinitrc** -  datoteka z ukazi, ki se izvedejo ob zagonu računalnika
- **~/bash_history** -  datoteka z zgodovino izvedenih ukazov v terminalu
- **~/.config/sxhkd/sxhkdrc** -  datoteka z osebnimi bližnjicami (da stopijo v veljavo spremembe v tej datoteki izvedi `pkill -usr1 -x sxhkd` ali znova zaženi sistem)

## Zunanje naprave

- `udisksctl`
    - `mount`/`unmount` - namesti/odmesti zunanji pogon (npr. `udisksctl mount -b /dev/sda1` namesti pogon);
- `aft-mtp-mount [pot_do_dlančnika]` - namesti dlančnik

## Omrežna povezava

- `ip link show` - preveri omrežni vmesnik(wlp2s0 je brezžično omrežje, enp1s0 je kabelsko)
- `ip link set ime-vmesnika up` - omogoči vmesnik
- `ip route` - preveri prehod/vrata
- `sudo iwlist ime-vmesnika scan | grep ESSID` - preglej razpoložljiva omrežja
- `ping naslov_gostitelja_ali_naslov_IP` - s *pingom* preveri, če ti omrežje odgovarja - če si povezan (*8.8.8.8* oz. *google.com* je Google)

### NetworkManager

- `systemctl enable NetworkManager` -  omogoči upravitelja omrežja
- `systemctl start NetworkManager` - zaženi NetworkManager
- `systemctl status NetworkManager` - preglej stanje NetworkManagerja
- `systemctl restart NetworkManager` - znova zaženi NetworkManager

### NMCLI (Network Manager Client)

- `nmcli` - prikaže podroben seznam razpoložljivih omrežij;
    - `nmcli con` = `nmcli connection show` - prikaže seznam shranjenih omrežij;
        - `nmcli connection show --active` - prikaže seznam omrežij, na katera si trenutno povezan;
    - `nmcli connection up ime-omrežja` - poveže se na omrežje;
    - `nmcli connection down ime-omrežja` - prekine povezavo z omrežjem;
    - `nmcli device` > `nmcli device status` - prikaže strnjen seznam razpoložljivih omrežij
        - `nmcli device wifi` = `nmcli dev wifi` > `nmcli device wifi list` - pokaže razpožljiva brezžična omrežja (WiFi)
            - `nmcli device wifi connect ime_omrežja` - poveži se na brezžično omrežje (če nima gesla ali je to že shranjeno, ne rabiš podati gesla - če ne, glej spodaj)
                - `nmcli device wifi connect ime-omrežja password geslo` - poveže se na brezžično omrežje, ki je zaščiteno z geslom (geslo se nato po prvem uspešnem povezovanju shrani - glej ukaz zgoraj);
            - `nmcli device wifi rescan` - znova išče za razpoložljivimi omrežji;
            - `nmcli device wifi show-password` = `nmcli device wifi show`  - pokaže kodo QR omrežja;
            - `nmcli device show`prikaže podroben seznam razpoložljivih omrežij;
    - `nmcli radio wifi` - preveri, če je omogočeno brezžično omrežje (WiFi), oz. naprava za brezžično omrežje;
        - `nmcli radio wifi on` - vklopi/omogoči napravo za povezovanje s brezžičnim omrežjem;

## Pretvarjanje/združevanje datotek

- `tar -xvzf mapa.tar.gz` - razširi stisnjeno mapo *.tar.gz* (*.tar* - arhivska; *.gz* - stisnjena)
- `convert {imena_slik} ime_PDF-ja` - združi več slik JPG v en PDF

- `pdfjam {imena_PDF-jev} -o ime_nove_datoteke.pdf` -  združi več PDF-jev v enega
    - `-o` - ugane vrsto datotek za pretvorbo po končnicah teh datotek
    - `--paper velikost_strani` -  določi velikost strani v PDF-ju (npr. `--paper a4paper` za A4)

- `mogrify -format vrsta-datoteke ime_datoteke` -  pretvori datoteke (z ustrezno končnico) v želeni vrsto datoteke (npr. pretvori sliko JPG v PDF: `mogrify -format pdf datoteka.jpg`)
    - `-format [vrsta-datoteke]` -  določi vrsto (*format*) datoteke (npr. `-format pdf` za PDF)

- `qpdf --empty {imena_PDF-jev} -- ime_nove_datoteke.pdf` -  združi PDF-je, pri čemer ohrani izvorne velikosti strani
    - `--empty` -  velikost strani ni opredeljena - vsem stranem določi enako najprimernejšo velikost
    - `--pages` - ohrani izvorne velikosti strani (?)

- `pandoc` - pretvornik *strukturiranih* besedilnih dokumentov
    - `-o izhodna_datoteka` -  ugane vrsto izhodne datoteke za pretvorbo po končnici te datoteke
    - `-f vrsta_datoteke` = *from* -  opredeli vrsto (*format*) vhodne datoteke (npr. `-f markdown`, `-f html`)
    - `-t vrsta_datoteke` = *to* -  opredeli vrsto (*format*) izhodne datoteke
    - `-s` = *standalone* - ustvari samostojen dokument (ne pretvori datoteke le kot del dokumenta; pri npr. HTML tako npr. doda še `<!DOCTYPE>`, `<html>`na začetku, ustvari `<head>`, metapodatke,`<body>`, ...)
    - ` pandoc predstavitev.md -t beamer -o predstavitev.pdf` - pretvorba v PDF s prosojnicami
    - `--toc` - v novem dokumentu ustvari kazalo
    - `--lua-filter=datoteka.lua` - pravila za pretvorbo (npr. za ustvarjanje ID-jev naslovov v ustrezni obliki)
    - `--metadata metapodatek="vrednost"` - doda metapodatek
        - `--metadata title="Naslov"` - doda izbrani naslov
        - `--metadata lang=sl` - doda slovenščino za jezik dokumenta

    Za pretvorbo v HTML:

    - `--template=predloga.html` - novo datoteko ustvari po predlogi, kar omogoča popolen nadzor nad sestavo izhodnega HTML-ja (sicer pandoc uporabi svojo privzeto)
    - `-c slog.css` - doda povezavo do datoteke CSS sloga v datoteko HTML (torej vrstico `<link rel="stylesheet" href="slog.css" />`)
    - `-B dodatek.html` - doda na začetek `<body>`v izhodnem HTML (npr. za kazalno pasico, začeten Javascript, ...)
    - `-A dodatek.html` = *append* - doda na konec `<body>` v izhodnem HTML (uporabno npr. za nogo strani, dodajanje Javascripta za *analitiko*, ...)
    - `-H dodatek.html` = *head* - doda na začetek `<head>` v izhodnem HTML (uporabno za dodajanje metapodatkov `<meta>`, CSS-ja, JS-a, ...)
- `ffmpeg` - orodje za obdelavo posnetkov - pretvarjanje, obrezovanje, izrezovanje, združevanje, spreminjanje kakovosti, ločljivosti, dodajanje podnapisov, ...
    - `ffmpeg -i posnetek.mp3 -ss 00:00 -t 00:20 -c copy izsek.mp3` - obreži posnetek

### Spreminjanje izvirne datoteke

- `diff izvorna_datoteka spremenjena_datoteka > spremembe.patch` - ustvari datoteko s spremembami (*patch*)
    - `-u` = *unified diff* - bolj berljiva oblika datoteke s spremembami
- `git diff > spremembe.patch` - ustvari datoteko s spremembami
- `patch < spremembe.patch` - uporabi popravke iz datoteke `.patch` ali `.diff` na izvirni datoteki v trenutni mapi

#### Git

Npr. za sinhronizacijo z [GitHubom](https://github.com/), [Codebergom](https://codeberg.org/), ...

- `git clone URL` - podvoji *repozitorij* na URL-ju na svoj računalnik
- `git init` - ustvari mapo Gita
- `git checkout -b main` = `git branch main` + `git checkout main` - ustvari novo vejo z imenom *main* in se nanjo priklopi
- `git add {datoteke}` - dodaj datoteke v Git pred objavo
- `git commit` - ustvari objavo
    - `-m "opomba" = *message*` - opomba/povzetek/sporočilo objave
- `git remote add origin URL` - opredeli mesto objave (spletni naslov *repozitorija*; to je potrebno le prvič)
- `git push -u origin main` - poveži *repozitorij* na računalniku in oddaljeni repozitorij (npr. na GitHubu, Codebergu), oz. objavi spremembe (vprašalo te bo za up. ime in geslo)
    - `-u` = *upstream remote*
    - `main` - nastavi vejo, na kateri objavljamo (*main* je ime glavne veje)
- `git status` - preveri stanje Gita - primerja vsebino glede na oddaljeni *repozitorij*
- `git log` - izpiši zgodovino objav
- `git pull` - prejme spremebe, narejene na oddaljenem repozitoriju
- `git remote -v` - izpiše, kateri URL-ji se uporabljajo za `remote`
- `ssh -T git@github.com` - preveri povezavo prek SSH (prek ključa)
- `ssh-add ~/.ssh/id_ed25519` - dodaj ključ
- `ssh-add -l` - preveri ključe, dodane v `agent`


- `git diff > spremembe.patch` - ustvari datoteko s spremembami

## Strežnik

Sinhronizacija s strežnikom (npr. pri Hetznerju):

- `ssh-keygen -t ed25519 -C "tvoje_ime" -f pot/do/datoteke` - ustvari ključ SSH - javnega (daš ga Hetznerju) in zasebnega (ostane pri tebi);
    - `-t ed25519` - opredeli vrsto ključa, oz. *kriptografskega algoritma* (Ed25519 je med najvarnejšimi);
    - `-C "tvoje_ime` - opredeli opombo (*comment*), oz. ime ključa, ki si ga sam izbereš, da veš za katerega gre (posebno če jih imaš več);
    - `-f pot/do/datoteke` - določi mesto, kamor naj se ključ shrani in ime datoteke (privzeto je to `~/.ssh/id_ed25519`) - ta *parameter* sicer ni nujen, saj te po njem program sam vpraša, če ga ne navedeš
- `ssh-keygen -p -f ~/.ssh/id_ed25519` - spremeni geslo ključa (torej ga s tem lahko tudi odstraniš, če poznaš trenutno geslo);

`ssh-keygen` ustvari zasebni ključ *id_[vrsta]* in javni ključ *id_[vrsta].pub*. Javni ključ moraš shraniti na strežniku v datoteko *.ssh/authorized_keys*.

- `ssh up_ime@tvoj_naslov_IP` - predstavi strežniku svojo napravo (za uporabniško ime uporabi tisto s K-jem, *K{deset števk}*)
- `ssh-add ~/.ssh/id_ed25519` - dodaj ključ v `ssh-agent`

- `curl {možnosti} URL` - pridobivanje podatkov od oddaljenega strežnika ali pošiljanje podatkov oddaljenemu strežniku
    - `-L` - sledi preusmeritvam, dokler ne dospe do cilja

## Programi

### Terminal (jezik Bash)

- `cd ime_mape` = *change directory* -  premakni se v mapo
- `cp pot/do/kopirane_datoteke_mape pot/do/ciljne_datoteke_mape` = *copy* - kopiraj
    - `-r` = *recrusive* - kopiraj vključno s podmapami in datotekami/mapami v njih (pri kopiranju mape)
- `mv izvorna/pot ciljna/pot` = *move* - premakni/preimenuj
- `ls`= *list* -  izpiši vsebino mape
    - `-a` = *all* -  prikaži tudi skrite datoteke
    - `-v` - razvrsti po naravnih številih (npr. *a1, a2, a10, a21, ...*; namesto privzeto leksikografskega reda, npr. *a1, a10, a2, a21, ...*); prezre skrite datoteke z začetnim `.` ali `..`
- `ln ciljna_datoteka gledana datoteka` = *link*- ustvari povezavo med dvema datotekama, oz. preusmeritev na ciljno datoteko
    - `-s` = *soft* - datoteka kaže na drugo datoteko (ne pa na same podatke ciljne datoteke, kot to počne *hard link*)
- `man ime-programa` = *manuals* -  prikaži navodila programa
- `/iskalni_niz` -  išče po iskalnem nizu po zapisu
- `mkdir ime_nove_mape` = *make directory* -  ustvari mapo
- `touch ime_nove_datoteke` -  ustvari novo datoteko
- `rm ime_datoteke` = *remove* -  odstrani predmet
    - `rm -r ime_mape` -  odstrani mapo z njeno vsebino
- `cat ime_datoteke` - izpiši vsebino datoteke
- `find -name ime_datoteke` - poišči datoteko
    - `find -type d -name ime_mape` = *directory* - poišči mapo
    - `find / -name ime_datoteke` - poišči v korenski mapi

Nadomestne oznake:

- `..` -  mapa eno raven višje, v kateri je trenutna mapa (`../..` pomeni mapo dve ravni navzgor itd.)
- `*` -  nadomesti karkoli (npr. `abc*`pomeni vsak niz znakov, ki se začne z *abc*)

Dodatno:

- `$(ukaz)` - uporabi izpis ukaza v ukazu

### ST (Simple Terminal)

Bližnjice:

- **Ctrl+c** - ustavi program;
- **Ctrl+Shift+c** = *copy* - kopira izbrano besedilo v odložišče
- **Ctrl+Shift+v** = **sredinska tipka** - prilepi iz odložišča

Ukazi:

- `clear` - počisti prejšnje ukaze in izpise v oknu;
- `ime-programa &` -  zažene program v ozadju (za delovanje brez izpisov v terminal, kjer je bil odprt)

### DWM (Dynamic Window Manager)

Za tipko *Mod1* se običajno uporablja/nastavi tipka *Super*.

- **F11** -  celozaslonski način
- **Mod1+Shift+c** = *close* -  zapri trenutno okno
- **Mod1+Enter** -  nastavi prvo okno pod glavnim kot glavno
- **Mod1+j/k** -  premikni se po oknih naprej/nazaj
- **Mod1+Tab** -  premikaj se med okni
- **Mod1+l/h** -  povečaj/zmanjšaj širino stranskih oken
- **Mod1+i/d** -  povečaj/zmanjšaj število oken kot glavna
- **Mod1+[0 - 9]** -  preklopi delovno površino (pod 0 so vsa odprta okna)
- **Mod1+Shift+[0 - 9]** -  dodeli oknu drugo oznako (tj. delovno površino; *Mod1+Shift+0* dodeli oknu vse oznake 1 - 9)
    - **Mod1+Shift+Ctrl+[0 - 9]** -  dodeli oknu dodatno oznako poleg trenutne
- **Mod1+b** = *bar* -  prikaži/skrij zgornjo pasico
- **Mod1+m** -  pojdi v način celozaslonskih oken
- **Mod1+t** = *tiles* -  pojdi v prikaz oken v mozaičnem načinu
- **Mod1+Tab** - premikaj se med okni
- **Mod1+a** - odpre meni

- **Mod1+Shift+Enter** - odpre terminal
- **Ctrl++/-** - povečaj/pomanjšaj velikost pisave

### VIM

Bližnjice:

- **i** = *insert* -  preklopi v urejevalni način
- **v** = *visual* -  preklopi v ogledovalni način (za izbiranje besedila/kode)
    - **Shift+v** -  preklopi v ogledovalni način vrstic (za izbiranje celotnih vrstic)
- **Shift+2** / **"** -  izberi register odložišča (odložišče moraš izbrati pred kopiranjem z npr. **y**)
    - **+** -  "običajen" register
    - **\*** -  register terminala
    - **0** -  register zadnjega kopiranja z **y** (*yank*, ne pa tudi izrezovanja z **d**)
- **y** = *yank* -  kopiraj
- **d** -  izreži (tj. kopiraj in izbriši)
- **p** = *paste* -  prilepi
- **u** = *undo* -  pojdi korak nazaj v zgodovini urejanja
- **gg** -  na začetek datoteke
- **Shift+g**  -  na konec datoteke
- **0** -  na začetek trenutne vrstice (v urejevalnem načinu deluje le splošni **Home**, kar je običajno **Fn+levo**)
- **$** -  na konec trenutne vrstice (v urejevalnem načinu deluje le splošni **End**, kar je običajno **Fn+desno**)
- **Tab** - premikaj se med urejevanimi datotekami

Dodajanje v več vrstic hkrati (a navpično poravnano): na mesto urejanja v prvi vrstici, **Ctrl+v**, označi stolpec (gor/dol), **Shift+i**, dodaj, **Esc**, **Esc**

Ukazi:

- `:e` = *edit* -  urejaj datoteko (če ni opredeljena druga datoteka, posodobi trenutno, za primer, da je bila spremenjena drugje)
    - `:e ime_datoteke` -  urejaj (odpri) datoteko
- `:bd` -  preneha z urejanjem trenutno ogledovane datoteke (zapre za urejanje)
- `:set wrap`/`:set nowrap` -  nastavi prelom, oz. odnastavi prelom vrstic
- `:<` oz. `:>` -  zamakni vse označene vrstice v levo oz. desno
- `:s/niz/zamenjava` -  zamenja niz v trenutni vrsticii
    - `%s/niz/zamenjava/g` -  zamenja niz v vseh vrsticah
    - `:%s/old/new/gc` - za vsako zamenjavo vpraša

### LF

Uporablja podobne bližnjice kot VIM:

- **r** = *rename* -  preimenuj predmet
- **y** = *yank* -  kopiraj
- **d** -  izreži
- **p** = *paste* -  prilepi
- **c** = *clear* -  prekliči ukaze (kopiraj, izreži prilepi, ... za izbrane predmete)
- **Space** -  izberi/odizberi predmet
- **v** = *invert* -  obrni izbor
- **u** = *unselect* -  odizberi vse
- **gg** -  premakni se na vrh seznama predmetov
- **Shift+g** -  premakni se na dno seznama predmetov
- **s** = *sort* -  razvrsti
- **s** - razvrsti po ...
- **z** - nastavi
    - **zh** = *hidden* -  skrij/prikaži skrite datoteke
    - **zr** = *reverse* -  razvrsti predmete v obratnem vrstnem redu
    - **zt** = *time* - prikaži čas datotek/map
    - **zs** = *size* - prikaži velikost datotek
- **Super+w** - odpri trenutno mesto v terminalu

- **$** -  odpre ukazno vrstico, kjer lahko uporabljaš ukaze terminala (le tako lahko npr. brišeš) - **ta bližnjica ni privzeto nastavljena?**

- `/iskalni_niz` - išči
    - **n** / **Shift+n** - premikaj se naprej/nazaj po zadetkih iskanja

### NCMPCPP

- **1** -  na sezname predvajanja (*Playlist*)
- **2** -  na seznam vseh skladb (*Browse*)
- **3** -  na iskalnik (*Search engine*)
- **4** -  na knjižnico (*Media library*)
- **5** -  na urejevalnik seznamov predvajanja (*Playlist editor*)
- **6** -  na urejevalnik oznak skladb (*Tag editor*)
- **7** -  na izhodne programe za zvok (*Outputs*)
- **8** -  na prikazovalnik zvoka (*Music visualizer*)
- **=** -  na uro (*Clock*)
- **e** = *edit* -  odpri preprost urejevalnik oznak skladbe (*tiny tag editor*)
- **l** = *lyrics* -  naloži besedilo pesmi
- **>**/**<** -  pojdi na naslednjo/prejšnjo skladbo na seznamu
- **f**/**b** = *forward*/*backward* -  išči naprej/nazaj v pesmi
- **r** = *repeat mode* -  preklopi na način ponavljanja
- **z** -  preklopi na naključni način
- **y** -  preklopi na način ene skladbe (po eni sladbi prekine predvajanje)
- **u** = *update* -  posodobi knjižnico
- **i** -  pokaži podatke o skladbi
- **:** -  odpri ukazno vrstico

### YT-DLP

- `yt-dlp {možnosti} {--} URL-ji` - prenese posnetek na naslovu URL
    - `-x` - izvozi samo zvok
    - `-o pot/do/datoteke` - nastavi izhodno pot/ime datotek(e)
        - `%(playlist_index)s` - zaporedna številka posnetka v seznamu predvajanja
        - `%(playlist_title)s` - naslov seznama predvajanja
        - `%(title)s` - naslov posnetka
        - `%(ext)s` - končnica datoteke
    - `--restrict-filenames` – odstrani posebne znake in presledke v imenih datotek
    - `-f bestaudio` - izbere najboljši zvok (posebej če npr. itak prenašaš le zvok)
    - `-f bestvideo` - izbere najboljšo sliko (posebej če npr. itak prenašaš le sliko)
    - `-f bestvideo+bestaudio` - izbere ločeno najboljšo sliko in najboljši zvok, ter ju združi
    - `-f best` - izbere najboljšo datoteko
    - `--audio-format vrsta-datoteke` - pretvori v izbrano vrsto zvočne datoteke (npr. `--audio-format mp3` pretvori v `mp3`, lahko pa je tudi `wav`, `flac`, `opus`)
    - `--audio-quality 0` - izbere najboljšo možno kakovost zvoka
    - `--embed-metadata` -  doda metapodatke (naslov, avtor, datum, ...) v datoteko
    - `--ignore-errors` = `-i` - nadaljuje tudi ob napakah
    - `--progress` -  prikaz napredka prenosa (to počne tudi že privzeto, zato te možnosti ni potrebno izcrecno navajati)
    - `--cookies-from-browser BRSKALNIK[:profil]` –  pridobi piškotke (prej jih moraš prenesti) za strani, kjer je potrebna prijava, ali prihaja do s tem povezanih napak (npr. `--cookies-from-browser firefox`)
    - `--no-overwrites` – ne prepiši že obstoječih datotek
    - `--download-sections "*01:57:00-03:05:06"` - prenesi le odsek(e) (lahko pa obrežeš šele po prenosu - za to glej *ffmpeg*)
        - `--postprocessor-args "-ss 01:57:00 -t 03:05:06"` - obreži šele po prenosu z `ffmpeg`
        - `--force-keyframes-at-cuts "*01:57:00-03:05:06"` - zagotovi bolj natančno rezanje med sličicami (deluje le z nekaterimi oblikami datotek)

---

## Zunanje povezave in viri

- [Hetzner Community - Tutorials - Setting up an SSH key](https://community.hetzner.com/tutorials/howto-ssh-key) - ustvarjanje varsnostnih ključev SSH;
- [VIM Cheat Sheet](https://vim.rtorr.com/) - bližnjice v VIM-u;
- [Codeberg Docs - Your First Repository](https://docs.codeberg.org/getting-started/first-repository/) - Git pri Codebergu, med drugim;
- [Software Galaxies](https://anvaka.github.io/pm/#/?_k=hl5p8n) (zemljevid odvisnosti med posameznimi paketi glede naupravitelja paketov)
