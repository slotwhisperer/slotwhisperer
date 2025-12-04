/* NAV hamburger */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger && hamburger.addEventListener('click', ()=> {
  navLinks.classList.toggle('open');
});

/* testimonials slider */
(function(){
  const wrap = document.getElementById('testiSlider');
  if(!wrap) return;
  const slides = wrap.querySelector('.slides');
  const total = slides.children.length;
  let idx = 0;
  function show(i){ slides.style.transform = `translateX(-${i*100}%)`; }
  setInterval(()=> { idx = (idx+1)%total; show(idx); }, 4500);
})();

/* slide navs (prev/next) */
document.querySelectorAll('.slide-nav').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = document.getElementById(btn.dataset.target);
    const slides = target.querySelector('.slides');
    const children = slides.children.length;
    const current = Math.round(Math.abs(parseFloat(getComputedStyle(slides).transform.split(',')[4] || 0)) / target.clientWidth);
    const idx = btn.classList.contains('next') ? current+1 : current-1;
    slides.style.transform = `translateX(-${Math.max(0, Math.min(children-1, idx))*100}%)`;
  })
});

/* simple YouTube embed fallback: load single video preview card */
(function(){
  const ytGrid = document.getElementById('ytFeed') || document.getElementById('watch');
  // NOTE: pages use static vlog grid; advanced auto-feed requires API or RSS parsing service
})();

/* optional: contact form handler if using Formspree - leave placeholder in script.js above */
