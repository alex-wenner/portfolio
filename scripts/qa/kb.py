import json
from playwright.sync_api import sync_playwright
from axe_playwright_python.sync_playwright import Axe
URL="https://d12v35euggcetk.cloudfront.net"
def focus_info(p):
    return p.evaluate("""()=>{const e=document.activeElement;const s=getComputedStyle(e);
    return {tag:e.tagName,text:(e.innerText||e.getAttribute('aria-label')||'').slice(0,50).replace(/\\n/g,' '),exp:e.getAttribute('aria-expanded'),ctrl:e.getAttribute('aria-controls'),
    outline:s.outlineStyle+' '+s.outlineWidth+' '+s.outlineColor,shadow:s.boxShadow}}""")
with sync_playwright() as pw:
    b=pw.chromium.launch()
    for rm in ["no-preference","reduce"]:
        ctx=b.new_context(viewport={"width":1280,"height":800},reduced_motion=rm)
        p=ctx.new_page(); errs=[]
        p.on("console",lambda m: errs.append(m.text) if m.type=="error" else None)
        p.on("pageerror",lambda e: errs.append(str(e)))
        p.goto(URL,wait_until="networkidle"); p.wait_for_timeout(3000)
        print("=== reduced_motion",rm,"errors:",errs)
        if rm=="reduce":
            print("h1:",p.evaluate("()=>[...document.querySelectorAll('h1')].map(h=>h.innerText)"))
            print("anims running:",p.evaluate("()=>document.getAnimations().filter(a=>a.playState=='running').map(a=>a.animationName||a.constructor.name)"))
            break
        order=[]
        for i in range(40):
            p.keyboard.press("Tab"); order.append(focus_info(p))
        for i,f in enumerate(order): print(i,f)
        # find first expandable
        p.goto(URL,wait_until="networkidle"); p.wait_for_timeout(2500)
        btns=p.locator("[aria-expanded]")
        n=btns.count(); print("expandables:",n)
        b0=btns.nth(0); b0.focus(); p.keyboard.press("Enter"); p.wait_for_timeout(500)
        print("after Enter:",b0.get_attribute("aria-expanded"))
        ctrl=b0.get_attribute("aria-controls"); print("controls exists:",ctrl and p.locator(f"#{ctrl}").count())
        p.keyboard.press("Tab"); print("next focus after open:",focus_info(p))
        p.keyboard.press("Escape"); p.wait_for_timeout(300)
        print("after Escape:",b0.get_attribute("aria-expanded"),focus_info(p))
        b1=btns.nth(1); b1.focus(); p.keyboard.press(" "); p.wait_for_timeout(300)
        b0.focus(); p.keyboard.press("Enter"); p.wait_for_timeout(300)
        print("multi-open:",b0.get_attribute("aria-expanded"),b1.get_attribute("aria-expanded"))
        print("scrollY after space:",p.evaluate("scrollY"))
        r=Axe().run(p)
        print("axe:",[(v['id'],v['impact'],len(v['nodes'])) for v in r.response['violations']])
        p.screenshot(path="kb-open.png",full_page=True)
        for w in [375]:
            m=b.new_context(viewport={"width":w,"height":800},is_mobile=True).new_page(); m.goto(URL,wait_until="networkidle"); m.wait_for_timeout(2000)
            print(w,"hscroll:",m.evaluate("document.documentElement.scrollWidth>innerWidth"), m.evaluate("document.documentElement.scrollWidth"))
            m.screenshot(path=f"m{w}.png",full_page=True)
    b.close()
