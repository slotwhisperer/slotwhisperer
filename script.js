// Simple sliders for video/bonus/testimonials
function Slider(id){
  this.el = document.getElementById(id);
  if(!this.el) return;
  this.slides = this.el.querySelector('.slides');
  this.index = 0;
  this.total = this.slides.children.length;
  this.nextBtn = this.el.querySelector('.next');
  this.prevBtn = this.el.querySelector('.prev');
  this.update = function(){ this.slides.style.transform = `translateX(-${this.index * 100}%)`; };
  this.next = () => { this.index = (this.index+1)%this.total; this.update(); };
  this.prev = () => { this.index = (this.index-1+this.total)%this.total; this.update(); };
  if(this.nextBtn) this.nextBtn.addEventListener('click', this.next);
  if(this.prevBtn) this.prevBtn.addEventListener('click', this.prev);
}
document.addEventListener('DOMContentLoaded', () => {
  new Slider('videoSlider');
  new Slider('bonusSlider');
  new Slider('testiSlider');

  // Dark mode toggle
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('sw_theme');
  if(saved === 'dark') root.classList.add('dark-mode');
  themeToggle && themeToggle.addEventListener('click', () => {
    root.classList.toggle('dark-mode');
    localStorage.setItem('sw_theme', root.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Optional: Replace all placeholder links with affiliate/real links dynamically (if you want)
  // document.querySelectorAll('.bonus-cta').forEach((a,i)=> a.href = 'YOUR_AFF_LINK_'+(i+1));

  // Simple cursor fallback: change body cursor if custom cursor not found
  const img = new Image();
  img.src = 'images/cursor.png';
  img.onload = () => { document.body.style.cursor = `url('${img.src}'), auto`; };
  img.onerror = () => { /* keep default cursor */ };
});
