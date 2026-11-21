// Tema gelap/terang, animasi, carousel, & navigasi bawah. Dimuat setelah script.js.
(()=>{
const $=s=>document.querySelector(s),root=document.documentElement;
const ico=p=>`<svg viewBox="0 0 24 24">${p}</svg>`;
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
  if(m)m.content=isDark()?"#241812":"#E8731F";
};
let themeChanging=false;
btn.onclick=()=>{
  if(themeChanging)return;
  themeChanging=true;
  const t=isDark()?"light":"dark";
  root.classList.add("theming");root.dataset.theme=t;
  try{localStorage.setItem("rmn-theme",t)}catch(e){}
  paint();setTimeout(()=>{root.classList.remove("theming");themeChanging=false},450);
};
sys.addEventListener("change",paint);paint();

const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Animasi muncul saat digulir =====
const io=("IntersectionObserver" in window&&!reduce)?new IntersectionObserver((es,o)=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("in");o.unobserve(e.target)}
}),{threshold:.12,rootMargin:"0px 0px -40px 0px"}):null;
const SEL="section h2,.about>div,.card,.gi,.tc,.info>div,.feat,.promo,.map,#rsv,.sec-head";
// animate=true hanya untuk pemuatan pertama. Render ulang (cari/filter) tidak
// dianimasikan agar tidak berkedip & tidak menambah beban saat mengetik.
const mark=(animate=true)=>document.querySelectorAll(SEL).forEach(el=>{
  if(el.dataset.rv||el.closest(".hero"))return;
  el.dataset.rv=1;
  if(!animate){el.classList.add("in");return}
  el.classList.add("rv");
  io?io.observe(el):el.classList.add("in");
});
mark();
if($("#grid"))new MutationObserver(()=>mark(false)).observe($("#grid"),{childList:true});

// ===== Animasi lencana keranjang =====
const c=$("#count");
new MutationObserver(()=>{c.classList.remove("bump");void c.offsetWidth;c.classList.add("bump")})
  .observe(c,{childList:true,characterData:true,subtree:true});

// ===== Ikon hamburger berubah jadi X =====
const nav=$("#nav"),burger=$("#burger"),burgerIc=$("#burgerIc");
new MutationObserver(()=>{
  const o=nav.classList.contains("open");
  if(burgerIc)burgerIc.querySelector("use").setAttribute("href",o?"#i-close":"#i-menu");
  burger.setAttribute("aria-expanded",o);burger.classList.toggle("x",o);
}).observe(nav,{attributes:true,attributeFilter:["class"]});

// ===== Carousel banner =====
const slides=$("#slides"),dots=$("#dots"),car=$("#carousel");
if(slides&&dots&&car){
  const n=slides.children.length;let i=0,timer=null;
  dots.innerHTML=Array.from({length:n},(_,k)=>`<button type="button" aria-label="Tampilkan banner ${k+1}"${k?"":' class="on"'}></button>`).join("");
  const go=k=>{i=(k+n)%n;slides.style.transform=`translateX(${-i*100}%)`;
    [...dots.children].forEach((d,x)=>d.classList.toggle("on",x===i))};
  const start=()=>{if(reduce||timer)return;timer=setInterval(()=>go(i+1),5200)};
  const stop=()=>{clearInterval(timer);timer=null};
  dots.onclick=e=>{const b=e.target.closest("button");if(!b)return;
    go([...dots.children].indexOf(b));stop();start()};
  car.addEventListener("mouseenter",stop);
  car.addEventListener("mouseleave",start);
  car.addEventListener("focusin",stop);
  let sx=null;
  slides.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;stop()},{passive:true});
  slides.addEventListener("touchend",e=>{if(sx===null)return;
    const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));sx=null;start()});
  document.addEventListener("visibilitychange",()=>document.hidden?stop():start());
  start();
}

// ===== Tombol pesan (FAB) di bilah bawah =====
const fab=$("#fabOrder");
if(fab)fab.onclick=()=>typeof drawer==="function"?drawer(true):$("#openCart").click();

// ===== Status aktif bilah navigasi bawah =====
const tbs=[...document.querySelectorAll(".tb")];
tbs.forEach(a=>a.addEventListener("click",()=>{
  tbs.forEach(x=>x.classList.remove("on"));a.classList.add("on");
}));
if("IntersectionObserver" in window&&tbs.length){
  const map=new Map(tbs.map(a=>[a.getAttribute("href").slice(1),a]));
  const so=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){const a=map.get(e.target.id);
      if(a){tbs.forEach(x=>x.classList.remove("on"));a.classList.add("on")}}
  }),{rootMargin:"-45% 0px -50% 0px"});
  ["beranda","menu","promo","kontak"].forEach(id=>{const el=document.getElementById(id);if(el)so.observe(el)});
}
})();
