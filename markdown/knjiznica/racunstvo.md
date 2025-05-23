---
title: Računstvo
date: 2025-05-23
description:
keywords: računstvo, matematika
author: Janez Pavel Žebovec
---

# Računstvo

## Množice števil

Računamo lahko v različnih množicah števil - to je stvar izbire. Tako lahko račun v neki množici nima rešitve (ki jo hočemo v tej množici), ima pa jo v neki drugi množici, vendar nas ta rešitev ne zanima, zato razglasimo, da račun v izbrani množici nima rešitve (tako je običajno npr. s koreni negativnih števil).

$$ \href{#Naravna_stevila}{\mathbb{N}} < \href{#Cela_stevila}{\mathbb{Z}} < \href{#Racionalna_stevila}{\mathbb{Q}} < \href{#Realna_stevila}{\mathbb{R}} < \href{#Kompleksna_stevila}{\mathbb{C}} $$

### Naravna števila

To so (*pozitivna* cela) števila s katerimi štejemo (npr. 1, 2, 3, 4, 5, 6, ...).

### Cela števila

To so naravna števila, število 0 in nasprotne vrednosti naravnih števil - *negativna* cela števila (npr. 0, 1, -1, 2, -2, 3, -3, ...)

### *Racionalna* števila

To so števila, ki jih lahko izrazimo kot razmerje dveh celih števil, oz. predstavimo z ulomki (npr. 0, 1, -1, 1/3, -1/3, ...).

### *Iracionalna* števila

To so števila, ki jih ni mogoče izraziti kot razmerje dveh celih števil, oz. predstaviti z ulomki (npr. $\sqrt{2}$, π, e, ...).

### *Realna* števila

To so števila, ki jih lahko predstavimo na običajni številski premici (npr. 0, 1, -1, 1/3, -1/3, π, $\sqrt{2}$, ...).

### *Kompleksna* števila

*Kompleksna* števila imajo *realno komponento* *a* in *imaginarno komponento* *b*: $Z = a + b\mathrm{i}$.

$\mathrm{i}^2 = -1$, oz. $\sqrt{-1} = \sqrt{\mathrm{i}}$

## Množice

Potenčna množica množice A je množica njenih podmnož

ic, vključno s prazno množico.
Če imamo množico A = {a, b, c, ... }, je potenčna množica te množice:

P(A) = {{}, {a}, {b}, {c}, ..., {ab}, {ac}, {bc}, ..., {abc}, ...}

Moč takšne potenčne mnoćžice, kjer je *n* število elementov v množici, je:

$$ m(\mathcal{P}(A)) = \binom{n}{0} + \binom{n}{1} + \binom{n}{2} + ... + \binom{n}{n} = 2^n $$

## Kombinatorika

Verjetnost sestavljenega dogodka je zmnožek verjetnosti posameznih dogodkov.

### Razrstitve (*permutacije*)

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

### *Aritmetično* zaporedje

$$ S_n = \frac {n}{2} (a_1 + a_n) $$

### *Geometrijsko* zaporedje

$$ S_n = \frac {a_1 (k^n -1)}{k - 1} $$

V primeru, da pa velja $k = 1$:

$$ S_n = n a_1 $$

## Dvočlenik (*binom*)

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

## Stožnice

Središče *S(p, q)*, polmer *r*, x-polos *a* in y-polos *b*.

### Krožnica

$$ (x-p)^2 + (y-q)^2 = r^2 $$

### Elipsa

$$ \frac {(x-p)^2}{a^2} + \frac {(y-q)^2}{b^2} = 1 $$

## Funkcije

Ničli kvadratne funkcije:
$$ x_{1, 2} = \frac{- b \pm \sqrt{b^2 - 4 a c}}{2 a} $$

Za kot, pod katerim funkcija seka os x velja $\tan \varphi = k_t$. Kot med dvema funkcijama v presečišču:

$$ \tan \varphi = \left| \frac {k_{t_1} - k_{t_2}}{1 + k_{t_1} k_{t_2}} \right| $$

### Potenciranje in logaritem

Pravila za računanje s potencami:
$$ a^0 = 1 $$
$$ a^m \cdot a^n = a^{m + n} $$
$$ \frac{a^m}{a^n} = a^{m - n} $$
$$ (a^m)^n = a^{mn} $$
$$ a^{-n} = (\frac{1}{a})^n $$

Potence, ki so ulomki, lahko izrazimo tudi s koreni:
$$ a^{\frac{m}{n}} = \sqrt[n]{a^m} $$

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

$$ \sin^2x + \cos^2x = 1 $$ 

### Limita

$$ \lim_{n \to \infty} \left( 1 + \frac {1}{n} \right)^n = e $$
$$ \lim_{x \to 0} \frac {\sin x}{x} = 1 $$

### Odvod in integral

Odvod funkcije je funkcija naklonov te funkcije. Opredelitev odvoda:

$$ f'(x) = \lim_{h \to 0} \frac {f(x + h) - f(x)}{h} $$

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
| $$ cot x $$ | $$ - \frac {1}{\sin^2 x} $$ |
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

Prostornina telesa zavrtene zvezne funkcije okoli osi x:

$$ V = \pi \int_a^b (f(x))^2 \mathrm{d}x $$

## Prostoroslovje (*geometrija*)

### Trikotnik
Trikotnik z oglišči $A(x_1), B(x_2, y_2), C(x_3, y_3)$, s stranicami *a, b, c*.

$$ S = \frac {1}{2} \left| (x_2 - x_1)(y_3 - y_1) - (x_3 - x_1)(y_2 - y_1) \right| $$

$$ s = \frac {a+b+c}{2} $$

Heronova enačba za ploščino trikotnika:
$$ S = \sqrt{s (s - a)(s - b)(s - c)} $$

### Krogla

Krogla s polmerom *r*.

Površina krogle je enaka obsegu kroga krat premer, kar je enako plašču valja, visokega in širokega za premer krogle.

$$ P = 2 \pi r \cdot 2 r = 4 \pi r^2 $$
$$ V = \frac {4 \pi r^3}{3} $$
