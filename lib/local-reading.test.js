import assert from 'node:assert/strict';
import {POST,localReading} from './local-reading.js';
import {DECK} from './tarot.js';
import {hexagramFromLines} from './oracle.js';

const request = input => new Request('http://local/api/read',{method:'POST',body:JSON.stringify(input)});
for (const invalid of [null,[],{}, {question:'  '}]) assert.equal((await POST(request(invalid))).status,400);
assert.equal((await POST(new Request('http://local/api/read',{method:'POST',body:'{'}))).status,400);
for (const mode of ['guidance','yesno','tarot-guidance','tarot-yesno']) {
 for (const lang of ['en','zh']) {
  const response=await POST(request({mode,lang,question:lang==='zh'?'今天留意什么？':'What deserves my attention?',timeZone:'invalid-zone',at:0}));
  assert.equal(response.status,200);
  const data=await response.json();
  assert.equal(data.source,'local-card-meanings');
  assert.ok(data.reading.title&&data.reading.body&&data.reading.step);
  assert.ok(!data.reading.body.includes('undefined'));
  if (mode.startsWith('tarot')) {
   assert.equal(data.cast.cards.length,mode==='tarot-guidance'?4:3);
   assert.equal(new Set(data.cast.cards.map(c=>c.name)).size,data.cast.cards.length);
   for (const card of data.cast.cards) assert.ok(data.reading.body.includes(lang==='zh'?card.zh:card.name));
  } else {
   assert.equal(data.cast.lines.length,6);
   if (mode==='guidance') assert.equal(data.cast.tosses.length,6);
   else assert.ok(data.cast.changed&&data.cast.moving>=1&&data.cast.moving<=6);
  }
 }
}
const card={...DECK[0],position:'Card 1',reversed:true};
assert.ok(localReading('tarot-yesno',{cards:[card],verdict:'No'},'en').body.includes(card.rev));
assert.ok(!localReading('tarot-yesno',{cards:[card],verdict:'No'},'en').body.includes(card.up));
for (let n=0;n<64;n++) {
 const cast=hexagramFromLines(Array.from({length:6},(_,i)=>(n>>i)&1));
 const body=localReading('guidance',cast,'zh').body;
 assert.ok(body.includes(cast.zh)&&!body.includes('undefined'));
 assert.match(body,/[\u4e00-\u9fff]/);
}
console.log('local reading: four modes, bilingual meanings, reversals, 64 hexagrams and invalid input pass');
