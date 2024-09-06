import numpy as np

spacing = (2*np.pi) / 365.2425 #angle in radians
angle = np.arange(-(np.pi/2), 3*np.pi/2, spacing)

rEx = 420 #external radius of line
rIn = 410 #internal radius of line

xIn = np.cos(kot)*rIn + rEx #internal x coordinate point of individual line
yIn = (np.sin(kot)*rIn)*-1 + rEx #internal y coordinate point of individual line
xEx = np.cos(kot)*rEx + rEx #external x coordinate point of individual line
yEx = (np.sin(kot)*rEx)*-1 + rEx #external y coordinate point of individual line

line = np.array([xIn, yIn, xEx, yEx])
line = line.transpose()
d = ''
# for i in range(len(line))
for i in range(len(line)):
    d += f' M {line[i][0]},{line[i][1]} L {line[i][2]},{line[i][3]}'

svg = open('rim.svg', 'w')
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
