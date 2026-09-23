# 讓 Studio Display 在 Asahi Linux 上亮起來

MacBook Pro 14" M1 Pro（t600x）+ Apple Studio Display，在 Fedora Asahi Remix 上點亮外接螢幕的計畫書。
表面上是修外接螢幕，實際目標是補上**硬體到 kernel 之間那段空白**。

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
| `spec/*.json` | 四張圖的原始碼（archify 規格），要改圖改這裡 |

圖支援深／淺色、縮放、搜尋與引導視角，建議全螢幕開啟。

## 追蹤中的兩個 bug

| | 卡在哪 | Issue |
|---|---|---|
| Bug 1 | Type-C PHY（`atcphy`），t600x 專屬 | [AsahiLinux/linux#601](https://github.com/AsahiLinux/linux/issues/601) |
| Bug 2 | DCP 交握（AP call 20），Studio Display 專屬 | [AsahiLinux/linux#579](https://github.com/AsahiLinux/linux/issues/579) |

## 說明

本文件在與 Claude 的對話中整理而成，內容為**公開資料的彙整與推論**，不含任何 m1n1 trace 的解讀。

Asahi Linux 的 [Generative AI Policy](https://asahilinux.org/llm-policy/) 禁止 AI 協助的實質貢獻，
其中明確點名「用 LLM 解讀 m1n1 hypervisor 的 trace」。
若要將成果貢獻上游，trace 的判讀與 driver 程式碼必須自行完成 —— 詳見計畫書 §6。
