/* 這份文件的導覽列與頁尾只有這一份定義。
   加一張圖、改一句描述，改這裡就好 —— 四份頁面會一起變。 */
/* [檔案, 名稱, 一句話, 什麼時候開] */
var PAGES = [
  ['index.html',    '入口', '現在卡在哪、下一件事',   '每次打開'],
  ['handbook.html', '動手', '速查、指令、診斷、機制', '手放在鍵盤上時'],
  ['plan.html',     '方向', '目標、階梯、遠期、規矩', '一個月一次'],
  ['appendix.html', '附錄', '名詞、連結、材料、日誌', '查東西時']
];
/* 圖不是導覽列上的第二條清單 —— 每張都嵌在解釋它的那一節裡。
   [檔案, 名稱, 一句話, 住在哪] */
var FIGS = [
  ['01-stack.html',   '圖 1 · 技術堆疊',   '訊號經過哪些層，兩個斷點卡在哪一層', '方向 §1'],
  ['06-sides.html',   '圖 6 · Mac vs 螢幕', 'DCP 在 Mac 裡、A13 在螢幕裡',        '方向 §1'],
  ['02-ladder.html',  '圖 2 · 學習階梯',   '六個階段與近／中／遠程目標的分界',   '方向 §3'],
  ['04-phases.html',  '圖 4 · 兩個階段',   'Python 找答案，C 寫進 kernel',       '方向 §4'],
  ['03-m1n1.html',    '圖 3 · 角色分配',   '哪台 target、哪台 host，螢幕插哪',   '方向 §5'],
  ['07-hotplug.html', '圖 7 · 插拔事件',   '從 HPD 到 CD321x IRQ、kernel 與 mux','動手 §4'],
  ['05-boot.html',    '圖 5 · 開機鏈',     'iBoot → m1n1 → U-Boot → GRUB → Linux','動手 §5']
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
  if (nav) nav.innerHTML = '<h4>頁面</h4>' + list(PAGES) +
    '<h4>圖</h4><ul class="pg"><li><a href="index.html#figs">七張圖' +
    '<small>總覽（各自嵌在對應章節）</small></a></li></ul>';

  /* 入口頁：三張去哪的卡片，同樣出自 PAGES */
  var cards = document.getElementById('pagecards');
  if (cards) cards.innerHTML = PAGES.filter(function(p){ return p[0] !== here; })
    .map(function(p){
      return '<a href="' + p[0] + '"><b>' + p[1] + '</b><span>' + p[2] +
             '</span><em>' + p[3] + '</em></a>';
    }).join('');

  /* 入口頁：圖索引，同樣出自 FIGS */
  var figs = document.getElementById('figlist');
  if (figs) figs.innerHTML = FIGS.map(function(f){
    return '<li><a href="' + f[0] + '"><b>' + f[1] + '</b><span>' + f[2] +
           '</span></a><em>' + f[3] + '</em></li>';
  }).join('');

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
