/* shared.js — inlined at bottom of each page */
(function(){
  /* ── CURSOR ── */
  const dot = document.getElementById('cDot');
  const ring = document.getElementById('cRing');
  if(dot && ring){
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
    document.querySelectorAll('a,button,.testi-card,.activity-card,.photo-item,.impact-item,.video-wrap').forEach(el=>{
      el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));
      el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'));
    });
    (function anim(){
      rx+=(mx-rx)*.14; ry+=(my-ry)*.14;
      dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(anim);
    })();
    if('ontouchstart' in window) document.querySelector('.cursor').style.display='none';
  }

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('nav');
  if(nav) window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));

  /* ── HAMBURGER ── */
  const hbg = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  if(hbg && mob){
    hbg.addEventListener('click',()=>{
      const o = mob.classList.toggle('open');
      const s = hbg.querySelectorAll('span');
      if(o){s[0].style.transform='translateY(7px) rotate(45deg)';s[1].style.opacity='0';s[2].style.transform='translateY(-7px) rotate(-45deg)'}
      else s.forEach(x=>{x.style.transform='';x.style.opacity=''});
    });
  }

  /* ── SCROLL REVEAL ── */
  const revEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
  const ro = new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target)}});
  },{threshold:.1});
  revEls.forEach(el=>ro.observe(el));

  /* ── COUNT-UP ── */
  function countUp(el){
    const t=parseInt(el.dataset.target)||0;
    const sfx=el.dataset.suffix||'+';
    const dur=1800,step=t/(dur/16);
    let v=0;
    const ti=setInterval(()=>{
      v+=step;
      if(v>=t){el.textContent=t+sfx;clearInterval(ti)}
      else el.textContent=Math.floor(v)+sfx;
    },16);
  }
  const impactEl = document.querySelector('.impact-strip');
  if(impactEl){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.querySelectorAll('.impact-num').forEach(countUp);
          io.unobserve(e.target);
        }
      });
    },{threshold:.3});
    io.observe(impactEl);
  }

  /* ── VIDEO PLAY ── */
  document.querySelectorAll('.video-wrap[data-src]').forEach(wrap=>{
    wrap.addEventListener('click',()=>{
      const src=wrap.dataset.src;
      const iframe=document.createElement('iframe');
      iframe.src=src+'?autoplay=1';
      iframe.allow='autoplay;fullscreen';
      iframe.allowFullscreen=true;
      wrap.innerHTML='';
      wrap.appendChild(iframe);
    });
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
    });
  });

  /* ── HERO BG PARALLAX ── */
  const heroBg=document.querySelector('.page-hero-bg');
  if(heroBg){
    window.addEventListener('scroll',()=>{
      heroBg.style.transform=`translateY(${scrollY*.25}px)`;
    });
  }
})();
