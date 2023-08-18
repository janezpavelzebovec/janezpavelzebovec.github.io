import math as m
import csv
import pandas as pd
import numpy as np

data = pd.read_csv ('dnevi202324.csv')

# Pretvorba funkcije za ure:minute v decimalne ure:
def convert_to_decimal_hours(time_str):
    if isinstance(time_str, str):  # Preverimo, ali je vrednost niz
        time_parts = time_str.split(":")
        hours = float(time_parts[0]) + float(time_parts[1]) / 60
        return hours
    else:
        return time_str

izbrani_stolpci = ['sonvzhod', 'sonzahod', 'astsonvzhod', 'astsonzahod', 'pomsonvzhod', 'pomsonzahod', 'civsonvzhod', 'civsonzahod']
data[izbrani_stolpci] = data[izbrani_stolpci].applymap(convert_to_decimal_hours)
povprecni_podatki = data.groupby("dan183")[izbrani_stolpci].mean()

print(povprecni_podatki)
print(np.array(povprecni_podatki))

#dan = 183
#ura = "5:10"
crta1_casi = np.array(povprecni_podatki[['sonvzhod', 'sonzahod']])
crta2_casi = np.array(povprecni_podatki[['astsonvzhod', 'astsonzahod']])
crta3_casi = np.array(povprecni_podatki[['pomsonvzhod', 'pomsonzahod']])
crta4_casi = np.array(povprecni_podatki[['civsonvzhod', 'civsonzahod']])
dan = np.array(povprecni_podatki.index)

print(crta1_casi)
print(dan)

kolobar = 425
r1 = 75

#ura_sez = ura.split(":")
#ura_dec = float(ura_sez[0]) + float(ura_sez[1])/60
kot = np.(crta1_casi * 15) - 90
odmik = (kolobar/183)*dan+r1
rad = kot*2*m.pi/360
x = m.cos(rad)*odmik
y = m.sin(rad)*odmik
#return x, y


#print(kot)
#print(dan)
#print(x)
#print(y)


