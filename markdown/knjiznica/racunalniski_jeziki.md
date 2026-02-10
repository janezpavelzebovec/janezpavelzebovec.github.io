---
title: Računalniški jeziki
date: 2025-08-08
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
- `` ` `` - znak za kodo,
    - znakom za kodo ubežiš tudi tako, da jih obdaš s še več znaki: 
        
        ``` `` `besedilo, obdano z znaki kode` `` ```, oz. znotraj povedi lahko tudi tako: ``` ``blabla `besedilo, obdano z znaki kode` blabla`` ```

        Za večji blok kode pa:
        
        `````markdown
        ````
        ```jezik
        koda
        ```
        ````
        `````

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

---

## Zunanje povezave in viri

- [Daring Fireball - John Gruber: Markdown](https://daringfireball.net/projects/markdown/)
- [CommonMark - A strongly defined, highly compatible specification of Markdown](https://commonmark.org/)
- [Daring Fireball – John Gruber: Markdown](https://daringfireball.net/projects/markdown/)
- [The Markdown Guide – Basic Syntax](https://www.markdownguide.org/basic-syntax/)
