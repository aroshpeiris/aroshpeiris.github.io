/* AROSH Creative Runner  -  endless runner for the portfolio (HTML + CSS + canvas + localStorage) */
(function(){
const $=id=>document.getElementById(id),cv=$('runGame');if(!cv)return;
const ctx=cv.getContext('2d'),LH=240,GY=196,KEY='ap_runner_hi';
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let LW=800,sc=1,vis=false,last=0,raf=0,hi=0,shown=-1;try{hi=+localStorage.getItem(KEY)||0}catch(e){}
const S={st:'ready',speed:6,dist:0,since:0,gap:320,inv:false,overAt:0},P={x:56,y:GY,vy:0},obs=[],bits=[],tags=[];
const E={score:$('gScore'),best:$('gBest'),best2:$('gBest2'),fin:$('gFinal'),ready:$('gReady'),over:$('gOver'),isNew:$('gNew'),play:$('gPlay'),re:$('gRestart')};
const pad=n=>String(Math.floor(n)).padStart(5,'0'),score=()=>S.dist/8;
const fg=()=>S.inv?'#0b0b0b':'#FFD60A',bg=()=>S.inv?'#FFD60A':'#0b0b0b';
function size(){const r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);sc=r.height/LH;LW=r.width/sc;
 cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);ctx.setTransform(sc*d,0,0,sc*d,0,0);if(!raf)draw()}
function seed(){for(let i=0;i<24;i++)bits.push({x:Math.random()*LW,w:2+Math.random()*8});
 ['Pr','Ps','Ai','Cc'].forEach(s=>tags.push({x:Math.random()*LW,y:26+Math.random()*70,s,v:calm?0:.25+Math.random()*.3}))}
/* ---- obstacle drawings (simple silhouettes) ---- */
function dot(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.fill()}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function clap(x,w,h){ctx.fillStyle=fg();ctx.fillRect(x,GY-h+9,w,h-9);ctx.fillRect(x-2,GY-h,w+4,9);ctx.fillStyle=bg();
 for(let i=4;i<w;i+=12){ctx.beginPath();ctx.moveTo(x+i,GY-h);ctx.lineTo(x+i+5,GY-h);ctx.lineTo(x+i+1,GY-h+9);ctx.lineTo(x+i-4,GY-h+9);ctx.fill()}}
function reel(x,w){const c=x+w/2,y=GY-w/2;ctx.fillStyle=fg();dot(c,y,w/2);ctx.fillStyle=bg();
 for(let a=0;a<5;a++)dot(c+Math.cos(a*1.2566)*w*.27,y+Math.sin(a*1.2566)*w*.27,w*.09);dot(c,y,w*.08)}
function camera(x){ctx.fillStyle=fg();ctx.fillRect(x,GY-26,38,26);
 ctx.beginPath();ctx.moveTo(x+38,GY-20);ctx.lineTo(x+50,GY-25);ctx.lineTo(x+50,GY-5);ctx.lineTo(x+38,GY-10);ctx.fill();
 dot(x+11,GY-34,9);dot(x+29,GY-34,9);ctx.fillStyle=bg();dot(x+11,GY-34,3);dot(x+29,GY-34,3);ctx.fillRect(x+6,GY-19,9,5)}
function timeline(x){ctx.fillStyle=fg();ctx.fillRect(x,GY-14,52,14);ctx.fillRect(x+6,GY-28,34,12);
 ctx.fillStyle=bg();for(let i=4;i<50;i+=8)ctx.fillRect(x+i,GY-6,3,3);
 ctx.fillStyle=fg();ctx.fillRect(x+26,GY-44,2,16);ctx.beginPath();ctx.moveTo(x+21,GY-44);ctx.lineTo(x+33,GY-44);ctx.lineTo(x+27,GY-36);ctx.fill()}
function tile(x,o){ctx.strokeStyle=fg();ctx.lineWidth=3;rr(x+1.5,GY-36.5,35,35,7);ctx.stroke();
 ctx.fillStyle=fg();ctx.font='800 16px Poppins,sans-serif';ctx.textAlign='center';ctx.fillText(o.s,x+19,GY-12)}
const KINDS=[
 {w:34,h:34,d:x=>clap(x,34,34)},{w:34,h:56,d:x=>clap(x,34,56)},{w:40,h:40,d:x=>reel(x,40)},
 {w:50,h:43,d:camera},{w:52,h:44,hh:30,d:timeline},{w:38,h:38,d:tile},{w:68,h:32,hh:30,d:x=>{clap(x,30,30);reel(x+36,32)}}];
function spawn(){const k=KINDS[Math.floor(Math.random()*KINDS.length)];
 obs.push({x:LW+10,w:k.w,h:k.h,hh:k.hh||k.h,d:k.d,s:['Pr','Ps','Ai','Cc'][Math.floor(Math.random()*4)]});
 S.since=0;S.gap=Math.max(250,S.speed*36)+Math.random()*240}
function hit(o){const a={x:P.x+5,y:P.y-34,w:28,h:32};return a.x<o.x+o.w-4&&a.x+a.w>o.x+4&&a.y+a.h>GY-(o.hh-4)}
/* ---- player: yellow play button ---- */
function player(){const x=P.x,top=P.y-38;ctx.fillStyle=fg();rr(x,top,38,34,9);ctx.fill();
 const air=P.y<GY,f=Math.floor(S.dist/9)%2;ctx.fillRect(x+7,P.y-5,9,5+(air?0:f?0:-3));ctx.fillRect(x+22,P.y-5,9,5+(air?0:f?-3:0));
 ctx.fillStyle=bg();
 if(S.st==='over'){ctx.font='700 15px Poppins,sans-serif';ctx.textAlign='center';ctx.fillText('x x',x+19,top+23)}
 else{ctx.beginPath();ctx.moveTo(x+14,top+9);ctx.lineTo(x+14,top+25);ctx.lineTo(x+28,top+17);ctx.fill()}}
function draw(){ctx.fillStyle=bg();ctx.fillRect(0,0,LW,LH);
 ctx.globalAlpha=.22;ctx.font='700 15px Poppins,sans-serif';ctx.textAlign='left';ctx.fillStyle=fg();ctx.strokeStyle=fg();ctx.lineWidth=1.5;
 for(const t of tags){ctx.strokeRect(t.x,t.y,30,26);ctx.fillText(t.s,t.x+6,t.y+18)}ctx.globalAlpha=1;
 ctx.fillStyle=fg();ctx.fillRect(0,GY,LW,2);for(const b of bits)ctx.fillRect(b.x,GY+9+(b.w%4)*6,b.w,2);
 for(const o of obs)o.d(o.x,o);player()}
function hud(){const s=Math.floor(score());if(s!==shown){shown=s;E.score.textContent=pad(s)}}
function setBest(){E.best.textContent=E.best2.textContent=pad(hi)}
function show(el,on){el.hidden=!on}
/* ---- states: ready -> playing -> game over -> restart ---- */
function start(){S.st='run';S.speed=6;S.dist=0;S.since=0;S.gap=320;S.inv=false;P.y=GY;P.vy=0;obs.length=0;shown=-1;
 show(E.ready,false);show(E.over,false);hud();setBest()}
function end(){S.st='over';S.overAt=performance.now();const f=Math.floor(score());let nb=false;
 if(f>hi){hi=f;nb=true;try{localStorage.setItem(KEY,hi)}catch(e){}}
 E.fin.textContent=pad(f);setBest();E.isNew.hidden=!nb;show(E.over,true)}
function jump(){if(S.st==='run'&&P.y>=GY)P.vy=-12.4}
function act(){if(S.st==='ready')start();else if(S.st==='over'){if(performance.now()-S.overAt>350)start()}else jump()}
function frame(now){raf=0;if(!vis||document.hidden)return;const dt=Math.min((now-last)/16.667||1,2.2);last=now;
 if(S.st==='run'){S.speed=Math.min(14,S.speed+(calm?.0008:.0016)*dt);S.dist+=S.speed*dt;S.since+=S.speed*dt;
  P.vy+=.82*dt;P.y+=P.vy*dt;if(P.y>GY){P.y=GY;P.vy=0}
  for(const o of obs)o.x-=S.speed*dt;while(obs.length&&obs[0].x<-100)obs.shift();
  if(S.since>=S.gap)spawn();
  if(!calm)S.inv=Math.floor(score()/700)%2===1;
  hud();for(const o of obs)if(hit(o)){end();break}}
 for(const b of bits){b.x-=(S.st==='run'?S.speed:1)*dt;if(b.x<-10){b.x=LW+Math.random()*80;b.w=2+Math.random()*8}}
 for(const t of tags){t.x-=t.v*dt;if(t.x<-40)t.x=LW+Math.random()*200}
 draw();raf=requestAnimationFrame(frame)}
function loop(){if(!raf&&vis&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame)}}
/* ---- input ---- */
addEventListener('keydown',e=>{if(!vis||!(e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW'))return;
 const t=(e.target&&e.target.tagName)||'';if(/INPUT|TEXTAREA|SELECT/.test(t))return;
 if(e.code==='Space'&&(t==='BUTTON'||t==='A'))return;           // let a focused button handle its own Space
 e.preventDefault();act()});
cv.addEventListener('pointerdown',e=>{if(S.st==='run'){e.preventDefault();jump()}});
E.play.addEventListener('click',()=>{start()});E.re.addEventListener('click',()=>{start()});
new IntersectionObserver(es=>{vis=es[0].isIntersecting;vis?loop():(cancelAnimationFrame(raf),raf=0)},{threshold:.3}).observe(cv);
document.addEventListener('visibilitychange',()=>{document.hidden?(cancelAnimationFrame(raf),raf=0):loop()});
addEventListener('resize',size);
setBest();size();seed();draw();
if(window.location.search.indexOf('gamedebug')>-1)window.__G={S,P,obs,act,jump};
})();
