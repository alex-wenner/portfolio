from playwright.sync_api import sync_playwright
URL="https://d12v35euggcetk.cloudfront.net"
with sync_playwright() as pw:
    b=pw.chromium.launch(); p=b.new_page(viewport={"width":1280,"height":800})
    p.goto(URL,wait_until="networkidle"); p.wait_for_timeout(2500)
    print(p.evaluate("()=>document.querySelector('h1').outerHTML.slice(0,600)"))
    for slug in ["promptlens","riseup","nightscene"]:
        btn=p.locator(f"[aria-controls=readme-{slug}]"); btn.focus(); p.keyboard.press("Enter"); p.wait_for_timeout(400)
        print(slug,"focusables in panel:",p.evaluate(f"()=>[...document.querySelectorAll('#readme-{slug} a,#readme-{slug} button,#readme-{slug} [tabindex]')].map(e=>e.tagName+':'+e.innerText.slice(0,40)+':tab'+e.tabIndex)"))
        p.keyboard.press("Tab"); f=p.evaluate("()=>document.activeElement.innerText.slice(0,40)"); print(" tab->",f)
        p.keyboard.press("Escape"); p.wait_for_timeout(300)
        print(" after Esc expanded:",btn.get_attribute("aria-expanded"),"focus:",p.evaluate("()=>document.activeElement.innerText.slice(0,30)"))
        btn.focus(); p.keyboard.press("Escape"); p.wait_for_timeout(200); print(" Esc on row:",btn.get_attribute("aria-expanded"))
    # status bar focus style
    a=p.locator("a",has_text="1:tools"); 
    before=a.evaluate("e=>{const s=getComputedStyle(e);return [s.color,s.backgroundColor,s.textDecorationLine]}")
    p.keyboard.press("Tab")
    a.focus(); p.keyboard.press("Shift+Tab"); p.keyboard.press("Tab")
    after=a.evaluate("e=>{const s=getComputedStyle(e);return [s.color,s.backgroundColor,s.textDecorationLine,e.matches(':focus-visible')]}")
    print("status link unfocused/focused:",before,after)
    a.screenshot(path="statusfocus.png")
    p.locator("footer, nav").last.screenshot(path="statusbar.png")
    b.close()
