# Oracle · 银粉祈愿笺

基于 https://github.com/oana011103-byte/oracle 的页面改版。本地保留现有 API、六爻与塔罗、今日启示、中英文切换、七日星座和图片导出。

## 预览

使用 Node.js 22 或以上版本，运行 `npm run dev`，访问 http://localhost:4173 。

**本地默认使用离线牌义解读，不需要密钥、充值或联网调用 AI。** 四种抽牌/起卦流程、结果页、历史和图片导出都可以预览。解读依据仓库预置的牌义与卦义组合，不分析具体问题；结果与导出图会标注“本地牌义”。

原 AI 接口 `api/read.js` 保持不变。后续开发者需要测试 AI 时，运行 `npm ci`，在 `.env.local` 设置 `ORACLE_READING_MODE=ai` 和 `ANTHROPIC_API_KEY=自己的密钥`，再重启 `npm run dev`。只有显式选择 `ai` 模式才会调用该接口；离线模式不导入 AI SDK。接回正式 AI 服务时，仍需部署原有服务端 API。

见 `HANDOFF.md` 获取交接边界与已知缺图说明。

## 修改位置

- `public/rose.css`：灰粉主题与动效。
- `public/responsive.css`：首页构图、手机、平板、电脑、横屏与安全区适配。
- `public/reading.css`：后续页面的开放排版、无边框控件与抽牌动效。
- `public/index.html`：保留的产品逻辑、页面结构、导出图片主题。
- `lib/local-reading.js`：仅供本地预览的离线牌义适配器。
- `public/tarot/`：从原线上网站保存的77张实际牌面，来源和校验值见 `source.json`；原站权杖十图片404，保留文字回退。
- `public/tarot-preview.html`：无需AI接口的本地整套牌面预览。
- `public/textures/`：用户提供的花纱与波点参考图压缩版本，旁边 JSON 记录来源。
- `public/fonts/`：自托管 Great Vibes、Cormorant Garamond、Instrument Serif 字体与 OFL 许可。
- `DESIGN.md`：这一版的视觉规范。

默认语言跟随浏览器，手动选择会保存在本地。减少动态效果的系统设置会关闭装饰动画。

## GitHub 在线预览

仓库：[oana011103-byte/oracle](https://github.com/oana011103-byte/oracle)。
预览：[https://oana011103-byte.github.io/oracle/](https://oana011103-byte.github.io/oracle/)。

推送到 `main` 后，`.github/workflows/pages.yml` 自动测试、构建并发布到 GitHub Pages。无需密钥、付费 API 或后端服务。在线预览在浏览器中复用相同的离线牌义模块；抽牌仍使用原算法，随机数由浏览器 Web Crypto 生成。用户问题在浏览器内处理，不发送给 AI 服务。

执行 `npm run build:pages` 生成忽略提交的 `dist/`；默认适配 `/oracle/` 子路径。其他仓库路径可通过 `PAGES_BASE_PATH` 配置。构建只改生成文件中的资源地址和随机数导入，不修改原 Node/API 模块。本地 Node 预览仍使用 `npm run dev`。

本地“今日启示”通过 `lib/local-daily.js` 固定展示塔罗大阿卡那牌面，同一天保持同一张；正式 `api/daily.js` 的六爻／塔罗轮换逻辑保持不变。前端每日牌缓存版本已更新，刷新可替换此前缓存的卦象。
