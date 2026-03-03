---
title: Računalniški jeziki
date: 2026-03-03
description: Skladnje, oz. zapisovanja, ki jih računalnik zna ustrezno upoštevati
keywords: programiranje, programski jeziki
author: Janez Pavel Žebovec
---

# Računalniški jeziki

## MD (Markdown)

Markdown je preprost označevalski jezik, ki je za razliko od HTML (ki sicer omogoča več) enostavno čitljiv tudi nepoučenemu.

Prelom besedila v novo vrstico narediš tako, da greš v novo vrstico. Odstavke ločiš z razmikom tako, da pustiš vrstico prazno.
Prazne vrstice je lepo puščati tudi med naslovi in besedilom, seznami in besedilom, ipd.; v nekaterih primerih pa je to celo obvezno.

- `# Naslov` - naslov; več ključnikov (*heštegov*) pomeni nižji podnaslov; HTML: `<h1>Naslov</h1>`;
    - Naslov prve ravni lahko označiš tudi tako:

        ```markdown
        Naslov
        =====
        ```
    - Naslov druge ravni lahko označiš tudi tako:

        ```markdown
        Podnaslov
        ---------
        ```
    - `# Naslov {#moj_ID}` - naslov z določenim ID-jem; HTML: `<h1 id="moj_ID">Naslov</h1>`;

Pri poudarkih je priporočljivo uporabljati zvezdice, čeprav so običajno podprti tudi podčrtaji.

- `*besedilo*` = `_besedilo_` (enojen podčrtaj) - poudarek (torej ležeče); HTML: `<em>besedilo</em>`;
- `**besedilo**` = `__besedilo__` (dvojen podčrtaj) - močan poudarek (torej krepko); HTML: `<strong>besedilo</strong>`;
- `~~besedilo~~` - prečrtano; HTML: `<del>besedilo</del>`;
- `===besedilo===` - obarvano ozadje besedila; HTML: `<mark>besedilo</mark>`;
- `> citat` - citat (če citat obsega več odstavkov, naj bo znak citata na začetku vsake vrstice); HTML: `<blockquote>citat</blockquote>`
    - Citat znotraj citata, oz. gnezdeni citati - dodaj več znakov citata:

        ```markdown
        > okvirni citat
        >
        >> gnezden citat
        ```
- `besedilo~podpisano-besedilo~besedilo` - podpisano besedilo (ne sme vsebovati presledkov);
- `besedilo^nadpisano-besedilo^besedilo` - napisano besedilo (ne sme vsebovati presledkov);

Med vrsticami/elementi seznama naj ne bo prazne vrstice, saj s tem ločiš seznam na več seznamov.

- `* element` = `- element` = `+ element` - oznaka *elementa* nerazvrščenega seznama; HTML: `<ul><li>element</li></ul>`;
- `1. element` (zapovrstne številke s piko) - oznaka *elementa* razvrščenega seznama; HTML: `<ol><li>element</li></ol>`
    - `- 1\. element` - če se element nerazvrščenega seznama začne z vrstno številko s piko, vmesti pred piko nazaj nagnjeno poševnico;

Vrstice elementov gnezdenega seznama zamakni noter:

```markdown
- element
- element
    - element gnezdenega seznama
    - element gnezdenega seznama
- element
```

Za odstavke znotraj elementa seznama jih zamakni noter in med temi odstavki pusti prazno vrstico

```markdown
- Prvi odstavek elementa.
    
    Drugi odstavek elementa.

    Tretji odstavek elemeta.

- drugi element
```

- `[besedilo povezave](URL)` - spletna povezava
    - `besedilo povezave](URL naslov povezave)` - spletna povezava z naslovom; HTML: `<a href="URL" title="naslov povezave">besedilo povezave</a>`;
    - `<povezava>` - spletna povezava, pri kateri je besedilo enako naslovu;
- `[besedilo povezave](pot)` - povezava s potjo, *relativno* na mapo, v kateri se nahaja stran;

- `[besedilo povezave][ime sklica]` - sklic (ime sklica je lahko tudi preposta številka)
    - `[sklic]` - sklic, pri katerem je besedilo povezave enako imenu sklica; lahko je tudi `besedilo [^1]` za opombo;
    - `[ime sklica]: povezava` - vrednost sklica (ali opombe: `[^1]: opomba`; običajno na koncu strani);

- `![naslov slike](pot/do/slike.jpg)` - vstavljena slika;
- `---` = `***` = `___` - vodoravna razdelilna črta (uporabiš *najmanj* tri znake);
- `` `koda` `` - besedilo v računalniškem jeziku;
- večji *blok* besedila v rač. jeziku (ni potrebno opredeliti jezika):

    ````markdown
    ```jezik
    koda
    koda
    ```
    ````

    ali pa z zamikom vrstic noter (to je dodaten zamik - če je zamaknjeno že zato, ker je znotraj elementa seznama, mora biti zamik dvojen):

    ```markdown
        koda
        koda
    ```


- preglednica:

    ```markdown
    | prvi stolpec | drugi stolpec |
    | --- | --- |
    | nekaj | še nekaj |
    | nekaj drugega | še nekaj drugega |
    ```
- opredelitev izraza:

    ```markdown
    izraz
    : opredelitev
    ```
- seznam opravkov:
    - `- [ ] opravek` - element seznama opravkov (neopravljen);
    - `- [x] opravek` - element seznama opravkov (opravljen);
- `:joy:` (oklepajoče dvopičje) - čustvenik;

Z nazaj nagnjeno poševnico `\` lahko ubežiš določenim znakom, če nočeš, da opredeljujejo Markdownove elemente:

- `\` - ubežna nazaj nagnjena poševnica,
- `*` - zvezdica za poudarke, sezname, ločilne črte,
- `_` - podčrtaj,
- `{}` - zaviti oklepaji za ID-je naslovov,
- `[]` - oglati oklepaji,
- `<>` - oznake za povezave,
- `()` - običajni oklepaji za del povezave z URL-jem,
- `#` - ključnik za naslove,
- `+`, `-` - plus in pomišljaj za sezname,
- `.` - pika za številkami za razvrščene sezname,
- `!` klicaj pred vstavljenimi slikami,
- `|` - navpičnica v preglednicah

## LaTeX

`\usepackage[slovene]{babel}` – uporabi slovenske oznake slik (*Slika* namesto *Figure*)

V glavi *dokumenta* določiš vrsto dokumenta, lahko tudi lastne velikosti strani in pisave
(npr. velikost strani A4, velikost pisave 12 in vrsta članka):

    \documentclass[a4paper,12pt]{article}

Izbira vrste *dokumenta* vpliva na privzet slog (npr. pri članku se vsebina začne že na isti strani kot naslov,
pri poročilu pa na naslednji strani, za naslovnico). Na voljo so:

- `article` - članek
- `report` – poročilo
- `book` – knjiga
- `slides` – prosojnice
- `proc` (*proceedings*) – zapisnik, postopek

Podatki o *dokumentu*:

    \title{Naslov dokumenta}
    \author{ime avtorja}
    \date{datum nastanka}

Za trenutni datum ob pretvorbi v npr. PDF uporabi `\date{\today}`.

Če želiš ustvariti naslovnico (v primeru razen članka je to ločena stran), kličeš

    \maketitle

Vsebina *dokumenta* je obdana z

    \begin{document}
    Vsa moja vsebina (besedilo).
    \end{document}

Karkoli pred tem vpliva na celoten *dokument*, karkoli za tem pa je prezrto.

Poglavja:

    \section{Naslov odseka/poglavja}
    \subsection{Naslov pododseka/podpoglavja}
    \subsubsection{Naslov podpododseka/podpodpoglavja}
    \paragraph{Naslov odstavka}
    \subparagraph{Nasov pododstavka}

V *dokumentu* vrst `book` in `report` obstaja še `\chapter{Naslov poglavja}`.

    Zadeva z imenom \label{ime}
    Sklicujem se na zadevo \ref{ime}
    Citiram \cite{ime_članka}

`\\` – v novo vrstico, ne pa v nov odstavek
`\,` – majhen pozitivni presledek
    
    \vspace{10mm}
    \\[10mm]

    {\it ležeče}
    {\bf krepko}
    {\large veliko}
    {\LARGE ogromno}

    \begin{itemize}
        \item prvi
        \item drugi
    \end{itemize}

    \begin{enumerate}
        \item prvi
        \item drugi
    \end{enumerate}

    $vrstična enačba$
    $$
        razdelek enačb
    $$

    \begin{equation}
        Enačba, na katero se lahko sklicujem
    \end{equation}

    \begin{eqnarray}
        Večvrstična enačba
        zadeve $=$ zaadeve sedno od sredinsko poravnanega enačaja
    |end{

`\!` – majhen negativni presledek
`\rm` – navadno besedilo (*roman*)
`\quad` – razmik znotraj vrstice

`\dots` – tri pike
`\approx` – je približno
`\sim` – je podobno
`\times` – vektorski produkt

    \beegin{figure}[h]
    \begin{center}
        \includegraphics[width=6cm]{naslov_slike_1.png}\\
        \includegraphics[width=6cm]{naslov_slike_2.png}
    \caption{Opis slike}
    \end{center}
    \end{figure}

    \begin{figure}
        \subfigure{\includegraphics{naslov_slike_1.png}
        \subfigure{\includegraphics{naslov_slike_2.png}
    \end{figure}

    \begin{thebibliography}
        \bibitem{članek} Naslov in podatki članka
    |end{thebibliography}

## Python

    import knjižnica
    import knjižnca as mojVzdevekKnjižnice
    import knjižnica.podknjižnica

    np.savetxt(ime_datoteke,
        podatki,
        delimiter=' '
        header='Moj naslov'
    )
    np.loadtxt()

### Matplotlib

    import numpy as np
    import matplotlib as mpl
    import matplotlib.pyplot as plt

    plt.plot(x, y,
        lebel='Ime izrisa',
        linewidth=0.5
    )
    plt.hlines()
    plt.vlines()
    plt.xticks()
    plt.yticks()
    plt.fill_between()
    plt.axvspan()

    plt.xscale('log')
    plt.yscale('lof')

    plt.title('Naslov grafa')
    plt.xlabel('Ime osi X')
    plt.ylabel('Ime osi Y')
    plt.legend()

    plt.savefig('Ime_datoteke_z_grafom.pdf')

### Scipy

    import scipy.optimize as opt
    
---

## Zunanje povezave in viri

- [Daring Fireball - John Gruber: Markdown](https://daringfireball.net/projects/markdown/)
- [CommonMark - A strongly defined, highly compatible specification of Markdown](https://commonmark.org/)
- [Daring Fireball – John Gruber: Markdown](https://daringfireball.net/projects/markdown/)
- [The Markdown Guide – Basic Syntax](https://www.markdownguide.org/basic-syntax/)
