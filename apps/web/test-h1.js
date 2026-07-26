import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/blog/scaling-zk-snarks-biometric-verification', {waitUntil: 'networkidle2'});
  
  const h1Data = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return 'No H1';
    
    let path = [];
    let el = h1;
    while(el) {
       const s = window.getComputedStyle(el);
       path.push({
         tag: el.tagName,
         className: el.className,
         opacity: s.opacity,
         visibility: s.visibility,
         display: s.display,
         color: s.color,
         webkitTextFillColor: s.webkitTextFillColor,
         transform: s.transform,
         height: s.height,
         marginTop: s.marginTop
       });
       el = el.parentElement;
    }
    
    return path;
  });
  
  console.log(JSON.stringify(h1Data, null, 2));
  await browser.close();
})();
