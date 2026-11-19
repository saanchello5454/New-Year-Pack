/* ================================================
   New-Year-Pack — скрипты сайта
   ================================================ */
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* гирлянда */
document.querySelectorAll('.gar').forEach(g=>{ for(let i=0;i<40;i++) g.appendChild(document.createElement('span')); });

/* картинки-текстуры: если файла нет — остаётся клетчатый слот */
document.querySelectorAll('img.tex').forEach(img=>{
  img.addEventListener('error',()=>img.classList.add('missing'));
});

/* снег */
const snowCv=document.getElementById('snow'); let flakes=[];
function sizeSnow(){
  snowCv.width=innerWidth; snowCv.height=innerHeight;
  const n=Math.min(140, Math.round(innerWidth*innerHeight/14000));
  flakes=Array.from({length:n},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:1+Math.random()*2.4, v:.5+Math.random()*1.3, ph:Math.random()*6.28, a:.4+Math.random()*.5}));
}
function snowLoop(t){
  const ctx=snowCv.getContext('2d'); ctx.clearRect(0,0,snowCv.width,snowCv.height);
  ctx.fillStyle='#fff';
  for(const f of flakes){
    f.y+=f.v; f.x+=Math.sin(t*.001+f.ph)*.5;
    if(f.y>innerHeight+4){f.y=-4;f.x=Math.random()*innerWidth}
    ctx.globalAlpha=f.a; ctx.fillRect(f.x,f.y,f.r,f.r);
  }
  ctx.globalAlpha=1; requestAnimationFrame(snowLoop);
}
sizeSnow(); addEventListener('resize',sizeSnow);
if(!RM) requestAnimationFrame(snowLoop);

/* плавающее окно с инструкцией */
(function(){
  const modal=document.getElementById('helpModal');
  document.querySelectorAll('.help-open').forEach(b=>b.addEventListener('click',()=>modal.hidden=false));
  document.getElementById('helpClose').addEventListener('click',()=>modal.hidden=true);
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.hidden=true; });
  addEventListener('keydown',e=>{ if(e.key==='Escape') modal.hidden=true; });
})();

/* лайтбокс */
(function(){
  const shots=[...document.querySelectorAll('.shot img')];
  const lb=document.getElementById('lb'), img=document.getElementById('lbImg');
  let cur=0;
  function open(i){ cur=(i+shots.length)%shots.length; img.src=shots[cur].src; lb.hidden=false; }
  shots.forEach((s,i)=>s.closest('.shot').addEventListener('click',()=>open(i)));
  document.getElementById('lbX').onclick=()=>lb.hidden=true;
  document.getElementById('lbP').onclick=()=>open(cur-1);
  document.getElementById('lbN').onclick=()=>open(cur+1);
  lb.addEventListener('click',e=>{ if(e.target===lb) lb.hidden=true; });
  addEventListener('keydown',e=>{ if(lb.hidden)return;
    if(e.key==='Escape')lb.hidden=true; if(e.key==='ArrowRight')open(cur+1); if(e.key==='ArrowLeft')open(cur-1); });
})();

/* появление при скролле */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* год в футере */
document.getElementById('year').textContent=new Date().getFullYear();