/* script v3 */
/* NAV hamburger */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger && hamburger.addEventListener('click', ()=> {
  navLinks.classList.toggle('open');
});

/* Dark mode toggle (persist) */
(function(){
  const body = document.documentElement;
  const saved = localStorage.getItem('sw_theme');
  if(saved === 'dark') body.classList.add('dark-mode');
})();

/* Simple autoplay testimonials */
(function(){
  const wrap = document.getElementById('testiSlider');
  if(!wrap) return;
  const slides = wrap.querySelector('.slides');
  const total = slides.children.length;
  let idx = 0;
  setInterval(()=>{ idx = (idx+1)%total; slides.style.transform = `translateX(-${idx*100}%)`; }, 4500);
})();

/* Slide navs (prev/next) */
document.querySelectorAll('.slide-nav').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const wrap = document.getElementById(btn.dataset.target);
    if(!wrap) return;
    const slides = wrap.querySelector('.slides');
    const children = slides.children.length;
    // compute current index from transform
    const style = getComputedStyle(slides).transform;
    const matrix = style === 'none' ? [1,0,0,1,0,0] : style.match(/matrix.*\((.+)\)/)[1].split(', ');
    const translateX = Math.abs(parseFloat(matrix[4] || 0));
    const width = wrap.clientWidth || 1;
    let current = Math.round(translateX / width);
    current = isNaN(current) ? 0 : current;
    let nextIndex = btn.classList.contains('next') ? Math.min(children-1, current+1) : Math.max(0, current-1);
    slides.style.transform = `translateX(-${nextIndex*100}%)`;
  });
});

/* Reel parallax speed by data-speed (slower on scroll) */
(function(){
  const reels = document.querySelectorAll('.reel');
  function setSpeeds(){
    reels.forEach(r => {
      const speed = parseFloat(r.dataset.speed) || 1.8;
      r.querySelector('.reel-strip').style.animationDuration = (2 / speed) + 's';
    });
  }
  setSpeeds();
})();

/* Custom cursor fallback (if CSS cursor not supported) */
(function(){
  const el = document.getElementById('custom-cursor');
  if(!el) return;
  el.style.position = 'fixed';
  el.style.width = '36px';
  el.style.height = '36px';
  el.style.backgroundImage = "url('images/cursor.png')";
  el.style.backgroundSize = 'contain';
  el.style.pointerEvents = 'none';
  el.style.zIndex = 9999;
  el.style.display = 'none';
  // show only if default cursor used (some browsers ignore custom cursor)
  document.addEventListener('mousemove', e => {
    el.style.left = (e.clientX + 8) + 'px'; el.style.top = (e.clientY + 8) + 'px';
    el.style.display = 'block';
  });
})();

/* Contact form placeholder (Formspree) */
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', e => {
    // default Formspree works by HTML action; we just show a friendly message
    setTimeout(()=> alert('Thanks — message sent!'), 300);
  });
})();

/* Auto YouTube feed attempt:
   - First try to load feed by username/handle via simple RSS proxy (YouTube RSS)
   - If not available, show a fallback embed (your last known video)
*/
(function(){
  const channelHandle = 'slotwhisperer222'; // fallback from provided handle
  const ytGrid = document.getElementById('vlogGrid');
  if(!ytGrid) return;

  // Helper to create a simple video card (fallback uses static video id)
  function appendFallback(videoId, title, duration){
    const card = document.createElement('article');
    card.className = 'vlog-card';
    card.innerHTML = `
      <figure>
        <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${title}">
        <div class="play-overlay">▶</div>
      </figure>
      <div class="vlog-meta"><time>${duration||'--:--'}</time><span>Latest</span></div>
      <h3>${title}</h3>
    `;
    ytGrid.appendChild(card);
  }

  // Try RSS feed (this may be blocked by CORS when called directly from browser).
  // We attempt; if it fails, use fallback video ID you shared.
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?user=${channelHandle}`;
  fetch(rssUrl).then(r => {
    if(!r.ok) throw new Error('no rss');
    return r.text();
  }).then(txt => {
    // parse minimal XML for <entry> items
    const parser = new DOMParser();
    const doc = parser.parseFromString(txt, 'application/xml');
    const entries = doc.querySelectorAll('entry');
    if(!entries.length) throw new Error('no entries');
    ytGrid.innerHTML = ''; // wipe static cards
    let count = 0;
    entries.forEach(e => {
      if(count++ >= 6) return;
      const vid = e.querySelector('yt\\:videoId')?.textContent || '';
      const title = e.querySelector('title')?.textContent || 'Video';
      appendFallback(vid, title);
    });
  }).catch(err => {
    // fallback: your last known video id
    ytGrid.innerHTML = '';
    appendFallback('AaZK5l-dY4E', 'Latest: Watch on YouTube', '—:—');
  });
})();
