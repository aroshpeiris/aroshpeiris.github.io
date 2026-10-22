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
let tk=false;addEventListener('scroll',()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{$('#bar').style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%';tk=false})},{passive:true});
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

// Reels: coverflow carousel (centre card plays, swipe / arrows / dots to change)
const nm=u=>/instagram/.test(u)?'Instagram':/tiktok/.test(u)?'TikTok':/facebook|fb\.watch/.test(u)?'Facebook':'Reel';
const cf=$('#cf'),rc=[...$$('.rcard')],dots=$('#cfDots');
let act=Math.floor(rc.length/2),down=null,moved=false,inView=false,timer=null;
rc.forEach((c,i)=>{const v=document.createElement('video');
 v.poster=c.dataset.video.replace(/\.mp4$/,'.jpg');v.src=c.dataset.video;v.muted=true;v.loop=true;v.playsInline=true;v.preload='metadata';
 v.setAttribute('muted','');v.setAttribute('playsinline','');c.insertBefore(v,c.firstChild);
 c.querySelector('.rtag').textContent=nm(c.href)+' Reel';c.querySelector('.rgo').textContent='Watch on '+nm(c.href);
 v.addEventListener('error',()=>c.classList.add('miss'));
 const b=document.createElement('button');b.className='rpp';b.setAttribute('aria-label','Pause or play');c.appendChild(b);
 b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();
  if(v.paused){v.dataset.manual='';v.play()}else{v.dataset.manual=1;v.pause()}});
 v.addEventListener('pause',()=>c.classList.add('paused'));v.addEventListener('play',()=>c.classList.remove('paused'));
 const d=document.createElement('button');d.setAttribute('aria-label','Reel '+(i+1));d.onclick=()=>go(i,true);dots.appendChild(d);
 c.addEventListener('click',e=>{if(moved){e.preventDefault();return}if(i!==act){e.preventDefault();go(i,true)}})});
function layout(){const w=rc[0].offsetWidth,step=w*(innerWidth<800?.8:.86);
 rc.forEach((c,i)=>{const d=i-act,a=Math.abs(d),v=c.querySelector('video');
  c.style.transform='translateX('+(d*step)+'px) scale('+(a===0?1:a===1?.82:.66)+')';
  c.style.zIndex=10-a;c.style.opacity=a===2?.6:1;
  c.classList.toggle('on',a===0);c.classList.toggle('off',a>2);
  if(a===0&&inView&&!v.dataset.manual)v.play().catch(()=>{});else v.pause()});
 [...dots.children].forEach((b,i)=>b.classList.toggle('on',i===act))}
function go(i,user){act=(i+rc.length)%rc.length;layout();if(user)start()}
function start(){clearInterval(timer);timer=setInterval(()=>{if(inView&&!document.hidden)go(act+1)},6000)}
cf.addEventListener('dragstart',e=>e.preventDefault());
cf.addEventListener('pointerdown',e=>{down=e.clientX;moved=false});
addEventListener('pointerup',e=>{if(down===null)return;const dx=e.clientX-down;down=null;
 if(Math.abs(dx)>40){moved=true;go(act+(dx<0?1:-1),true);setTimeout(()=>moved=false,80)}});
addEventListener('pointercancel',()=>down=null);
$('.cf-nav.prev').onclick=()=>go(act-1,true);$('.cf-nav.next').onclick=()=>go(act+1,true);
new IntersectionObserver(es=>{inView=es[0].isIntersecting;layout()},{threshold:.35}).observe(cf);
addEventListener('resize',layout);
addEventListener('load',()=>{rc.forEach(c=>{const v=c.querySelector('video');if(v.error||v.networkState===3)c.classList.add('miss')});layout()});
layout();start();
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
