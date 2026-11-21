(function(){
  // mobile nav
  var t=document.querySelector('.nav-toggle'),l=document.getElementById('nav-links');
  t.addEventListener('click',function(){var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o)});
  l.addEventListener('click',function(e){if(e.target.tagName==='A'){l.classList.remove('open');t.setAttribute('aria-expanded','false')}});

  // calculator
  var h=document.getElementById('c-hours'),r=document.getElementById('c-rate'),s=document.getElementById('c-share');
  var fmt=function(n){return '£'+Math.round(n).toLocaleString('en-GB')};
  function calc(){
    var hours=+h.value,rate=+r.value,share=+s.value/100,saved=hours*share,year=saved*rate*52,weekly=saved*rate;
    document.getElementById('o-hours').textContent=hours;
    document.getElementById('o-rate').textContent='£'+rate;
    document.getElementById('o-share').textContent=Math.round(share*100)+'%';
    document.getElementById('r-week').textContent=saved.toFixed(1)+' hrs';
    document.getElementById('r-year').textContent=fmt(year);
    var wk=Math.max(1,Math.ceil(299/weekly));
    document.getElementById('r-pay').textContent=wk+(wk===1?' week':' weeks');
  }
  [h,r,s].forEach(function(i){i.addEventListener('input',calc)});calc();

  // pricing tabs (WAI-ARIA tabs pattern)
  var tabs=[].slice.call(document.querySelectorAll('[role=tab]'));
  function select(tab){tabs.forEach(function(x){var on=x===tab;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on});tab.focus()}
  tabs.forEach(function(tab,i){
    tab.addEventListener('click',function(){select(tab)});
    tab.addEventListener('keydown',function(e){if(e.key==='ArrowRight')select(tabs[(i+1)%tabs.length]);if(e.key==='ArrowLeft')select(tabs[(i-1+tabs.length)%tabs.length])});
  });

  // Calendly: load on demand (faster page, no third-party cookies until asked)
  document.getElementById('load-cal').addEventListener('click',function(){
    var slot=document.getElementById('calendly-slot');
    slot.classList.add('loaded');
    slot.innerHTML='<div class="calendly-inline-widget" data-url="https://calendly.com/thegingerbtc/free-audit?hide_gdpr_banner=1&background_color=ffffff&text_color=111112&primary_color=0b7a55"></div>';
    var sc=document.createElement('script');sc.src='https://assets.calendly.com/assets/external/widget.js';sc.async=true;document.body.appendChild(sc);
  });
  window.addEventListener('message',function(e){
    if(e.origin==='https://calendly.com'&&e.data&&e.data.event==='calendly.event_scheduled'&&typeof gtag==='function'){gtag('event','book_audit',{event_category:'lead'})}
  });

  // checklist: direct PDF download (email signup paused until the n8n workflow exists)
  var dl=document.getElementById('cl-download');
  if(dl)dl.addEventListener('click',function(){if(typeof gtag==='function')gtag('event','checklist_download',{event_category:'lead'})});

  // consent banner
  var c=document.getElementById('fs-consent'),saved=null;
  try{saved=localStorage.getItem('fs_consent')}catch(e){}
  if(!saved)c.hidden=false;
  function choose(v){try{localStorage.setItem('fs_consent',v)}catch(e){}if(v==='granted'&&typeof gtag==='function')gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});c.hidden=true}
  document.getElementById('fs-accept').addEventListener('click',function(){choose('granted')});
  document.getElementById('fs-decline').addEventListener('click',function(){choose('denied')});
})();
