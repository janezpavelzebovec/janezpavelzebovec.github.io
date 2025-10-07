---
title: Vodič skozi namestitev Linuxa
date: 2025-10-06
description: Namestitev Linux Debiana, kot ga uporabljam jaz sam
keywords: Linux, namestitev operacijskega sistema
author: Janez Pavel Žebovec
---

# Vodič skozi namestitev Linuxa in njegova prilagoditev

To je različica Linux Debiana (s prilagoditvami), ki ga sam uporabljam.

- Prenos DWM-ja (upravitelj oken): `git clone https://git.suckless.org/dwm` (glej [Suckless – DWM](https://dwm.suckless.org/))
    - Odpri zagonsko datoteko: `vim ~/.xinitrc`
    - Na konec datoteke daj `exec dwm` (oz. s tem zamenjal ukaz za zagon drugega upravitelja oken, če že obstaja), kar ob zagonu sistema zažene DWM
    - Prilagajanje videza:

        ```c
        /* appearance */
        static const unsigned int borderpx  = 1;        /* border pixel of windows */
        static const unsigned int snap      = 32;       /* snap pixel */
        static const int showbar            = 1;        /* 0 means no bar */
        static const int topbar             = 1;        /* 0 means bottom bar */
        static const char *fonts[]          = { "monospace:size=10" };
        static const char dmenufont[]       = "monospace:size=10";
        static const char col_gray1[]       = "#222222"; //barva ozadja številk
        static const char col_gray2[]       = "#444444"; //barva obrob neizbranih oken
        static const char col_gray3[]       = "#bbbbbb"; //barva številk
        static const char col_gray4[]       = "#eeeeee"; //barva označene številke
        static const char col_rob[]         = "#fca503"; //barva robu osrediščenega okna (dodano)
        static const char col_cyan[]        = "#005577"; //barva zgornje pasice (modra)
        static const char *colors[][3]      = {
            /*               fg         bg         border   */
            [SchemeNorm] = { col_gray3, col_gray1, col_gray2 }, //barve neoznačene številke/okna: barva-stevilk, ozadje-stevilk, obroba neizbranih oken
            [SchemeSel]  = { col_gray4, col_cyan,  col_rob  }, //barve označene številke/okna: barva-stevilke, ozadje-stevilke, obroba izbranega okna
        };
        ```
        - Za barvo obrobe osrediščenega okna med začetne opredelitve barv dodaj `static const char col_border[] = "#fca503";` in spremeni `[SchemeSel]  = { col_gray4, col_cyan,  col_cyan  },`v `[SchemeSel]  = { col_gray4, col_cyan,  col_border },`
        - Za spremembo barve zgornje pasice spremeni vrstico `static const char col_cyan[] = "#005577";`
        - Da DWM ne upošteva namige programov o velikosti oken (da ni nepotrebnih praznih robov, zato včasih zlomi prikaz v teh oknih, kar običajno ne predstavlja težave): spremeni `static const int resizehints = 1;`v `static const int resizehints = 0;`
        - Bližnjice:
            - Spremeni `#define MODKEY Mod1Mask` v `#define MODKEY Mod4Mask`
            - Spremeni `{ MODKEY,  XK_p,  spawn,  {.v = dmenucmd } },` v `{ MODKEY,  XK_a,  spawn,  {.v = dmenucmd } },`, da odpiraš menu z bolj priročno bližnjico
            - Dodaj `{ MODKEY,  XK_Tab,  focusstack,  {.i = +1 } },`
            - Dodaj `{ MODKEY|ShiftMask,  XK_Tab,  focusstack,  {.i = -1 } },`
            - Spremeni `{ MODKEY,  XK_Tab,  view,  {0} },` v `{ MODKEY,  XK_v,  view,  {0} },`
- V **~/.xinitrc** pred zagonom upravitelka oken dodaj `xrandr --output "ime-zaslona" --mode širinaxvišina &`, da se ob zagonu nastavi želena povečava zaslona (če ti privzeta ni povšeči).
- Prenos ST-ja (termina): `git clone https://git.suckless.org/st` (glej [Suckless – ST](https://st.suckless.org/))
- Prenos DMenu-ja (menu za DWM): `git clone https://git.suckless.org/dmenu` (glej [Suckless – DMenu](https://tools.suckless.org/dmenu/))
- Prenos Brave-a (brskalnik): `sudo apt install brave-browser`
- Prenos LF-ja (raziskovalca datotek): `sudo apt install lf`?

- Prenos SLock-a (zakljenjen zaslon): `https://tools.suckless.org/dmenu/` (glej [Suckless – SLock](https://tools.suckless.org/slock/))

# Novo

Ne dodaj gesla za *'root'*a.

- `sudo apt update` – posodobi seznam programske opreme
- `sudo apt install network-manager` – namesti upravitelja omrežne povezave
- `sudo systemctl start NetworkManager`
- `sudo systemctl enable NetworkManager`
    - `nmcli device wifi connect ime_omrežja password geslo` – poveži se na brezžično omrežje (izbirno)
- `sudo apt install xorg` – namesti strežnik X
- `sudo apt install xinit` – ustvari zagonsko datoteko, s klicem katere zaženeš *grafično okolje* (DWM) in vsebuje vse, kar naj se izvede ob zagonu *sistema*.
- `echo "exec dwm" > ~/.xinitrc` – doda vrstico `exec dwm`v zagonsko datoteko **~/.xinitrc**
- `sudo apt install make` – namesti program **make** za izgradnjo programov (pretvorbo v binarni jezik) iz vira (npr. Sucklessovih)
- `sudo apt install build-essential` – namesti potrebne pakete za izgradnjo z ukazom `make`
- `mkdir viri` – ustvari mapo za programe, nameščene iz vira (npr. Sucklessovi)
- `cd viri` – premakni se v novoustvarjeno mapo **viri**, kamor boš prenesel programe iz vira
- `sudo apt install git` – namesti program **git** za prenos datotek (npr. programov) s spletnih strani
- `sudo apt install libx11-dev libxft-dev libxinerama-dev`, oz. izbirno `sudo apt install libx11-dev libxft-dev libxinerama-dev libxrandr-dev libxcb-res-dev`, če boš uporabljal tudi patche
    - **libx11-dev** za osnovno sporazumevanje s strežnikom X
    - **libxft-dev** za prikaz pisav
    - **libxinerama-dev** za podporo več zaslonov
    - **libxrandr-dev** za dinamično spreminjanje ločljivosti in orientacije zaslona
    - **libxcb-res-dev** omogoča dostop do določenih sistemskih podatkov za npr. statusno vrstico
- `git clone https://git.suckless.org/dmenu` – prenesi DWM (*Dynamic Windows Manager* – upravitelj oken) s Sucklessove spletne strani
- `git clone https://git.suckless.org/dmenu` – prenese DMenu (*Dynamic Menu* – nekakšna statusna vrstica)
- `git clone https://git.suckless.org/st` – prenese ST (*Simple terminal*)
- Za vsak od teh treh programov:
    - `cd ime_programa` – premakni se v mapo programa (dwm/dmenu/st)
    - `sudo make clean install` – izgradi program
    - `cd ..` – premakni se nazaj v nadmapo
- `startx` – zažene strežnik X, oz. DWM
- `sudo dpkg-reconfigure keyboard-configuration` – zaženi programček za nastavitev tipkovnice
    - izberi *model* svoje tipkovnice
    - izberi običajno slovensko zipkovnico "*Slovenian*"
    - izberi *Default* (privzeto) tipko za **AltGr**
    - za *Compose key* pa *Right Alt (AltGr)* ali pa nič, če ne rabiš
- `sudo systemctl restart keyboard-setup.service` – znova zaženeš sistem za uporabo tipkovnice
- nastavi slovensko tipkovnico v terminalu s `setxkbmap si`in to dodaj v ~./xinitrc
- `sudo apt install curl` – namesti program **curl**
- `curl -fsS https://dl.brave.com/install.sh | sh` – namesti spletni brskalnik Brave

