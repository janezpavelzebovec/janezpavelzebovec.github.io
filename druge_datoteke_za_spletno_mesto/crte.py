import numpy as np
vhodna = "dnevi202324.csv"
# vhodna = "test.csv"

dt = open(vhodna, "r")
glava = dt.readline()
dt.close()
glava = glava.rstrip()
glava = glava.split(",")
glava = [ x.replace('"','') for x in glava ]
indeksi = np.arange(0,len(glava),1)

slovar = dict(zip(glava, indeksi))

izbrani = '''
sonvzhod
sonzahod
astsonvzhod
astsonzahod
pomsonvzhod
pomsonzahod
civsonvzhod
civsonzahod
poldne
'''
print(izbrani.split('\n'))
izbrani = list(filter(None, izbrani.split('\n')))
izbrani_i = [ slovar[element] for element in izbrani ]

pd = np.loadtxt(
    vhodna,
    dtype = np.dtype('<U21'),
    delimiter = ',',
    skiprows = 1,
    usecols = [0] + izbrani_i
    )
# vrstice so vrstice
pd = pd.transpose() # združi se stolpce

def ura_kot(ura):
    ura = ura.replace('"','')
    ura = ura.split(":")
    ura = [ float(x) for x in ura ]
    ura = ura[0] + ( ura[1] / 60 )
    return ( ura / 24 ) * 2*np.pi

ura_kot_v = np.vectorize(ura_kot)

pd1 = pd[0].astype(int) # posebej prvi stolpec
pd2 = ura_kot_v(pd[1:]) # posebej ure pretvorjene v kote (rad)
pd2 = pd2.transpose() # zdaj so spet skupaj vrstice

dnevi = np.unique(pd1)
pd3 = np.stack([pd2[pd1 == dan].mean(axis=0) for dan in dnevi])
pd3 = pd3.transpose() # skupaj so stolpci 

# izračun polmera za posamezen dan
rn = 80
rz = 640
dr = (rz - rn) / (dnevi[-1] - 1)
r = rn + dnevi*dr

def xy(kot, r, rz):
    return [ r*np.cos(kot) + rz, -(r*np.sin(kot) - rz) ]

kd = np.apply_along_axis(xy, 1, pd3, r, rz)
kd = kd.transpose((0,2,1))
kd = kd.astype('<U21')

def kd_str(koordinati):
    return np.array(",".join(koordinati), np.dtype('<U42'))

# slog = ''
slog = 'fill:none; stroke:#000000; stroke-width:1px; stroke-opacity:1'
def risi(sez_kd, ime):
    sez_kd1 = np.apply_along_axis(kd_str, 1, sez_kd)
    d = 'M ' + ' L '.join(sez_kd1)
    return(f'<path\n   style = "{slog}"\n   d = "{d}"\n   id = "{ime}"\n/>')

navodila = {}
for sez_kd, ime in zip(kd, izbrani):
    navodila[ime] = risi(sez_kd, ime)

svg = open('crte.svg', 'w')
svg.write(
'''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
xmlns="http://www.w3.org/2000/svg"
version="1.1">
'''
# '''
# <path
# style="
#     fill:none;
#     stroke:#000000;
#     stroke-width:1px;
#     stroke-linecap:butt;
#     stroke-linejoin:miter;
#     stroke-opacity:1
#     "
# '''
)

svg.write('\n'.join(navodila.values()) + '\n</svg>')
svg.close()
       

