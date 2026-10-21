const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.08});
$$('.reveal').forEach(el=>io.observe(el));
function split(n,c){[...n.childNodes].forEach(k=>{if(k.nodeType===3){const f=document.createDocumentFragment();
 k.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim()){f.appendChild(document.createTextNode(t));return}
 const w=document.createElement('span');w.className='w';const i=document.createElement('i');i.textContent=t;i.style.setProperty('--i',Math.min(c.n++,14));w.appendChild(i);f.appendChild(w)});k.replaceWith(f)}
 else if(k.nodeType===1)split(k,c)})}
const tio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');tio.unobserve(e.target)}}),{threshold:.2});
$$('.tx').forEach(el=>{split(el,{n:0});tio.observe(el)});
const words=['Video Editor','Graphic Designer','Junior Marketer'],typed=$('#typed');let w=0,c=0,del=false;
(function t(){const s=words[w];typed.textContent=s.slice(0,c);
 if(!del&&c<s.length){c++;setTimeout(t,90)}else if(!del){del=true;setTimeout(t,1400)}
 else if(c>0){c--;setTimeout(t,45)}else{del=false;w=(w+1)%words.length;setTimeout(t,300)}})();
addEventListener('scroll',()=>{$('#bar').style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%'},{passive:true});
$$('.set img').forEach(i=>{const h=()=>i.style.display='none';if(i.complete&&!i.naturalWidth)h();i.addEventListener('error',h)});
const modal=$('#modal'),box=$('#mbox'),close=()=>{modal.classList.remove('open');box.innerHTML='';document.body.style.overflow=''};
$$('[data-img]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();box.innerHTML='<img src="'+el.dataset.img+'" alt="">';modal.classList.add('open');document.body.style.overflow='hidden'}));
$('#mclose').onclick=close;modal.onclick=e=>{if(e.target===modal)close()};addEventListener('keydown',e=>{if(e.key==='Escape')close()});
const tabs=$$('.filters button'),cards=$$('.card');
tabs.forEach(b=>b.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));b.classList.add('active');
 cards.forEach(k=>k.classList.toggle('hide',!(b.dataset.f==='all'||k.dataset.cat===b.dataset.f)))}));
const form=$('#form'),msg=$('#formMsg');
form.addEventListener('submit',async e=>{e.preventDefault();msg.className='';msg.textContent='Sending...';
 try{const r=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
 if(!r.ok)throw 0;msg.className='ok';msg.textContent='Thanks! Your message has been sent.';form.reset()}
 catch{msg.className='err';msg.textContent='Something went wrong. Please WhatsApp me instead.'}});

const pan=$('.panel');
pan.addEventListener('mousemove',e=>{const r=pan.getBoundingClientRect();pan.style.setProperty('--mx',(e.clientX-r.left)/r.width-.5);pan.style.setProperty('--my',(e.clientY-r.top)/r.height-.5)});
pan.addEventListener('mouseleave',()=>{pan.style.setProperty('--mx',0);pan.style.setProperty('--my',0)});

// Reels: preview auto plays on the site, click opens the real Instagram / TikTok / Facebook reel
const nm=u=>/instagram/.test(u)?'Instagram':/tiktok/.test(u)?'TikTok':/facebook|fb\.watch/.test(u)?'Facebook':'Reel';
const rc=[...$$('.rcard')];
const vio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target,c=v.parentNode;
 if(e.isIntersecting){if(!v.dataset.manual)v.play().catch(()=>{})}else v.pause()}),{threshold:.35});
rc.forEach(c=>{const v=document.createElement('video');
 v.src=c.dataset.video;v.muted=true;v.loop=true;v.playsInline=true;v.preload='auto';v.setAttribute('muted','');v.setAttribute('playsinline','');
 c.insertBefore(v,c.firstChild);
 c.querySelector('.rtag').textContent=nm(c.href)+' Reel';
 c.style.backgroundImage="url('"+c.dataset.video.replace(/\.mp4.*/,'.jpg')+"'),linear-gradient(160deg,#FFD60A,#3a3000 55%,#141414)";c.style.backgroundSize='cover';c.style.backgroundPosition='center';
 v.addEventListener('error',()=>c.classList.add('miss'));
 const b=document.createElement('button');b.className='rpp';b.setAttribute('aria-label','Pause or play');c.appendChild(b);
 b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();
  if(v.paused){v.dataset.manual='';v.play();c.classList.remove('paused')}else{v.dataset.manual=1;v.pause();c.classList.add('paused')}});
 v.addEventListener('pause',()=>c.classList.add('paused'));v.addEventListener('play',()=>c.classList.remove('paused'));
 vio.observe(v)});
addEventListener('load',()=>rc.forEach(c=>{const v=c.querySelector('video');if(v.error||v.networkState===3)c.classList.add('miss')}));
// Few logos? Repeat them so the loop has no big gaps
addEventListener('load',()=>{const m=$('.clientsec .marquee'),sets=$$('.clientsec .set');if(!m||sets.length<2)return;
 const vis=[...sets[0].querySelectorAll('img')].filter(i=>i.style.display!=='none'&&i.naturalWidth);if(!vis.length)return;
 let g=0;while(sets[0].scrollWidth<m.clientWidth&&g++<8)vis.forEach(i=>sets[0].appendChild(i.cloneNode()));
 sets[1].innerHTML=sets[0].innerHTML});
