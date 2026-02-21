---
title: Vodič skozi namestitev Linuxa
date: 2026-02-13
description: Namestitev Linux Debiana, kot ga uporabljam jaz sam
keywords: Linux, namestitev operacijskega sistema
author: Janez Pavel Žebovec
---

# Vodič skozi namestitev Linuxa

Nekatere moje nastavitvene in druge datoteke Linuxa se nahajajo na [Codebergu: My Linux Configs](https://codeberg.org/JanezPavelZebovec/My_Linux_configs).

Tukaj so navedeni koraki, po katerih prideš do skoraj enakega okolja kot je moje.

## Ustvarjanje zagonskega ključka in dostop do zagonskega *menija*

- [Debian.org](https://www.debian.org/) > [Other downloads](https://www.debian.org/distrib/) > [small installation image](https://www.debian.org/distrib/netinst) > prenesi **amd64**. S tem si prenesil datoteko ** \*.iso**
- Ustvari zagonski ključek (ang. *bootable flash USB*) s to datoteko. V ta namen na Windowsu uporabi npr. [Rufus](https://rufus.ie/sl/) ali [Balena Etcher](https://etcher.balena.io/).
- V programu izberi datoteko \*.iso in napravo (najpogosteje je to ključek USB), ki jo boš uporabil za nameščanje. Pri tem bo izbrisano vse, kar je bilo prej na tej napravi (npr. USB)
- Zaženi računalnik in pritiskaj **F12** ali **F9** (odvisno od računalnika, lahko je tudi kaj tretjega, pogosto pa piše, kaj naj bi pritiskal)
- Odpre se zagonski *meni*, kjer izbereš svojo zagonsko napravo (ključek USB)

## Namestitev operacijskega sistema

Izberi **Graphical install** ali **Install**

- Jezik nastavi na angleščino (čeprav je na voljo tudi v slovenščini), ker je tako mnogo lažje razhroščevati morebitne napake
- Državo lahko izbereš svojo (*Slovenia*, predvidevam)
- Tipkovnico izbereš tako kot jo imaš (*Slovenian*, predvidevam)
- Izberi *hostname*, kar je ime tvoje naprave (kot bo vidno v omrežju in tebi)
- Ime domene (*Domain name*) pusti prazno (razen če vzpostavljaš strežnik – pa tudi v tem primeru se da to nasataviti kasneje)
- Geslo skrbnika (*Root password*) pusti prazno, če hočeš biti edini uporabnik in s pravicami skrbnika (*root*a)
- Izberi svoje uporabniško ime (*Full name for the new user*)
- Izberi geslo (tega novoustvarjenega uporabnika, ki bo imel skrbniške pravice, če nisi predhodno izbral gesla skrbnika)
- *Partitioning method* izberi *Guided – use entire disk*, če hočeš imeti na napravi le Linux (ostale podatke na disku bo izbrisalo!)
- Pazljivo izberi pravi disk, na katerega boš namestil Linux (da ne izbereš recimo zagonskega ključka, ker bo potem Linux namestilo na ključek)
- Izberi ločena *particija* za **\home** (to pomeni, da ločiš svoje datoteke – hranjene v \home – od datotek operacijskega sistema, ki jih praviloma ne urejaš neposredno)
- Potrdi
- Zdaj bo namestilo *operacijski sistem*, ter preneslo in maestilo vse potrebne *pakete/programe*
- Zavrni *Scan extra installation media*, če nočeš namestiti Linuxa na dodatno napravo
- Izberi svojo državo za *archive mirror*
- Izbereš lahko privzet strežnik (*archive mirror*) *deb.debian.org* za prejem posodobitev, razen če veš, kjer ti je najbljižje, oz. je zate najhitrejši
- *HTTP proxy* pusti prazno
- Prikaže se seznam razpoložljivih uporabniških vmesnikov (GNOME, Xfce, GNOME Flashback, KDE Plasma, Cinnamon, MATE, LXDE, LXQt) oz. spletni/SSH strežnik. Odizberi privzeto izbran uporabniški vmesnik GNOME in *Debian desktop environment*, ker bomo v nadaljevanju namestili DWM (če pa tega nočeš, se naše poti tu razidejo in je nadaljevanje Vodiča skoraj brezpredmetno) in pusti izbrano *standard system utilities*
- Če si izbral katerega izmed uporabniških vmesnikov, se bo zdaj prenesel
- *Install the GRUB boot loader* potrdi (to je zagonski *meni*)
- Izberi napravo, kamor želiš namestiti GRUB (to je skoraj zagotovo disk naprave, na katero trenutno nameščaš Linux) – običajno **/dev/sda** ali **/dev/vda**
- Namestitev Linuxa je končana, nadaljuj na ponovni zagon

Zagon novega *operacijskega sistema*:

- Ob ponovnem zagonu v zagonskem *meniju* izberi **Debian GNU/Linux**
- Zdaj si v Linuxu brez uporabniškega vmesnika (ker ga moramo še namestiti, poleg še nekaterih drugih zadev)
- Prijavi se, kot zahtevano, z uporabniškim imenom in geslom, ki si ju nastavil

## Namestitev osnovnih/sistemskih orodij

- `sudo apt update` – posodobi seznam programske opreme
- `sudo apt install network-manager` – namesti upravitelja omrežne povezave
- `sudo systemctl start NetworkManager`
- `sudo systemctl enable NetworkManager`
    - `nmcli device wifi connect ime_omrežja password geslo` – poveži se na brezžično omrežje (izbirno)
- `sudo apt install xorg` – namesti strežnik X
- `sudo apt install xinit` – ustvari zagonsko datoteko, s klicem katere zaženeš *grafično okolje* (DWM) in vsebuje vse, kar naj se izvede ob zagonu *sistema* (ukaz startx)
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
- `git clone https://git.suckless.org/dwm` – prenese DWM (*Dynamic Windows Manager* – upravitelj oken) s Sucklessove spletne strani – glej <https://dwm.suckless.org/>
- `git clone https://git.suckless.org/dmenu` – prenese Še glede zadnjega bloka kode (ki vprašal prej): ta del zdaj izgleda pravilno – če želiš ga vstavim nazaj na pravo mesto v novo verzijo.DMenu (*Dynamic Menu* – nekakšna statusna vrstica) – glej <https://tools.suckless.org/dmenu/>
- `git clone https://git.suckless.org/st` – prenese ST (*Simple terminal*) – glej <https://st.suckless.org/>
- `git clone https://git.suckless.org/slock` – prenese SLock (*Simple X display locker* – zaklenjen zaslon) – glej <https://tools.suckless.org/slock/>
- `git clone https://git.suckless.org/slstatus` – prenese SlStatus (prikazovalnik stanja v "orodni vrstici", če ne ustvariš kar svojega) – glej <https://tools.suckless.org/slstatus/>
- Za vsakega od teh treh programov:
    - `cd ime_programa` – premakni se v mapo programa (dwm/dmenu/st)
    - `sudo make clean install` – izgradi program
    - `cd ..` – premakni se nazaj v nadmapo
- `startx` – zažene strežnik X, oz. DWM (brez **~/.xinitrc** ne bo delovalo)

### Tipkovnica

- `sudo dpkg-reconfigure keyboard-configuration` – zaženi programček za nastavitev tipkovnice
    - izberi *model* svoje tipkovnice
    - izberi običajno slovensko tipkovnico "*Slovenian*"
    - izberi *Default* (privzeto) tipko za **AltGr**
    - za *Compose key* pa *Right Alt (AltGr)* ali pa nič, če ne rabiš
- `sudo systemctl restart keyboard-setup.service` – znova zaženeš sistem za uporabo tipkovnice
- nastavi slovensko tipkovnico v terminalu s `setxkbmap si`in to dodaj v ~./xinitrc

### Zvok

- `sudo apt install alsa-utils pulseaudio pulsemixer` – namesti programe za predvajanje zvoka (**pulsemixer** je program za uravnavanje glasnosti, izbiranje izhoda)

## Namestitev dodatnih orodij

- `sudo apt install curl` – namesti program **curl** (potreben za nekatere prenose podatkov/programov)
- `curl -fsS https://dl.brave.com/install.sh | sh` – namesti spletni brskalnik Brave
- `sudo apt install lf` – namesti "raziskovalca" shranjenih datotek /shrambe

## Prilagoditve videza in uporabnosti posameznih orodij

- Da odstraniš nadležen pisk: `sudo rmmod pcspkr`. Da ga odstraniš za vedno `echo "blacklist pcspkr" | sudo tee /etc/modprobe.d/nobeep.conf`, oz. v datoteko `/etc/modprobe.d/nobeep.conf`dodaj `blacklist pcspkr`. To onemogoči **pcspkr**, ki je odgovoren za to piskanje.

### Dejanja ob zagonu

- `vim ~/.xinitrc` – odpri zagonsko datoteko in vanjo vstavi sledeče:
    ```sh
    #!/bin/sh

    sxhkd & #file of custom chortcuts

    xinput --set-prop 'MSFT0001:00 06CB:CE2D Touchpad' 'libinput Tapping Enabled' 1 #enable click with tab on touchtab
    xinput --set-prop 'MSFT0001:00 06CB:CE2D Touchpad' 'libinput Natural Scrolling Enabled' 1 #reverse direction of scrolling on touchtab - up=down

    while true; do
        ~/.local/bin/status-bar # calls script for status bar
        sleep 10 #interval of refreshing in seconds
    done &

    exec dwm #run DWM
    ```
    - nekam pred `exec dwm` dodaj še `xrandr --output "ime-zaslona" --mode širinaxvišina &`, če želiš ob zagonu nastaviti neko neprivzeto povećavo/velikost zaslona

### DWM

- `vim ~/viri/dwm/config.h` – odpri nastavitveno datoteko DWM in spremeni:
    - Videz:
        ```c
        /* appearance */
        static const char col_rob[]         = "#fca503"; //rob glavnega okna (dodano; oranžna za boljšo vidljivost glavnega okna)
        static const char *colors[][3]      = {
            /*               fg         bg         border   */
            [SchemeSel]  = { col_gray4, col_cyan,  col_rob  }, // zamenjaj `col_cyan` z `col_border` v tej vrstici
        };
        ```
    - Obnašanje oken:
        - `static const int resizehints = 1;`spremeni v `static const int resizehints = 0;`, da DWM ne upošteva namigov programov o velikosti oken (da ne bo nepotrebnih praznih robov bo tako včasih zlomilo prikaz v teh oknih, kar pa običajno ne predstavlja take težave kot so grdi prazni robovi)
    - Bližnjice:
        - `#define MODKEY Mod1Mask` spremeni v `#define MODKEY Mod4Mask` – tako je ključni gumb pri bližnjicah DWM-ja **Super**, ne **Alt**
        - `{ MODKEY,  XK_p,  spawn,  {.v = dmenucmd } },` spremeni v `{ MODKEY,  XK_a,  spawn,  {.v = dmenucmd } },`, da odpiraš menu z bolj priročno bližnjico **Super+a**
        - Dodaj `{ MODKEY,  XK_Tab,  focusstack,  {.i = +1 } },` za kroženje med okni z **Super+Tab**
        - Dodaj `{ MODKEY|ShiftMask,  XK_Tab,  focusstack,  {.i = -1 } },` za kroženje med okni v nasprotno smer z **Super+Shift+Tab**
        - Spremeni `{ MODKEY,  XK_Tab,  view,  {0} },` v `{ MODKEY,  XK_v,  view,  {0} },`
- `sudo make clean install` – program DWM ponovno izgradi s prilagoditvami

### ST

- `vim ~/viri/st/config.h` – odpri nastavitveno datoteko ST
- Namesto
    ```c
    /* Terminal colors (16 first used in escape sequence) */
    static const char *colorname[] = {
        /* 8 normal colors */
        [0] = "#282828", /* hard contrast: #1d2021 / soft contrast: #32302f */
        [1] = "#cc241d", /* red     */
        [2] = "#98971a", /* green   */
        [3] = "#d79921", /* yellow  */
        [4] = "#458588", /* blue    */
        [5] = "#b16286", /* magenta */
        [6] = "#689d6a", /* cyan    */
        [7] = "#a89984", /* white   */

        /* 8 bright colors */
        [8]  = "#928374", /* black   */
        [9]  = "#fb4934", /* red     */
        [10] = "#b8bb26", /* green   */
        [11] = "#fabd2f", /* yellow  */
        [12] = "#83a598", /* blue    */
        [13] = "#d3869b", /* magenta */
        [14] = "#8ec07c", /* cyan    */
        [15] = "#ebdbb2", /* white   */
    };
    ```
    vstavi

    ```c
    typedef struct {
        const char* const colors[258]; /* terminal colors */
        unsigned int fg;               /* foreground */
        unsigned int bg;               /* background */
        unsigned int cs;               /* cursor */
        unsigned int rcs;              /* reverse cursor */
    } ColorScheme;
    /*
     * Terminal colors (16 first used in escape sequence,
     * 2 last for custom cursor color),
     * foreground, background, cursor, reverse cursor
     */
    static const ColorScheme schemes[] = {
        // st (dark)
        {{"black", "red3", "green3", "yellow3",
          "blue2", "magenta3", "cyan3", "gray90",
          "gray50", "red", "green", "yellow",
          "#5c5cff", "magenta", "cyan", "white",
          [256]="#cccccc", "#555555"}, 7, 0, 256, 257},

        // Alacritty (dark)
        {{"#1d1f21", "#cc6666", "#b5bd68", "#f0c674",
          "#81a2be", "#b294bb", "#8abeb7", "#c5c8c6",
          "#666666", "#d54e53", "#b9ca4a", "#e7c547",
          "#7aa6da", "#c397d8", "#70c0b1", "#eaeaea",
          [256]="#cccccc", "#555555"}, 7, 0, 256, 257},

        // One Half dark
        {{"#282c34", "#e06c75", "#98c379", "#e5c07b",
          "#61afef", "#c678dd", "#56b6c2", "#dcdfe4",
          "#282c34", "#e06c75", "#98c379", "#e5c07b",
          "#61afef", "#c678dd", "#56b6c2", "#dcdfe4",
          [256]="#cccccc", "#555555"}, 7, 0, 256, 257},

        // One Half light
        {{"#fafafa", "#e45649", "#50a14f", "#c18401",
          "#0184bc", "#a626a4", "#0997b3", "#383a42",
          "#fafafa", "#e45649", "#50a14f", "#c18401",
          "#0184bc", "#a626a4", "#0997b3", "#383a42",
          [256]="#cccccc", "#555555"}, 7, 0, 256, 257},

        // Solarized dark
        {{"#073642", "#dc322f", "#859900", "#b58900",
          "#268bd2", "#d33682", "#2aa198", "#eee8d5",
          "#002b36", "#cb4b16", "#586e75", "#657b83",
          "#839496", "#6c71c4", "#93a1a1", "#fdf6e3",
          [256]="#93a1a1", "#fdf6e3"}, 12, 8, 256, 257},

        // Solarized light
        {{"#eee8d5", "#dc322f", "#859900", "#b58900",
          "#268bd2", "#d33682", "#2aa198", "#073642",
          "#fdf6e3", "#cb4b16", "#93a1a1", "#839496",
          "#657b83", "#6c71c4", "#586e75", "#002b36",
          [256]="#586e75", "#002b36"}, 12, 8, 256, 257},

        // Gruvbox dark
        {{"#282828", "#cc241d", "#98971a", "#d79921",
          "#458588", "#b16286", "#689d6a", "#a89984",
          "#928374", "#fb4934", "#b8bb26", "#fabd2f",
          "#83a598", "#d3869b", "#8ec07c", "#ebdbb2",
          [256]="#ebdbb2", "#555555"}, 15, 0, 256, 257},

        // Gruvbox light
        {{"#fbf1c7", "#cc241d", "#98971a", "#d79921",
          "#458588", "#b16286", "#689d6a", "#7c6f64",
          "#928374", "#9d0006", "#79740e", "#b57614",
          "#076678", "#8f3f71", "#427b58", "#3c3836",
          [256]="#3c3836", "#555555"}, 15, 0, 256, 257},
     };
     
    static const char * const * colorname;
    int colorscheme = 1;
    ```
- v `static MouseShortcut mshortcuts[] = {}` opredeli še dve bližnjici, da se lahko premikaš gor/dol z vrtenjem koleščka:
    ```c
	{ ShiftMask,            Button4, kscrollup,      {.i = 1} },
	{ ShiftMask,            Button5, kscrolldown,    {.i = 1} },
    ```
- V `static MouseShortcut mshortcuts[] = {}`:

    ```c
    { TERMMOD,              XK_Prior,       zoom,           {.f = +1} },
    { TERMMOD,              XK_Next,        zoom,           {.f = -1} },
    ```
    zamenjaj s
    ```c
	{ ControlMask,          XK_plus,        zoom,           {.f = +1} },
	{ ControlMask,          XK_minus,       zoom,           {.f = -1} }
    ```
    ter dodaj sledeče bližnjice za izbiro barvnih tem (in lepljenje):
    ```c
	{ ControlMask,          XK_e,           kscrollup,      {.i = -1} },
	{ ControlMask,          XK_y,           kscrolldown,    {.i = -1} },
 	{ MODKEY,               XK_1,           selectscheme,   {.i =  0} },
 	{ MODKEY,               XK_2,           selectscheme,   {.i =  1} },
 	{ MODKEY,               XK_3,           selectscheme,   {.i =  2} },
 	{ MODKEY,               XK_4,           selectscheme,   {.i =  3} },
 	{ MODKEY,               XK_5,           selectscheme,   {.i =  4} },
 	{ MODKEY,               XK_6,           selectscheme,   {.i =  5} },
 	{ MODKEY,               XK_7,           selectscheme,   {.i =  6} },
 	{ MODKEY,               XK_8,           selectscheme,   {.i =  7} },
 	{ MODKEY,               XK_9,           selectscheme,   {.i =  8} },
 	{ MODKEY,               XK_0,           nextscheme,     {.i = +1} },
 	{ MODKEY|ControlMask,   XK_0,           nextscheme,     {.i = -1} },

	{ MODKEY,           	XK_v,           selpaste,       {.i =  0} },
    ```

### Drugi programčki, bližnjice

`sudo apt install imagemagick xclip` – namesti programa za zajem posnetka zaslona (za bližnjice glej [~/.config/sxhkd/sxhkdrc](https://codeberg.org/JanezPavelZebovec/My_Linux_configs/src/branch/main/~/.config/sxhkd/sxhkdrc))

### Knjižnice za Python

#### Matplotlib

Uporablja se za risanje najrazličnejših grafov

- `sudo apt install python3-matplotlib` – namestitev knjižnice

## Kaj je treba še dodati v vodič:

- namesti udisks2 (za udisksctl) za nameščanje ključka
    - povezava mape ~/USB
- namesti sxhkd
    - ponovni zagon sxhkd: `pkill -usr1 -x sxhkd`

- `chmod +x pot/do/programčka` – podeli datoteki izvršilne pravice

---

## Namestitev strežnika

Vsi koraki razen zadnjega so enaki.
V *Software Selection* (med zadnjimi koraki) naj bosta izbrana le *Standard System Utilities* in *SSH server*. Za strežnik namreč ne potrebuješ namitnega okolja.

Po prvem zagonu novega *operacijskega sistema*:

- `sudo apt update && sudo apt upgrade`
- `sudo apt install htop` – nenujen program za pregled procesov, ki tečejo trenutno na računalniku
- `sudo apt install screenfetch` – nenujen program za pregled osnovnih lastnosti računalnika (OS,*kernel*, število nameščenih paketov, *disk*, CPU, GPU, RAM)
- `sudo apt install nginx` – namesti strežnik
    - `sudo systemctl enable nginx` – omogoči samodejni zagon strežnika ob zagonu operacijskega sistema
    - `sudo systemctl status nginx` – izpiše stanje strežnik (npr. ali teče / je omogočen)
- `sudo apt install ufw` – namesti požarni zid
    - `sudo ufw enable` – omogoči požarni zid
    - `sudo ufw status` – izpiše stanje požarnega zidu
    - `sudo ufw allow ssh` – dovoli SSH (*Secure Shell*, vrata 22; omogoči oddaljeno upravljanje strežnika)
    - `sudo ufw allow http` – dovoli HTTP (*HyperText Transfer Protocol*, vrata 80; protokol za nešifriran prenos spletnih strani)
    - `sudo ufw allow https` – dovoli HTTPS (*HTTP Secure*, vrata 443; šifriran/varen HTTP)
- `hostname -I` – izpiše naslove IP (IPv4 in IPv6; običajen IP je oblike *000.000.0.00* in je na začetku izpisa)
- `ssh up-ime@naslov-ip` oz. `ssh up-ime@ime-naprave` – tako se lahko povežeš s strežnikom z oddaljenega računalnika (recimo osebnega), zahtevalo bo geslo strežnika
- `sudo apt install git` – namesti git
- `git clone https://github.com/K0p1-Git/cloudflare-ddns-updater.git` – prenese program za posodabljanje dinamičnega IP-ja
- `cp cloudflare-template.sh cloudflare.sh` – podvoji predlogo programa in izpolni potrebna polja v novi datoteki
- `sudo apt install curl` – namesti curl (potrebuje ga program zgoraj)
- `./cloudflare.sh` – zaženi program
- `crontab -e` – uredi crontab (program za sinhronizacijo)
    - na konec datoteke ddodaj `*/1 * * * * /bin/bash /user/cloudflare.sh`, shrani in zapri
- `systemctl restart cron` – ponovno zažene cron

- `nslookup moja-domena`
