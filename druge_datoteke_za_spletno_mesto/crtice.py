import numpy as np

razmik = (2*np.pi) / 365.2425
kot = np.arange(-(np.pi/2), 3*np.pi/2, razmik)

r_z = 420
r_n = 410

x_n = np.cos(kot)*r_n + r_z
y_n = (np.sin(kot)*r_n)*-1 + r_z
x_z = np.cos(kot)*r_z + r_z
y_z = (np.sin(kot)*r_z)*-1 + r_z

crt = np.array([x_n, y_n, x_z, y_z])
crt = crt.transpose()
d = ''
# for i in range(len(crt))
for i in range(len(crt)):
    d += f' M {crt[i][0]},{crt[i][1]} L {crt[i][2]},{crt[i][3]}'

svg = open('obod.svg', 'w')
svg.write(
'''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
xmlns="http://www.w3.org/2000/svg"
version="1.1">
<path
style="
    fill:none;
    stroke:#ffffff;
    stroke-width:1px;
    stroke-linecap:butt;
    stroke-linejoin:miter;
    stroke-opacity:1;
    "
'''
)

svg.write(f'd="{d}"\n')

svg.write(
'''id="path12" />
</svg>
'''
)

svg.close()
