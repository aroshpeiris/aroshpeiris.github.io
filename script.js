// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// Typing effect
const words=['Video Editor','Graphic Designer','Junior Marketer'],typed=document.getElementById('typed');
let w=0,c=0,del=false;
(function type(){const t=words[w];typed.textContent=t.slice(0,c);
 if(!del&&c<t.length){c++;setTimeout(type,90)}else if(!del){del=true;setTimeout(type,1400)}
 else if(c>0){c--;setTimeout(type,45)}else{del=false;w=(w+1)%words.length;setTimeout(type,300)}})();
// Counters
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
 const el=e.target,t=+el.dataset.target,s=Math.max(1,Math.ceil(t/50));let n=0;
 const id=setInterval(()=>{n=Math.min(n+s,t);el.textContent=n+'+';if(n>=t)clearInterval(id)},35);cio.unobserve(el)}),{threshold:.5});
document.querySelectorAll('.count').forEach(el=>cio.observe(el));
// Hide broken logos
document.querySelectorAll('.set img').forEach(i=>{const h=()=>i.style.display='none';if(i.complete&&!i.naturalWidth)h();i.addEventListener('error',h)});
// Image pop-up
const modal=document.getElementById('modal'),box=document.getElementById('modalBox');
const close=()=>{modal.classList.remove('open');box.innerHTML='';document.body.style.overflow=''};
document.querySelectorAll('[data-img]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();
 box.innerHTML='<img src="'+el.dataset.img+'" alt="Project">';modal.classList.add('open');document.body.style.overflow='hidden'}));
document.getElementById('modalClose').onclick=close;
modal.onclick=e=>{if(e.target===modal)close()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
// Filter tabs
const tabs=document.querySelectorAll('.filters button'),cards=document.querySelectorAll('.card');
tabs.forEach(b=>b.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));b.classList.add('active');
 cards.forEach(k=>k.classList.toggle('hide',!(b.dataset.filter==='all'||k.dataset.cat===b.dataset.filter)))}));
// Contact form
const form=document.getElementById('contactForm'),msg=document.getElementById('formMsg');
form.addEventListener('submit',async e=>{e.preventDefault();msg.className='';msg.textContent='Sending...';
 try{const r=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
  if(!r.ok)throw 0;msg.className='ok';msg.textContent='Thanks! Your message has been sent.';form.reset()}
 catch{msg.className='err';msg.textContent='Something went wrong. Please WhatsApp me instead.'}});
// Text animation (word by word)
function splitText(n,c){[...n.childNodes].forEach(k=>{
 if(k.nodeType===3){const f=document.createDocumentFragment();
  k.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim()){f.appendChild(document.createTextNode(t));return}
   const w=document.createElement('span');w.className='w';const i=document.createElement('i');i.textContent=t;
   i.style.setProperty('--i',Math.min(c.n++,18));w.appendChild(i);f.appendChild(w)});k.replaceWith(f)}
 else if(k.nodeType===1)splitText(k,c)})}
const tio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');tio.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.tx').forEach(el=>{splitText(el,{n:0});tio.observe(el)});
