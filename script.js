const CONFIG={wa:"62895338079080",instagram:"",tiktok:"",facebook:"",mapsQuery:"Jl. Raya Binong No. 30"};
const WA=CONFIG.wa;
const MENU=[
{id:1,img:"images/rendang-sapi.webp",t:"Terlaris",c:"Makanan",e:"🍖",n:"Rendang Sapi",d:"Daging empuk bumbu rempah khas Padang.",p:38000},
{id:2,img:"images/ayam-bakar-taliwang.webp",t:"Pedas",c:"Makanan",e:"🍗",n:"Ayam Bakar Taliwang",d:"Ayam bakar pedas gurih khas Lombok.",p:32000},
{id:3,img:"images/gudeg-jogja.webp",c:"Makanan",e:"🍲",n:"Gudeg Jogja",d:"Nangka muda manis dengan telur dan krecek.",p:28000},
{id:4,img:"images/soto-betawi.webp",c:"Makanan",e:"🥣",n:"Soto Betawi",d:"Kuah santan gurih dengan daging sapi.",p:30000},
{id:5,img:"images/nasi-goreng-kampung.webp",c:"Makanan",e:"🍳",n:"Nasi Goreng Kampung",d:"Nasi goreng ikan asin, telur mata sapi.",p:25000},
{id:6,img:"images/sate-ayam-madura.webp",t:"Terlaris",c:"Makanan",e:"🍢",n:"Sate Ayam Madura",d:"10 tusuk dengan bumbu kacang.",p:27000},
{id:7,img:"images/gado-gado.webp",c:"Makanan",e:"🥗",n:"Gado-Gado",d:"Sayur segar, tahu, tempe, saus kacang.",p:22000},
{id:8,img:"images/ikan-bakar-jimbaran.webp",t:"Baru",c:"Makanan",e:"🐟",n:"Ikan Bakar Jimbaran",d:"Ikan segar bakar sambal matah.",p:45000},
{id:9,img:"images/es-teh-manis.webp",c:"Minuman",e:"🧊",n:"Es Teh Manis",d:"Teh segar dingin.",p:6000},
{id:10,img:"images/es-jeruk.webp",c:"Minuman",e:"🍊",n:"Es Jeruk",d:"Jeruk peras asli.",p:10000},
{id:11,img:"images/wedang-jahe.webp",c:"Minuman",e:"🫚",n:"Wedang Jahe",d:"Jahe hangat dengan gula aren.",p:10000},
{id:12,img:"images/es-cendol.webp",c:"Minuman",e:"🥥",n:"Es Cendol",d:"Cendol, santan, dan gula merah.",p:14000},
{id:13,img:"images/pisang-goreng.webp",c:"Camilan",e:"🍌",n:"Pisang Goreng",d:"Renyah dengan taburan keju.",p:15000},
{id:14,img:"images/klepon.webp",c:"Camilan",e:"🟢",n:"Klepon",d:"Isi gula merah, balut kelapa parut.",p:12000}];
const $=s=>document.querySelector(s), rp=n=>"Rp"+n.toLocaleString("id-ID");
let cat="Semua", cart={};
try{cart=JSON.parse(localStorage.getItem("rmn-cart")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("rmn-cart",JSON.stringify(cart))}catch(e){}};
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("on"),1800)}

function tabs(){const cs=["Semua",...new Set(MENU.map(m=>m.c))];
$("#tabs").innerHTML=cs.map(c=>`<button class="tab ${c===cat?"on":""}" data-c="${c}">${c}</button>`).join("")}
function menu(){const q=$("#q").value.trim().toLowerCase();
const l=MENU.filter(m=>(cat==="Semua"||m.c===cat)&&(m.n+m.d).toLowerCase().includes(q));
$("#grid").innerHTML=l.length?l.map(m=>`<article class="card${m.s?" out":""}"><div class="emo">${(m.s||m.t)?`<span class="tag">${m.s?"Habis":m.t}</span>`:""}${m.img?`<img src="${m.img}" alt="${m.n}" loading="lazy" width="640" height="480">`:`<span>${m.n}</span>`}</div><h3>${m.n}</h3><p>${m.d}</p><div class="row"><span class="price">${rp(m.p)}</span><button class="add" ${m.s?"disabled":""} data-id="${m.id}" aria-label="Tambah ${m.n}">+</button></div></article>`).join(""):`<div class="empty">Menu tidak ditemukan.</div>`}
function render(){const ids=Object.keys(cart).filter(i=>cart[i]>0);
let t=0,n=0;
$("#items").innerHTML=ids.length?ids.map(i=>{const m=MENU.find(x=>x.id==i);t+=m.p*cart[i];n+=cart[i];
return `<div class="it">${m.img?`<img src="${m.img}" alt="" style="width:44px;height:44px;border-radius:8px;object-fit:cover">`:""}<div class="n">${m.n}<small>${rp(m.p)}</small></div><div class="qty"><button data-m="${i}">−</button><b>${cart[i]}</b><button data-p="${i}">+</button></div></div>`}).join(""):`<p class="empty">Keranjang masih kosong.</p>`;
$("#total").textContent=rp(t);$("#count").textContent=n;save()}
const drawer=open=>{$("#drawer").classList.toggle("on",open);$("#ov").classList.toggle("on",open)};

$("#tabs").onclick=e=>{const c=e.target.dataset.c;if(c){cat=c;tabs();menu()}};
$("#q").oninput=menu;
$("#grid").onclick=e=>{const b=e.target.closest(".add");if(!b)return;const id=b.dataset.id;cart[id]=(cart[id]||0)+1;render();toast(MENU.find(m=>m.id==id).n+" ditambahkan")};
$("#items").onclick=e=>{const m=e.target.dataset.m,p=e.target.dataset.p;if(m){cart[m]--;if(cart[m]<=0)delete cart[m]}if(p)cart[p]++;if(m||p)render()};
$("#openCart").onclick=()=>drawer(true);$("#closeCart").onclick=$("#ov").onclick=()=>drawer(false);
$("#checkout").onclick=()=>{const ids=Object.keys(cart);
if(!ids.length)return toast("Keranjang masih kosong");
const name=$("#cn").value.trim();if(!name){$("#cn").focus();return toast("Isi nama pemesan dulu")}
let t=0;const lines=ids.map(i=>{const m=MENU.find(x=>x.id==i);t+=m.p*cart[i];return `- ${m.n} x${cart[i]} = ${rp(m.p*cart[i])}`});
const msg=`Halo Rumah Makan Nusantara, saya ingin memesan:\n${lines.join("\n")}\n\nTotal: ${rp(t)}\nAtas nama: ${name}\nTipe: ${$("#cm").value}`;
window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");
cart={};render();drawer(false);toast("Pesanan dikirim ke WhatsApp")};

$("#burger").onclick=()=>$("#nav").classList.toggle("open");
$("#nav").onclick=e=>{if(e.target.tagName==="A")$("#nav").classList.remove("open")};

$("#rg").innerHTML=Array.from({length:10},(_,i)=>`<option value="${i+1}">${i+1} orang</option>`).join("");
$("#rt").innerHTML=Array.from({length:12},(_,i)=>{const h=10+i;return `<option>${String(h).padStart(2,"0")}.00</option>`}).join("");
const today=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
$("#rd").min=today;$("#rd").value=today;
$("#rsv").onsubmit=e=>{e.preventDefault();
const n=$("#rn").value.trim(),p=$("#rp").value.replace(/[\s-]/g,""),d=$("#rd").value;
if(!n)return toast("Nama wajib diisi");
if(!/^(\+62|62|0)8\d{7,11}$/.test(p))return toast("Nomor WhatsApp tidak valid");
if(!d||d<today)return toast("Pilih tanggal yang valid");
const msg=`Halo Rumah Makan Nusantara, saya ingin reservasi:\nNama: ${n}\nTelepon: ${p}\nTanggal: ${d}\nJam: ${$("#rt").value}\nJumlah tamu: ${$("#rg").value} orang`;
const url=`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const ok=$("#rok");ok.hidden=false;
ok.innerHTML=`✅ Terima kasih, ${n.replace(/[<>&]/g,"")}! Permintaan reservasi siap dikirim. <a href="${url}" target="_blank" rel="noopener">Konfirmasi via WhatsApp →</a>`;
window.open(url,"_blank");toast("Reservasi dibuat");e.target.reset();$("#rd").value=today};

$("#yr").textContent=new Date().getFullYear();
tabs();menu();render();

// ===== Fitur tambahan =====
// Isi ulasan ASLI pelanggan di sini agar bagian "Ulasan" muncul. Contoh: {nama:"Budi",teks:"Enak sekali!",bintang:5}
const TESTIMONIALS=[];
const esc=t=>String(t).replace(/[<>&"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
$("#gal").innerHTML=[1,2,5,7,8,14].map(i=>MENU.find(m=>m.id==i)).map(m=>`<button class="gi" data-s="${m.img}" aria-label="Perbesar ${m.n}"><img src="${m.img}" alt="${m.n}" loading="lazy"></button>`).join("");
$("#gal").onclick=e=>{const b=e.target.closest(".gi");if(b){$("#lbi").src=b.dataset.s;$("#lb").classList.add("on")}};
$("#lb").onclick=()=>$("#lb").classList.remove("on");
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("#lb").classList.remove("on");drawer(false)}});
if(TESTIMONIALS.length){$("#ulasan").hidden=false;$("#tg").innerHTML=TESTIMONIALS.map(t=>`<div class="tc"><div class="price">${"★".repeat(t.bintang||5)}</div><p>${esc(t.teks)}</p><b>${esc(t.nama)}</b></div>`).join("")}
$("#map").src="https://www.google.com/maps?q="+encodeURIComponent(CONFIG.mapsQuery)+"&output=embed";
$("#wafab").href="https://wa.me/"+WA+"?text="+encodeURIComponent("Halo Rumah Makan Nusantara, saya ingin bertanya.");
$("#soc").innerHTML=[["Instagram",CONFIG.instagram],["TikTok",CONFIG.tiktok],["Facebook",CONFIG.facebook]].filter(x=>x[1]).map(x=>`<a href="${x[1]}" target="_blank" rel="noopener">${x[0]}</a>`).join("");
