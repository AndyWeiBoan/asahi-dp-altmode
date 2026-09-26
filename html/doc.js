/* 這份文件的導覽列與頁尾只有這一份定義。
   加一張圖、改一句描述，改這裡就好 —— 四份頁面會一起變。 */
var PAGES = [
  ['index.html',    '入口', '現在卡在哪、下一件事'],
  ['handbook.html', '動手', '指令・診斷・機制'],
  ['plan.html',     '方向', '目標・階梯・遠期'],
  ['appendix.html', '附錄', '名詞・連結・材料・日誌']
];
/* 圖不再是導覽列上的第二條清單 —— 每張都嵌在解釋它的那一節裡，
   這裡只留一個總覽入口。 */
var FIGS = [
  ['index.html#figs', '七張圖', '總覽（各自嵌在對應章節）']
];

(function(){
  var here = location.pathname.split('/').pop() || 'index.html';

  function list(items){
    return '<ul class="pg">' + items.map(function(it){
      var on = it[0] === here ? ' class="on"' : '';
      return '<li><a href="' + it[0] + '"' + on + '>' + it[1] +
             '<small>' + it[2] + '</small></a></li>';
    }).join('') + '</ul>';
  }

  var nav = document.getElementById('nav');
  if (nav) nav.innerHTML = '<h4>頁面</h4>' + list(PAGES) + '<h4>圖</h4>' + list(FIGS);

  var foot = document.getElementById('pagelinks');
  if (foot) foot.innerHTML = PAGES.map(function(p){
    return '<a href="' + p[0] + '">' + p[1] + '</a>';
  }).join(' · ') + ' · <a href="https://github.com/AndyWeiBoan/asahi-dp-altmode">GitHub</a>';
})();

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
