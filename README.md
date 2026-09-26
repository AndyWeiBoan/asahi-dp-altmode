# 讓 Studio Display 在 Asahi Linux 上亮起來

MacBook Pro 14" M1 Pro（t600x）+ Apple Studio Display，在 Fedora Asahi Remix 上點亮外接螢幕的計畫書。
表面上是修外接螢幕，實際目標是補上**硬體到 kernel 之間那段空白**。

> **2026-09-23 修訂。** 原本的計畫把 #601 當成「t600x 專屬的 atcphy bug」，
> 整條路線建立在「先解 Bug 1 才看得到 Bug 2」之上。查證 GitHub 現況後這個前提已不成立 ——
> #601 已結案、fairydust 的 t600x device tree 早就開好了。計畫書已依此改寫。

## 線上瀏覽

啟用 GitHub Pages 後，開 https://andyweiboan.github.io/asahi-dp-altmode/

本機直接開 `html/index.html` 也可以。

## 內容

文字分四份，依「多久會看一次」拆開：

| 檔案 | 內容 | 什麼時候看 |
|---|---|---|
| `html/index.html` | **入口** —— 現在的狀態、下一步、導航 | 每次打開 |
| `html/handbook.html` | **手冊** —— 速查、照著做的步驟、卡住時的診斷順序、機制（插拔／開機鏈／#622）、名詞表、連結索引 | 卡住時查 |
| `html/journal.html` | **日誌** —— 每次動手記一筆 | 寫的時候，偶爾回頭找線索 |
| `html/plan.html` | **計畫** —— 大方向、兩個斷點、六階段學習階梯、m1n1 雙機 trace、材料清單、規矩 | 一個月一次 |

七張圖：

| 檔案 | 內容 |
|---|---|
| `html/01-stack.html` | 圖 1 · 技術堆疊 —— 訊號經過哪些層，兩個斷點卡在哪 |
| `html/02-ladder.html` | 圖 2 · 學習階梯 —— 六個階段與近／中／遠程目標 |
| `html/03-m1n1.html` | 圖 3 · 角色分配 —— 哪台是 target、哪台是 host |
| `html/04-phases.html` | 圖 4 · 兩個階段 —— Python 找答案，C 寫進 kernel |
| `html/05-boot.html` | 圖 5 · 開機鏈 —— iBoot → m1n1 → U-Boot → GRUB → Linux |
| `html/06-sides.html` | 圖 6 · Mac vs 螢幕 —— 兩邊各有一顆 Apple 處理器，各自管什麼 |
| `html/07-hotplug.html` | 圖 7 · 插拔事件 —— HPD、IRQ、kernel 狀態與 mux |
| `spec/*.json` | 七張圖的原始碼（archify 規格），要改圖改這裡 |

四份文字頁共用 `html/doc.css` 和 `html/doc.js`；七張圖是 archify 產生的自足檔案，不吃那兩個。

導覽列與頁尾的連結由 `html/doc.js` 最上面的 `PAGES` / `FIGS` 兩個陣列產生 ——
**加一張圖或改一句描述改那裡就好**，四份頁面會一起變。

圖支援深／淺色、縮放、搜尋與引導視角，建議全螢幕開啟。

## 兩個斷點（狀態為 2026-09-23 查證）

| | 卡在哪 | Issue | 狀態 |
|---|---|---|---|
| 斷點 1 | Type-C PHY（`atcphy`） | [#601](https://github.com/AsahiLinux/linux/issues/601) | ✅ **closed（2026-09-07）** —— 不是 bug，是 stable kernel 沒有 DP alt mode 這條路。同型機（`MacBookPro18,3`）換到 fairydust 後 USB-C 螢幕點亮 |
| 斷點 2 | DCP 交握（AP call 20），Studio Display 專屬 | [#579](https://github.com/AsahiLinux/linux/issues/579) | ⬜ **open，4 則討論** —— 在 t8112 與 t6001 上都重現過，問題在螢幕那一側 |

**目前投入產出比最高的一件事**：Asahi 開發者 chadmed 在 #579 要求用「full-spec 非 Thunderbolt 的
USB-C 線」重測，原回報者手上沒有那種線，至今沒人做。買一條線就能回答 ——
但測試本身要先有 fairydust kernel（stable kernel 上連 `DP-1` 都不會出現）。

## 從哪裡開始

階段 0（build fairydust）是唯一的入口，所有跟螢幕有關的測試都建立在它之上 ——
stable kernel 上連 `DP-1` 這個 connector 都不會出現。

Fedora Asahi Remix 可以直接用 [bharambetejas/asahi-fairydust-display](https://github.com/bharambetejas/asahi-fairydust-display)
的一鍵腳本（支援表把 MacBook Pro M1 Pro 標成 Tested by community，需 15GB 空間、60～90 分鐘）。
原始碼從上游 clone，`.config` 從你本機的 `/boot/config-$(uname -r)` 起手。

> ⚠️ **裝完之後每次官方 kernel 更新都要檢查 `/boot/dtb`。**
> Fedora 的 `10-devicetree.install` 只認 `/boot/dtb-*`，而 `make dtbs_install`
> 裝到 `/boot/dtbs/<版本>`，所以每次 kernel update 都會把 symlink 搶回官方 DTB
> 並重刷 m1n1 —— fairydust kernel 會帶著官方 DTB 開機，外接螢幕安靜地不再亮。
> 修法：`sudo ln -sfn /boot/dtbs/<fairydust版本> /boot/dtb && sudo update-m1n1`。

細節見**手冊 §2 照著做**；為什麼要做這一步見**計畫 §3**。

## 實測紀錄

**2026-09-24**：在 `MacBookPro18,3` + `7.1.13-fairydust+` 上跑完第一輪。冷插正常；
熱插拔畫面回不來，但套上 [#622](https://github.com/AsahiLinux/linux/pull/622) 之後不再卡住整台電腦
（`flip_done timed out` 從 2 次變 0 次、`atcphy_mux_set` WARNING 消失）。
剩下的卡點在合成器：`Cannot commit when a page-flip is awaiting`。

完整過程與判斷記在 **日誌**；#622 兩塊改動的白話解釋、診斷工具對照表、那幾個坑
整理在 **手冊**。

## 重新產生圖

七張圖由 [archify](https://github.com/tt-a1i/archify)（MIT）從 `spec/*.json` 產生。

```bash
npx skills add tt-a1i/archify -g          # 安裝到 ~/.claude/skills/archify

node ~/.claude/skills/archify/bin/archify.mjs \
  deliver architecture spec/stack.architecture.json html/01-stack.html --quality showcase
```

對應關係：`stack`→`01-stack`、`ladder`→`02-ladder`、`m1n1`→`03-m1n1`、
`phases`→`04-phases`、`boot`→`05-boot`、`sides`→`06-sides`、`hotplug`→`07-hotplug`；
`.architecture.json` 用 `architecture`，`.workflow.json` 用 `workflow`。
七張圖目前都通過 `validate --quality showcase` 的 9/9 檢查。

## 說明

本文件在與 Claude 的對話中整理而成，內容為**公開資料的彙整與推論**，不含任何 m1n1 trace 的解讀。

**這個專案不打算貢獻到 Asahi 上游**，目標是把自己這台機器修好、順便把「硬體到 kernel
之間那段空白」補起來。所以 [Generative AI Policy](https://asahilinux.org/llm-policy/)
對這裡不構成限制。

仍然守的一條線：**不把 m1n1 hypervisor 的 trace 內容貼進 LLM**。那是政策點名過的用法，
而且是單向門 —— 哪天改變主意要送 PR，那份成果就得重新獨立產出。詳見計畫 §6。
