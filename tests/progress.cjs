'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'js/learning-progress-v6.15.0.js'),'utf8');
const mem=new Map();
const win={localStorage:{getItem:k=>mem.get(k)??null,setItem:(k,v)=>mem.set(k,v),removeItem:k=>mem.delete(k)}};
vm.runInNewContext(source,{window:win,console,Math,Set,JSON,Number});
const cards=[{word:'A',trans:'a'},{word:'B',trans:'b'},{word:'C',trans:'c'}];
const a=win.AcademiumProgress.create('management','topic1',cards);
assert.equal(a.load(),null);
a.save([2,0,1],1);
assert.equal(JSON.stringify(a.load().order),'[2,0,1]');
assert.equal(a.load().index,1);
assert.equal(win.AcademiumProgress.create('management','topic2',cards).load(),null);
assert.equal(win.AcademiumProgress.create('psychology','topic1',cards).load(),null);
assert.equal(win.AcademiumProgress.create('management','topic1',[...cards,{word:'D',trans:'d'}]).load(),null);
assert.equal(a.load(),null,'stale progress removed');
a.save([0,0,1],1);
assert.equal(a.load(),null,'invalid duplicated permutation removed');
a.save([0,1,2],2);
a.clear();
assert.equal(a.load(),null,'restart clears progress');
for(const name of ['skd-v6.10.0','management-v6.11.0','philosophy-v6.8.0','business-v6.12.0','statistics-theory-v6.9.0','psychology-v6.6.0','it-v6.7.0']){
 const text=fs.readFileSync(path.join(root,'js',name+'.js'),'utf8');
 assert.match(text,/function saveLearning/);
 assert.match(text,/restart:restartLearning/);
 assert.match(text,/if\(mode==='learn'/);
}
for(const page of ['skd','management','philosophy','business','statistics','psychology','it','russian','english']){
 const text=fs.readFileSync(path.join(root,'courses/course2/fsk',page+'.html'),'utf8');
 assert.match(text,/learning-progress-v6\.15\.0\.js/);
}
assert.match(fs.readFileSync(path.join(root,'courses/course1/fsk/russian.html'),'utf8'),/learning-progress-v6\.15\.0\.js/);
console.log('PASS local learning progress: resume, isolation, invalidation, restart, integrations');
