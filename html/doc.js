/* 這份文件的導覽列與頁尾只有這一份定義。
   加一張圖、改一句描述，改這裡就好 —— 四份頁面會一起變。 */
var PAGES = [
  ['index.html',    '入口', '現況與下一步'],
  ['handbook.html', '手冊', '速查・步驟・診斷・機制'],
  ['journal.html',  '日誌', '每次動手記一筆'],
  ['plan.html',     '計畫', '目標・階梯・遠期']
];
var FIGS = [
  ['01-stack.html',   '圖 1 · 技術堆疊',  '兩個斷點卡在哪一層'],
  ['02-ladder.html',  '圖 2 · 學習階梯',  '六個階段與遠中近目標'],
  ['03-m1n1.html',    '圖 3 · 角色分配',  '哪台 target、哪台 host'],
  ['04-phases.html',  '圖 4 · 兩個階段',  'Python 找答案，C 寫進 kernel'],
  ['05-boot.html',    '圖 5 · 開機鏈',    'iBoot → m1n1 → U-Boot → GRUB'],
  ['06-sides.html',   '圖 6 · Mac vs 螢幕','哪些東西在哪一邊'],
  ['07-hotplug.html', '圖 7 · 插拔事件',  'HPD、IRQ、kernel 與 mux']
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
