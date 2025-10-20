# 灵感阁楼 · AI效率极客 × AIGC内容探索者

一个温暖而高效的数字据点，采用 Apple 式极简设计，融合叙事动效：
- 墨迹晕开式进入动效（滚动触达时触发）
- 清晰友好的交互反馈（悬停高亮、焦点可见、按钮磁吸）
- 可访问性优先（支持 prefers-reduced-motion、键盘导航）

## 结构
- index.html — 单页结构（Hero、工具奇遇、短视频幕后、真实案例、能量补给、关于）
- assets/css/style.css — 主题、排版、布局与动效样式
- assets/js/main.js — 进入动效（IntersectionObserver）与细节交互

## 本地预览
直接用浏览器打开 index.html 即可，或使用任意静态服务器：

- Python 3: `python3 -m http.server 8080`
- Node: `npx serve .`

## 自定义
- 调整主题：在 style.css 的 `:root` 中修改主题变量（色彩、圆角、阴影等）
- 控制动效：在 CSS 中调整 `inkSpread` 的时间曲线与半径；JS 中可调整触发阈值
- 降低动效：系统或浏览器设置为减少动效时（prefers-reduced-motion），将自动切换为静态展示

## 版权
© 灵感阁楼 · AI效率极客 & AIGC内容探索者
