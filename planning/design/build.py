from common import P,T,S
# A: Wenntech evolved
a=f"""<html><head><style>
body{{margin:0;background:#0F0F0F;color:#fff;font-family:Inter,Helvetica,sans-serif}}
.w{{padding:48px 80px}} nav{{display:flex;justify-content:space-between;align-items:center}}
.logo{{font-weight:800;letter-spacing:-1px;font-size:22px}} .logo b{{color:#BCFF2D}}
.btn{{border:1px solid #fff;padding:10px 22px;font-size:14px}}
h1{{font-size:88px;line-height:.95;letter-spacing:-3px;margin:120px 0 24px;max-width:900px}} h1 em{{color:#BCFF2D;font-style:normal}}
.sub{{color:#9a9a9a;font-size:20px;max-width:560px}}
.wave{{position:absolute;right:60px;top:150px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#BCFF2D33,transparent 60%);filter:blur(10px)}}
.lab{{color:#BCFF2D;font-size:13px;letter-spacing:3px;margin:110px 0 24px}}
.feat{{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:20px}}
.card{{background:#171717;border:1px solid #262626;border-radius:20px;padding:28px;min-height:300px;position:relative;overflow:hidden}}
.card h3{{font-size:28px;margin:0 0 10px}} .card p{{color:#a0a0a0;margin:0 0 16px}} .tag{{font-size:12px;color:#BCFF2D}}
.card img{{position:absolute;right:20px;bottom:-120px;width:170px;border-radius:24px}}
.tools{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}} .tools div{{border-top:2px solid #BCFF2D;padding-top:16px}} .tools b{{font-size:22px}} .tools p{{color:#9a9a9a}}
.strip{{margin-top:90px;border-top:1px solid #262626;border-bottom:1px solid #262626;padding:22px 0;color:#777;font-size:15px}}
</style></head><body><div class=w style=position:relative><div class=wave></div>
<nav><div class=logo>alex<b>.</b>wenner</div><div class=btn>Menu</div></nav>
<h1>I build products<br>end to end <em>on AWS.</em></h1><div class=sub>Full-stack and AI engineer. React and Expo on the front, SST and Python behind it.</div>
<div class=lab>FEATURED PRODUCTS</div><div class=feat>
<div class=card><h3>{P[0][0]}</h3><p>{P[0][1]}</p><div class=tag>{P[0][2]}</div><img src=ns-consumer-phone.png></div>
<div class=card><h3>{P[1][0]}</h3><p>{P[1][1]}</p><div class=tag>{P[1][2]}</div></div>
<div class=card><h3>{P[2][0]}</h3><p>{P[2][1]}</p><div class=tag>{P[2][2]}</div></div></div>
<div class=lab>AI TOOLING</div><div class=tools>{''.join(f'<div><b>{n} ↗</b><p>{d}</p></div>' for n,d in T)}</div>
<div class=strip>{S}</div></div></body></html>"""
# B: Editorial light
b=f"""<html><head><style>
body{{margin:0;background:#F4F2EC;color:#111;font-family:Georgia,'Times New Roman',serif}}
.m{{font-family:'DejaVu Sans Mono',Menlo,monospace;font-size:13px;letter-spacing:.5px}}
.w{{padding:48px 96px}} nav{{display:flex;justify-content:space-between}}
h1{{font-size:96px;font-weight:400;letter-spacing:-3px;line-height:1;margin:110px 0 30px}} h1 i{{background:#BCFF2D;padding:0 10px}}
.sub{{font-family:Helvetica,sans-serif;font-size:19px;color:#555;max-width:600px}}
.row{{display:grid;grid-template-columns:80px 1fr 1fr;gap:40px;border-top:1px solid #111;padding:40px 0;align-items:start}}
.row h2{{font-size:48px;font-weight:400;margin:0 0 12px;letter-spacing:-1px}} .row p{{font-family:Helvetica,sans-serif;color:#444;font-size:17px}}
.shot{{background:#111;border-radius:14px;height:240px;display:flex;justify-content:center;overflow:hidden}} .shot img{{width:200px;margin-top:20px;border-radius:20px}}
.ph{{background:#e3e0d6;border-radius:14px;height:240px;display:flex;align-items:center;justify-content:center;color:#888}}
</style></head><body><div class=w>
<nav class=m><span>ALEX WENNER</span><span>WORK · TOOLS · ABOUT · CONTACT</span></nav>
<h1>Products, shipped<br><i>end to end.</i></h1><div class=sub>Selected case studies from a full-stack and AI engineer building on AWS with SST.</div>
<div style=height:70px></div>
{''.join(f'<div class=row><div class=m>0{i+1}</div><div><h2>{n}</h2><p>{d}</p><div class=m>{t}</div></div>'+('<div class=shot><img src=ns-consumer-phone.png></div>' if i==0 else '<div class=ph class=m>screens</div>')+'</div>' for i,(n,d,t) in enumerate(P))}
<div class=row><div class=m>04</div><div><h2>Open tools</h2><p>{' · '.join(n for n,_ in T)}</p></div><div class=m>{S}</div></div>
</div></body></html>"""
# C: Infra / terminal
c=f"""<html><head><style>
body{{margin:0;background:#0A0A0A;color:#e8e8e8;font-family:'DejaVu Sans Mono',Menlo,monospace;
background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);background-size:40px 40px}}
.w{{padding:44px 80px}} .g{{color:#BCFF2D}} .d{{color:#777}}
h1{{font-family:Inter,Helvetica,sans-serif;font-size:76px;letter-spacing:-2px;line-height:1;margin:90px 0 20px}}
.term{{background:#111;border:1px solid #2a2a2a;border-radius:10px;padding:18px 22px;font-size:14px;max-width:640px;line-height:1.7}}
.grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:80px}}
.c{{border:1px solid #2a2a2a;background:#0f0f0fcc;border-radius:10px;padding:22px;min-height:330px;position:relative;overflow:hidden}}
.c h3{{font-family:Inter,Helvetica,sans-serif;font-size:26px;margin:6px 0 10px}} .c p{{font-family:Helvetica,sans-serif;color:#aaa;font-size:15px}}
.arch{{display:flex;gap:6px;flex-wrap:wrap;margin-top:14px}} .arch span{{border:1px solid #BCFF2D66;color:#BCFF2D;padding:4px 8px;font-size:11px;border-radius:4px}}
.c img{{position:absolute;right:16px;bottom:-150px;width:150px;border-radius:20px;opacity:.9}}
.tl{{margin-top:60px;font-size:15px;line-height:2}}
</style></head><body><div class=w>
<div><span class=g>●</span> alex-wenner <span class=d>~/portfolio · stage: prod</span></div>
<h1>Full-stack &amp; AI engineer.<br><span class=g>Infra as code.</span></h1>
<div class=term><span class=d>$</span> sst deploy --stage prod<br><span class=g>✓</span> NightScene &nbsp;<span class=d>api · ws · dynamo · cognito</span><br><span class=g>✓</span> FitGoAI &nbsp;&nbsp;&nbsp;&nbsp;<span class=d>expo · python lambda · bedrock</span><br><span class=g>✓</span> Works by Sam Ø <span class=d>react · vite · cognito</span></div>
<div class=grid>{''.join(f'<div class=c><div class=d>0{i+1} / product</div><h3>{n}</h3><p>{d}</p><div class=arch>'+''.join(f'<span>{x.strip()}</span>' for x in t.split('·'))+'</div>'+('<img src=ns-consumer-phone.png>' if i==0 else '')+'</div>' for i,(n,d,t) in enumerate(P))}</div>
<div class=tl><span class=d>// open tools</span><br>{'<br>'.join(f'<span class=g>→</span> {n} <span class=d>{d}</span>' for n,d in T)}</div>
</div></body></html>"""
for n,h in [("A-wenntech-evolved",a),("B-editorial",b),("C-infra",c)]:
    open(f"{n}.html","w").write(h)
