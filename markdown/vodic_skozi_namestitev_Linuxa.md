---
title: Vodič skozi namestitev Linuxa
date: 2025-09-17
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


