---
title: Računstvo
date: 2026-04-13
description: računska teorija, enačbe
keywords: računstvo, matematika
author: Janez Pavel Žebovec
---

\require{color}

# Računstvo

| ne | ali | in | torej / če ..., potem | če in samo če ..., potem | je enako | podmnožica | unija | prazna množica | presek |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $$\neg$$ | $$\lor$$ | $$\land$$ | $$\implies$$ | $$\iff$$ | $$\Leftrightarrow$$ $$=$$ | $$\subset$$ | $$\cup$$ | $$\emptyset$$ | $$\cap$$ |

## *Logika*

| $A$ | $B$ | $\neg A$ | $A \land B$ | $A \lor B$ | $A \implies B$ | $A \iff B$ |
| --- | --- | --- | --- | --- | --- | --- |
| P | P | N | P | P | P | P |
| P | N | N | N | P | N | N |
| N | P | P | N | P | P | N |
| N | N | P | N | N | P | P |

## Množice števil

Računamo lahko v različnih množicah števil - to je stvar izbire. Tako lahko račun v neki množici nima rešitve (ki jo hočemo v tej množici), ima pa jo v neki drugi množici, vendar nas ta rešitev ne zanima, zato razglasimo, da račun v izbrani množici nima rešitve (tako je običajno npr. s koreni negativnih števil).

$$ \href{#Naravna_stevila}{\mathbb{N}} < \href{#Cela_stevila}{\mathbb{Z}} < \href{#Razlozna_stevila}{\mathbb{Q}} < \href{#Stvarna_stevila}{\mathbb{R}} < \href{#Skupna_stevila}{\mathbb{C}} $$

### Naravna števila

To so (*pozitivna* cela) števila s katerimi štejemo (npr. 1, 2, 3, 4, 5, 6, ...).

### Cela števila

To so naravna števila, število 0 in nasprotne vrednosti naravnih števil - *negativna* cela števila (npr. 0, 1, -1, 2, -2, 3, -3, ...)

### Razložna števila
(*racionalna* števila)

To so števila, ki jih lahko izrazimo kot razmerje dveh celih števil, oz. predstavimo z ulomki (npr. 0, 1, -1, 1/3, -1/3, ...).

### Nerazložna števila
(*iracionalna* števila)

To so števila, ki jih ni mogoče izraziti kot razmerje dveh celih števil, oz. predstaviti z ulomki (npr. $\sqrt{2}$, π, e, ...).

### Stvarna števila
(*realna* števila)

To so števila, ki jih lahko predstavimo na običajni številski premici (npr. 0, 1, -1, 1/3, -1/3, π, $\sqrt{2}$, ...).

### Skupna števila
(*kompleksna* števila)

Skupna števila imajo stvarno sestavino (*realno komponento*) *a* in umišljeno sestavino (*imaginarno komponento*) *b*. Umišljena *komponenta* se označuje z i.

$$ \mathbb{C} = \left\{a + b\mathrm{i}; (a, b \in \mathbb{R} ) \land (\mathrm{i}^2 = -1 \Leftrightarrow \sqrt{-1} = \sqrt{\mathrm{i^2}})\right\} $$
$$ \lvert z \rvert = \sqrt{a^2 + b^2} $$
$$ {\lvert z \rvert}^2 = z \overline{z} $$

*Polarni* zapis:

$$ z = \lvert  z \rvert (\cos \phi + \mathrm{i} \sin \phi) $$

Eulerjev zapis:

$$ z = \lvert z \rvert \mathrm{e}^{\mathrm{i} \phi} $$

De Moivrova enačba:

$$ z^n = {\lvert  z \rvert}^n (\cos n \phi + \mathrm{i} \sin n \phi) = {\lvert z \rvert}^n \mathrm{e}^{\mathrm{i} n \phi} $$

## Računske *operacije*

*Operacije* imajo lahko sledeče lastnosti:

- **zamenljivost**, zakon o zamenjavi (*komutativnost*; npr. $a+b = b+a$, $A \cup B = B \cup A$),
- **družilnost**, zakon o združevanju (*asociativnost*; npr. $(a+b)+c = a+(b+c)$, $(A \cup B) \cup C = A \cup (B \cup C)$),
- **razčlenljivost**, zakon o razčlenitvi (*distributivnost*; npr. $(a+b)c = ac + bc$, $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$),
- **povratnost** (*refleksivnost*; npr. $a \parallel a$),
- **vzajemnost** (*simetričnost*; npr. $a \parallel b \iff b \parallel a$),
- **prehodnost** (*tranzitivnost*; npr. $a \parallel b \land b \parallel c \iff a \parallel c$),
- **nespremenljivost** (*idempotenca*; npr. $A \cup A = A$),
- ***absorbcija*** (npr. $A \cup (A \cap B) = A$ - *absorbcija* unije glede na presek),

## Množice

Potenčna množica množice A je množica njenih podmnož

ic, vključno s prazno množico.
Če imamo množico A = {a, b, c, ... }, je potenčna množica te množice:

P(A) = {{}, {a}, {b}, {c}, ..., {ab}, {ac}, {bc}, ..., {abc}, ...}

Moč takšne potenčne mnoćžice, kjer je *n* število elementov v množici, je:

$$ m(\mathcal{P}(A)) = \binom{n}{0} + \binom{n}{1} + \binom{n}{2} + ... + \binom{n}{n} = 2^n $$

## Kombinatorika

Verjetnost sestavljenega dogodka je zmnožek verjetnosti posameznih dogodkov.

### Razvrstitve (*permutacije*)

To so razporedbe *n* različnih *elementov* na *n* mest.

$$ P_n = n! $$

Pri razvrstitvah z *r* ponovitvami posameznih *elementov* ne upoštevamo različnih razvrstitev enakih predmetov (možnih razvrstitev je *r!*):

$$ P_n^{r_1, r_2, r_3, ... , r_k} = \frac {n!}{r_1! r_2! r_3! ... r_k!} $$

Pri krožni razvrstitvi ne upoštevamo možnih zasukov enake razporedbe (če ne razlikujemo mest te krožne razvrstitve):

$$ P_n = \frac {n!}{n} = (n-1)! $$

### Različice (*variacije*)

To so razporedbe *n* predmetov na *r* mest.

Če se *elementi* ne smejo ponavljati (na voljo imaš le različne *elemente*):

$$ V_n^r = \frac {n!}{(n-r)!} $$

Če se *elementi* lahko ponavljajo (uporabiš lahko večkrat enake *elemente*):

$$ ^{(p)}V_n^r = n^r $$

### Izbori (*kombinacije*)

To so izbori *r* *elementov* iz množice z *n* elementi. Pri tem vrstni red ni pomemben, zato je to pravzaprav število različic (*variacij*), deljeno s številom možnih razvrstitev *elementov* posamezne različice.

$$ C_n^r = \frac {V_n^r}{r!} = \binom {n}{r} $$

## Verjetnost

*Statistično*/*empirično* se verjetnost dogodka *P(A)* lahko opredeli kot število, pri katerem se ustali *relativna* pogostost dogodka A pri velikem številu ponovitev poskusa:

$$ P(A) = \lim_{n \to \infty} f'(A) $$

*Relativna* pogostost dogodka A se izračuna kot pogostost dog. A *f(A)* na število ponovitev poskusa *n*:

$$ f'(A) = \frac {f(A)}{n} $$

Običajno se verjetnost opredeli kot št. ugodnih izidov *m* za dogodek na št. vseh izidov *n*:

$$ P(A) = \frac {m}{n} $$

Za *elementarni* dogodek v popolnem *sistemu* dogodkov (kjer so vsi dog. enako verjetni) je ta verjetnost $P(E) = \frac {1}{n}$.

## Zaporedja

Če je $a_n$ zaporedje s *pozitivnimi* členi, velja, da če sta zaporedji  $\frac{a_{n+1}}{a_n}$ in $\sqrt[n]{a_n}$ *konvergentni*, je:
$$ \lim_{x \to 0} \sqrt[n]{a_n} = \lim_{x \to 0} \frac {a_{n+1}}{a_n} $$

### *Aritmetično* zaporedje

Splošni člen: $$ a_n = (n - 1)d $$
Vsota zaporedja: $$ S_n = \frac{n}{2} (a_1 + a_n) = \frac{n}{2} ( 2a_1 + a_n) $$

### *Geometrijsko* zaporedje

Splošni člen: $$ a_n = a_1 k^{n-1} $$
Vsota zaporedja: $$ S_n = a_1 \frac {k^n -1}{k - 1} $$

V primeru, da pa velja $k = 1$:
$$ S_n = n a_1 $$

#### Neskončna *geometrijska* vrsta

- $|k| < 1$ - *konvergentno* zaporedje, vsota neskončnega zaporedja je končna;

- $|k| \ge 1$ - *divergentno* zaporedje, vsota neskončnega zaporedja je neskončna

### Številske vrste

Da vrsta *konvergira*, morajo njeni členi *konvergirati* proti 0.

$$ |k| < 1; \lim_{n \to \infty} S_n = \sum_{i=1}^{\infty} a_1 k^{i-1} = \frac{a_1}{1-k} $$
$$ a + ak + ak^2 + ak^3 + ... = \frac{a}{a-k}; \lvert k \rvert < 1 $$
$$ \sum_{n=1}^{\infty} \frac{1}{n} = \infty $$
$\sum_{n=1}^{\infty} \frac{1}{n^r}$ za $r > 1$ *konvergira*

#### Pogoji za *konvergenco* / *divergenco*

Za vrsto z ne nujno *pozitivnimi* členi velja:

- vrsta *konvergira absolutno*, če *konvergira* $\sum \lvert a_n \rvert$
- vrsta *konvergira* pogojno, če *konvergira*, a ne *absolutno*
    - Primer: *alternirajoča* vrsta:
        - Leibnizev pogoj: če *absolutne* vrednosti členov padajo proti nič, je vrsta *konvergenta*

##### Primerjalni pogoj

$\sum a_n$ in $\sum b_n$ sta vrsti s *pozitivnimi členi* in velja $a_n \leq b_n$. Potem za vse $n$ od nekod dalje velja:

- če je $\sum b_n$ *kovergentna*, potem je tudi $\sum a_n$ *kovergentna*
- če je $\sum b_n$ *divergentna*, potem je tudi $\sum a_n$ *divergentna* 

##### Količniški pogoj

$\sum a_n$ je vrsta s *pozitivnimi* členi in obstaja $D = \lim_{n \to \infty} \frac{a_{n+1}}{a_n}$

- $D < 1$: vrsta je *konvergentna*
- $D > 1$: vrsta je *divergentna*
- $D = 1$: vrsta je ali *konvergentna* ali *divergentna*

##### Korenski pogoj

$\sum a_n$ je vrsta s *pozitivnimi* členi, obstaja $C = \lim_{n \to \infty} \sqrt[n]{a_n}$

- $C < 1$: vrsta je *konvergentna*
- $C > 1$: vrsta je *divergentna*
- $C = 1$: vrsta je *konvergentna* ali *divergentna*

##### Raabejev pogoj

Ta pogoj je lahko uporaben, če data količniški in korenski 1.

$\sum a_n$ je vrsta s pozitivnimi členi in obstaja

$$ R = \lim_{ n \to \infty} n \left( \frac{a_n}{a_{n+1}} - 1 \right) $$

- $R > 1$: vrsta je *konvergentna*
- $R < 1$: vrsta je *divergentna*
- $R = 1$: vrsta je *konvergentna* ali *divergentna*

## Dvočlenik
*Binom*

Dvočlenik je $a+b$.

### Dvočlenski izrek (*binomski* izrek)

Dvočlensko znamenje je $\binom {n}{r}$.

$$ (a+b)^n = \binom{n}{0} a^n b⁰ + \binom{n}{1} a^{n-1} b^1 + \binom{n}{2} a^{n-2} b^2 + \binom{n}{3} a^{n-3} b^3 + ... + \binom {n}{n} b^n a^0 = \sum_{r=0}^{n} \binom {n}{r} a^{n-r} b^r $$

Splošni člen dvočlenskega izreka je torej:
$$ \binom {n}{r} a^{n-r} b^r$$

Nekaj pravil za računanje z dvočlenskim znamenjem:

$$ \binom {n}{r} = \binom {n}{n-r} $$
$$ \binom {n}{0} = \binom {n}{n} = 1 $$
$$ \binom {n}{r} + \binom {n}{r+1} = \binom {n+1}{r+1} $$

## Funkcije

Funkcija je lahko:

- soda: $f(-x) = f(x)$,
- liha: $f(-x) = -f(x)$;
- injektivna (nobena vrednost y se ne ponovi): $x_1 \neq x_2 \implies f(x_1) \neq f(x_2)$;
- surjektivna (zaloga funkcije so vsa stvarna števila): $Z_f = \mathbb{R}$;
- bijektivna: injektivna in surjektivna;

Enačbo funkcije lahko podamo v več oblikah:

- razvita (*eksplicitna*): $y = kx + n$ - razberemo smerni količnik $k$ in začetno vrednost $n$,
- nerazvita (*implicitna*): $ax + by + c = 0$ - enačeno z nič,
- odsekovna (*segmentna*): $\frac{x}{m} + \frac{y}{n} = 1$ - razberemo ničlo $m$ in začetno vrednost $n$,
- razcepna/ničelna: $y = a(x - x_1)(x - x_2)(x - x_3)...$ - ničle $x_1, x_2, x_3$, ...,
- temenska
    - kvadratne funkcije: $y = a(x - p)^2 + q$ - teme T(p, q)

V nerazviti obliki lahko zapišemo enačbe vseh funkcij, v ostalih dveh pa ne - v razviti ne moremo zapisati navpičnih funkcij.

Računanje s funkcijami:
$$ (f \pm g)(x) = f(x) \pm g(x) $$
$$ (f \cdot g)(x) = f(x) \cdot g(x) $$
$$ \left( \frac{f}{g} \right) (x) = \frac{f(x)}{g(x)}; g(x) \neq 0 $$

Za kot, pod katerim funkcija seka os x velja $\tan \varphi = k$.
Kot med dvema funkcijama v presečišču:
$$ \tan \varphi = \left| \frac {k_1 - k_2}{1 + k_1 k_2} \right| $$

Inverzna funkcija $f^{-1}(x)$:
$$f: x \to y \iff f^{-1}: y \to x$$

Sestavljena funkcija (*kompozitum funkcije*):
$$ (g \circ f)(x) = g(f(x)) \neq (f \circ g)(x) $$

### Linearna funkcija

$$ f(x) = kx + n $$
$$ k = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1} = \tan \alpha $$

### Potenciranje

Pravila za računanje s potencami:
$$ a^0 = 1 $$
$$ a^m \cdot a^n = a^{m + n} $$
$$ \frac{a^m}{a^n} = a^{m - n} $$
$$ (a^m)^n = a^{mn} $$
$$ a^{-n} = (\frac{1}{a})^n $$

Potence, ki so ulomki, lahko izrazimo tudi s koreni:
$$ a^{\frac{m}{n}} = \sqrt[n]{a^m} $$

#### Kvadratna funkcija

- $f(x) = ax^2 + bx + c; a \neq 0$;
- temenska oblika: $f(x) = a(x - p)^2 + q$, teme T(p, q);
- razcepna/ničelna oblika: $f(x) = a(x - x_1)(x - x_2)$, ničli $x_1$ in $x_2$;

$$ x_{1, 2} = \frac{-b \pm \sqrt{D}}{2 a} $$
$$ D = b^2 - 4 a c $$
$$ p = - \frac{b}{2 a} = \frac{x_1 + x_2}{2} $$
$$ q = f(p) = - \frac{D}{4a} $$

Vietovi enačbi (z ničlama $x_1$ in $x_2)$:
$$ x_1 + x_2 = -\frac{b}{a} $$
$$ x_1 \cdot x_2 = \frac{c}{a} $$

### Logaritem

Logaritem je obratna funkcija potenciranja.

$$ \log_a x = b \iff a^b = x $$

$$ \log_a 1 = 0 $$
$$ \log_a a = 1 $$

Pravila za računanje z logaritmi:

$$ \log_a(u \cdot v) = \log_a u + \log_a v $$
$$ \log_a \left( \frac{u}{v} \right) = \log_a u - \log_a v $$
$$ \log_a u^v = v \cdot \log_a u $$
$$ \log_a u = \frac{\log_b u}{\log_b a} $$

### Kotne funkcije

| fun. \\ kot | $$ 0 $$ | $$ 30 ° = \frac{\pi}{6} \approx 0,5 $$ | $$ 45 ° = \frac{\pi}{4} \approx 0.8 $$ | $$ 60 ° = \frac{\pi}{3} \approx 1,0 $$ | $$ 90 ° = \frac{\pi}{2} \approx 1,6 $$ |
| --- | --- | --- | --- | --- | --- |
| sin | $$ 0 $$ | $$ \frac{1}{2} $$ | $$ \frac{\sqrt{2}}{2} $$ | $$ \frac{\sqrt{3}}{2} $$ | $$ 1 $$ |
| cos | $$ 1 $$ | $$ \frac{\sqrt{3}}{2} $$ | $$ \frac{\sqrt{2}}{2} $$ | $$ \frac{1}{2} $$ | $$ 0 $$ |
| tan | $$ 0 $$ | $$ \frac{\sqrt{3}}{3} $$ | $$ 1 $$ | $$ \sqrt{3} $$ |  |
| cot |  | $$ \sqrt{3} $$ | $$ 1 $$ | $$ \frac{\sqrt{3}}{3} $$ |$$ 0 $$ |

$$ \sin^2 x + \cos^2 x = 1 $$
$$ \sin(x + y) =\sin x \cos y + \cos x \sin y$$
$$ \cos(x + y) = \cos x \cos y - \sin x \sin y $$
$$ \cos^2 x = \frac{1 + \cos 2x}{2} $$

#### *Hiperbolične*

$$ \sinh x = \frac{\mathrm{e}^x - \mathrm{e}^{-x}}{2} $$
$$ \cosh x = \frac{\mathrm{e}^x + \mathrm{e}^{-x}}{2} $$
$$ \tanh x = \frac{\mathrm{e}^x  \mathrm{e}^{-x}}{\mathrm{e}^x + \mathrm{e}^{-x}} $$

$$ \cosh^2x - \sinh^2x = 1 $$
$$ \sinh (x + y) = \sinh x \cosh y + \cosh x \sinh y $$
$$ \cosh (x + y) = \cosh x \cosh y + \sinh x \sinh y $$
$$ \tanh (x + y) = \frac{\tanh x \tanh y}{1 + \tan x \tan y} $$

### Limita

Računanje z limitami:

$$ \lim_{n \to \infty} (a_n \pm b_n) = \lim_{n \to \infty} a_n \pm \lim_{n \to \infty}b_n $$
$$ \lim_{n \to \infty} (a_n \cdot b_n) = \lim_{n \to \infty} a_n \cdot \lim_{n \to \infty}b_n $$
$$ \lim_{n \to \infty} \left( \frac{a_n}{b_n} \right) = \frac{\lim_{n \to \infty} a_n}{\lim_{n \to \infty}b_n} $$
$$ \lim_{n \to \infty} (c \cdot a_n) = c \cdot \lim_{n \to \infty}a_n; c \in \mathbb{R} $$

Limita in druge funkcije:

$$ \lim_{n \to \infty} f(a_n) = f \left( \lim_{n \to \infty} (a_n) \right) $$
$$ \lim_{n \to \infty} f(a_n^{b_n}) = \mathrm{e}^{\lim_{n \to \infty} (a_n - 1) b_n} $$

**L'Hospitalovo pravilo**: Naj bosta funkciji $f$ in $g$ odvedljivi na neki okolici točke $x_0$ (ne nujno v $x_0$) in naj gresta obe hkrati proti 0 ali pa obe hkrati proti $\pm \infty$ pri $x \to x_0$. Če obstaja limita $\lim_{x \to x_0} \frac{f'(x)}{g'(x)}$, obstaja tudi njen enaka limita $\lim_{x \to 0} \frac{f(x)}{g(x)}$.

Osnovne limite:

$$ \lim_{n \to \infty} C = C $$
$$ \lim_{n \to \infty} \frac{1}{n} = 0 $$
$$ \lim_{n \to \infty} a^n = \begin{cases}
    0; -1 < a < 1 \\
    \infty; a > 1 \\
    1; a = 1
\end{cases} $$
$$ \lim_{n \to \infty} \left( 1 + \frac {r}{n} \right)^n = e^r; r \in \mathbb{R} $$
$$ \lim_{x \to \infty} {\left( 1 + f(x) \right)}^{\frac{1}{f(x)}} = e $$
$$ \lim_{x \to 0} \frac {\sin x}{x} = 1; \lim_{x \to \infty} \frac {\sin x}{x} = 0 $$ 
$$ \lim_{x \to \infty} \sqrt[x]{x^r} = \lim_{x \to \infty} x^{\frac{r}{x}} = 1 $$

### Odvod in integral

Odvod funkcije je funkcija naklonov te funkcije. Opredelitev odvoda:

$$ f'(x) = \lim_{h \to 0} \frac {f(x + h) - f(x)}{h} $$

**Langrangeev izrek**: če je zvezna funkcija $f: [a, b] \rightarrow \mathbb{R}$ odvedljiva na intervalu (a, b), obstaja $c \in (a, b)$, za katerega velja:

$$ \frac{f(b) - f(a)}{b - a} = f'(c) $$

Integral je obratna funkcija odvoda.

V spodnji preglednici so neosnovni (oz. *bolj* neosnovni) integrali sivo obarvani.

| $$ \boldsymbol {f(x)} $$ | $$ \boldsymbol {f'(x)} $$ | $$ \boldsymbol {\int f(x) \mathrm{d}x} $$ |
| --- | --- | --- |
| $$ a $$ | $$ 0 $$ | $$ ax + C $$ |
| $$ \textcolor{grey} {1} $$ | $$ \textcolor{grey} {0} $$ | $$ \textcolor{grey} {x + C} $$ |
| $$ a x $$ | $$ a $$ | $$ \textcolor{grey} {a \frac {x^2}{2}+C} $$ |
| $$ \textcolor{grey} {x} $$ | $$ \textcolor{grey} {1} $$ | $$ \textcolor{grey} {\frac {x^2}{2}+C} $$|
| $$ x^r $$ | $$ rx^{r-1} $$ | $$ \frac {x^{r+1}}{r+1} + C $$ |
| $$ x^x $$ | $$ x^x (ln x + 1) $$ | |
| $$ x^{-1} $$ | $$ \textcolor{grey} {-x^{-2}} $$ | $$ \ln |x| + C $$ |
| $$ a^x $$ | $$ a^x \ln a = \frac {a^x}{log_a \mathrm{e}} $$ | $$ \frac {a^x}{lna} + C $$ |
| $$ \textcolor{grey} {e^x} $$ | $$ \textcolor{grey} {\mathrm{e}^x} $$ | $$ \textcolor{grey} {\mathrm{e}^x + C} $$ |
| $$ \mathrm{e}^{a x} $$ | $$ a e^{a x} $$ | $$ \frac {\mathrm{e}^{a x}}{a} + C $$ |
| $$ \log_a x $$ | $$ \frac {1}{x \ln a} = \frac {\log_a \mathrm{e}}{x} $$ | |
| $$ \textcolor{grey} {ln x} $$ | $$ \textcolor{grey} {\frac {1}{x}} $$ | |
| $$ \sin x $$ | $$ \cos x $$ | $$ - \cos x + C $$ |
| $$ \sin a x $$ | | $$ -\frac {1}{a} \cos a x + C $$ |
| $$ \cos x $$ | $$ - \sin x $$ | $$ \sin x + C $$ |
| $$ \cos a x $$ | | $$ \frac {1}{a} \sin a x + C $$ |
| $$ \tan x $$ | $$ \frac {1}{cos^2x} $$ | |
| $$ \frac {1}{\cos^2 x} $$ | | $$ \tan x + C $$ |
| $$ \cot x $$ | $$ - \frac {1}{\sin^2 x} $$ |
| $$ \frac {1}{\sin^2 x} $$ | | $$ - \cot x + C $$ |
| $$ \arcsin x $$ | $$ \frac {1}{\sqrt {1 - x^2}} $$ | |
| $$ \frac {1}{\sqrt {1 - x^2}}$$ | | $$ \arcsin x + C $$ |
| $$ \arccos x $$ | $$ - \frac {1}{\sqrt {1 - x^2}} $$ | |
| $$ \arctan x $$ | $$ \frac {1}{1 + x^2} $$ | |
| $$ \frac {1}{x^2 + 1} $$ | | $$ \arctan x + C $$ |
| $$ \frac {1}{x^2 + a^2} $$ | | $$ \frac {1}{a} \arctan \frac {x}{a} + C $$ |
| $$ \operatorname{arccot} x $$ | $$ - \frac {1}{1 + x^2} $$ | |

Pravila za računanje z integrali:
$$ \int \bigl( f(x) + g(x) \bigr) \mathrm{d}x = \int f(x) \mathrm{d} x + \int g(x) \mathrm{d} x $$
$$ \int k \cdot f(x) \mathrm{d} x = k \int f(x) \mathrm{d} x $$

Integracija po delih:

$$ \int u v' = u v - \int v u' $$

Prostornina telesa vrtenine zvezne funkcije $f$ okoli osi x:

$$ V = \pi \int_a^b f(x)^2 \mathrm{d}x $$

Površina vrtenine:

$$ P = 2 \pi \int_{x_1}^{x_2} f(x) \sqrt{1 + f'(x)^2} dx $$

Ploščina lika med krivuljama je določeni integral zgornjega roba lika *minus* spodnji rob lika (včasih se bolj splača *integrirati* po osi y namesto po x).

Ploščina lika, omejenega s krivuljo v polarnih koordinatah:

$$ S = \frac{1}{2} \int_{\phi_1}^{\phi_2} r^2 d \phi $$

### Taylorjeva vrsta

Za izračun vrednosti $n$-krat odvedljivega veččlenika (*polinoma*) v okolici točke $a$:

$$ T_n f(x; a) = f(a) + f'(a) (x - a) + \frac{f''(a)}{s!} (x - a)^2 + ... + \frac{f^{(n)} (a)}{n!} (x - a)^n $$

## Stožnice

Stožnice se tako imenujejo zato, ker jih lahko dobimo s presekom dvojnega stožca z ravnino. Stožnice so krivulje II. reda.

$$ Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0 $$

Za stožnice velja, da je vsaj eden od količnikov A, B, C ni enak 0. $B = 0$

- $A=C$ - krožnica;
- $A C > 0$ (A in C sta enako predznačena in nista enaka 0) - elipsa
- $A C < 0$ (A in sta sta različno predznačena in nista enaka 0) - hiperbola;
- $A = 0$ ali $C = 0$ - parabola

Izsrednost je razdalja posameznega od dveh gorišč od središča:¸

- *linearna* izsrednost e (*absolutna* vrednost);
- *numerična* izsrednost ε (*relativna* na polos izsrednosti, oz. na polos, na kateri ležita gorišči, oz. na realno polos)

Izsrednost je lahko:

- vodoravna, gorišči sta na osi x: $a > b$:
$$e^2 = a^2 - b^2$$
$$ε = \frac{e}{a}$$
- navpična, gorišči sta na osi y: $a < b$
$$e^2 = b^2 - a^2$$
$$ε = \frac{e}{b}$$

Središče *S(p, q)*, polmer *r*, x-polos *a* in y-polos *b*.

### Krožnica

$$ (x-p)^2 + (y-q)^2 = r^2 $$

### Elipsa

$$ \frac {(x-p)^2}{a^2} + \frac {(y-q)^2}{b^2} = 1 $$

### Hiperbola

$$ \frac{(x - p)^2}{a^2} - \frac{(y - q)^2}{b^2} = \pm 1 $$

- za $+1$ je $a$ realna polos in $b$ imaginarna polos; temeni in gorišči sta na x-osi; lahko zapišemo kot:
$$ \frac{(x - p)^2}{a^2} - \frac{(y - q)^2}{b^2} = 1 $$

- za $-1$ je ravno obratno - $a$ je imaginarna in $b$ relna polos; temeni in gorišči sta na y-osi; lahko zapišemo kot:
$$ - \frac{(x - p)^2}{a^2} + \frac{(y - q)^2}{b^2} = 1 $$

### Parabola

- navpična vodnica $(- \frac{p}{2}, b)$: $$ (y - b)^2 = 2p(x - a)$$
- vodoravna vodnica $(a, - \frac{p}{2})$: $$ (x - a)^2 = 2p(y - b)$$

Teme parabole: (a, b).

## Prostoroslovje
(*geometrija*)

Tetivnemu liku lahko očrtamo krožnico tako, da so vsi njegovi koti na krožnici.

Za tetivni štirikotnik (to je le *trapez*) velja, da sta nasprotna kota sokota.

### Koti

#### Radian

Radian je opredeljen kot kot loka enake dolžine kot polmera. Torej je bseg kroga $2 \pi$ radianov, oz. $2 \pi$ polmerov.
$$ 180 ° = \pi \mathrm{rd} $$

### Trikotnik

Trikotnik z oglišči $A(x_1), B(x_2, y_2), C(x_3, y_3)$, s stranicami *a, b, c*.

$$ S = \frac {1}{2} \left| (x_2 - x_1)(y_3 - y_1) - (x_3 - x_1)(y_2 - y_1) \right| $$

$$ S = \frac{a v_a}{2} = \frac{ab \sin \gamma}{2} $$

$$ s = \frac {a+b+c}{2} $$

$$ R_{\text{očrtan.}} = \frac{abc}{4 S} $$
$$ r_{\text{včrtan.}} = \frac{S}{s} $$

Heronova enačba za ploščino trikotnika:
$$ S = \sqrt{s (s - a)(s - b)(s - c)} $$

Kosinusni izrek:
$$ a^2 = b^2 + c^2 - 2bccos \alpha $$

Sinusni izrek:
$$ \frac{a}{\sin \alpha} = \frac{b}{\sin \beta} = \frac{c}{\sin \gamma} = 2R_{\text{očrtan.}} $$

#### Pravokotni trikotnik

Pitagorov izrek:
$$ h^2 = k_1^2 + k_2^2 $$

Če je $S$ središče krožnice, na kateri ležijo točke $A$, $B$ in $C$:

- obodni kot je $\angle{ACB}$,
- središčni kot je $\angle{ASB}$,

Središčni kot je dvakratnik obodnega.

Talesov izrek: obodni kot nad premerom krožnice je pravi; oz. razdalja med razpoloviščem *hipotenuze* in nasprotnim ogliščem je vedno polovica *hipotenuze*.

### *Paralelogram*

Štirikotnik s paroma (nasprotnimi) vzporednimi stranicami.

$$ S = a v_a = ab \sin \alpha $$

### *Deltoid*

Štirikotnik s paroma skladnimi soležečimi stranicami.

$$ S = \frac{e f}{2} $$

### Krogla

Površina krogle je enaka plašču valja, visokega in širokega za premer krogle.

$$ P = 2 \pi r \cdot 2 r = 4 \pi r^2 $$
$$ V = \frac {4 \pi r^3}{3} $$

## *Vektorji*

$\vec{i}$, $\vec{j}$ in $\vec{k}$ so *bazni vektorji*, tvorijo *bazo koordinatnega* prostora, morajo biti *linerano* neodvisni (enega ne moremo izraziti z ostalimi), večinoma pravokotni drug na drugega.
$$\vec{a} = (a_1, a_2, a_3) = a_1 \vec{i} + a_2 \vec{j} + a_3 \vec{k} $$

- seštevanje/odštevanje: po *komponentah*
- množenje:
$$ \vec{a} \cdot \vec{b} = |\vec{a}| \cdot |\vec{b}| \cdot cos \phi = a_1 \cdot b_1 + a_2 \cdot b_2 +  a_3 \cdot b_3 $$
    - množenje/deljenje s *skalarjem*: po *komponentah*
- *absolutna* vrednost / dolžina:
$$ |\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2} $$

## *Matrike*

- Seštevanje/odštevanje *matrik*: po *komponentah*
- Množenje s *skalarjem* (oz. matrika velikosti 1x1): po *komponentah*
- Množenje *matrik* (ne velja zamenljivost / *komutativnost*, velja pa družilnost / *asociativnost*):
$$ \begin{bmatrix}a & b & c\\d & e & f\end{bmatrix} \begin{bmatrix}g & h\\i & j\\k & l\end{bmatrix} = \begin{bmatrix}ag + bi + ck & ah + bj + cl\\dg + ei + fk & dh + ej + fl\end{bmatrix} $$

Vsi *elemeti diagonale identične matrike* so enaki 1, ostali pa enaki 0.
$$ IA = AI = A $$

*Inverz diagonalne matrike*: po *komponentah*

*determinanta matrike*:
$$ \mathrm{det} \left( \begin{bmatrix}a & b\\c & d\end{bmatrix} \right) = ad + bc - ad - bc $$
$$ \mathrm{det} \left( \begin{bmatrix}a & b & c\\d & e & f\\g & h & i\end{bmatrix} \right) = aei + bfg + cdh - ceg - bdi - afh $$

*Komutator dveh matrik* A in B:
$$ [A, B] = AB - BA $$

**Gauss-Jordanova *eliminacija*** – z njo pridemo do *inverza matrike* (če ta obstaja); *operacije*, ki jih lahko uporabimo:

- i-to vrstico pomnožimo z neničelnim številom $\alpha$
- i-ti vrstici prištejemo $\beta$-kratnik j-te vrstice
- zamenjamo i-to in j-to vrstico

Sled (ang. *trace*) je vsota prekotniških (*diagonalnih*) členov:
$$ \mathrm{tr} (A) = A_{11} + A_{22} + ... + A_{nn} $$
$$ \mathrm{tr} (A + B) = \mathrm{tr} (A) + \mathrm{tr} (B) $$

### *Linearne transformacije*

*linearna transformacija* preoblikuje *koordinatni* prostor tako, da ohrani *koordinatno* mrežo (prejšnje navpičnice, vodoravnice in poševnice) ravne, vzporedne in enakomerno razmaknjene, ter ne premakne izhodišča. Opišemo jo lahko s preprosto *matriko*, ki nam pravzaprav pove *koordinate transformiranih baznih vektorjev* v *netransformiranem* prostoru. Če torej *matriko*/*vektor* množimo s to *transormacijsko matriko*, dobimo *transformirano matriko*/*vektor*.

$$ \vec{i} \to (a\vec{i}, c\vec{j});\, \vec{j} \to (b\vec{i}, d\vec{j}) $$
$$ \begin{bmatrix}x\\y\end{bmatrix} \to \begin{bmatrix}a & b\\c & d\end{bmatrix} \cdot \begin{bmatrix}x\\y\end{bmatrix} = \begin{bmatrix}ax & by\\cx & dy\end{bmatrix} $$

*Kompozicija transformacij* (več zaporednih – zaporedje je pomembno) = zmnožek njihovih *transformacijskih matrik* (zaporedje v levo):
$$ f(x) = \begin{bmatrix}a & b\\c & d\end{bmatrix}; g(x) = \begin{bmatrix}e & h\\l & m\end{bmatrix} $$
$$ f(g(x)) = \begin{bmatrix}a & b\\c & d\end{bmatrix} \left( \begin{bmatrix}e & h\\l & m\end{bmatrix} \begin{bmatrix}x\\y\end{bmatrix} \right) = \left( \begin{bmatrix}a & b\\c & d\end{bmatrix} \begin{bmatrix}e & h\\l & m\end{bmatrix} \right) \begin{bmatrix}x\\y\end{bmatrix} $$

*Determinanta transformacijske matrike* nam pove, za kakšen količnik se spremeni ploščina/prostornina ob *transformaciji*. Če je *determinanta negativna*, to pomeni, da se je *vektor normale* ploščine obrnil (zamenjal predznak), kar se zgodi, če "zamenjamo " *bazna vektorja* med sabo.
