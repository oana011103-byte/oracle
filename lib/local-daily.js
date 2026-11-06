// Tarot-only daily sign for the local visual preview; production api/daily.js is unchanged.
import {DECK} from './tarot.js';

export function GET(request) {
 const d = new URL(request.url).searchParams.get('d') || '';
 const day = /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d)) ? d : new Date().toISOString().slice(0,10);
 const num = Math.round(Date.parse(day+'T00:00:00Z')/864e5);
 const h = Math.imul(num^0x5bd1e995,2654435761)>>>0;
 const card = DECK[h%22];
 return Response.json({kind:'card',day,name:card.name,zh:card.zh,glyph:card.glyph,kw:card.kw,up:card.up}, {headers:{'Cache-Control':'no-store'}});
}
