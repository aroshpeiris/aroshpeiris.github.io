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

// logos: PNG, SVG, WEBP or JPG all work (tries each extension automatically)
const EXT=['png','svg','webp','jpg'];
function nextExt(i){const k=(+i.dataset.k||0)+1;if(k<EXT.length){i.dataset.k=k;i.src=i.src.replace(/\.\w+(\?.*)?$/,'.'+EXT[k])}else i.style.display='none'}
$$('.set img').forEach(i=>{i.addEventListener('error',()=>nextExt(i));if(i.complete&&!i.naturalWidth)nextExt(i)});
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

// Reels: built from reels.js (own MP4 = autoplay + sound icon, otherwise the official Instagram / TikTok / Facebook player)
const nm=u=>/instagram/.test(u)?'Instagram':/tiktok/.test(u)?'TikTok':/facebook|fb\.watch/.test(u)?'Facebook':'Reel';
function embedUrl(u){let m;u=u||'';
 if(m=u.match(/instagram\.com\/(reels?|p|tv)\/([\w-]+)/))return 'https://www.instagram.com/'+(m[1]==='reels'?'reel':m[1])+'/'+m[2]+'/embed';
 if(m=u.match(/tiktok\.com\/.*\/video\/(\d+)/))return 'https://www.tiktok.com/player/v1/'+m[1]+'?autoplay=0&loop=1&music_info=0&description=0&rel=0';
 if(/facebook\.com|fb\.watch/.test(u))return 'https://www.facebook.com/plugins/video.php?href='+encodeURIComponent(u)+'&show_text=false&width=340&height=680';
 return null}
const ON='<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>';
const OFF='<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
const cf=$('#cf'),dots=$('#cfDots'),list=(typeof REELS!=='undefined'?REELS:[]),rc=[],firstNav=cf.querySelector('.cf-nav');
let act=Math.floor(list.length/2),down=null,moved=false,inView=false,soundOn=false;
function mk(cls,html,label){const b=document.createElement('button');b.className=cls;b.innerHTML=html||'';b.setAttribute('aria-label',label);return b}
list.forEach((r,i)=>{const link=r.link||'',c=document.createElement('div');c.className='rcard';c.dataset.link=link;
 const tag=document.createElement('span');tag.className='rtag';tag.textContent=nm(link)+' Reel';
 const pl=document.createElement('span');pl.className='rplay';
 const ti=document.createElement('span');ti.className='rtitle';ti.textContent=r.title||'';
 if(r.video){c.dataset.type='v';
  const v=document.createElement('video');v.src=r.video+'#t=0.1';v.poster=r.poster||r.video.replace(/\.mp4$/,'.jpg');
  v.muted=true;v.loop=true;v.playsInline=true;v.preload='metadata';v.setAttribute('muted','');v.setAttribute('playsinline','');
  v.addEventListener('loadedmetadata',()=>{if(v.paused&&v.currentTime<.05)v.currentTime=.1});
  v.addEventListener('error',()=>c.classList.add('miss'));c.appendChild(v);
  const sd=mk('rsnd',OFF,'Sound on or off'),pp=mk('rpp','','Pause or play'),go=document.createElement('a');
  go.className='rgo';go.href=link;go.target='_blank';go.rel='noopener';go.textContent='Watch on '+nm(link);
  const sync=()=>{sd.innerHTML=v.muted?OFF:ON;sd.classList.toggle('loud',!v.muted)};
  sd.onclick=e=>{e.preventDefault();e.stopPropagation();v.muted=!v.muted;soundOn=!v.muted;sync();if(!v.muted)v.play().catch(()=>{})};
  pp.onclick=e=>{e.preventDefault();e.stopPropagation();if(v.paused){v.dataset.manual='';v.play()}else{v.dataset.manual=1;v.pause()}};
  go.onclick=e=>e.stopPropagation();
  v.addEventListener('pause',()=>c.classList.add('paused'));v.addEventListener('play',()=>c.classList.remove('paused'));
  v.addEventListener('volumechange',sync);
  c.append(tag,pl,ti,go,sd,pp)}
 else if(embedUrl(link)){c.dataset.type='e';c.classList.add('emb','miss');
  const og=document.createElement('a');og.className='rgo';og.href=link;og.target='_blank';og.rel='noopener';og.textContent='Open in '+nm(link);og.onclick=e=>e.stopPropagation();
  c.append(tag,pl,ti,og)}
 else{c.dataset.type='l';c.classList.add('miss');c.append(tag,pl,ti)}
 c.addEventListener('click',()=>{if(moved)return;if(i!==act)go2(i);else if(c.dataset.type==='l'&&link)window.open(link,'_blank','noopener')});
 cf.insertBefore(c,firstNav);rc.push(c);
 const d=document.createElement('button');d.setAttribute('aria-label','Reel '+(i+1));d.onclick=()=>go2(i);dots.appendChild(d)});
function mount(c){let f=c.querySelector('iframe');const ig=/instagram\.com\/reels?\//.test(c.dataset.link);
 if(!f){f=document.createElement('iframe');f.src=embedUrl(c.dataset.link);
  f.setAttribute('allow','autoplay; encrypted-media; fullscreen');f.setAttribute('allowfullscreen','');f.setAttribute('scrolling','no');f.title='Reel';
  f.style.opacity=0;f.onload=()=>{f.style.opacity=1;c.classList.add('live')};c.insertBefore(f,c.firstChild)}
 if(ig){const s=c.clientWidth/235;f.style.height='620px';f.style.transform='translate('+(-52.5*s)+'px,'+(-56*s)+'px) scale('+s+')'}
 else{const s=c.clientWidth/340;f.style.transform='scale('+s+')';f.style.height=(c.clientHeight/s)+'px'}}
function unmount(c){const f=c.querySelector('iframe');if(f){f.remove();c.classList.remove('live')}}
function layout(){if(!rc.length)return;const w=rc[0].offsetWidth,step=w*(innerWidth<800?.8:.86);
 rc.forEach((c,i)=>{const d=i-act,a=Math.abs(d),t=c.dataset.type;
  c.style.transform='translateX('+(d*step)+'px) scale('+(a===0?1:a===1?.82:.66)+')';
  c.style.zIndex=10-a;c.style.opacity=a===2?.6:1;c.classList.toggle('on',a===0);c.classList.toggle('off',a>2);
  if(t==='v'){const v=c.querySelector('video');v.preload=a<=1?'auto':'metadata';
   if(a===0&&inView&&!v.dataset.manual){v.muted=!soundOn;v.play().catch(()=>{v.muted=true;v.play().catch(()=>{})})}else v.pause()}
  else if(t==='e'){const was=c.dataset.act==='1';c.dataset.act=a===0?'1':'0';
   if(was&&a!==0)unmount(c);              // reel stops when you swipe away
   a<=(innerWidth<800?1:2)&&inView?mount(c):unmount(c)}});
 [...dots.children].forEach((b,i)=>b.classList.toggle('on',i===act));caption()}
let lastCap=-1;const cap=$('#cfCap');
function caption(){if(!cap||lastCap===act||!list[act])return;lastCap=act;const r=list[act];
 cap.querySelector('.cap-tag').textContent=nm(r.link||'');cap.querySelector('h3').textContent=r.title||'';cap.querySelector('p').textContent=r.desc||'';
 cap.classList.remove('in');void cap.offsetWidth;cap.classList.add('in')}
function go2(i){act=(i+rc.length)%rc.length;layout()}
cf.addEventListener('dragstart',e=>e.preventDefault());
cf.addEventListener('pointerdown',e=>{down=e.clientX;moved=false});
addEventListener('pointerup',e=>{if(down===null)return;const dx=e.clientX-down;down=null;
 if(Math.abs(dx)>40){moved=true;go2(act+(dx<0?1:-1));setTimeout(()=>moved=false,80)}});
addEventListener('pointercancel',()=>down=null);
cf.querySelector('.cf-nav.prev').onclick=()=>go2(act-1);cf.querySelector('.cf-nav.next').onclick=()=>go2(act+1);
new IntersectionObserver(es=>{inView=es[0].isIntersecting;layout()},{threshold:.35}).observe(cf);
addEventListener('resize',layout);layout();
// Few logos? Repeat them so the loop has no big gaps
addEventListener('load',()=>{const m=$('.clientsec .marquee'),sets=$$('.clientsec .set');if(!m||sets.length<2)return;
 const vis=[...sets[0].querySelectorAll('img')].filter(i=>i.style.display!=='none'&&i.offsetWidth>0);if(!vis.length)return;
 let g=0;while(sets[0].scrollWidth<m.clientWidth&&g++<8)vis.forEach(i=>sets[0].appendChild(i.cloneNode()));
 sets[1].innerHTML=sets[0].innerHTML;
 m.querySelector('.track').style.animationDuration=Math.max(40,sets[0].scrollWidth/28)+'s'});

// Intro: logo animation, then the curtain lifts and the hero animates in (same on mobile + desktop)
(function(){const it=$('#intro');if(!it)return;document.body.style.overflow='hidden';
 const done=()=>{if(document.body.classList.contains('ready'))return;it.classList.add('out');document.body.classList.add('ready');document.body.style.overflow='';setTimeout(()=>it.classList.add('gone'),1000)};
 const go=()=>setTimeout(done,1500);
 document.readyState==='complete'?go():addEventListener('load',go);
 setTimeout(done,4000)})();

// How I Work: cards fade in one by one, yellow line travels
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');sio.unobserve(e.target)}}),{threshold:.25});
$$('.steps').forEach(s=>sio.observe(s));

// Featured Work: 3 categories, each opens its own page inside the site
const CAT=typeof CATS!=='undefined'?CATS:[],PRJ=typeof PROJECTS!=='undefined'?PROJECTS:{};
const CI={video:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>',design:'<path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/><path d="M14 6l3 3"/>',marketing:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'};
const catsEl=$('#cats'),wp=$('#wp');
CAT.forEach(c=>{const n=(PRJ[c.id]||[]).length,a=document.createElement('a');a.className='cat';a.href='#work-'+c.id;
 a.style.setProperty('--cover',c.cover?"url('"+c.cover+"')":'none');
 a.innerHTML='<i class="ci"><svg viewBox="0 0 24 24">'+(CI[c.id]||CI.video)+'</svg></i><div><h3></h3><p></p><span class="cat-go"></span></div>';
 a.querySelector('h3').textContent=c.title;a.querySelector('p').textContent=c.desc;
 a.querySelector('.cat-go').textContent=n+(n===1?' project':' projects')+' · View';catsEl.appendChild(a)});
function showMedia(html){box.innerHTML=html;modal.classList.add('open');document.body.style.overflow='hidden'}
function openWork(id){const c=CAT.find(x=>x.id===id);if(!c)return;
 $('#wpTag').textContent='Featured Work';$('#wpTitle').textContent=c.title;$('#wpDesc').textContent=c.desc;
 const g=$('#wpGrid');g.innerHTML='';
 (PRJ[id]||[]).forEach(p=>{const el=document.createElement('a');el.className='pj';el.href=p.link||'#';
  el.innerHTML='<div class="pj-th"><span class="pj-play"></span></div><div class="pj-in"><h4></h4><p></p></div>';
  el.querySelector('.pj-th').style.backgroundImage="url('"+(p.thumb||'')+"'),linear-gradient(135deg,#2a2a2a,#121212)";
  if(!(p.video||id==='video'))el.querySelector('.pj-play').remove();
  el.querySelector('h4').textContent=p.title||'';el.querySelector('p').textContent=p.desc||'';
  if(p.video||p.image||!p.link)el.addEventListener('click',e=>{e.preventDefault();
   if(p.video)showMedia('<video src="'+p.video+'" controls autoplay playsinline></video>');
   else if(p.image)showMedia('<img src="'+p.image+'" alt="">')});
  else{el.target='_blank';el.rel='noopener'}
  g.appendChild(el)});
 if(!g.children.length)g.innerHTML='<p class="wp-empty">Projects coming soon.</p>';
 wp.classList.add('open');wp.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';wp.scrollTop=0}
function closeWork(){if(!wp.classList.contains('open'))return;wp.classList.remove('open');wp.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function route(){const h=location.hash;h.startsWith('#work-')?openWork(h.slice(6)):closeWork()}
function backHome(){history.replaceState(null,'','#projects');closeWork()}
$('#wpBack').onclick=backHome;addEventListener('hashchange',route);
let escModal=false;addEventListener('keydown',e=>{if(e.key==='Escape')escModal=modal.classList.contains('open')},true);
addEventListener('keydown',e=>{if(e.key==='Escape'&&!escModal&&wp.classList.contains('open'))backHome()});
route();

// Section tabs: highlight the section you are reading (desktop nav + phone tab strip)
const tabsEl=$('#tabs'),spyLinks=[...$$('.tabs a,.nav-links a')];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
 spyLinks.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));
 const t=tabsEl&&tabsEl.querySelector('a.on');
 if(t)tabsEl.scrollTo({left:t.offsetLeft-(tabsEl.clientWidth-t.clientWidth)/2,behavior:'smooth'})}),{rootMargin:'-45% 0px -50% 0px'});
['aboutme','reels','services','projects','skills','play','contact'].forEach(id=>{const el=document.getElementById(id);if(el)spy.observe(el)});
// phone tab strip hides while scrolling down, shows again when scrolling up
let lastY=scrollY,tt=false;
addEventListener('scroll',()=>{if(tt||!tabsEl)return;tt=true;requestAnimationFrame(()=>{const y=scrollY,d=y-lastY;
 if(Math.abs(d)>8){tabsEl.classList.toggle('hide',d>0&&y>240);lastY=y}tt=false})},{passive:true});
// desktop: soft spotlight follows the mouse
if(matchMedia('(pointer:fine)').matches){const au=$('#aurora');
 addEventListener('mousemove',e=>{au.style.setProperty('--sx',e.clientX+'px');au.style.setProperty('--sy',e.clientY+'px')},{passive:true})}

// ---- Hero live background: floating yellow embers that react to the mouse ----
(function(){const cv=$('#heroFx'),hero=$('.hero');if(!cv||!hero||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 const ctx=cv.getContext('2d');let W=0,H=0,P=[],mx=-999,my=-999,run=false,raf=0;
 function size(){const d=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
  const n=W<800?36:84;P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.7,vx:(Math.random()-.5)*.25,vy:-(Math.random()*.45+.12),a:Math.random()*.5+.25,t:Math.random()*6}))}
 function step(){if(!run)return;ctx.clearRect(0,0,W,H);
  for(const p of P){p.t+=.02;p.x+=p.vx+Math.sin(p.t)*.15;p.y+=p.vy;
   const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<150&&d>0){p.x+=dx/d*(150-d)*.025;p.y+=dy/d*(150-d)*.025}
   if(p.y<-12){p.y=H+12;p.x=Math.random()*W}if(p.x<-12)p.x=W+12;if(p.x>W+12)p.x=-12;
   const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);g.addColorStop(0,'rgba(255,232,100,'+p.a+')');g.addColorStop(1,'rgba(255,214,10,0)');
   ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r*6,0,6.2832);ctx.fill()}
  if(W>=800){ctx.lineWidth=.6;for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);
   if(d<120){ctx.strokeStyle='rgba(255,214,10,'+(.17*(1-d/120)).toFixed(3)+')';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}
  raf=requestAnimationFrame(step)}
 size();addEventListener('resize',size);
 hero.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
 hero.addEventListener('mouseleave',()=>{mx=my=-999});
 new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v&&!run){run=true;step()}else if(!v){run=false;cancelAnimationFrame(raf)}}).observe(hero);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){run=false;cancelAnimationFrame(raf)}else if(!run){run=true;step()}})})();

// ---- Flow: sections ease in/out while scrolling, big word slides sideways ----
(function(){const secs=[...$$('section')],still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 secs.forEach(s=>{const h=s.querySelector('h2');if(h)s.dataset.w=h.textContent.replace(/\s+/g,' ').trim().toUpperCase().slice(0,16)});
 let fr=false;
 function flow(){fr=false;const vh=innerHeight;
  secs.forEach(s=>{const r=s.getBoundingClientRect();if(r.bottom<-250||r.top>vh+250)return;
   const n=Math.max(-1,Math.min(1,(r.top+r.height/2-vh/2)/(vh*.9)));
   s.querySelectorAll(':scope>.in-w').forEach(w=>{w.style.translate='0 '+(n*30).toFixed(1)+'px';w.style.scale=(1-Math.abs(n)*.03).toFixed(4)});
   s.style.setProperty('--wx',(n*-12).toFixed(1)+'%')})}
 if(!still)addEventListener('scroll',()=>{if(!fr){fr=true;requestAnimationFrame(flow)}},{passive:true});flow()})();

// ---- Cursor: glowing ring that follows the mouse, grows on links / buttons ----
(function(){const cur=$('#cur');if(!cur||!matchMedia('(pointer:fine)').matches)return;
 let x=0,y=0,cx=0,cy=0,go=false;
 addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;if(!go){go=true;cx=x;cy=y;cur.classList.add('on');loop()}
  cur.classList.toggle('hot',!!e.target.closest('a,button,.rcard,.cat,.pj,input,textarea,.cf-nav'))},{passive:true});
 addEventListener('mousedown',()=>cur.classList.add('dn'));addEventListener('mouseup',()=>cur.classList.remove('dn'));
 document.addEventListener('mouseleave',()=>cur.classList.remove('on'));document.addEventListener('mouseenter',()=>cur.classList.add('on'));
 function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;cur.style.transform='translate3d('+cx+'px,'+cy+'px,0)';requestAnimationFrame(loop)}})();
