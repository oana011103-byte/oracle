import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {GET} from './lib/local-daily.js';
import {POST as localReading} from './lib/local-reading.js';
// Local secrets stay outside public/ and are ignored by Git.
try { process.loadEnvFile(resolve('.env.local')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const root=resolve('public');
const readingMode=process.env.ORACLE_READING_MODE==='ai'?'ai':'offline';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ttf':'font/ttf','.webmanifest':'application/manifest+json'};
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost:4173');
  if(url.pathname==='/api/daily'){const r=GET(new Request(url));res.writeHead(r.status,{'Content-Type':'application/json'});res.end(await r.text());return;}
  if(url.pathname==='/api/read'){
   if(req.method!=='POST'){res.writeHead(405,{'Allow':'POST','Content-Type':'application/json'});res.end(JSON.stringify({error:'Method not allowed'}));return;}
   if(readingMode==='ai'&&!process.env.ANTHROPIC_API_KEY){res.writeHead(503,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'AI 模式尚未配置 ANTHROPIC_API_KEY；本地样式预览可使用 ORACLE_READING_MODE=offline。'}));return;}
   let b='';for await(const c of req){b+=c;if(b.length>16000)throw Error('too large');}
   const handler=readingMode==='offline'?localReading:(await import('./api/read.js')).POST;
   const r=await handler(new Request(url,{method:'POST',body:b,headers:req.headers}));res.writeHead(r.status,{'Content-Type':'application/json'});res.end(await r.text());return;
  }
  const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
  if(!path.startsWith(root+sep))throw Error('path');
  const file=await readFile(path);res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream'});res.end(file);
 }catch(e){if(!res.headersSent)res.writeHead(404);res.end('Not found');}
}).listen(4173,'0.0.0.0',()=>console.log('Oracle preview: http://localhost:4173'));
