// Local preview adapter. Does not import an AI SDK or make network requests.
import {castHexagram, lunarMoment, quickLiuyao, VERDICT_ZH} from './oracle.js';
import {draw, tarotVerdict} from './tarot.js';

// Local Chinese renderings of the existing 64 advice entries, in King Wen order.
const ADVICE_ZH = [
 '顺应时机，积极而有分寸地行动。','保持稳定，不急于向前。','事情刚起步，耐心扎根。','仍有疑惑，先观察和求教。',
 '时机未到，平静等待。','避免争执，用协商减少损耗。','借助团队力量，稳步行动。','建立互相支持的关系。',
 '一点点积累，暂不急于跨越。','谨慎前行，尊重自身边界。','条件较顺，可以逐步推进。','进展缓慢时，先安静观察。',
 '寻找志同道合的支持者。','珍惜已有资源，妥善运用。','保持谦逊，也给帮助留出空间。','可以适当放松，同时留心细小风险。',
 '调整自己，顺应眼前变化。','梳理旧问题，重新整理。','走近这件事，了解实际情况。','先观察思考，再做重要决定。',
 '清理阻碍，让问题变得明确。','照顾外在表达，也顾好基础。','精力不足时，优先保护自己。','允许自己重新开始。',
 '保持真诚，减少一厢情愿。','积蓄力量，为长远做准备。','照顾自己，也留意言语。','面对特殊处境，勇敢但谨慎。',
 '面对困难，小心前行。','通过交流，让事情更清楚。','真诚表达，留意彼此回应。','长期目标需要稳定与坚持。',
 '暂时退后，保存精力。','有力量时，也不要过度推进。','缓慢而稳定地向前。','环境不明朗时，低调照顾自己。',
 '照顾内在生活，稳固自己的基础。','观点不同时，练习理解与包容。','道路不顺时，可以放慢脚步。','让压力逐渐松动，给自己喘息空间。',
 '为长远考虑，放下一些小负担。','积极行动，也留意身边的支持。','做出明确选择，告别不再合适的事。','留意新的相遇和微小细节。',
 '聚集同伴，把力量结合起来。','一步一步，温和地前进。','感到受困时，先保持内心稳定。','照顾已有资源和生活基础。',
 '思考哪些部分需要更新。','在变化中重新整理局面。','面对变动，保持觉察。','适时停下，不强行推进。',
 '一点一点来，不必急于求成。','适度调整，了解自己所处的位置。','珍惜当下已经拥有的收获。','处境不稳时，保持谨慎。',
 '温和地推进，避免勉强。','适合坦诚交流和协商。','重新建立连接，化解隔阂。','设定健康边界，保持适度。',
 '以真诚为基础，忠于内心。','先做小调整，避免贸然跨越。','已有成果时，继续照顾稳定。','事情尚未结束，可以继续探索。',
];
const POSITIONS_ZH = ['核心','阻碍','建议','潜在优势'];
export function localReading(mode, cast, lang) {
 const zh = lang === 'zh';
 if (mode.startsWith('tarot')) {
  const body = cast.cards.map((card, i) => {
   const position = mode === 'tarot-guidance' ? (zh ? POSITIONS_ZH[i] : card.position) : (zh ? `第${i + 1}张牌` : `Card ${i + 1}`);
   if (!zh) return `${position} · ${card.name} (${card.reversed ? 'reversed' : 'upright'}): ${card.reversed ? card.rev : card.up}.`;
   const orientation = card.reversed ? '逆位' : '正位';
   const note = !card.reversed ? '可把这些主题作为梳理当下的线索。'
    : mode === 'tarot-guidance' && i === 3 ? '这些主题也可以提醒你留意尚未充分运用的力量。'
    : '逆位可提示这些主题中的阻滞、失衡或尚未理顺的部分。';
   return `${position} · ${card.zh}（${orientation}）：${card.kw}。${note}`;
  }).join('\n\n');
  const verdict = cast.verdict && (zh ? VERDICT_ZH[cast.verdict] : cast.verdict);
  return {
   title: verdict ? `${verdict} · ${zh ? '牌义参考' : 'Card meanings'}` : zh ? `${cast.cards[0].zh} · 牌义参考` : `${cast.cards[0].name} · Card meanings`,
   body,
   step: zh ? '选一张最有共鸣的牌，写下一件今天可以尝试的小事。' : 'Choose one card that resonates and write down a small action you could try today.',
  };
 }
 const advice = zh ? ADVICE_ZH[cast.n - 1] : cast.advice;
 let body = zh ? `第${cast.n}卦「${cast.zh}」的卦义提示：${advice}` : `${cast.name}: ${advice}`;
 if (mode === 'yesno') body += zh
  ? `\n\n第${cast.moving}爻为动爻，变为第${cast.changed.n}卦「${cast.changed.zh}」。变卦提示：${ADVICE_ZH[cast.changed.n - 1]}此处展示卦义与变化，不对具体问题作确定的是非判断。`
  : `\n\nLine ${cast.moving} changes toward ${cast.changed.name}: ${cast.changed.advice} These are the hexagram themes, rather than a definitive yes or no to your question.`;
 return {
  title: zh ? `${cast.zh} · 卦义参考` : `${cast.name} · Hexagram meanings`, body,
  step: zh ? '从这条卦义里选一个提醒，写成今天能够完成的小行动。' : 'Turn one theme from this hexagram into a small action you can take today.',
 };
}

export async function POST(request) {
 let input;
 try { input = await request.json(); } catch { return Response.json({error:'Bad request'}, {status:400}); }
 if (!input || typeof input !== 'object' || Array.isArray(input)) return Response.json({error:'Bad request'}, {status:400});
 const question = String(input.question || '').trim().slice(0,300);
 const lang = input.lang === 'zh' || /[\u4e00-\u9fff]/.test(question) ? 'zh' : 'en';
 if (!question) return Response.json({error:lang === 'zh' ? '请先写下你的问题。' : 'Ask a question first.'}, {status:400});
 const mode = ['guidance','yesno','tarot-guidance','tarot-yesno'].includes(input.mode) ? input.mode : 'guidance';
 let timeZone = 'UTC';
 try { if (input.timeZone) { new Intl.DateTimeFormat('en-US',{timeZone:input.timeZone}); timeZone=input.timeZone; } } catch {}
 let cast;
 if (mode.startsWith('tarot')) {
  const cards=draw(mode); cast={cards};
  if (mode === 'tarot-yesno') cast.verdict=tarotVerdict(cards);
 } else if (mode === 'guidance') cast=castHexagram();
 else {
  const at=Number(input.at), when=Math.abs(at-Date.now())<120000 ? new Date(at) : new Date();
  const moment=lunarMoment(when,timeZone);
  cast={...quickLiuyao(moment),clock:moment.clock,time:`${moment.yearName} ${moment.month}月${moment.day}日 ${moment.hourName} ${moment.clock}`};
 }
 return Response.json({mode,cast,reading:localReading(mode,cast,lang),source:'local-card-meanings'});
}
