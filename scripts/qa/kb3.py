from playwright.sync_api import sync_playwright
from axe_playwright_python.sync_playwright import Axe
URL="https://d12v35euggcetk.cloudfront.net"
with sync_playwright() as pw:
    b=pw.chromium.launch(); p=b.new_page(viewport={"width":1280,"height":800}); errs=[]
    p.on("pageerror",lambda e: errs.append(str(e))); p.on("console",lambda m: errs.append(m.text) if m.type=="error" else None)
    p.goto(URL,wait_until="networkidle"); p.wait_for_timeout(2500)
    order=[]
    for i in range(16):
        p.keyboard.press("Tab"); order.append(p.evaluate("()=>{const e=document.activeElement;return e.tagName+'|'+(e.innerText||'').split('\\n').slice(0,2).join(' ').slice(0,35)+'|'+e.getAttribute('aria-expanded')}"))
    print("\n".join(order))
    print("sections:",p.evaluate("()=>[...document.querySelectorAll('h2,[class*=prompt]')].map(e=>e.innerText.slice(0,40))"))
    exp=p.locator("[aria-expanded]"); n=exp.count(); print("expandables",n)
    bad=[]
    for i in range(n):
        e=exp.nth(i); e.focus(); p.keyboard.press("Enter"); p.wait_for_timeout(250)
        o=e.get_attribute("aria-expanded"); p.keyboard.press("Escape"); p.wait_for_timeout(250)
        c=e.get_attribute("aria-expanded"); f=p.evaluate("()=>document.activeElement.getAttribute('aria-controls')")
        if not(o=="true" and c=="false" and f==e.get_attribute("aria-controls")): bad.append((i,e.get_attribute("aria-controls"),o,c,f))
    print("open/esc failures:",bad)
    print("axe:",[(v['id'],v['impact']) for v in Axe().run(p).response['violations']],"errors:",errs)
    m=b.new_page(viewport={"width":375,"height":800}); m.goto(URL,wait_until="networkidle"); m.wait_for_timeout(2000)
    print("375 hscroll:",m.evaluate("document.documentElement.scrollWidth>innerWidth"))
    b.close()
