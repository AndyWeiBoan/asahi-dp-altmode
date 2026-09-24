(function(){
  var r=document.documentElement, b=document.getElementById('tt'), saved=null;
  try{ saved=localStorage.getItem('theme'); }catch(e){}
  function set(t){
    r.setAttribute('data-theme',t);
    b.textContent = t==='dark' ? '淺色' : '深色';
    try{ localStorage.setItem('theme',t); }catch(e){}
  }
  set(saved==='dark'||saved==='light'||saved==='auto' ? saved : 'light');
  b.addEventListener('click',function(){
    set(r.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
  });
})();
(function(){
  var links=[].slice.call(document.querySelectorAll('#toclist a'));
  var secs=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1));});
  function spy(){
    var best=0;
    for(var i=0;i<secs.length;i++){ if(secs[i] && secs[i].getBoundingClientRect().top<=120) best=i; }
    links.forEach(function(a,i){ a.classList.toggle('on', i===best); });
  }
  window.addEventListener('scroll',spy,{passive:true}); spy();
})();
