const CONFIG={wa:"62895338079080",instagram:"https://www.instagram.com/rmnu.santara",tiktok:"",facebook:"",mapsQuery:"Jl. Raya Binong No. 30"};
const WA=CONFIG.wa;
const MENU=[
{id:1,img:"images/rendang-sapi.webp",t:["Terlaris","Berempah"],c:"Makanan",n:"Rendang Sapi",d:"Daging empuk bumbu rempah khas Padang.",p:25000,r:4.9,rv:126},
{id:2,img:"images/ayam-bakar-taliwang.webp",t:["Pedas"],c:"Makanan",n:"Ayam Bakar Taliwang",d:"Ayam bakar pedas gurih khas Lombok.",p:22000,r:4.8,rv:84},
{id:3,img:"images/gudeg-jogja.webp",t:["Manis"],c:"Makanan",n:"Gudeg Jogja",d:"Nangka muda manis dengan telur dan krecek.",p:18000,r:4.7,rv:52},
{id:4,img:"images/soto-betawi.webp",t:["Berkuah"],c:"Makanan",n:"Soto Betawi",d:"Kuah santan gurih dengan daging sapi.",p:22000,r:4.8,rv:73},
{id:5,img:"images/nasi-goreng-kampung.webp",t:["Gurih"],c:"Makanan",n:"Nasi Goreng Kampung",d:"Nasi goreng ikan asin, telur mata sapi.",p:18000,r:4.8,rv:91},
{id:6,img:"images/sate-ayam-madura.webp",t:["Terlaris"],c:"Makanan",n:"Sate Ayam Madura",d:"10 tusuk dengan bumbu kacang.",p:20000,r:4.9,rv:118},
{id:7,img:"images/gado-gado.webp",t:["Sayuran"],c:"Makanan",n:"Gado-Gado",d:"Sayur segar, tahu, tempe, saus kacang.",p:16000,r:4.7,rv:46},
{id:8,img:"images/ikan-bakar-jimbaran.webp",t:["Baru"],c:"Makanan",n:"Ikan Bakar Jimbaran",d:"Ikan segar bakar sambal matah.",p:35000,r:4.9,rv:38},
{id:9,img:"images/es-teh-manis.webp",t:["Dingin"],c:"Minuman",n:"Es Teh Manis",d:"Teh segar dingin.",p:5000,r:4.8,rv:210},
{id:10,img:"images/es-jeruk.webp",t:["Segar"],c:"Minuman",n:"Es Jeruk",d:"Jeruk peras asli.",p:7000,r:4.8,rv:164},
{id:11,img:"images/wedang-jahe.webp",t:["Hangat"],c:"Minuman",n:"Wedang Jahe",d:"Jahe hangat dengan gula aren.",p:8000,r:4.7,rv:67},
{id:12,img:"images/es-cendol.webp",t:["Dingin","Manis"],c:"Minuman",n:"Es Cendol",d:"Cendol, santan, dan gula merah.",p:10000,r:4.8,rv:98},
{id:13,img:"images/pisang-goreng.webp",t:["Renyah"],c:"Camilan",n:"Pisang Goreng",d:"Renyah dengan taburan keju.",p:12000,r:4.7,rv:59},
{id:14,img:"images/klepon.webp",t:["Manis"],c:"Camilan",n:"Klepon",d:"Isi gula merah, balut kelapa parut.",p:8000,r:4.8,rv:44}];
// Gambar bulat untuk tiap kategori (seperti referensi aplikasi)
const CAT_IMG={"Semua":"images/sate-ayam-madura.webp","Makanan":"images/rendang-sapi.webp","Minuman":"images/es-cendol.webp","Camilan":"images/pisang-goreng.webp"};
const HEART='<svg class="ic"><use href="#i-heart"/></svg>';
const STAR='<svg class="ic"><use href="#i-star"/></svg>';
const $=s=>document.querySelector(s), rp=n=>"Rp"+n.toLocaleString("id-ID");
const esc=t=>String(t).replace(/[<>&"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
let cat="Semua", cart={}, favs={};
try{cart=JSON.parse(localStorage.getItem("rmn-cart")||"{}")}catch(e){}
try{favs=JSON.parse(localStorage.getItem("rmn-fav")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("rmn-cart",JSON.stringify(cart))}catch(e){}};
const saveFav=()=>{try{localStorage.setItem("rmn-fav",JSON.stringify(favs))}catch(e){}};
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("on"),1800)}

// ===== Kategori berbentuk chip bergambar =====
function tabs(){const cs=["Semua",...new Set(MENU.map(m=>m.c))];
const nf=Object.keys(favs).filter(k=>favs[k]).length;
$("#tabs").innerHTML=cs.map(c=>`<button class="chip ${c===cat?"on":""}" data-c="${c}" aria-pressed="${c===cat}">
<span class="chip-thumb"><span class="chip-img"><img src="${CAT_IMG[c]||MENU.find(m=>m.c===c)?.img||"images/hero.webp"}" alt="" loading="lazy"></span></span>
<span class="chip-txt">${c}</span></button>`).join("")
+`<button class="chip ${cat==="Favorit"?"on":""}" data-c="Favorit" aria-pressed="${cat==="Favorit"}">
<span class="chip-thumb"><span class="chip-img chip-ico">${HEART}</span>${nf?`<i class="chip-num">${nf}</i>`:""}</span>
<span class="chip-txt">Favorit</span></button>`}

const tags=m=>{const l=m.s?["Habis"]:[].concat(m.t||[]);
return l.length?`<span class="badge ${l[0]==="Terlaris"?"alt":l[0]==="Baru"?"new":""}">${l[0]}</span>`:""};

// ===== Kartu menu (layout aplikasi) =====
function menu(){const q=$("#q").value.trim().toLowerCase();
const base=cat==="Favorit"?MENU.filter(m=>favs[m.id]):MENU.filter(m=>cat==="Semua"||m.c===cat);
const l=base.filter(m=>(m.n+m.d).toLowerCase().includes(q));
const msg=cat==="Favorit"?"Belum ada menu favorit. Ketuk ikon hati pada kartu menu untuk menyimpannya.":"Menu tidak ditemukan. Coba kata kunci lain.";
$("#grid").innerHTML=l.length?l.map(m=>`<article class="card${m.s?" out":""}">
<div class="thumb">${tags(m)}<button class="fav${favs[m.id]?" on":""}" data-fav="${m.id}" aria-label="Simpan ${m.n}" aria-pressed="${!!favs[m.id]}">${HEART}</button>
<img src="${m.img}" alt="${m.n}" loading="lazy" width="640" height="480"></div>
<div class="cbody"><h3>${m.n}</h3><p class="desc">${m.d}</p>
<div class="rate">${STAR}${(m.r||4.8).toFixed(1)} <small>(${m.rv||0}+)</small></div>
<div class="row"><span class="price">${rp(m.p)}</span><button class="add" ${m.s?"disabled":""} data-id="${m.id}" aria-label="Tambah ${m.n} ke keranjang">+</button></div>
</div></article>`).join(""):`<div class="empty">${msg}</div>`}

// ===== Pilihan Promo Paket =====
const PROMOS = [
  {
    id: "keluarga",
    n: "Paket Keluarga Rempah",
    d: "Rendang Sapi + Sate Ayam + Gado-Gado + Es Teh Manis",
    disc: 0.30,
    discLabel: "30% OFF",
    items: [1, 6, 7, 9],
    img: "images/rendang-sapi.webp",
    badge: "HEMAT 30%"
  },
  {
    id: "berdua",
    n: "Paket Kenyang Berdua",
    d: "Ayam Bakar Taliwang + Nasi Goreng Kampung + Es Teh Manis + Es Jeruk",
    disc: 0.20,
    discLabel: "20% OFF",
    items: [2, 5, 9, 10],
    img: "images/ayam-bakar-taliwang.webp",
    badge: "HEMAT 20%"
  },
  {
    id: "solo",
    n: "Paket Solo Mantap",
    d: "Soto Betawi gurih hangat + Es Jeruk peras segar",
    disc: 0.15,
    discLabel: "15% OFF",
    items: [4, 10],
    img: "images/soto-betawi.webp",
    badge: "HEMAT 15%"
  },
  {
    id: "nyemil",
    n: "Paket Manis Sore",
    d: "Pisang Goreng keju renyah + Es Cendol manis legit",
    disc: 0.20,
    discLabel: "20% OFF",
    items: [13, 12],
    img: "images/pisang-goreng.webp",
    badge: "HEMAT 20%"
  }
];

let selectedPromo = "auto";
try { selectedPromo = localStorage.getItem("rmn-promo") || "auto"; } catch(e){}

function calcPromoFor(p) {
  if (!p) return { qualified: false, discount: 0, count: 0, missing: [], rawPrice: 0, promoPrice: 0 };
  const count = Math.min(...p.items.map(id => cart[id] || 0));
  const rawPrice = p.items.reduce((s, id) => s + (MENU.find(m => m.id === id)?.p || 0), 0);
  const discountPerSet = Math.round(rawPrice * p.disc);
  const missing = p.items.filter(id => !cart[id] || cart[id] < 1);
  return {
    qualified: count >= 1,
    count: Math.max(0, count),
    discount: count >= 1 ? discountPerSet * count : 0,
    rawPrice,
    promoPrice: rawPrice - discountPerSet,
    missing
  };
}

function getActivePromo() {
  if (selectedPromo === "none") {
    return { promo: null, qualified: false, discount: 0, count: 0, missing: [] };
  }
  if (selectedPromo === "auto") {
    let best = null, bestRes = null;
    for (const p of PROMOS) {
      const res = calcPromoFor(p);
      if (res.qualified && (!bestRes || res.discount > bestRes.discount)) {
        best = p;
        bestRes = res;
      }
    }
    if (best && bestRes && bestRes.discount > 0) {
      return { promo: best, ...bestRes };
    }
    return { promo: null, qualified: false, discount: 0, count: 0, missing: [] };
  }
  const target = PROMOS.find(p => p.id === selectedPromo);
  if (!target) return { promo: null, qualified: false, discount: 0, count: 0, missing: [] };
  return { promo: target, ...calcPromoFor(target) };
}

function addPackage(id) {
  const p = PROMOS.find(x => x.id === id);
  if (!p) return;
  p.items.forEach(itemId => {
    cart[itemId] = (cart[itemId] || 0) + 1;
  });
  selectedPromo = p.id;
  try { localStorage.setItem("rmn-promo", selectedPromo); } catch(e){}
  render();
  drawer(true);
  toast(`${p.n} dipilih! Diskon ${p.discLabel}`);
  addNote({
    i: "i-tag",
    t: `${p.n} Ditambahkan`,
    d: `Menu paket masuk keranjang dengan promo ${p.discLabel}.`,
    go: "#promo"
  });
}

function renderPromoList() {
  const el = $("#promoList");
  if (!el) return;
  el.innerHTML = PROMOS.map(p => {
    const raw = p.items.reduce((s, id) => s + (MENU.find(m => m.id === id)?.p || 0), 0);
    const disc = Math.round(raw * p.disc);
    const net = raw - disc;
    return `<article class="promo-card">
      <div class="promo-card-body">
        <span class="pill-tag">${p.badge}</span>
        <h3>${p.n}</h3>
        <p>${p.d}</p>
        <div class="promo-prices">
          <span class="new">${rp(net)}</span>
          <span class="old">${rp(raw)}</span>
        </div>
        <button type="button" class="btn-promo" data-pack="${p.id}">
          Pilih Paket Ini <svg class="ic arr"><use href="#i-arrow"/></svg>
        </button>
      </div>
      <div class="promo-card-visual">
        <img src="${p.img}" alt="${p.n}" loading="lazy">
        <span class="badge-disc">${p.discLabel}</span>
      </div>
    </article>`;
  }).join("");
}

function render(){const ids=Object.keys(cart).filter(i=>cart[i]>0);
let t=0,n=0;
$("#items").innerHTML=ids.length?ids.map(i=>{const m=MENU.find(x=>x.id==i);t+=m.p*cart[i];n+=cart[i];
return `<div class="it">${m.img?`<img src="${m.img}" alt="">`:""}<div class="n">${m.n}<small>${rp(m.p)}</small></div><div class="qty"><button data-m="${i}" aria-label="Kurangi">−</button><b>${cart[i]}</b><button data-p="${i}" aria-label="Tambah">+</button></div></div>`}).join(""):`<p class="empty">Keranjang masih kosong.</p>`;

// Update UI promo selector di keranjang
const promoBox = $("#promoBox");
const promoChoice = $("#promoChoice");
const promoDetail = $("#promoDetail");
const act = getActivePromo();

if (promoBox) promoBox.style.display = ids.length ? "flex" : "none";

if (promoChoice) {
  const opts = [
    { id: "auto", label: "✨ Otomatis (Promo Terbaik)" },
    { id: "none", label: "Tanpa Promo" },
    ...PROMOS.map(p => {
      const res = calcPromoFor(p);
      const tag = res.qualified ? " [BISA DIPAKAI]" : "";
      return { id: p.id, label: `${p.n} (${p.discLabel})${tag}` };
    })
  ];
  promoChoice.innerHTML = opts.map(o => `<option value="${o.id}" ${o.id === selectedPromo ? "selected" : ""}>${o.label}</option>`).join("");
}

if (promoDetail) {
  if (!ids.length) {
    promoDetail.innerHTML = "";
  } else if (act.qualified && act.discount > 0) {
    promoDetail.className = "promo-status active";
    promoDetail.innerHTML = `<svg class="ic"><use href="#i-check"/></svg><div><b>${act.promo.n} Aktif!</b><br><small>Diskon ${act.promo.discLabel}${act.count > 1 ? ` (x${act.count} paket)` : ""}</small></div><span class="saved">-${rp(act.discount)}</span>`;
  } else if (selectedPromo !== "auto" && selectedPromo !== "none" && act.promo) {
    const missingNames = act.missing.map(id => MENU.find(m => m.id === id)?.n).join(", ");
    promoDetail.className = "promo-status missing";
    promoDetail.innerHTML = `<div><b>${act.promo.n}</b><br><small>Kurang: ${esc(missingNames)}</small></div><button type="button" class="btn-lengkapi" data-lengkapi="${act.promo.id}">+ Lengkapi</button>`;
  } else if (selectedPromo === "none") {
    promoDetail.className = "promo-status missing";
    promoDetail.innerHTML = `<div><small>Promo dinonaktifkan.</small></div>`;
  } else {
    promoDetail.className = "promo-status missing";
    promoDetail.innerHTML = `<div><small>Belum ada paket kombo yang lengkap. Pilih promo di atas untuk hemat.</small></div>`;
  }
}

const promoDisc = (act.qualified && act.discount > 0) ? act.discount : 0;
t = Math.max(0, t - promoDisc);
$("#total").textContent=rp(t);$("#count").textContent=n;save();
// Label tombol cetak struk mengikuti isi keranjang
if($("#printLabel"))$("#printLabel").textContent=n?"Cetak Struk":(lastOrder?"Cetak Struk Terakhir":"Cetak Struk")}
const drawer=open=>{$("#drawer").classList.toggle("on",open);$("#ov").classList.toggle("on",open)};

$("#tabs").onclick=e=>{const c=e.target.closest(".chip")?.dataset.c;if(c){cat=c;tabs();refreshGrid()}};
// Pencarian di header: perbarui hasil + tampilkan jumlah yang ditemukan
function updateSearchCount(){
  const box=$("#searchCount"),q=$("#q").value.trim();
  if(!box)return;
  if(!q){box.hidden=true;box.textContent="";return}
  const n=MENU.filter(m=>(cat==="Semua"||m.c===cat)&&(m.n+m.d).toLowerCase().includes(q.toLowerCase())).length;
  box.hidden=false;
  box.textContent=n?`${n} menu ditemukan untuk “${q}”`:`Tidak ada menu untuk “${q}”`;
}
// Perbarui daftar menu TANPA membuat halaman meloncat.
// Jika bagian menu sudah berada di ATAS area pandang, mengubah tingginya akan
// menggeser seluruh konten yang sedang dilihat — itulah penyebab halaman
// terlihat "naik sendiri" saat menekan backspace. Posisi konten lalu dijaga tetap.
// Kalau menu masih terlihat/belum terlewati, biarkan aliran normal (tanpa koreksi).
function refreshGrid(){
  const menuEl=document.getElementById("menu"),anchor=document.getElementById("promo");
  if(!menuEl||!anchor){menu();updateSearchCount();return}
  const above=menuEl.getBoundingClientRect().bottom<=0;
  const y0=anchor.getBoundingClientRect().top;
  menu();updateSearchCount();
  if(!above)return;
  const diff=anchor.getBoundingClientRect().top-y0;
  if(!diff)return;
  const de=document.documentElement,prev=de.style.scrollBehavior;
  de.style.scrollBehavior="auto";           // jangan ikut animasi smooth
  window.scrollBy(0,diff);
  de.style.scrollBehavior=prev;
}
$("#q").oninput=refreshGrid;
$("#q").onsearch=refreshGrid;
$("#grid").onclick=e=>{
const f=e.target.closest(".fav");
if(f){const id=f.dataset.fav;favs[id]=!favs[id];f.classList.toggle("on",favs[id]);
f.setAttribute("aria-pressed",!!favs[id]);saveFav();tabs();
toast(favs[id]?"Disimpan ke favorit":"Dihapus dari favorit");
if(cat==="Favorit")refreshGrid();return}
const b=e.target.closest(".add");if(!b)return;const id=b.dataset.id;
const wasEmpty=!Object.keys(cart).length;
cart[id]=(cart[id]||0)+1;render();
const m=MENU.find(m=>m.id==id);toast(m.n+" ditambahkan");
if(wasEmpty)addNote({i:"i-bag",t:"Keranjang terisi",d:m.n+" siap dipesan. Selesaikan pesanan lewat WhatsApp.",go:"#menu"})};
$("#items").onclick=e=>{const m=e.target.dataset.m,p=e.target.dataset.p;if(m){cart[m]--;if(cart[m]<=0)delete cart[m]}if(p)cart[p]++;if(m||p)render()};
$("#openCart").onclick=()=>drawer(true);$("#closeCart").onclick=$("#ov").onclick=()=>drawer(false);
$("#checkout").onclick=()=>{const ids=Object.keys(cart);
if(!ids.length)return toast("Keranjang masih kosong");
const name=$("#cn").value.trim();if(!name){$("#cn").focus();return toast("Isi nama pemesan dulu")}
let t=0;const items=ids.map(i=>{const m=MENU.find(x=>x.id==i);t+=m.p*cart[i];return{n:m.n,p:m.p,q:cart[i]}});
const act=getActivePromo();
const promoDisc=(act.qualified&&act.discount>0)?act.discount:0;
const lines=items.map(i=>`- ${i.n} x${i.q} = ${rp(i.p*i.q)}`);
if(promoDisc>0){lines.push(`\n🎉 Promo ${act.promo.n} (${act.promo.discLabel}): -${rp(promoDisc)}`)}
t=Math.max(0,t-promoDisc);
const msg=`Halo Nusa & Spice, saya ingin memesan:\n${lines.join("\n")}\n\nTotal: ${rp(t)}\nAtas nama: ${name}\nTipe: ${$("#cm").value}`;
window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");
// Simpan struk terakhir agar bisa dicetak
lastOrder={no:noStruk(),time:Date.now(),name,type:$("#cm").value,items,total:t,discount:promoDisc,promoName:act.qualified?act.promo.n:"",discLabel:act.qualified?act.promo.discLabel:""};
try{localStorage.setItem("rmn-last",JSON.stringify(lastOrder))}catch(e){}
addNote({i:"i-check",t:"Pesanan dikirim ke WhatsApp",d:`${items.length} menu · ${rp(t)}${promoDisc?` · Diskon -${rp(promoDisc)}`:""} · struk ${lastOrder.no}`,go:""});
cart={};render();drawer(false);toast("Pesanan dikirim ke WhatsApp")};

if($("#promoChoice")){
  $("#promoChoice").onchange=e=>{
    selectedPromo=e.target.value;
    try{localStorage.setItem("rmn-promo",selectedPromo)}catch(err){}
    render();
    const act=getActivePromo();
    if(act.qualified&&act.discount>0)toast(`Promo ${act.promo.n} diterapkan!`);
  };
}
$("#drawer").onclick=e=>{
  const b=e.target.closest("[data-lengkapi]");
  if(b){
    const p=PROMOS.find(x=>x.id===b.dataset.lengkapi);
    if(p){
      p.items.forEach(id=>{if(!cart[id]||cart[id]<1)cart[id]=1});
      selectedPromo=p.id;
      try{localStorage.setItem("rmn-promo",selectedPromo)}catch(err){}
      render();
      toast(`${p.n} berhasil dilengkapi!`);
    }
  }
};
if($("#promoList")){
  $("#promoList").onclick=e=>{
    const btn=e.target.closest("[data-pack]");
    if(btn)addPackage(btn.dataset.pack);
  };
}

const burgerBtn=$("#burger"),navEl=$("#nav");
burgerBtn.onclick=()=>{
  const isOpen=navEl.classList.toggle("open");
  burgerBtn.setAttribute("aria-expanded",isOpen);
  const u=$("#burgerIc use");
  if(u)u.setAttribute("href",isOpen?"#i-close":"#i-menu");
};
navEl.onclick=e=>{
  if(e.target.tagName==="A"){
    navEl.classList.remove("open");
    burgerBtn.setAttribute("aria-expanded","false");
    const u=$("#burgerIc use");
    if(u)u.setAttribute("href","#i-menu");
  }
};

$("#rg").innerHTML=Array.from({length:10},(_,i)=>`<option value="${i+1}">${i+1} orang</option>`).join("");
$("#rt").innerHTML=Array.from({length:12},(_,i)=>{const h=10+i;return `<option>${String(h).padStart(2,"0")}.00</option>`}).join("");
const today=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
$("#rd").min=today;$("#rd").value=today;
$("#rsv").onsubmit=e=>{e.preventDefault();
const n=$("#rn").value.trim(),p=$("#rp").value.replace(/[\s-]/g,""),d=$("#rd").value;
if(!n)return toast("Nama wajib diisi");
if(!/^(\+62|62|0)8\d{7,11}$/.test(p))return toast("Nomor WhatsApp tidak valid");
if(!d||d<today)return toast("Pilih tanggal yang valid");
const msg=`Halo Nusa & Spice, saya ingin reservasi:\nNama: ${n}\nTelepon: ${p}\nTanggal: ${d}\nJam: ${$("#rt").value}\nJumlah tamu: ${$("#rg").value} orang`;
const url=`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const ok=$("#rok");ok.hidden=false;
ok.innerHTML=`<svg class="ic"><use href="#i-check"/></svg><span>Terima kasih, ${n.replace(/[<>&]/g,"")}! Permintaan reservasi siap dikirim. <a href="${url}" target="_blank" rel="noopener">Konfirmasi via WhatsApp <svg class="ic"><use href="#i-arrow"/></svg></a></span>`;
window.open(url,"_blank");toast("Reservasi dibuat");
addNote({i:"i-check",t:"Reservasi terkirim",d:`${n} · ${d} · ${$("#rt").value} · ${$("#rg").value} orang`,go:"#reservasi"});
e.target.reset();$("#rd").value=today};

$("#yr").textContent=new Date().getFullYear();

/* ===== Notifikasi (panel lonceng) ===== */
const NOTES_KEY="rmn-notes";
let notes=[];
try{notes=JSON.parse(localStorage.getItem(NOTES_KEY)||"[]")}catch(e){}
const saveNotes=()=>{try{localStorage.setItem(NOTES_KEY,JSON.stringify(notes))}catch(e){}};
function ago(ts){const d=Math.floor((Date.now()-ts)/60000);
if(d<1)return"Baru saja";if(d<60)return d+" menit lalu";
if(d<1440)return Math.floor(d/60)+" jam lalu";return Math.floor(d/1440)+" hari lalu"}
const NOTE_ICON=t=>({promo:"i-tag",order:"i-check",cart:"i-bag",book:"i-clock",info:"i-bell"}[t]||"i-bell");
function addNote(o){o=o||{};
notes.unshift({id:Date.now(),icon:o.i||NOTE_ICON(o.type||"info"),
  title:o.t||o.title||"Tanpa judul",text:o.d||o.text||"",go:o.go||"",time:Date.now(),read:false});
if(notes.length>25)notes.length=25;saveNotes();paintNotes()}
function paintNotes(){
const unread=notes.filter(n=>!n.read).length;
const badge=$("#ncount");badge.textContent=unread;badge.hidden=unread===0;
$("#notesList").innerHTML=notes.length?notes.map(n=>`<li class="note${n.read?" read":""}" data-id="${n.id}">
<span class="ni"><svg class="ic"><use href="#${n.icon||"i-bell"}"/></svg></span>
<span class="nt"><b>${esc(n.title)}</b><small>${esc(n.text)}</small><em>${ago(n.time)}</em></span></li>`).join("")
:`<li class="nempty">Belum ada notifikasi.</li>`}
const notesPanel=$("#notes"),bell=$("#bell");
function toggleNotes(f){const open=f===undefined?notesPanel.hidden:f;
notesPanel.hidden=!open;bell.setAttribute("aria-expanded",open);if(open)paintNotes()}
bell.onclick=e=>{e.stopPropagation();toggleNotes()};
notesPanel.onclick=e=>e.stopPropagation();
$("#notesList").onclick=e=>{const li=e.target.closest(".note");if(!li)return;
const n=notes.find(x=>x.id==li.dataset.id);if(n){n.read=true;saveNotes();paintNotes();
const t=n.go&&document.getElementById(n.go.slice(1));
if(t)t.scrollIntoView({behavior:"smooth",block:"start"});toggleNotes(false)}};
$("#readAll").onclick=()=>{notes.forEach(n=>n.read=true);saveNotes();paintNotes();toast("Semua notifikasi ditandai sudah dibaca")};
document.addEventListener("click",()=>{if(!notesPanel.hidden)toggleNotes(false)});
paintNotes();

/* ===== Cetak struk ===== */
let lastOrder=null;
try{lastOrder=JSON.parse(localStorage.getItem("rmn-last")||"null")}catch(e){}
const noStruk=()=>"NS-"+new Date().toISOString().slice(2,10).replace(/-/g,"")+"-"+Math.floor(100+Math.random()*900);
function currentOrder(){const ids=Object.keys(cart).filter(i=>cart[i]>0);
if(!ids.length)return null;
let t=0;const items=ids.map(i=>{const m=MENU.find(x=>x.id==i);t+=m.p*cart[i];return{n:m.n,p:m.p,q:cart[i]}});
const act=getActivePromo();
const promoDisc=(act.qualified&&act.discount>0)?act.discount:0;
t=Math.max(0,t-promoDisc);
return{no:noStruk(),time:Date.now(),name:$("#cn").value.trim()||"Pelanggan",type:$("#cm").value,items,total:t,discount:promoDisc,promoName:act.qualified?act.promo.n:"",discLabel:act.qualified?act.promo.discLabel:""}}
function printStruk(o){
const d=new Date(o.time),two=n=>String(n).padStart(2,"0");
const s=$("#struk");
s.innerHTML=`<div class="slip">
<b class="s-brand">Nusa &amp; Spice</b>
<span class="s-tag">INDONESIAN SPICE KITCHEN</span>
<span>Jl. Raya Binong No. 30 · 0895-3380-79080</span>
<div class="s-rule"></div>
<div class="s-row"><span>No. struk</span><b>${esc(o.no)}</b></div>
<div class="s-row"><span>Tanggal</span><span>${two(d.getDate())}/${two(d.getMonth()+1)} ${two(d.getHours())}:${two(d.getMinutes())}</span></div>
<div class="s-row"><span>Pelanggan</span><span>${esc(o.name)}</span></div>
<div class="s-row"><span>Tipe</span><span>${esc(o.type)}</span></div>
<div class="s-rule"></div>
<table class="s-items"><tbody>${o.items.map(i=>`<tr><td>${esc(i.n)}<br><small>${i.q} × ${rp(i.p)}</small></td><td>${rp(i.p*i.q)}</td></tr>`).join("")}</tbody></table>
${o.discount?`<div class="s-rule"></div><div class="s-row"><span>${esc(o.promoName||"Promo")} (${esc(o.discLabel||"Diskon")})</span><span>-${rp(o.discount)}</span></div>`:""}
<div class="s-rule"></div>
<div class="s-row s-total"><span>Total</span><b>${rp(o.total)}</b></div>
<div class="s-rule"></div>
<span class="s-thanks">Terima kasih sudah memesan di Nusa &amp; Spice.<br>Selamat menikmati hidangan Anda.</span>
<span class="s-fine">Ini adalah struk cetak dari website Nusa &amp; Spice.</span>
</div>`;
const prev=document.title;document.title="Struk-"+o.no;
window.print();document.title=prev}
$("#printBtn").onclick=()=>{const o=currentOrder()||lastOrder;
if(!o)return toast("Belum ada pesanan untuk dicetak");
if(!currentOrder())toast("Mencetak pesanan terakhir");printStruk(o)};
window.addEventListener("afterprint",()=>{$("#struk").innerHTML=""});

tabs();menu();render();renderPromoList();

// ===== Fitur tambahan =====
// Isi ulasan ASLI pelanggan di sini agar bagian "Ulasan" muncul. Contoh: {nama:"Budi",teks:"Enak sekali!",bintang:5}
const TESTIMONIALS=[{nama:"Budi",teks:"Rendangnya empuk dan bumbunya terasa.",bintang:5},{nama:"Sari",teks:"Tempatnya nyaman untuk makan bersama keluarga.",bintang:5}];
$("#gal").innerHTML=[1,2,5,7,8,14].map(i=>MENU.find(m=>m.id==i)).map(m=>`<button class="gi" data-s="${m.img}" aria-label="Perbesar ${m.n}"><img src="${m.img}" alt="${m.n}" loading="lazy"></button>`).join("");
$("#gal").onclick=e=>{const b=e.target.closest(".gi");if(b){$("#lbi").src=b.dataset.s;$("#lb").classList.add("on")}};
$("#lb").onclick=()=>$("#lb").classList.remove("on");
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#lb").classList.remove("on");drawer(false)}});
if(TESTIMONIALS.length){$("#ulasan").hidden=false;$("#tg").innerHTML=TESTIMONIALS.map(t=>`<div class="tc"><div class="stars">${STAR.repeat(t.bintang||5)}</div><p>${esc(t.teks)}</p><b>${esc(t.nama)}</b></div>`).join("")}
$("#map").src="https://www.google.com/maps?q="+encodeURIComponent(CONFIG.mapsQuery)+"&output=embed";
$("#wafab").href="https://wa.me/"+WA+"?text="+encodeURIComponent("Halo Nusa & Spice, saya ingin bertanya.");
$("#soc").innerHTML=[["Instagram",CONFIG.instagram],["TikTok",CONFIG.tiktok],["Facebook",CONFIG.facebook]].filter(x=>x[1]).map(x=>`<a href="${x[1]}" target="_blank" rel="noopener">${x[0]}</a>`).join("");
