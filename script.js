/* ---------- Helpers ---------- */
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ---------- Dark mode (persist) ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const saved = localStorage.getItem('sw_theme');
if(saved === 'dark') root.classList.add('dark-mode');
if(themeToggle) themeToggle.addEventListener('click', () => {
  root.classList.toggle('dark-mode');
  localStorage.setItem('sw_theme', root.classList.contains('dark-mode') ? 'dark' : 'light');
});

/* ---------- Slider class (generic) ---------- */
function SimpleSlider(id){
  const wrap = document.getElementById(id);
  if(!wrap) return;
  const slides = wrap.querySelector('.slides');
  const next = wrap.querySelector('.next');
  const prev = wrap.querySelector('.prev');
  let idx = 0;
  const total = slides.children.length;
  function update(){ slides.style.transform = `translateX(-${idx * 100}%)`; }
  next && next.addEventListener('click', ()=>{ idx = (idx+1)%total; update(); });
  prev && prev.addEventListener('click', ()=>{ idx = (idx-1+total)%total; update(); });
}
document.addEventListener('DOMContentLoaded', ()=> {
  new SimpleSlider('testiSlider');
});

/* ---------- Testimonials slider (autoplay) ---------- */
(function(){
  const wrap = document.getElementById('testiSlider');
  if(!wrap) return;
  const slides = wrap.querySelector('.slides');
  let idx = 0;
  const total = slides.children.length;
  setInterval(()=>{ idx = (idx+1)%total; slides.style.transform = `translateX(-${idx * 100}%)`; }, 4500);
})();

/* ---------- Auto YouTube feed (username/handle fallback) ---------- */
(function(){
  const channelUrl = "https://youtube.com/@slotwhisperer222";
  const feedContainer = document.getElementById('ytFeed');

  // Try user uploads via embed playlist (works for most handles)
  function buildEmbedForHandle(handle){
    const username = handle.replace(/.*\/@?/, '').replace(/\?.*$/,'');
    // try with @ and without
    const urls = [
      `https://www.youtube.com/embed?listType=user_uploads&list=${username}`,
      `https://www.youtube.com/embed?listType=playlist&list=UU${username.replace(/^UC/,'')}`
    ];
    // create first card as big player
    feedContainer.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'yt-card';
    card.innerHTML = `<iframe src="${urls[0]}" frameborder="0" allowfullscreen></iframe>`;
    feedContainer.appendChild(card);
    // NOTE: If this doesn't show the desired feed, you can replace with a playlist ID or channel ID embed.
  }

  try {
    buildEmbedForHandle(channelUrl);
  } catch(e){
    feedContainer.innerHTML = '<div class="yt-placeholder">Unable to load feed. Replace with playlist embed.</div>';
  }
})();

/* ---------- Cursor fallback (if CSS cursor not used) ---------- */
(function(){
  const cursorEl = document.getElementById('custom-cursor');
  if(!cursorEl) return;
  cursorEl.style.position = 'fixed';
  cursorEl.style.width = '36px';
  cursorEl.style.height = '36px';
  cursorEl.style.backgroundImage = "url('images/cursor.png')";
  cursorEl.style.backgroundSize = 'contain';
  cursorEl.style.pointerEvents = 'none';
  cursorEl.style.zIndex = 9999;
  document.addEventListener('mousemove', e => {
    cursorEl.style.left = (e.clientX + 8) + 'px';
    cursorEl.style.top = (e.clientY + 8) + 'px';
  });
})();

/* ---------- Contact form (Formspree example) ----------
  To use: create a free form on https://formspree.io/ and replace FORM_ENDPOINT below
*/
const FORM_ENDPOINT = "https://formspree.io/f/your-form-id"; // <-- replace with your Formspree endpoint
(function(){
  const form = document.querySelector('form[data-form="contact"]');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    fetch(FORM_ENDPOINT, { method:'POST', body: data, headers:{ 'Accept':'application/json' } })
      .then(r => r.ok ? alert('Thanks — message sent!') : alert('Sorry — sending failed.'))
      .catch(()=>alert('Network error'));
    form.reset();
  });
})();
