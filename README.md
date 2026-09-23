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

| 檔案 | 內容 |
|---|---|
| `html/index.html` | 計畫書本體（11 節，含名詞表：大方向、遠中近目標、完整步驟、材料清單⋯⋯） |
| `html/01-stack.html` | 圖 1 · 技術堆疊 —— 訊號經過哪些層，兩個 bug 卡在哪 |
| `html/02-ladder.html` | 圖 2 · 學習階梯 —— 六個階段與近／中／遠程目標 |
| `html/03-m1n1.html` | 圖 3 · 角色分配 —— 哪台是 target、哪台是 host |
| `html/04-phases.html` | 圖 4 · 兩個階段 —— Python 找答案，C 寫進 kernel |
| `html/05-boot.html` | 圖 5 · 開機鏈 —— iBoot → m1n1 → U-Boot → GRUB → Linux |
| `html/06-sides.html` | 圖 6 · Mac vs 螢幕 —— 兩邊各有一顆 Apple 處理器，各自管什麼 |
| `spec/*.json` | 六張圖的原始碼（archify 規格），要改圖改這裡 |

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

階段 0（build fairydust）是唯一的入口，所有跟螢幕有關的測試都建立在它之上。
Fedora Asahi Remix 可以直接用 [bharambetejas/asahi-fairydust-display](https://github.com/bharambetejas/asahi-fairydust-display)
的一鍵腳本（支援表把 MacBook Pro M1 Pro 標成 Tested by community，需 15GB 空間、60～90 分鐘）。
細節見計畫書 §3 階段 0 與 §9。

## 重新產生圖

六張圖由 [archify](https://github.com/tt-a1i/archify)（MIT）從 `spec/*.json` 產生。

```bash
npx skills add tt-a1i/archify -g          # 安裝到 ~/.claude/skills/archify

node ~/.claude/skills/archify/bin/archify.mjs \
  deliver architecture spec/stack.architecture.json html/01-stack.html --quality showcase
```

對應關係：`stack`→`01-stack`、`ladder`→`02-ladder`、`m1n1`→`03-m1n1`、
`phases`→`04-phases`、`boot`→`05-boot`、`sides`→`06-sides`；
`.architecture.json` 用 `architecture`，`.workflow.json` 用 `workflow`。
六張圖目前都通過 `validate --quality showcase` 的 9/9 檢查。

## 說明

本文件在與 Claude 的對話中整理而成，內容為**公開資料的彙整與推論**，不含任何 m1n1 trace 的解讀。

Asahi Linux 的 [Generative AI Policy](https://asahilinux.org/llm-policy/) 禁止 AI 協助的實質貢獻，
其中明確點名「用 LLM 解讀 m1n1 hypervisor 的 trace」。
若要將成果貢獻上游，trace 的判讀與 driver 程式碼必須自行完成 —— 詳見計畫書 §6。
