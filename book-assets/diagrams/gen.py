import cairosvg, math

PAL=dict(bg="#0D1B2E",card="#0A1520",border="#1E3A50",teal="#00E5A0",gold="#F5A623",red="#FF4757",blue="#4D9FFF",purple="#A855F7",green="#2ED573",text="#E8F4F0",muted="#8AAFC0",dim="#6F8CA0")
MONO="Courier New, monospace"

def save(name, svg, w, h, scale=2):
    open(name+".svg","w").write(svg)
    cairosvg.svg2png(bytestring=svg.encode(), write_to=name+".png", output_width=w*scale, output_height=h*scale)
    print("wrote",name+".svg /",name+".png")

# ---------- ATOM (Bohr model · Carbon) ----------
W,H=920,600
cx,cy=410,310
def atom():
    s=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{MONO}">']
    s.append(f'<rect width="{W}" height="{H}" rx="16" fill="{PAL["bg"]}"/>')
    s.append(f'<rect x="8" y="8" width="{W-16}" height="{H-16}" rx="12" fill="none" stroke="{PAL["border"]}"/>')
    s.append(f'<text x="34" y="48" fill="{PAL["teal"]}" font-size="16" letter-spacing="2">ATOMIC STRUCTURE · CARBON-12</text>')
    s.append(f'<text x="34" y="72" fill="{PAL["dim"]}" font-size="12">The Bohr model: a dense nucleus orbited by electrons in shells</text>')
    # shells
    for r,lab,n in [(120,"K shell · 2e⁻",2),(210,"L shell · 4e⁻",4)]:
        s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{PAL["teal"]}" stroke-opacity=".35" stroke-width="1.5"/>')
        for i in range(n):
            a=(-90+i*360/n)*math.pi/180
            ex,ey=cx+r*math.cos(a),cy+r*math.sin(a)
            s.append(f'<circle cx="{ex:.1f}" cy="{ey:.1f}" r="9" fill="{PAL["gold"]}"/>')
            s.append(f'<text x="{ex:.1f}" y="{ey+3.5:.1f}" fill="{PAL["bg"]}" font-size="10" text-anchor="middle" font-weight="bold">-</text>')
    # nucleus cluster (6 protons red, 6 neutrons slate)
    import random; random.seed(7)
    nuc=[]
    for i in range(12):
        a=random.random()*6.28; rr=random.random()*30
        nuc.append((cx+rr*math.cos(a),cy+rr*math.sin(a), PAL["red"] if i%2==0 else "#5b7d97"))
    for x,y,c in nuc:
        s.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="12" fill="{c}" stroke="{PAL["bg"]}" stroke-width="1.5"/>')
    # labels with leaders
    s.append(f'<line x1="{cx}" y1="{cy+44}" x2="{cx}" y2="{cy+120}" stroke="{PAL["muted"]}" stroke-width="1"/>')
    s.append(f'<text x="{cx}" y="{cy+138}" fill="{PAL["text"]}" font-size="13" text-anchor="middle">Nucleus — 6 protons + 6 neutrons</text>')
    s.append(f'<line x1="{cx}" y1="{cy-210}" x2="{cx+150}" y2="{cy-250}" stroke="{PAL["muted"]}" stroke-width="1"/>')
    s.append(f'<text x="{cx+156}" y="{cy-248}" fill="{PAL["gold"]}" font-size="13">electron (e⁻)</text>')
    # legend
    lx,ly=720,120
    for c,t in [(PAL["red"],"proton (+)"),("#5b7d97","neutron (0)"),(PAL["gold"],"electron (–)")]:
        s.append(f'<circle cx="{lx}" cy="{ly}" r="9" fill="{c}"/>')
        s.append(f'<text x="{lx+18}" y="{ly+4}" fill="{PAL["muted"]}" font-size="12">{t}</text>')
        ly+=30
    s.append(f'<text x="720" y="250" fill="{PAL["dim"]}" font-size="11">Atomic number Z = 6</text>')
    s.append(f'<text x="720" y="270" fill="{PAL["dim"]}" font-size="11">Mass number A = 12</text>')
    s.append(f'<text x="34" y="{H-22}" fill="{PAL["dim"]}" font-size="10" letter-spacing="1">BIT BY BIT MD · THE C-FACTOR SERIES</text>')
    s.append('</svg>')
    return "\n".join(s)
save("atom_carbon", atom(), W, H)
