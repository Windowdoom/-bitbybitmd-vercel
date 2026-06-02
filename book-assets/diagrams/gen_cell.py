import cairosvg, math
P=dict(bg="#0D1B2E",card="#0A1520",border="#1E3A50",teal="#00E5A0",gold="#F5A623",red="#FF4757",blue="#4D9FFF",purple="#A855F7",green="#2ED573",text="#E8F4F0",muted="#8AAFC0",dim="#6F8CA0")
MONO="Courier New, monospace"
W,H=1000,720
s=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{MONO}">']
s.append(f'<rect width="{W}" height="{H}" rx="16" fill="{P["bg"]}"/>')
s.append(f'<rect x="8" y="8" width="{W-16}" height="{H-16}" rx="12" fill="none" stroke="{P["border"]}"/>')
s.append(f'<text x="34" y="48" fill="{P["teal"]}" font-size="16" letter-spacing="2">THE ANIMAL CELL · ORGANELLES</text>')
# membrane (bilayer = two ellipses)
cx,cy,rx,ry=500,380,430,300
s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{P["card"]}" stroke="{P["teal"]}" stroke-width="4"/>')
s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx-7}" ry="{ry-7}" fill="none" stroke="{P["teal"]}" stroke-opacity=".4" stroke-width="2"/>')
def label(x,y,tx,ty,txt,col):
    s.append(f'<line x1="{x}" y1="{y}" x2="{tx}" y2="{ty}" stroke="{P["muted"]}" stroke-width="1"/>')
    s.append(f'<circle cx="{x}" cy="{y}" r="3" fill="{P["muted"]}"/>')
    anc="start" if tx>x else "end"
    s.append(f'<text x="{tx}" y="{ty}" fill="{col}" font-size="13" text-anchor="{anc}">{txt}</text>')
# nucleus
nx,ny=410,360
s.append(f'<circle cx="{nx}" cy="{ny}" r="115" fill="{P["purple"]}" fill-opacity=".14" stroke="{P["purple"]}" stroke-width="2.5" stroke-dasharray="2 6"/>')
s.append(f'<circle cx="{nx}" cy="{ny}" r="108" fill="none" stroke="{P["purple"]}" stroke-opacity=".5" stroke-width="1.5"/>')
s.append(f'<circle cx="{nx-22}" cy="{ny-12}" r="34" fill="{P["purple"]}" fill-opacity=".5"/>')
label(nx+95,ny-70,210,150,"Nuclear envelope (pores)",P["purple"])
label(nx-22,ny-12,150,250,"Nucleolus",P["text"])
label(nx,ny+60,300,470,"Nucleus",P["text"])
# rough ER (arcs around nucleus, with ribosome dots)
for i,r in enumerate([150,168,186]):
    a0,a1=-40,60
    import math
    x0=nx+r*math.cos(math.radians(a0)); y0=ny+r*math.sin(math.radians(a0))
    x1=nx+r*math.cos(math.radians(a1)); y1=ny+r*math.sin(math.radians(a1))
    s.append(f'<path d="M {x0:.0f} {y0:.0f} A {r} {r} 0 0 1 {x1:.0f} {y1:.0f}" fill="none" stroke="{P["blue"]}" stroke-width="3"/>')
    for t in range(0,8):
        aa=math.radians(a0+(a1-a0)*t/7)
        rxp=nx+(r+6)*math.cos(aa); ryp=ny+(r+6)*math.sin(aa)
        s.append(f'<circle cx="{rxp:.0f}" cy="{ryp:.0f}" r="3.2" fill="{P["teal"]}"/>')
label(nx+170,ny+40,250,560,"Rough ER (ribosomes attached)",P["blue"])
# smooth ER (wavy tubes)
s.append(f'<path d="M 590 430 q 30 -28 60 0 q 30 28 60 0 q 30 -28 60 0" fill="none" stroke="{P["green"]}" stroke-width="3"/>')
s.append(f'<path d="M 590 455 q 30 -28 60 0 q 30 28 60 0 q 30 -28 60 0" fill="none" stroke="{P["green"]}" stroke-width="3" stroke-opacity=".7"/>')
label(710,442,820,540,"Smooth ER",P["green"])
# Golgi (stacked arcs)
gx,gy=640,250
for i in range(4):
    s.append(f'<path d="M {gx-55} {gy+i*16} q 55 -26 110 0" fill="none" stroke="{P["gold"]}" stroke-width="4"/>')
s.append(f'<circle cx="{gx+70}" cy="{gy+70}" r="7" fill="{P["gold"]}" fill-opacity=".6"/>')
s.append(f'<circle cx="{gx+92}" cy="{gy+82}" r="5" fill="{P["gold"]}" fill-opacity=".5"/>')
label(gx,gy,gx+120,150,"Golgi apparatus",P["gold"])
label(gx+80,gy+76,gx+200,210,"Vesicles",P["dim"])
# mitochondria x2 (oval + cristae)
def mito(mx,my,rot):
    s.append(f'<g transform="translate({mx},{my}) rotate({rot})">')
    s.append(f'<ellipse rx="62" ry="30" fill="{P["red"]}" fill-opacity=".16" stroke="{P["red"]}" stroke-width="2.5"/>')
    s.append(f'<path d="M -50 -8 q 12 22 24 0 q 12 -22 24 0 q 12 22 24 0 q 12 -22 24 0" fill="none" stroke="{P["red"]}" stroke-width="2" stroke-opacity=".8"/>')
    s.append('</g>')
mito(560,560,-18); mito(330,520,12)
label(560,560,640,640,"Mitochondrion (cristae)",P["red"])
# free ribosomes
import random; random.seed(3)
for _ in range(16):
    rxp=cx+(random.random()-.5)*700; ryp=cy+(random.random()-.5)*460
    if (rxp-cx)**2/(rx-30)**2+(ryp-cy)**2/(ry-30)**2<1 and (rxp-nx)**2+(ryp-ny)**2>140**2:
        s.append(f'<circle cx="{rxp:.0f}" cy="{ryp:.0f}" r="3" fill="{P["teal"]}" fill-opacity=".8"/>')
label(250,470,120,560,"Free ribosomes",P["teal"])
# lysosome
s.append(f'<circle cx="300" cy="250" r="26" fill="{P["red"]}" fill-opacity=".18" stroke="{P["red"]}" stroke-width="2"/>')
for _ in range(6):
    ax=300+(random.random()-.5)*30; ay=250+(random.random()-.5)*30
    s.append(f'<circle cx="{ax:.0f}" cy="{ay:.0f}" r="2.5" fill="{P["red"]}"/>')
label(300,250,160,180,"Lysosome",P["red"])
# cytoplasm label
label(760,300,880,250,"Cytoplasm",P["dim"])
s.append(f'<text x="34" y="{H-22}" fill="{P["dim"]}" font-size="10" letter-spacing="1">BIT BY BIT MD · THE C-FACTOR SERIES</text>')
s.append('</svg>')
svg="\n".join(s)
open("cell_animal.svg","w").write(svg)
cairosvg.svg2png(bytestring=svg.encode(), write_to="cell_animal.png", output_width=W*2, output_height=H*2)
print("wrote cell_animal.svg / .png")
