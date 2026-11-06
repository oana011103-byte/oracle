# Oracle 样式交接

此项目用于客户网站的样式改版，本地预览已配置为离线牌义模式，便于不购买 API 额度时完整演示。

## 启动与验证
使用 Node.js22+，项目根目录执行 `npm run dev`，打开 http://localhost:4173 。执行 `npm test` 检查原起卦逻辑和离线适配器。`/tarot-preview.html` 可直接查看牌面。

## 修改位置
- `public/rose.css`：主题基础；`public/responsive.css`：首页与设备适配；`public/reading.css`：后续页面与牌面样式。加载顺序依次覆盖。
- `public/index.html`：页面结构、双语、交互、翻页、历史与图片导出。
- `public/tarot/`：从原线上网站取得的77张牌面及来源校验清单。权杖十原地址404，当前以名称和符号回退；补齐后放入 `ten-of-wands.webp` 即可。
- `public/textures/`、`public/fonts/`：纹理、字体与来源记录。

## 离线与 AI 的边界
`dev.mjs` 默认把本地 `/api/read` 交给 `lib/local-reading.js`。它使用原有抽牌、铜钱与时间起卦算法，再按预置牌义/卦义组合双语结果；不会对用户问题进行 AI 推理，也没有外部网络调用。响应携带 `source: local-card-meanings`，该标记会保存在历史，并显示于结果及导出图。

`api/read.js` 是保留的原 Anthropic 服务端接口，未替换其业务逻辑。需要接回时，在未跟踪的 `.env.local` 设置 `ORACLE_READING_MODE=ai`、`ANTHROPIC_API_KEY`，安装依赖并重启；随后由接手开发者验证账户、原模型参数与额度。即使环境存在密钥，默认离线模式也不会自动调用 AI。

这里的“离线”指不依赖外部 AI 服务。本机可运行 Node 服务；GitHub Pages 在线预览则通过 `scripts/build-pages.mjs` 在浏览器中复用相同适配器，Web Crypto 提供不偏斜随机数，问题不发送给外部服务。Pages 不承载原 serverless API；正式 AI 服务的部署仍由接手开发者处理。

## 交付状态
交付仓库为 `https://github.com/oana011103-byte/oracle`，在线预览入口为 `https://oana011103-byte.github.io/oracle/`。`main` 分支的 Pages 工作流负责测试、构建与发布，发布状态可在仓库 Actions 查看。未存储任何客户密钥。`.env.local`、`dist/` 和验证截图均被 Git 忽略；原 AI 接口还没有以真实账户验证。保持既有首页构图、文字完整性、移动端适配、减少动态效果和键盘焦点行为。

本地“今日启示”通过 `lib/local-daily.js` 固定展示塔罗大阿卡那牌面，同一天保持同一张；正式 `api/daily.js` 的六爻／塔罗轮换逻辑保持不变。前端每日牌缓存版本已更新，刷新可替换此前缓存的卦象。

## Ritual interaction update

- Six-yao guidance retains six separate three-coin throws. Local animation adds staggered flight, rotation, ground shadow and settling; each resulting line appears after landing.
- Both Tarot modes now require selecting all cards, then lighting the candle before card reveal/interpretation. The same draw and one original API request are retained.
- The candle asset is local at `public/ritual/ribbon-candle.png`; generation provenance and exact prompt are in `public/ritual/SOURCE.md`. Flame and light are separate CSS layers. Click, touch, Enter and Space are supported; reduced motion has a quiet alternative.

2026-11-06：宝剑十已替换为用户提供的 `TEN OF SWORDS` 牌面，按比例转为本地 WebP；来源和原图哈希记录于 `public/tarot/source.json`。用户确认该图用于宝剑十，权杖十另补。

页面过渡节奏按用户要求放慢：420ms 淡出、140ms 纸面留白、760ms 淡入，共约1.32秒；参数集中于 `public/index.html` 的 `navigationTiming`。过渡只作用于 main 内容，布局与滚动复位在完全淡出后发生。顶部导航已移到 main 外，作为 body 直属节点固定在窗口上方，切页与滚动时保持可见且不移动。显现期间锁定内容交互，完成后聚焦目标页标题，提问框不再自动弹出手机键盘；顶部导航可中断，重复导航从当前透明度恢复。首页和后续页导航尺寸、边距保持一致；原生竖向滚动条位置保持稳定，放大牌面时只补偿实际释放的宽度。系统减少动态效果仍即时切换。

解读页增加用户提供的点阵框片段、ASCII 纸纹、颗粒百合和点阵蝴蝶结，保持正文居中和开放排版；素材及使用区域见 `public/materials/SOURCE.md`。PNG 导出同步加入。第六次投币后铜钱合拢成叠、出现细环再转场；塔罗翻牌后烛光晕开再进入解读。`leaveRitual()` 会取消当前仪式动画；减少动态效果模式保留简短状态停顿。

固定导航下方有24px渐隐区域：上滑内容在进入导航前被同款纸纹遮住，避免文字与 Oracle/按钮重叠。`.navigation-veil` 在导航下方、正文上方，不接收点击；仅滚离顶部且非首页时显示。滚动监听只在离开/回到顶部时切换状态，不逐帧改布局。

鼠标星光拖尾：`public/index.html` 中的独立 IIFE 和 `reading.css` 的 `.cursor-starlight` / `.cursor-spark`。最多32个四芒星节点，运动时短暂出现，停下后自动清理；被动指针事件与单次 rAF 节流。触屏及系统减少动态效果不生成拖尾，窗口失焦/隐藏/移出时清理，不拦截点击或文字输入。

投币页跳位修复：提示文字换行数变化曾使整组卦象/铜钱上下移动约12～17px。六次投币现使用固定高度提示区，短屏同步缩小铜钱及卦象占位；卦象收尾仅渐显、不再缩放。中途返回取消动画前会保留当前姿态，避免合拢的铜钱突然散回原位。已连续帧测量中英文桌面/手机的完整投币流程，主体与页头位置变化为0px。

塔罗抖动及动画修复：选牌状态由 `.back` 改为 `.selected`，避免误套返回按钮的 padding/font 样式；牌位和正逆位文字行固定占位，提示区也固定高度。选牌时使用临时牌背平滑移入牌位，牌扇与蜡烛交叠淡入淡出；翻牌使用稳定容器内的真实正反面，仅转牌本身，标签不旋转。尺寸与中英文三张/四张流程已检查；中途返回会清理飞牌，原抽牌结果及 API 次数不变。

## 五项体验细化

- 解读层级由 `readingSections()` / `readingBodyHTML()` 管理；仅识别已知本地塔罗格式并核对牌名，通用 AI 正文按原段落展示，原始牌义与历史数据不改写。“小小一步”作为结尾重点。
- 今日启示页改为 `Today’s Oracle`，首页仍为 `Find your Answer`。
- `card-zoom` 按钮与原生 `#card-viewer` dialog 提供今日牌/结果牌的放大查看，保留正逆位，支持点按、关闭按钮及 ESC；关闭后恢复焦点和滚动。缺牌面时禁用放大。
- `renderImage()` 按实际内容决定 PNG 高度，保持1080px 宽与42px 正文字号，不截掉长问题或长解读；附带纸纹、点阵、百合、蝴蝶结及底部 Oracle 落款。
- `ritualSound()` 通过原音乐输出合成投币、纸牌、点火的短音效，由右上角同一个音乐开关控制，不增加 API 或音频文件依赖。

已检查中英文、320px 小屏/横屏、触摸与键盘关闭、图片导出、长文末尾完整性、音效开关及原后台测试。浏览器验证使用 Chromium；真实设备音色和 Safari 留待客户验收环境试听/复核。
