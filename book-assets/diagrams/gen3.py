import cairosvg, math, random
P=dict(bg="#0D1B2E",card="#0F2030",border="#1E3A50",bright="#2A5570",teal="#00E5A0",gold="#F5A623",red="#FF4757",blue="#4D9FFF",purple="#A855F7",green="#2ED573",text="#E8F4F0",muted="#8AAFC0",dim="#6F8CA0")
MONO="Courier New, monospace"
W,H=1180,790
cx,cy,rx,ry=590,415,380,300
defs=f'''<defs>
 <radialGradient id="cyto" cx="50%" cy="42%" r="62%"><stop offset="0%" stop-color="#12283a"/><stop offset="100%" stop-color="{P['card']}"/></radialGradient>
 <radialGradient id="nuc" cx="42%" cy="36%" r="65%"><stop offset="0%" stop-color="#3a2a55"/><stop offset="100%" stop-color="#241934"/></radialGradient>
 <radialGradient id="nucl" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#c89bf0"/><stop offset="100%" stop-color="{P['purple']}"/></radialGradient>
 <linearGradient id="mito" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ff7a86"/><stop offset="100%" stop-color="#c8303e"/></linearGradient>
 <linearGradient id="golgi" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd27a"/><stop offset="100%" stop-color="{P['gold']}"/></linearGradient>
 <radialGradient id="lyso" cx="38%" cy="32%" r="72%"><stop offset="0%" stop-color="#ff97a1"/><stop offset="100%" stop-color="#b5303c"/></radialGradient>
 <filter id="sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/></filter>
</defs>'''
s=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{MONO}">',defs]
s.append(f'<rect width="{W}" height="{H}" rx="18" fill="{P["bg"]}"/>')
s.append(f'<rect x="9" y="9" width="{W-18}" height="{H-18}" rx="13" fill="none" stroke="{P["border"]}"/>')
s.append(f'<text x="40" y="52" fill="{P["teal"]}" font-size="17" letter-spacing="2.5" font-weight="bold">THE ANIMAL CELL</text>')
s.append(f'<text x="40" y="76" fill="{P["dim"]}" font-size="12.5">A eukaryotic cell and its membrane-bound organelles</text>')
# membrane + cytoplasm
s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="url(#cyto)" stroke="{P["teal"]}" stroke-width="5" filter="url(#sh)"/>')
s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx-8}" ry="{ry-8}" fill="none" stroke="{P["teal"]}" stroke-opacity=".35" stroke-width="2"/>')
def L(ox,oy,ty,txt,col):
    s.append(f'<polyline points="{ox},{oy} 250,{ty}" fill="none" stroke="{P["muted"]}" stroke-width="1"/><circle cx="{ox}" cy="{oy}" r="2.6" fill="{P["muted"]}"/>')
    s.append(f'<text x="244" y="{ty+4}" fill="{col}" font-size="13" text-anchor="end">{txt}</text>')
def R(ox,oy,ty,txt,col):
    s.append(f'<polyline points="{ox},{oy} 930,{ty}" fill="none" stroke="{P["muted"]}" stroke-width="1"/><circle cx="{ox}" cy="{oy}" r="2.6" fill="{P["muted"]}"/>')
    s.append(f'<text x="936" y="{ty+4}" fill="{col}" font-size="13">{txt}</text>')
# nucleus
nx,ny,nr=520,410,138
s.append(f'<circle cx="{nx}" cy="{ny}" r="{nr}" fill="url(#nuc)" stroke="{P["purple"]}" stroke-width="3" filter="url(#sh)"/>')
s.append(f'<circle cx="{nx}" cy="{ny}" r="{nr-9}" fill="none" stroke="{P["purple"]}" stroke-opacity=".55" stroke-width="2" stroke-dasharray="3 9"/>')  # pores
random.seed(5)
for _ in range(7):  # chromatin
    a=random.random()*6.28; r0=random.random()*100
    x0=nx+r0*math.cos(a); y0=ny+r0*math.sin(a)
    s.append(f'<path d="M {x0:.0f} {y0:.0f} q 14 -10 26 4 q 12 12 26 2" fill="none" stroke="{P["purple"]}" stroke-opacity=".4" stroke-width="2"/>')
s.append(f'<circle cx="{nx-26}" cy="{ny-22}" r="46" fill="url(#nucl)"/>')
L(nx-26,ny-22,352,"Nucleolus",P["text"])
L(nx-nr+18,ny+70,432,"Nucleus (with pores)",P["text"])
# rough ER (flattened cisternae hugging nucleus right)
for i,r in enumerate([158,176,194]):
    a0,a1=-46,52
    x0=nx+r*math.cos(math.radians(a0)); y0=ny+r*math.sin(math.radians(a0))
    x1=nx+r*math.cos(math.radians(a1)); y1=ny+r*math.sin(math.radians(a1))
    s.append(f'<path d="M {x0:.0f} {y0:.0f} A {r} {r} 0 0 1 {x1:.0f} {y1:.0f}" fill="none" stroke="{P["blue"]}" stroke-width="5" stroke-linecap="round"/>')
    for t in range(9):
        aa=math.radians(a0+(a1-a0)*t/8); rxp=nx+(r+7)*math.cos(aa); ryp=ny+(r+7)*math.sin(aa)
        s.append(f'<circle cx="{rxp:.0f}" cy="{ryp:.0f}" r="3.4" fill="{P["teal"]}"/>')
R(nx+194,ny+10,372,"Rough ER",P["blue"])
# smooth ER tubular network
s.append(f'<path d="M 800 470 q 36 -30 70 -6 q 34 24 70 -2 M 802 498 q 36 26 72 2 q 34 -24 66 4" fill="none" stroke="{P["green"]}" stroke-width="5" stroke-linecap="round"/>')
R(900,488,470,"Smooth ER",P["green"])
# golgi
gx,gy=775,252
for i in range(5):
    w=46+i*9
    s.append(f'<path d="M {gx-w} {gy+i*15} q {w} -{20+i*2} {2*w} 0" fill="none" stroke="url(#golgi)" stroke-width="6" stroke-linecap="round"/>')
for vx,vy,r in [(gx+74,gy+86,8),(gx+96,gy+100,6),(gx-70,gy-6,7)]:
    s.append(f'<circle cx="{gx+0+vx-gx}" cy="{vy}" r="{r}" fill="{P["gold"]}" fill-opacity=".5"/>')
R(gx+30,gy+6,250,"Golgi apparatus",P["gold"])
R(gx+96,gy+100,318,"Vesicles",P["dim"])
# mitochondria
def mito(mx,my,rot):
    s.append(f'<g transform="translate({mx},{my}) rotate({rot})" filter="url(#sh)">')
    s.append(f'<rect x="-66" y="-32" width="132" height="64" rx="32" fill="url(#mito)" stroke="#a82834" stroke-width="2"/>')
    s.append(f'<rect x="-60" y="-26" width="120" height="52" rx="26" fill="none" stroke="#ffd9dd" stroke-opacity=".5" stroke-width="1.6"/>')
    # cristae zigzag
    pts=" ".join(f"{-54+ i*15},{(-16 if i%2 else 16)}" for i in range(8))
    s.append(f'<polyline points="{pts}" fill="none" stroke="#ffd9dd" stroke-opacity=".8" stroke-width="2.2"/>')
    s.append('</g>')
mito(800,585,-16); mito(560,628,10)
R(800,585,568,"Mitochondrion (cristae)",P["red"])
# lysosome
s.append(f'<circle cx="352" cy="252" r="30" fill="url(#lyso)" filter="url(#sh)"/>')
for _ in range(7):
    ax=352+(random.random()-.5)*34; ay=252+(random.random()-.5)*34
    s.append(f'<circle cx="{ax:.0f}" cy="{ay:.0f}" r="2.6" fill="#5a0e16"/>')
L(352,252,250,"Lysosome",P["red"])
# centrioles (two perpendicular)
s.append(f'<g transform="translate(720,168)"><rect x="-26" y="-9" width="52" height="18" rx="4" fill="{P["bright"]}" stroke="{P["muted"]}"/><rect x="-9" y="-26" width="18" height="52" rx="4" fill="{P["bright"]}" stroke="{P["muted"]}"/></g>')
R(724,150,150,"Centrioles",P["muted"])
# free ribosomes (polyribosome clusters)
def ribo(bx,by):
    for i in range(6):
        a=i*1.0; s.append(f'<circle cx="{bx+10*math.cos(a):.0f}" cy="{by+7*math.sin(a):.0f}" r="3.3" fill="{P["teal"]}"/>')
ribo(400,560); ribo(450,600); ribo(360,520)
L(400,560,560,"Free ribosomes",P["teal"])
# cytoplasm
R(880,360,318+0,"",P["dim"])  # placeholder removed
s.pop()  # remove the empty cytoplasm polyline/text pair? (R added 2 entries) -> pop twice
s.pop()
R(885,395,395,"Cytoplasm",P["dim"])
# membrane label + phospholipid inset
L(330,150,120,"Cell membrane",P["teal"])
ix,iy=120,690
s.append(f'<circle cx="{ix}" cy="{iy}" r="58" fill="{P["card"]}" stroke="{P["teal"]}" stroke-width="1.5"/>')
s.append(f'<line x1="{ix+40}" y1="{iy-40}" x2="305" y2="565" stroke="{P["bright"]}" stroke-dasharray="3 4"/>')
for k in range(7):
    px=ix-48+k*16
    s.append(f'<circle cx="{px}" cy="{iy-14}" r="4.5" fill="{P["gold"]}"/><line x1="{px}" y1="{iy-10}" x2="{px}" y2="{iy+2}" stroke="{P["gold"]}" stroke-width="1.4"/>')
    s.append(f'<circle cx="{px}" cy="{iy+18}" r="4.5" fill="{P["gold"]}"/><line x1="{px}" y1="{iy+14}" x2="{px}" y2="{iy+2}" stroke="{P["gold"]}" stroke-width="1.4"/>')
s.append(f'<text x="{ix}" y="{iy+50}" fill="{P["dim"]}" font-size="9.5" text-anchor="middle">phospholipid bilayer</text>')
s.append(f'<text x="{W-40}" y="{H-28}" fill="{P["dim"]}" font-size="10" text-anchor="end" letter-spacing="1">BIT BY BIT MD · THE C-FACTOR SERIES</text>')
s.append('</svg>')
svg="\n".join(s)
open("cell_animal.svg","w").write(svg)
cairosvg.svg2png(bytestring=svg.encode(),write_to="cell_animal.png",output_width=W*2,output_height=H*2)
print("cell done")
