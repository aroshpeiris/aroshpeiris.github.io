/* "No network"-style runner  -  Space / Arrow Up / tap to jump */
(function(){
const cv=document.getElementById('runGame');if(!cv)return;
const ctx=cv.getContext('2d'),LH=240,GY=196;            // logical height / ground line
let LW=800,sc=1,vis=false,last=0,raf=0;
const KEY='ap_runner_hi';let hi=0;try{hi=+localStorage.getItem(KEY)||0}catch(e){}
const S={state:'idle',speed:6,dist:0,t:0,inv:false,flash:0},P={x:56,y:GY,vy:0},obs=[],bits=[],tags=[];
const TAGS=['Pr','Ps','Ai','Cc'];
function size(){const r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);sc=r.height/LH;LW=r.width/sc;
 cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);ctx.setTransform(sc*d,0,0,sc*d,0,0)}
function seed(){bits.length=0;tags.length=0;for(let i=0;i<24;i++)bits.push({x:Math.random()*LW,w:2+Math.random()*8});
 for(let i=0;i<4;i++)tags.push({x:Math.random()*LW,y:28+Math.random()*70,s:TAGS[i%4],v:.25+Math.random()*.3})}
function reset(){S.state='run';S.speed=6;S.dist=0;S.inv=false;P.y=GY;P.vy=0;obs.length=0;S.next=LW*.7}
function jump(){if(S.state==='idle'||S.state==='over'){if(S.state==='over'&&performance.now()-S.overAt<350)return;reset()}
 if(S.state==='run'&&P.y>=GY){P.vy=-12.4}}
const fg=()=>S.inv?'#0b0b0b':'#FFD60A',bg=()=>S.inv?'#FFD60A':'#0b0b0b';
function spawn(){const r=Math.random(),k=r<.3?0:r<.55?1:r<.8?2:3;
 const o=k===0?{w:34,h:34,k}:k===1?{w:34,h:56,k}:k===2?{w:40,h:40,k}:{w:80,h:34,k};o.x=LW+10;obs.push(o);
 S.next=LW+10+Math.max(240,S.speed*34)+Math.random()*220}
function clap(x,w,h){ctx.fillStyle=fg();ctx.fillRect(x,GY-h+9,w,h-9);ctx.fillRect(x-2,GY-h,w+4,9);ctx.fillStyle=bg();
 for(let i=4;i<w;i+=12){ctx.beginPath();ctx.moveTo(i,GY-h);ctx.lineTo(i+5,GY-h);ctx.lineTo(i+1,GY-h+9);ctx.lineTo(i-4,GY-h+9);ctx.fill()}}
function reel(x,w){const c=x+w/2,y=GY-w/2;ctx.fillStyle=fg();ctx.beginPath();ctx.arc(c,y,w/2,0,6.2832);ctx.fill();ctx.fillStyle=bg();
 for(let a=0;a<5;a++){ctx.beginPath();ctx.arc(c+Math.cos(a*1.2566)*w*.27,y+Math.sin(a*1.2566)*w*.27,w*.09,0,6.2832);ctx.fill()}
 ctx.beginPath();ctx.arc(c,y,w*.08,0,6.2832);ctx.fill()}
function drawObs(o){if(o.k===0||o.k===1)clap(o.x,o.w,o.h);else if(o.k===2)reel(o.x,o.w);else{clap(o.x,34,34);reel(o.x+44,36)}}
function drawPlayer(){const x=P.x,top=P.y-38;ctx.fillStyle=fg();
 ctx.beginPath();ctx.roundRect?ctx.roundRect(x,top,38,34,9):ctx.rect(x,top,38,34);ctx.fill();
 const air=P.y<GY,f=Math.floor(S.dist/9)%2;ctx.fillRect(x+7,P.y-5,9,5+(air?0:f?0:-3));ctx.fillRect(x+22,P.y-5,9,5+(air?0:f?-3:0));
 ctx.fillStyle=bg();
 if(S.state==='over'){ctx.font='700 15px Poppins,sans-serif';ctx.textAlign='center';ctx.fillText('x x',x+19,top+23)}
 else{ctx.beginPath();ctx.moveTo(x+14,top+9);ctx.lineTo(x+14,top+25);ctx.lineTo(x+28,top+17);ctx.fill()}}
function hit(o){const a={x:P.x+5,y:P.y-34,w:28,h:32},h=o.k===3?[{x:o.x+4,w:28,h:30},{x:o.x+48,w:28,h:30}]:[{x:o.x+4,w:o.w-8,h:o.h-4}];
 return h.some(b=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y+a.h>GY-b.h)}
function pad(n){return String(Math.floor(n)).padStart(5,'0')}
function frame(now){raf=0;if(!vis)return;const dt=Math.min((now-last)/16.667||1,2.2);last=now;
 if(S.state==='run'){S.speed=Math.min(14,S.speed+.0016*dt);S.dist+=S.speed*dt;
  P.vy+=.82*dt;P.y+=P.vy*dt;if(P.y>GY){P.y=GY;P.vy=0}
  for(const o of obs)o.x-=S.speed*dt;while(obs.length&&obs[0].x<-100)obs.shift();
  const rightmost=obs.length?obs[obs.length-1].x:-1e9;if(LW+10>=S.next+0&&(obs.length===0||rightmost<LW-(S.next-LW-10)))spawn();
  const sc2=S.dist/8;S.inv=Math.floor(sc2/700)%2===1;
  for(const o of obs)if(hit(o)){S.state='over';S.overAt=performance.now();if(sc2>hi){hi=Math.floor(sc2);try{localStorage.setItem(KEY,hi)}catch(e){}}break}}
 for(const b of bits){b.x-=(S.state==='run'?S.speed:1)*dt;if(b.x<-10){b.x=LW+Math.random()*80;b.w=2+Math.random()*8}}
 for(const t of tags){t.x-=t.v*dt;if(t.x<-40){t.x=LW+Math.random()*200}}
 ctx.fillStyle=bg();ctx.fillRect(0,0,LW,LH);
 ctx.globalAlpha=.22;ctx.font='700 15px Poppins,sans-serif';ctx.textAlign='left';ctx.fillStyle=fg();
 for(const t of tags){ctx.strokeStyle=fg();ctx.lineWidth=1.5;ctx.strokeRect(t.x,t.y,30,26);ctx.fillText(t.s,t.x+6,t.y+18)}ctx.globalAlpha=1;
 ctx.fillStyle=fg();ctx.fillRect(0,GY,LW,2);for(const b of bits)ctx.fillRect(b.x,GY+9+(b.w%4)*6,b.w,2);
 for(const o of obs)drawObs(o);drawPlayer();
 ctx.fillStyle=fg();ctx.font='600 16px Poppins,sans-serif';ctx.textAlign='right';
 ctx.globalAlpha=.6;ctx.fillText('HI '+pad(hi)+'   '+pad(S.dist/8),LW-16,28);ctx.globalAlpha=1;ctx.textAlign='center';
 if(S.state==='idle'){ctx.font='800 22px Poppins,sans-serif';ctx.fillText('No network? Let\u2019s play.',LW/2,84);
  ctx.font='400 14px Poppins,sans-serif';ctx.globalAlpha=.75;ctx.fillText('Press Space or tap to start',LW/2,110);ctx.globalAlpha=1}
 if(S.state==='over'){ctx.font='800 24px Poppins,sans-serif';ctx.fillText('GAME OVER',LW/2,84);
  ctx.font='400 14px Poppins,sans-serif';ctx.globalAlpha=.75;ctx.fillText('Space or tap to try again',LW/2,110);ctx.globalAlpha=1}
 raf=requestAnimationFrame(frame)}
function onKey(e){if(!vis)return;const t=e.target&&e.target.tagName;if(/INPUT|TEXTAREA|BUTTON|A|SELECT/.test(t||''))return;
 if(e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW'){e.preventDefault();jump()}}
addEventListener('keydown',onKey);
cv.addEventListener('pointerdown',e=>{e.preventDefault();jump()});
new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!raf){last=performance.now();raf=requestAnimationFrame(frame)}},{threshold:.35}).observe(cv);
addEventListener('resize',()=>{size()});
size();seed();
})();
