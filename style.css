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
