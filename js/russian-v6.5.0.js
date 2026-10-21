/* Общий движок русского языка v6.5.0 — первый и второй курсы */
(function(){
'use strict';
const db=window.RUSSIAN_650, course=Number(document.body.dataset.course)||2;
const keys=course===1?db.course1Topics:db.course2Topics;
const app=document.getElementById('app');
let mode='learn',topic=null,queue=[],index=0,mistakes=0,locked=false,chosen=new Set(),seenResults=[];
let learnStore=null;
function saveLearning(){if(mode==='learn'&&learnStore)learnStore.save(queue.map(e=>db.questions[e.key].indexOf(e.q)),index);}
function restartLearning(){if(learnStore)learnStore.clear();start(topic,true);}
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const safe=(s)=>esc(s).replace(/\n/g,' ');
function shuffle(a){let b=a.slice();for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function notifySound(ok){try{if(typeof initAudio==='function')initAudio();if(typeof playSound==='function')playSound(ok?'success':'error');}catch(e){}}
function set(html){app.innerHTML=html;window.scrollTo({top:0,behavior:'instant'});}
function button(label,fn,cls){return '<button type="button" class="ru-button '+(cls||'')+'" data-action="'+fn+'">'+label+'</button>';}
function title(text,caption){return '<h1>'+esc(text)+'</h1><p class="ru-subtitle">'+esc(caption||'')+'</p>';}
function bind(){app.querySelectorAll('[data-action]').forEach(el=>{el.addEventListener('click',()=>actions[el.dataset.action]());});}
function showWelcome(){topic=null;let subtitle=course===1?'1 курс · ФСК':'2 курс · ФСК';
 set('<section class="ru-welcome" aria-label="Русский язык"><div class="ru-tag">АкадемиУм! · Дисциплина</div><h1>Русский язык</h1><p class="ru-subtitle">'+subtitle+'</p><p class="ru-lead">Орфография, лексика, смысл слова.<span>Учимся понимать правило и применять его на практике.</span></p><div class="ru-mode-grid">'+button('<span class="ru-mode-icon" aria-hidden="true">📖</span>Обучение','learn','ru-mode ru-mode-primary')+button('<span class="ru-mode-icon" aria-hidden="true">🎯</span>Контроль','quiz','ru-mode ru-mode-secondary')+'</div>'+button('← К предметам','home','secondary ru-home-button')+'<p class="ru-caption">'+(course===1?'5 орфографических тем · 116 упражнений':'8 тем · 174 упражнения')+'</p></section>');bind();}
function chooseTopic(m){mode=m;let items=keys.map((key,i)=>'<button type="button" class="ru-topic" data-topic="'+key+'"><span class="ru-topic-number">'+String(i+1).padStart(2,'0')+'</span><span>'+esc(db.titles[key])+'</span><span class="ru-topic-count">'+db.questions[key].length+'</span></button>').join('');
 if(m==='quiz')items='<button type="button" class="ru-topic ru-all" data-topic="all"><span class="ru-topic-number">∞</span><span>За всё время</span><span class="ru-topic-count">'+keys.reduce((n,k)=>n+db.questions[k].length,0)+'</span></button>'+items;
 set(title(m==='learn'?'Обучение':'Контроль','Выберите тему')+'<div class="ru-topics">'+items+'</div>'+button('← Назад','welcome','secondary'));
 app.querySelectorAll('[data-topic]').forEach(el=>el.addEventListener('click',()=>start(el.dataset.topic)));bind();}
function lessonBox(key,open){let guide=db.theory[key];if(!guide)return '';
 return '<details class="ru-lesson"'+(open?' open':'')+'><summary>💡 Как рассуждать? · правило</summary><p class="ru-lesson-intro">'+esc(guide.intro)+'</p><div class="ru-lesson-grid"><div class="ru-lesson-heading">Ключевые правила</div><ul>'+guide.rules.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul><div class="ru-lesson-heading">Путь к решению</div><ol>'+guide.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol></div></details>';}
function start(k,reset){topic=k;let topics=k==='all'?keys:[k];queue=[];topics.forEach(x=>db.questions[x].forEach(q=>queue.push({key:x,q})));
 queue=shuffle(queue);index=0;mistakes=0;seenResults=[];if(mode==='learn'&&k!=='all'&&window.AcademiumProgress){learnStore=window.AcademiumProgress.create('russian-course'+course,k,db.questions[k]);if(!reset){let prev=learnStore.load();if(prev){queue=prev.order.map(i=>({key:k,q:db.questions[k][i]}));index=prev.index;}}saveLearning();}else learnStore=null;showQuestion();}
function isSingle(q){return q.kind==='single';}
function correctSet(q){return (q.answer||[]).slice().sort((a,b)=>a-b);}
function formatKey(q,key){const letters=['А','Б','В','Г','Д'];return q.kind==='text'?q.answerText.join(' / '):correctSet(q).map(n=>key==='suffixy'?letters[n-1]:n).join(', ');}
function renderOption(s,i,key){let marker=key==='suffixy'?['А','Б','В','Г','Д'][i]:i+1;return '<button class="ru-option" type="button" data-choice="'+(i+1)+'" aria-pressed="false"><span class="ru-choice-num">'+marker+'</span><span class="ru-choice-text">'+esc(s)+'</span><span class="ru-choice-icon" aria-hidden="true"></span></button>';}
function showQuestion(){locked=false;chosen=new Set();if(index>=queue.length){finish();return;}
 let {key,q}=queue[index];let label=db.titles[key],title0=mode==='learn'?'Обучение':'Контроль';
 let intro='<div class="ru-progress"><span>'+title0+' · '+(index+1)+' / '+queue.length+'</span><span>Задание '+q.n+'</span></div><div class="ru-meter"><div style="width:'+((index+1)/queue.length*100).toFixed(2)+'%"></div></div>';
 let prompt='<section class="ru-question"><p class="ru-question-type">'+esc(label)+'</p><div class="ru-question-text">'+esc(q.prompt)+'</div>'+(q.kind==='text'?'<p class="ru-sentence">'+esc(q.sentence)+'</p>':'')+'</section>';
 let hint=q.kind==='multi'?'Выберите все правильные варианты. Их может быть несколько.':q.kind==='single'?'Выберите один правильный вариант.':'Напишите слово или выражение, затем проверьте ответ.';
 let options=q.kind==='text'?'<label class="ru-input-label" for="ru-input">Ваш ответ</label><input class="ru-input" id="ru-input" autocomplete="off" spellcheck="false" placeholder="Введите ответ">':'<div class="ru-options">'+q.options.map((s,i)=>renderOption(s,i,key)).join('')+'</div>';
 let explain=lessonBox(key,false);
 set(intro+prompt+'<p class="ru-hint">'+hint+'</p>'+options+explain+'<div id="ru-feedback" aria-live="polite"></div>'+button(mode==='learn'?'Показать ответ и объяснение':'Проверить ответ','check','primary')+ (mode==='learn'?button('Начать заново','restart','secondary'):'')+button('← К темам','topics','secondary'));
 app.querySelectorAll('[data-choice]').forEach(el=>el.addEventListener('click',()=>selectChoice(el,q)));
 let inp=document.getElementById('ru-input');if(inp)inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!locked){e.preventDefault();check();}});bind();}
function selectChoice(el,q){if(locked)return;const n=Number(el.dataset.choice);if(isSingle(q)){chosen.clear();app.querySelectorAll('.ru-option').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});}if(chosen.has(n)){chosen.delete(n);el.classList.remove('selected');el.setAttribute('aria-pressed','false');}else{chosen.add(n);el.classList.add('selected');el.setAttribute('aria-pressed','true');}}
function normalized(str){return String(str).toLocaleLowerCase('ru-RU').replace(/ё/g,'е').replace(/[\u0301]/g,'').replace(/[.,;:!?«»"']/g,'').replace(/\s+/g,' ').trim();}
function correct(q){if(q.kind==='text'){let v=normalized(document.getElementById('ru-input').value);return q.answerText.some(a=>normalized(a)===v);}let key=correctSet(q);return chosen.size===key.length&&key.every(i=>chosen.has(i));}
function showAnalysis(q,key){let detail=q.explanation||'';let note='<p class="ru-didactic">'+esc(detail)+'</p>';
 if(q.kind==='multi'){let proper=q.answer.map(n=>q.options[n-1]);note+='<div class="ru-analysis-list"><strong>Подходящие варианты:</strong>'+proper.map((txt,i)=>'<div class="ru-analysis-item"><b>'+(q.answer[i])+'.</b> '+esc(txt)+'</div>').join('')+'</div>';
 note+='<p class="ru-exam-tip">Важно: проверьте каждое слово или сочетание внутри одного пункта. Один удачный пример не гарантирует верность всей строки.</p>';}
 else if(q.kind==='single'){let s=q.options[q.answer[0]-1];note+='<p><strong>Нужное предложение:</strong> '+esc(s)+'</p>';if(q.replacement)note+='<p><strong>Исправление:</strong> '+esc(q.replacement)+'</p>';}
 else note+='<p><strong>Допустимые ответы:</strong> '+esc(q.answerText.join(' / '))+'</p>';
 return note;
}
function check(){if(locked)return;let {key,q}=queue[index];let inp=document.getElementById('ru-input');if(mode==='quiz'&&q.kind!=='text'&&chosen.size===0){const fb=document.getElementById('ru-feedback');fb.innerHTML='<p class="ru-inline-error">Сначала выберите ответ.</p>';return;}if(mode==='quiz'&&inp&&!inp.value.trim()){document.getElementById('ru-feedback').innerHTML='<p class="ru-inline-error">Введите свой вариант ответа.</p>';return;}
 const isRight=correct(q);locked=true;if(mode==='quiz'){if(!isRight)mistakes++;seenResults.push(isRight);notifySound(isRight);}
 if(inp)inp.disabled=true;
 app.querySelectorAll('[data-choice]').forEach(el=>{const n=Number(el.dataset.choice);el.disabled=true;if(q.answer.includes(n)){el.classList.add('right');el.querySelector('.ru-choice-icon').textContent='✓';}else if(chosen.has(n)){el.classList.add('wrong');el.querySelector('.ru-choice-icon').textContent='✕';}});
 const status=mode==='learn'?'Разбор задания':isRight?'✓ Верно!':'✕ Есть ошибка';const cls=mode==='learn'?'learn':isRight?'right':'wrong';
 document.getElementById('ru-feedback').innerHTML='<section class="ru-feedback '+cls+'"><h2>'+status+'</h2><p><strong>Правильный ответ:</strong> '+esc(formatKey(q,key))+'</p>'+showAnalysis(q,key)+'</section>';
 let b=app.querySelector('[data-action="check"]');b.textContent=index===queue.length-1?'Завершить':'Следующее задание →';b.dataset.action='next'; /* Второй onclick пропустил бы карточку; bind() уже слушает data-action. */}
function finish(){if(mode==='learn'&&learnStore){learnStore.clear();learnStore=null;}let total=queue.length,score=total-mistakes;let full=mode==='quiz'&&mistakes===0;
 set('<div class="ru-tag">АкадемиУм!</div>'+title('Завершено',mode==='learn'?'Вы прошли все карточки':'Результат контроля')+'<div class="ru-result">'+(mode==='learn'?'<strong>'+total+' заданий</strong><p>Материал изучен!</p>':'<strong>'+score+' / '+total+'</strong><p>Ошибок: '+mistakes+'</p><p>'+(full?'🎉 Отличная работа!':'Надо больше заниматься, Данечка!')+'</p>')+'</div>'+button('Выбрать другую тему','topics','primary')+button('В меню','welcome','secondary'));
 if(full){let canvas=document.getElementById('fireworks-canvas');if(canvas){canvas.style.display='block';canvas.style.opacity='1';try{if(typeof resizeFireworks==='function')resizeFireworks();if(typeof startFireworks==='function')startFireworks();}catch(e){}window.setTimeout(()=>{canvas.style.opacity='0';},2800);}}
 bind();}
const actions={welcome:showWelcome,home:()=>location.assign('../../../index.html'),learn:()=>chooseTopic('learn'),quiz:()=>chooseTopic('quiz'),topics:()=>chooseTopic(mode),check:check,next:()=>{if(mode==='learn')notifySound(true);index++;saveLearning();showQuestion();},restart:restartLearning};
function init(){showWelcome();document.addEventListener('pointerdown',()=>{try{if(typeof initAudio==='function')initAudio();}catch(e){}},{once:true});}
init();
})();
