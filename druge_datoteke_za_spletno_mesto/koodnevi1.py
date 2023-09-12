import math as m
import csv
import pandas as pd
import numpy as np

data = pd.read_csv ('dnevi202324sonvzhzah.csv', delimiter=",")
print(data)

# Pretvorba funkcije za ure:minute v decimalne ure:
def convert_to_decimal_hours(time_str):
    if isinstance(time_str, str):  # Preverimo, ali je vrednost niz
        time_parts = time_str.split(":")
        hours = float(time_parts[0]) + float(time_parts[1]) / 60
        return hours
    else:
        return time_str


izbrani_stolpci = ['sonvzhod', 'sonzahod']
data[izbrani_stolpci] = data[izbrani_stolpci].applymap(convert_to_decimal_hours)
povprecni_podatki = data.groupby("dan183")[izbrani_stolpci].mean()

print(povprecni_podatki)
print(np.array(povprecni_podatki))
