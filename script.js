// 1. Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 2. Typing effect (hero)
const words = ['Video Editor', 'Graphic Designer', 'Junior Marketer'];
const typed = document.getElementById('typed');
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) { c++; setTimeout(type, 90); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 45); }
  else { deleting = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
type();

// 3. Number counters
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const id = setInterval(() => {
      n += step;
      if (n >= target) { n = target; clearInterval(id); }
      el.textContent = n + '+';
    }, 35);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count').forEach(el => cio.observe(el));

// 4. Pop-up player (video / YouTube / image)
const modal = document.getElementById('modal');
const box = document.getElementById('modalBox');
function openModal(el) {
  const yt = el.dataset.yt, vid = el.dataset.video, img = el.dataset.img;
  if (yt) box.innerHTML = '<iframe src="https://www.youtube.com/embed/' + yt + '?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
  else if (vid) box.innerHTML = '<video src="' + vid + '" controls autoplay playsinline></video>';
  else if (img) box.innerHTML = '<img src="' + img + '" alt="Project">';
  else return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  box.innerHTML = '';              // video/audio nawathenawa
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-yt],[data-video],[data-img]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); openModal(el); });
});
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// 5. Project filter tabs
const tabs = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.card');
tabs.forEach(btn => btn.addEventListener('click', () => {
  tabs.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  cards.forEach(card => {
    const show = f === 'all' || card.dataset.cat === f;
    card.classList.toggle('hide', !show);
    if (show) { card.style.animation = 'none'; card.offsetHeight; card.style.animation = ''; }
  });
}));

// 6. Contact form (Formspree)
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', async e => {
  e.preventDefault();
  msg.className = ''; msg.textContent = 'Sending...';
  try {
    const res = await fetch(form.action, {
      method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
    });
    if (res.ok) { msg.className = 'ok'; msg.textContent = 'Thanks! Your message has been sent. I will reply soon.'; form.reset(); }
    else { throw new Error(); }
  } catch (err) {
    msg.className = 'err'; msg.textContent = 'Oops, something went wrong. Please WhatsApp me instead.';
  }
});
