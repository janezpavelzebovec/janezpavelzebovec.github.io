---
title: Linux
date: 2025-05-09
description:
keywords: programska oprema, Linux, programi
author: Janez Pavel Žebovec
---

# Linux

- `sudo shutdown` - ugasni se
- `sudo reboot` - ponovno se zaženi
    - `sudo shutdown -r now` - potem, ko se ugasneš, se znova prižgi (precej enako zgornjemu)
- `locale` - preveri lokalizacijo sistema (jezik, enote, ...)

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

## Programi

### Terminal (jezik Bash)

- `cd [ime_mape]` = *change directory* -  premakni se v mapo
- `ls`= *list* -  izpiši vsebino mape
    - `-a` = *all* -  prikaži tudi skrite datoteke
- `man [ime-programa]` = *manuals* -  prikaži navodila programa
- `/[iskalni_niz]` -  išče po iskalnem nizu po zapisu
- `mkdir [ime_nove_mape]` = *make directory* -  ustvari mapo
- `touch [ime_nove_datoteke]` -  ustvari novo datoteko
- `rm [predmet]` = *remove* -  odstrani predmet
    - `rm -r [ime_mape]` -  odstrani celotno mapo

<!-- -->

- `..` -  mapa eno raven višje, v kateri je trenutna mapa (`../..` pomeni mapo dve ravni navzgor itd.)
- `*` -  nadomesti karkoli (npr. `abc*`pomeni vsak niz znakov, ki se začne z *abc*)

### ST (Simple Terminal)

Bližnjice:

- **[sredinska tipka]** -  prilepi iz odložišča
- **Ctrl+Shift+c** = *copy* -  kopira izbrano besedilo v odložišče

Ukazi:

- `[ime-programa] &` -  zažene program v ozadju (za delovanje brez izpisov v terminal, kjer je bil odprt)

### DWM (Desktop Windows Manager)

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

## Omrežna povezava

`- ip link show` - preveri omrežni vmesnik(wlp2s0 je brezžično omrežje, enp1s0 je kabelsko)
- `ip link set [ime-vmesnika] up` - omogoči vmesnik
- `sudo iwlist [ime-vmesnika] scan | grep ESSID` - preglej razpoložljiva omrežja
- `ping [naslov gostitelja / naslov IP]` - s *pingom* preveri, če ti omrežje odgovarja - če si povezan (*8.8.8.8* / *google.com* je Google)
- `ip route` - preveri prehod/vrata

NetworkManager:

- `systemctl enable NetworkManager` -  omogoči upravitelja omrežja
- `systemctl start NetworkManager` - zaženi NetworkManager
- `systemctl status NetworkManager` - preglej stanje NetworkManagerja
- `sudo systemctl restart NetworkManager` - znova zaženi NetworkManager

### NMCLI (Network Manager Client)

-

### VIM

Bližnjice:

- **i** = *insert* -  preklopi v urejevalni način
- **v** = *visual* -  preklopi v ogledovalni način (za izbiranje besedila/kode)
    - **Shift+v** -  preklopi v ogledovalni način vrstic (za izbiranje celotnih vrstic)
- **Shift+2** / **"** -  izberi register odložišča (pred kopiranjem z **y**)
    - **+** -  "običajen" register
    - **\*** -  register terminala
    - **0** -  register zadnjega kopiranja (*yank*, ne izrezovanja)
- **y** = *yank* -  kopiraj
- **d** -  izreži (tj. kopiraj in izbriši)
- **p** = *paste* -  prilepi
- **u** = *undo* -  pojdi korak nazaj v zgodovini urejanja
- **gg** -  na začetek datoteke
- **Shift+g**  -  na konec datoteke
- **0** -  na začetek trenutne vrstice
- **$** -  na konec trenutne vrstice

Ukazi:

- `:e` = *edit* -  urejaj datoteko (če ni opredeljena druga datoteka, posodobi trenutno, za primer, da je bila spremenjena drugje)
    - `:e [ime_datoteke]` -  urejaj (odpri) datoteko
- `:bd` -  zapre trenutno urejano datoteko
- `:set wrap`/`:set nowrap` -  nastavi prelom, oz. odnastavi prelom vrstic
- `:<`/`:>` -  zamakni vse označe vrstice v levo/desno
- `:s/[niz]/[zamenjava]` -  zamenja niz v trenutni vrsticii
    - `%s/[niz]/[zamenjava]/g` -  zamenja niz v vseh vrsticah
    - `:%s/old/new/gc` - za vsako zamenjavo vpraša

### LF

Uporablja podobne bližnjice kot VIM

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
- **z**
    - **zr** = *reverse* -  razvrsti predmete v obratnem vrstnem redu
    - **zh** = *hidden* -  skrij/prikaži skrite datoteke
- **$** -  odpre ukazno vrstico, kjer lahko uporabljaš ukaze terminala (le tako lahko npr. brišeš) - **ta bližnjica ni privzeto nastavljena?**

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
- ** - ** -  odpri vrstico za izvršitev ukaza
- **i** -  pokaži podatke o skladbi

### Pretvarjanje/združevanje datotek

- `pdfjam [imena_PDF-jev] -o [ime_nove_datoteke.pdf]` -  združi več PDF-jev v enega
    `--paper [velikost strani]` -  določi velikost strani v PDF-ju (npr. `--paper a4paper` za A4)

- `mogrify -format [vrsta-datoteke] [ime_datoteke]` -  pretvori datoteke (z ustrezno končnico) v želeni vrsto datoteke
    - `-format [vrsta-datoteke]` -  določi vrsto (*format*) datoteke (npr. `-format pdf` za PDF)

- `qpdf --empty [imena_PDF-jev] -- [ime_nove_datoteke.pdf` -  združi PDF-je, pri čemer ohrani izvorne velikosti strani
    - `--empty` -  velikost strani ni opredeljena

- `pandoc`
    - `-o` -  ugane vrsto datotek po končnicah imen teh datotek
    - `-f [vrsta_datoteke]` = *format* -  opredeli vrsto (*format*) vhodne datoteke (npr. `-f markdown`, `-f html`)
    - `-t [vrsta_datoteke]` -  opredeli vrsto (*format*) izhodne datoteke
    - `-s` = *standalone*

- `diff -u [izvorna_datoteka] [spremenjena_datoteka] > [datoteka_s_spremembami.patch]` - ustvari datoteko s spremembami (*patch*)
- `patch < [datoteka_s_spremembami.patch]`
