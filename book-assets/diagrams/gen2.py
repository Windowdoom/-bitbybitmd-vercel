import cairosvg, math, random
P=dict(bg="#0D1B2E",card="#0F2030",border="#1E3A50",bright="#2A5570",teal="#00E5A0",gold="#F5A623",red="#FF4757",blue="#4D9FFF",purple="#A855F7",green="#2ED573",text="#E8F4F0",muted="#8AAFC0",dim="#6F8CA0")
MONO="Courier New, monospace"

DEFS=f'''<defs>
 <radialGradient id="gNuc" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="#1a3a4a"/><stop offset="100%" stop-color="{P['bg']}"/></radialGradient>
 <radialGradient id="gP" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#ff9 aa"/><stop offset="0%" stop-color="#ffa6b0"/><stop offset="55%" stop-color="{P['red']}"/><stop offset="100%" stop-color="#c8303e"/></radialGradient>
 <radialGradient id="gN" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#bcd2e2"/><stop offset="55%" stop-color="#6f93ad"/><stop offset="100%" stop-color="#4a647a"/></radialGradient>
 <radialGradient id="gE" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#ffe3a8"/><stop offset="55%" stop-color="{P['gold']}"/><stop offset="100%" stop-color="#c47f12"/></radialGradient>
 <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity="0.45"/></filter>
 <radialGradient id="gGlowT" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="{P['teal']}" stop-opacity=".28"/><stop offset="100%" stop-color="{P['teal']}" stop-opacity="0"/></radialGradient>
</defs>'''

def sphere(cx,cy,r,grad):
    return (f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r}" fill="url(#{grad})" stroke="#00000055" stroke-width="0.6"/>'
            f'<ellipse cx="{cx-r*0.28:.1f}" cy="{cy-r*0.32:.1f}" rx="{r*0.34:.1f}" ry="{r*0.24:.1f}" fill="#ffffff" opacity="0.35"/>')

# ============ ATOM ============
def atom():
    W,H=980,640; cx,cy=420,330
    s=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{MONO}">',DEFS]
    s.append(f'<rect width="{W}" height="{H}" rx="18" fill="{P["bg"]}"/>')
    s.append(f'<rect x="9" y="9" width="{W-18}" height="{H-18}" rx="13" fill="none" stroke="{P["border"]}"/>')
    s.append(f'<text x="40" y="52" fill="{P["teal"]}" font-size="17" letter-spacing="2.5" font-weight="bold">ATOMIC STRUCTURE</text>')
    s.append(f'<text x="40" y="76" fill="{P["dim"]}" font-size="12.5">The Bohr model — a dense nucleus orbited by electrons in fixed energy shells</text>')
    # element tile
    tx,ty=792,120
    s.append(f'<rect x="{tx}" y="{ty}" width="150" height="150" rx="12" fill="{P["card"]}" stroke="{P["teal"]}" stroke-width="2"/>')
    s.append(f'<text x="{tx+16}" y="{ty+34}" fill="{P["muted"]}" font-size="15">6</text>')
    s.append(f'<text x="{tx+75}" y="{ty+98}" fill="{P["text"]}" font-size="62" text-anchor="middle" font-weight="bold">C</text>')
    s.append(f'<text x="{tx+75}" y="{ty+124}" fill="{P["muted"]}" font-size="13" text-anchor="middle">Carbon</text>')
    s.append(f'<text x="{tx+75}" y="{ty+142}" fill="{P["dim"]}" font-size="11" text-anchor="middle">12.011</text>')
    # glow + orbits
    s.append(f'<circle cx="{cx}" cy="{cy}" r="120" fill="url(#gGlowT)"/>')
    shells=[(120,2,"n = 1  ·  2e⁻"),(212,4,"n = 2  ·  4e⁻")]
    for r,n,lab in shells:
        s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{P["teal"]}" stroke-opacity=".4" stroke-width="1.4" stroke-dasharray="3 7"/>')
    # nucleus cluster (hex-ish): center + ring5 + ring6
    random.seed(11); pts=[(0,0)]
    for k,(rr,cnt) in enumerate([(20,5),(38,6)]):
        for i in range(cnt):
            a=(i*360/cnt+k*25)*math.pi/180; pts.append((rr*math.cos(a),rr*math.sin(a)))
    pts=pts[:12]
    for i,(dx,dy) in enumerate(pts):
        s.append(sphere(cx+dx,cy+dy,12.5,"gP" if i%2==0 else "gN"))
    # electrons
    for r,n,lab in shells:
        for i in range(n):
            a=(-90+i*360/n + (18 if r>150 else 0))*math.pi/180
            s.append(sphere(cx+r*math.cos(a),cy+r*math.sin(a),10,"gE"))
    # motion arrow on outer orbit
    s.append(f'<path d="M {cx+212} {cy-14} q 14 14 0 28" fill="none" stroke="{P["teal"]}" stroke-width="1.6" marker-end="url(#ah)"/>')
    s.append(f'<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="{P["teal"]}"/></marker></defs>')
    # labels
    s.append(f'<line x1="{cx}" y1="{cy+46}" x2="{cx}" y2="{cy+150}" stroke="{P["muted"]}"/><circle cx="{cx}" cy="{cy+46}" r="2.5" fill="{P["muted"]}"/>')
    s.append(f'<text x="{cx}" y="{cy+170}" fill="{P["text"]}" font-size="13.5" text-anchor="middle">Nucleus · 6 protons + 6 neutrons</text>')
    ex=cx+212*math.cos(math.radians(-72)); ey=cy+212*math.sin(math.radians(-72))
    s.append(f'<line x1="{ex:.0f}" y1="{ey:.0f}" x2="{ex+90:.0f}" y2="{ey-40:.0f}" stroke="{P["muted"]}"/>')
    s.append(f'<text x="{ex+96:.0f}" y="{ey-38:.0f}" fill="{P["gold"]}" font-size="13">electron (e⁻)</text>')
    s.append(f'<text x="{cx-212-8}" y="{cy+4}" fill="{P["teal"]}" font-size="11.5" text-anchor="end" opacity=".85">{shells[1][2]}</text>')
    s.append(f'<text x="{cx-120-8}" y="{cy-86}" fill="{P["teal"]}" font-size="11.5" text-anchor="end" opacity=".85">{shells[0][2]}</text>')
    # legend + config
    lx,ly=792,300
    for grad,t in [("gP","proton  (+1)"),("gN","neutron  (0)"),("gE","electron  (–1)")]:
        s.append(sphere(lx+8,ly,8,grad)); s.append(f'<text x="{lx+26}" y="{ly+4}" fill="{P["muted"]}" font-size="12">{t}</text>'); ly+=30
    s.append(f'<text x="40" y="{H-58}" fill="{P["dim"]}" font-size="12">Electron configuration</text>')
    s.append(f'<text x="40" y="{H-36}" fill="{P["text"]}" font-size="15">1s² 2s² 2p²</text>')
    s.append(f'<text x="{W-40}" y="{H-30}" fill="{P["dim"]}" font-size="10" text-anchor="end" letter-spacing="1">BIT BY BIT MD · THE C-FACTOR SERIES</text>')
    s.append('</svg>'); return "\n".join(s), W, H

svg,W,H=atom()
svg=svg.replace("#ff9 aa","#ffa6b0")
open("atom_carbon.svg","w").write(svg)
cairosvg.svg2png(bytestring=svg.encode(),write_to="atom_carbon.png",output_width=W*2,output_height=H*2)
print("atom done")
