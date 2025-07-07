# 五子棋遊戲 (Gomoku Game)

一個基於 FastAPI 後端和 HTML5/JavaScript 前端的五子棋遊戲。

## 系統架構

- **後端**: Python FastAPI + Uvicorn
- **前端**: HTML5 + CSS3 + JavaScript (原生)
- **通信**: REST API (JSON)
- **部署**: 前後端分離架構

## 功能特色

- 15x15 標準五子棋棋盤
- 本地雙人對戰
- 實時勝負判斷
- 響應式設計
- 遊戲狀態管理
- 重新開始功能

## 安裝與運行

### 後端設置

1. 安裝依賴:
```bash
cd backend
pip install -r requirements.txt
```

2. 運行服務器:
```bash
python main.py
```

服務器將在 `http://localhost:8000` 啟動。

### 前端訪問

打開瀏覽器訪問 `http://localhost:8000` 即可開始遊戲。

## API 文檔

### 遊戲相關 API

- `POST /api/game/start` - 開始新遊戲
- `GET /api/game/{game_id}` - 獲取遊戲狀態
- `POST /api/game/{game_id}/move` - 落子
- `POST /api/game/{game_id}/reset` - 重置遊戲

### 數據模型

```json
{
  "game_id": "string",
  "board": "array[15][15]",
  "current_player": "integer",
  "game_status": "string",
  "winner": "integer",
  "move_count": "integer"
}
```

## 遊戲規則

1. 黑子先手，白子後手
2. 輪流在棋盤交叉點放置棋子
3. 率先在橫、直、斜任意方向連成五子者獲勝
4. 棋盤下滿無勝負為平局

## 技術實現

### 後端組件

- **Game Manager**: 遊戲實例管理
- **Board Manager**: 棋盤狀態管理
- **Win Checker**: 勝負判斷算法
- **Game Rules**: 遊戲規則引擎
- **API Controller**: REST API 端點

### 前端組件

- **Board Renderer**: HTML5 Canvas 棋盤渲染
- **Input Handler**: 用戶輸入處理
- **API Client**: 後端通信封裝
- **Game State Manager**: 前端狀態管理
- **Game UI**: 用戶界面控制

## 開發說明

### 項目結構

```
src/
├── backend/
│   ├── game_engine/     # 遊戲邏輯引擎
│   ├── game_api/        # API 服務層
│   ├── models/          # 數據模型
│   └── main.py          # 應用入口
└── frontend/
    ├── js/              # JavaScript 組件
    ├── css/             # 樣式文件
    └── index.html       # 主頁面
```

### 擴展功能

如需添加新功能，建議按以下順序進行：

1. 在 `game_engine` 中實現遊戲邏輯
2. 在 `models` 中定義數據模型
3. 在 `game_api` 中添加 API 端點
4. 在前端 JavaScript 中實現界面邏輯
5. 更新 CSS 樣式

## 瀏覽器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 注意事項

- 遊戲狀態存儲在內存中，服務器重啟後會丟失
- 適合本地開發和測試環境
- 生產環境建議使用持久化存儲