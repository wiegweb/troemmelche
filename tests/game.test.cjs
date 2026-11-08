const vm=require('vm'),fs=require('fs'),assert=require('assert');
const source=fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
function node(){return {style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},dataset:{},querySelector(){return node()},querySelectorAll(){return []},addEventListener(){},appendChild(){},setAttribute(){},focus(){},remove(){},getBoundingClientRect(){return {left:0,top:0,width:390,height:200}},getClientRects(){return [1]}}}
const nodes=new Map(),storage=new Map();
const ctx=vm.createContext({console,URL,URLSearchParams,TextEncoder,Uint8Array,Date,Math,Set,Map,Promise,JSON,Number,String,Array,Object,RegExp,Error,FormData,
 document:{title:'',querySelector(s){if(!nodes.has(s))nodes.set(s,node());return nodes.get(s)},querySelectorAll(){return []},createElement:node,head:node(),body:node(),addEventListener(){}},
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
 window:{},location:{origin:'https://test.example',pathname:'/',search:''},history:{replaceState(){}},navigator:{},
 Audio:class{constructor(){this.src='';this.listeners={}}play(){return Promise.resolve()}pause(){}addEventListener(k,fn){this.listeners[k]=fn}},
 setTimeout(){return 1},clearTimeout(){},setInterval(){return 2},clearInterval(){},addEventListener(){},requestAnimationFrame(){},scrollTo(){},scrollX:0,scrollY:0,
 fetch:()=>Promise.reject(new Error('offline')),btoa:s=>Buffer.from(s).toString('base64'),crypto:require('crypto').webcrypto,assert
});
vm.runInContext(source,ctx);
vm.runInContext(`
renderGame=()=>{};renderSetupIfOpen=()=>{};startSong=()=>{};
const realEnd=endGame;let result=null;endGame=(empty,winner)=>{result={empty,winner};game.phase='finished'};
const song=(y,t='Song')=>({a:'Artist',t,y,yt:[]});
const init=(mode)=>{setup.mode=mode;setup.target=10;game={players:[{name:'A',cards:[song(2000)],kamelle:0,bonusTotal:0},{name:'B',cards:[song(2005)],kamelle:0,bonusTotal:0}],turn:0,deck:[song(2008),song(2007)],current:song(2000),phase:'place',bonus:{},roundMode:mode,modeBag:[]};};
assert.equal(GAME_NAME,'Trömmelche');assert.equal(validYear(null),false);assert.equal(validYear(''),false);
init('hoer');setBonus('a',true);assert.equal(game.players[0].kamelle,0);
place(0);assert.equal(game.lastOk,true);assert.equal(game.players[0].cards.length,2);place(0);assert.equal(game.players[0].cards.length,2);
nextTurn();assert.equal(game.turn,0,'must settle bonus before moving');
setBonus('a',true);setBonus('a',true);assert.equal(game.players[0].kamelle,1,'idempotent');
setBonus('t',true);assert.equal(game.players[0].kamelle,2);assert.equal(game.players[0].bonusTotal,2);
setBonus('a',false);assert.equal(game.players[0].kamelle,1);assert.equal(game.players[0].bonusTotal,1);assert(bonusComplete());
nextTurn();assert.equal(game.turn,1);assert.equal(Object.keys(game.bonus).length,0);
init('artist');place(0);setBonus('a',true);assert.equal(game.players[0].kamelle,0,'no points for supplied artist');setBonus('t',true);assert.equal(game.players[0].kamelle,1);assert(bonusComplete());
init('title');place(0);setBonus('t',true);assert.equal(game.players[0].kamelle,0,'no points for supplied title');setBonus('a',true);assert.equal(game.players[0].kamelle,1);
init('quiz');place(0);setBonus('a',true);assert.equal(game.players[0].kamelle,0);assert(bonusComplete());nextTurn();assert.equal(game.turn,1);
init('hoer');game.current.y=2020;place(0);assert.equal(game.lastOk,false);setBonus('a',true);setBonus('t',false);assert.equal(game.players[0].kamelle,1,'bonus despite wrong year');
init('duel');setup.target=3;game.players[0].bonusTotal=2;place(0);assert.equal(game.phase,'place');revealDuel();setBonus('a',true);setBonus('t',false);nextTurn();assert.equal(result.winner.name,'A');
init('hoer');game.players[0].kamelle=2;skipSong();assert.equal(game.players[0].kamelle,2,'insufficient Kamelle');game.players[0].kamelle=4;game.players[0].bonusTotal=4;skipSong();assert.equal(game.players[0].kamelle,1);assert.equal(game.players[0].bonusTotal,4);
init('duel');game.players[0].kamelle=3;skipSong();assert.equal(game.players[0].kamelle,0,'skip costs three in duel');init('quiz');game.players[0].kamelle=3;skipSong();assert.equal(game.players[0].kamelle,3,'no exchange in year-only mode');
init('mix');game.deck=Array.from({length:6},(_,i)=>song(2000+i));let modes=[];for(let i=0;i<3;i++){draw();modes.push(game.roundMode)}assert.equal(new Set(modes).size,3);
setup.mode='duel';setup.count=2;setup.names=['A','B'];songs=Array.from({length:8},(_,i)=>song(2000+i));songs[0].enabled=false;startGame();assert.equal(game.players[0].cards.length,0);assert.equal(game.deck.length,6);assert.equal(game.players[0].bonusTotal,0);
const effects=[];celebrate=kind=>effects.push(kind);init('hoer');place(0);assert.deepEqual(effects,['confetti']);setBonus('a',true);setBonus('a',true);setBonus('t',false);assert.deepEqual(effects,['confetti','candy']);setBonus('t',true);assert.equal(effects.length,3);
init('hoer');game.current.y=2020;place(0);assert.equal(effects.length,3,'wrong placement has no effect');
setup.player='deezer';assert.equal(candidatesFor(song(2000))[0].type,'deezer');setup.player='itunes';assert.equal(candidatesFor(song(2000))[0].type,'itunes');setup.player='yt';assert.equal(candidatesFor({...song(2000),yt:['test-video1']})[0].type,'yt');
P.mode='audio';audio.currentTime=30;audio.listeners.timeupdate();assert.equal(P.state,'ended','preview capped at 30 seconds');
console.log('PASS: all six modes, per-field bonus, corrections, double clicks, supplied-field exclusion, mandatory scoring, wrong-year bonus, duel victory, three-Kamelle skip, preview choice/cap, reward effects, mix rotation, selected pool and reset');
`,ctx);

vm.runInContext(`(async()=>{
  let requests=0;const sample={a:'Höhner',t:'Viva Colonia',y:2003};
  jsonp=async()=>{requests++;return {data:[{artist:{name:'Höhner'},title:'Viva Colonia',album:{title:'Viva Colonia'},readable:true,preview:'https://example.test/preview.mp3',link:'https://www.deezer.com/track/1'}]}};
  const first=await deezerPreview(sample);assert(first);await deezerPreview(sample);assert.equal(requests,1,'fresh preview metadata reused');
  sample._dz.at=Date.now()-300000;await deezerPreview(sample);assert.equal(requests,2,'expired preview link refreshed');
  jsonp=async()=>{throw new Error('network')};assert.equal(await deezerPreview({a:'Missing',t:'Unknown'}),null,'network failure handled');
  console.log('PASS: Deezer match, short-lived metadata and network failure');
})()`,ctx).catch(e=>{console.error(e);process.exitCode=1});
