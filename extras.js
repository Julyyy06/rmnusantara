// Tema gelap/terang manual + animasi. Dimuat setelah script.js.
(()=>{
const $=s=>document.querySelector(s),root=document.documentElement;
const ico=p=>`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const MOON=ico('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>');
const SUN=ico('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>');

// ===== Tema =====
try{const t=localStorage.getItem("rmn-theme");if(t==="dark"||t==="light")root.dataset.theme=t}catch(e){}
const sys=matchMedia("(prefers-color-scheme: dark)");
const isDark=()=>root.dataset.theme?root.dataset.theme==="dark":sys.matches;
const btn=document.createElement("button");
btn.id="themeBtn";btn.className="theme-btn";btn.type="button";
$("#openCart").before(btn);
const paint=()=>{
  btn.innerHTML=isDark()?SUN:MOON;
  btn.setAttribute("aria-label",isDark()?"Ganti ke tema terang":"Ganti ke tema gelap");
  const m=document.querySelector('meta[name="theme-color"]');
  if(m)m.content=isDark()?"#1E1712":"#E8731A";
};
btn.onclick=()=>{
  const t=isDark()?"light":"dark";
  root.classList.add("theming");root.dataset.theme=t;
  try{localStorage.setItem("rmn-theme",t)}catch(e){}
  paint();setTimeout(()=>root.classList.remove("theming"),450);
};
sys.addEventListener("change",paint);paint();

// ===== Animasi muncul saat digulir =====
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const io=("IntersectionObserver" in window&&!reduce)?new IntersectionObserver((es,o)=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("in");o.unobserve(e.target)}
}),{threshold:.12,rootMargin:"0px 0px -40px 0px"}):null;
const SEL=".eyebrow,section h2,.about>div,.tools,.card,.gi,.tc,.info>div,.map,#rsv";
const mark=()=>document.querySelectorAll(SEL).forEach(el=>{
  if(el.dataset.rv||el.closest(".hero"))return;
  el.dataset.rv=1;el.classList.add("rv");
  io?io.observe(el):el.classList.add("in");
});
mark();
new MutationObserver(mark).observe($("#grid"),{childList:true});

// ===== Animasi lencana keranjang =====
const c=$("#count");
new MutationObserver(()=>{c.classList.remove("bump");void c.offsetWidth;c.classList.add("bump")})
  .observe(c,{childList:true,characterData:true,subtree:true});

// ===== Ikon hamburger berubah jadi X saat menu terbuka =====
const nav=$("#nav"),burger=$("#burger");
new MutationObserver(()=>{
  const o=nav.classList.contains("open");
  burger.textContent=o?"✕":"☰";burger.setAttribute("aria-expanded",o);burger.classList.toggle("x",o);
}).observe(nav,{attributes:true,attributeFilter:["class"]});
})();
