'use strict';
/* АкадемиУм! — zero-dependency smoke tests for the GitHub Pages build. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
let checked = 0;
function check(label, fn) {
  try { fn(); checked++; console.log('PASS', label); }
  catch (e) { console.error('FAIL', label, '\n', e.stack || e); process.exitCode = 1; }
}
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === '.git' || e.name === 'node_modules' ? [] : walk(p);
    return [p];
  });
}
const files = walk(root);
const pages = files.filter(f => f.endsWith('.html'));
const scripts = files.filter(f => f.endsWith('.js'));
check('All JavaScript files parse', () => {
  for (const file of scripts) execFileSync(process.execPath, ['--check', file], {stdio:'pipe'});
});
check('All local script/style links exist (including nested pages)', () => {
  for (const file of pages) {
    const html = fs.readFileSync(file,'utf8');
    for (const match of html.matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)) {
      const uri = match[1].split(/[?#]/)[0];
      if (!uri || /^(?:[a-z]+:|\/\/|#)/i.test(uri)) continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), uri)), path.relative(root,file)+' -> '+uri);
    }
  }
});
const flashcards = [
  ['skd','skdDB'], ['management','managementDB'], ['philosophy','philosophyDB'],
  ['business','businessDB'], ['statistics','statisticsDB'], ['psychology','psychologyDB'],
  ['it','itDB'], ['english','englishDB']
];
const dataFiles = new Map(flashcards.map(([name])=>[name,path.join(root,'js','data-'+name+'.js')]));
for (const [name,key] of flashcards) {
  check(name+': topics/cards have definitions', () => {
    const context={window:{}};
    vm.runInNewContext(fs.readFileSync(dataFiles.get(name),'utf8'), context, {filename:name,timeout:10000});
    const db=context[key] || context.window[key];
    assert.ok(db && db.topicTitles, 'Database missing');
    const topics=Object.keys(db.topicTitles);
    assert.ok(topics.length>0,'No topics');
    let count=0;
    for (const topic of topics) {
      assert.ok(Array.isArray(db[topic]) && db[topic].length, 'Missing cards in '+topic);
      for (const [i,card] of db[topic].entries()) {
        assert.ok(card && typeof card.word==='string' && card.word.trim(), topic+' card '+i+' missing word');
        assert.ok(typeof card.trans==='string' && card.trans.trim(),topic+' card '+i+' missing meaning');
        count++;
      }
    }
    console.log('  '+topics.length+' topics, '+count+' cards');
  });
}
check('Russian: both courses have complete question sets', () => {
  const context={window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'js/data-russian-v6.5.0.js'),'utf8'),context,{timeout:10000});
  const db=context.window.RUSSIAN_650;
  assert.ok(db);
  for (const [course,topics] of [['first',db.course1Topics],['second',db.course2Topics]]) {
    assert.ok(topics.length,course+' course missing');
    for (const topic of topics) {
      assert.ok(db.titles[topic] && db.questions[topic]?.length, 'Missing '+topic);
      db.questions[topic].forEach((q,i)=>{
        assert.ok(q.prompt && q.kind, topic+' missing prompt/kind at '+i);
        if (q.kind==='text') assert.ok(q.answerText?.length,topic+' text answer '+i);
        else {
          assert.ok(Array.isArray(q.options) && q.options.length,topic+' options '+i);
          assert.ok(Array.isArray(q.answer) && q.answer.length,topic+' answer '+i);
          assert.ok(q.answer.every(n=>Number.isInteger(n)&&n>=1&&n<=q.options.length),topic+' answer bounds '+i);
        }
      });
    }
  }
});
const engines=[
 'skd-v6.10.0','management-v6.11.0','philosophy-v6.8.0','business-v6.12.0',
 'statistics-theory-v6.9.0','psychology-v6.6.0','it-v6.7.0'
];
check('Standard learning engines shuffle without touching quiz evaluation',()=>{
  for(const engine of engines){
    const source=fs.readFileSync(path.join(root,'js',engine+'.js'),'utf8');
    assert.match(source,/items=shuffle\(items\)/,engine+' learning shuffle missing');
    assert.match(source,/mode==='learn'/,engine+' learning mode missing');
    assert.match(source,/sound\(ok\)/,engine+' feedback sound missing');
    assert.match(source,/startFireworks\(\)/,engine+' celebration missing');
  }
});
check('Russian and English maintain topic-level shuffling',()=>{
  const ru=fs.readFileSync(path.join(root,'js/russian-v6.5.0.js'),'utf8');
  const en=fs.readFileSync(path.join(root,'courses/course2/fsk/english.html'),'utf8');
  assert.match(ru,/queue=shuffle\(queue\)/);
  assert.match(en,/englishQuizShuffle\(currentCards\)/);
});
check('Shared core has audio recovery and visible fireworks',()=>{
  const src=fs.readFileSync(path.join(root,'js/core.js'),'utf8');
  assert.match(src,/audioCtx\.resume\(\)/);
  assert.match(src,/fireworksCanvas\.style\.display\s*=\s*'block'/);
  assert.match(src,/playFireworksSound\(\)/);
});

check('Unified UI / sound controls and version visibility',()=>{
 const core=fs.readFileSync(path.join(root,'js/core.js'),'utf8');
 assert.match(core,/academiumSetSound/);
 assert.match(core,/academiumSoundEnabled = true/);
 assert.match(core,/localStorage\.setItem\('academium:sound'/);
 const first=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.match(first,/Версия 6\.16\.1/);
 for(const subj of ['skd','management','philosophy','business','statistics','psychology','it','english','russian']){
   const p=fs.readFileSync(path.join(root,'courses/course2/fsk',subj+'.html'),'utf8');
   assert.match(p,/subject-unified-v6\.16\.0\.css/,subj+' missing common style');
   assert.doesNotMatch(p,/Версия [0-9]+\.[0-9]+\.[0-9]+/,subj+' has visible version');
 }
 const eng=fs.readFileSync(path.join(root,'courses/course2/fsk/english.html'),'utf8');
 assert.match(eng,/class="psy-page english-page"/);
 assert.match(eng,/class="psy-progress"/);
 const ru=fs.readFileSync(path.join(root,'js/russian-v6.5.0.js'),'utf8');
 assert.doesNotMatch(ru,/АкадемиУм! · v'\+db\.version/);
 const business=fs.readFileSync(path.join(root,'js/business-v6.12.0.js'),'utf8');
 assert.match(business,/Предприн-во/);
});

console.log('Completed '+checked+' smoke checks over '+pages.length+' HTML pages and '+scripts.length+' JS files');
if(process.exitCode) process.exit(process.exitCode);
