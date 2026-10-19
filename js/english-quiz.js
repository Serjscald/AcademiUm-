/* Английский язык: тематический контроль v6.4.0 */
var englishQuizState = null;
var englishQuizGroups = {
 topic1:[[0,1,2,3,4],[5,6,7],[8,9,10,11,12],[13,14,15,16,17],[18,19,20],[21,22,23]],
 topic2:[[0,1,2,3,4,5,6],[7,8,9,10,11,12,13],[14,15,16,17,18,19]],
 topic3:[[0,6,24,25,35,36],[1,2,3,4,5,24,35,36],[7,8,9,10,11,12],[13,14,15,16,17,18,19,20,21,22,23],[26,27,28,29,30,31,32,33,34,37],[38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]],
 topic4:[[0,1,2,3,4,5,6,7,8],[26,27,28,29,30,31,32,33,34,35,36],[37]]
};
var englishQuizCloze = {
 9:["a few","few","little"],
 10:["a lot of","little","a little"],
 11:["few","little","many"],
 12:["a lot of","little","much"],
 13:["a few","little","much"],
 14:["few","little","a little"],
 15:["a lot of","little","much"],
 16:["few","little","a little"],
 17:["a few","little","much"],
 18:["any","some","many"],
 19:["is","are","am"],
 20:["is / are","are / is","are / are"],
 21:["few","little","much"],
 22:["little","few","many"],
 23:["are","is","am"],
 24:["many","much","little"],
 25:["was","were","are"]
};
function englishQuizShuffle(a){
 var out=a.slice();
 for(var i=out.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var tmp=out[i];out[i]=out[j];out[j]=tmp;}
 return out;
}
function englishQuizEscape(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function englishQuizFindGroup(key,index){
 var groups=englishQuizGroups[key]||[];
 for(var i=0;i<groups.length;i++)if(groups[i].indexOf(index)!==-1)return groups[i];
 return [];
}
function englishQuizMakePlan(scope){
 var entries=[],topics=scope==='all'?Object.keys(englishDB.topicTitles):[scope];
 topics.forEach(function(key){englishDB[key].forEach(function(card,index){entries.push({key:key,index:index,card:card});});});
 entries=englishQuizShuffle(entries);
 // Для упражнений с пропусками направление всегда контекстное.
 // Остальные задания чередуют языки строго поровну (±1 при нечётном числе).
 var reversible=entries.filter(function(e){return !(e.key==='topic4'&&Object.prototype.hasOwnProperty.call(englishQuizCloze,e.index));});
 var directions=[];
 for(var j=0;j<reversible.length;j++)directions.push(j%2?'def-to-term':'term-to-def');
 directions=englishQuizShuffle(directions);
 var pos=0;
 return entries.map(function(entry){entry.direction=(entry.key==='topic4'&&Object.prototype.hasOwnProperty.call(englishQuizCloze,entry.index))?'context':directions[pos++];return entry;});
}
function englishQuizStart(scope){
 englishQuizState={plan:englishQuizMakePlan(scope),position:0,mistakes:0,locked:false,feedback:null};
 englishQuizRender();
}
function englishQuizPrepare(entry){
 var card=entry.card,key=entry.key,index=entry.index;
 if(key==='topic4'&&Object.prototype.hasOwnProperty.call(englishQuizCloze,index)){
  var opts=englishQuizCloze[index],correct=card.trans;
  // Двухпустотное упражнение: один вариант соответствует обеим позициям.
  if(opts.indexOf(correct)===-1)throw new Error('Incorrect answer options for '+key+'/'+index);
  return {question:card.word,options:englishQuizShuffle(opts),correct:correct,explanation:card.note+' '+card.example};
 }
 var group=englishQuizFindGroup(key,index);
 var useDirection=entry.direction;
 // Исключение: скороговорка и фразовые упражнения требуют однозначной пары.
 if(key==='topic4'&&index===37)useDirection='term-to-def';
 function label(c){return useDirection==='term-to-def'?c.trans:c.word;}
 var correct=label(card);
 var pool=group.filter(function(other){return other!==index;}).map(function(other){return label(englishDB[key][other]);});
 pool=pool.filter(function(v,i,a){return v!==correct&&a.indexOf(v)===i;});
 if(pool.length<2){
  // fallback остаётся в пределах ТОЙ ЖЕ темы и не допускает дубликатов.
  pool=englishDB[key].map(label).filter(function(v,i,a){return v!==correct&&a.indexOf(v)===i;});
 }
 var options=englishQuizShuffle(pool).slice(0,2).concat([correct]);
 // Последний fallback для редких совпадающих подписей: всегда уникальные варианты.
 if(new Set(options).size!==3)throw new Error('Ambiguous English quiz choices '+key+'/'+index);
 return {question:useDirection==='term-to-def'?card.word:card.trans,options:englishQuizShuffle(options),correct:correct,explanation:card.note+' '+card.example};
}
function englishQuizRender(){
 if(!englishQuizState)return;
 var st=englishQuizState;
 if(st.position>=st.plan.length){renderScreen('result');return;}
 var entry=st.plan[st.position],q=englishQuizPrepare(entry);
 st.question=q;st.locked=false;st.feedback=null;
 var question='Контроль '+(st.position+1)+' / '+st.plan.length;
 var opts=q.options.map(function(o,i){return '<button type="button" class="quiz-opt english-quiz-choice" data-answer="'+i+'" onclick="englishQuizAnswer('+i+')">'+englishQuizEscape(o)+'</button>';}).join('');
 app.innerHTML='<h1>'+question+'</h1><section class="flashcard" id="quiz-card"><div class="fc-word english-quiz-question">'+englishQuizEscape(q.question)+'</div><div class="fc-trans english-quiz-hint">Выберите один правильный ответ</div></section><div class="quiz-options">'+opts+'</div><div class="english-quiz-feedback" id="english-quiz-feedback" aria-live="polite"></div><button class="btn btn-stop" onclick="renderScreen(\'topics\',{mode:\'quiz\'})">Прервать</button>';
}
function englishQuizAnswer(choice){
 var st=englishQuizState;if(!st||st.locked)return;
 var q=st.question;st.locked=true;
 var correct=q.options[choice]===q.correct;
 if(!correct)st.mistakes++;
 mistakes=st.mistakes;
 var buttons=app.querySelectorAll('.english-quiz-choice');
 buttons.forEach(function(el,i){el.disabled=true;if(q.options[i]===q.correct)el.classList.add('correct');else if(i===choice)el.classList.add('wrong');});
 var area=document.getElementById('english-quiz-feedback');
 area.innerHTML='<p><strong>'+(correct?'✓ Верно!':'✕ Пока неверно. Правильный ответ: '+englishQuizEscape(q.correct))+'</strong></p><p>'+englishQuizEscape(q.explanation)+'</p><button class="btn btn-orange" type="button" onclick="englishQuizNext()">'+(st.position===st.plan.length-1?'Завершить контроль':'Следующий вопрос →')+'</button>';
 playSound(correct?'success':'error');
}
function englishQuizNext(){
 if(!englishQuizState||!englishQuizState.locked)return;
 englishQuizState.position++;
 quizIndex=englishQuizState.position;
 if(englishQuizState.position>=englishQuizState.plan.length){mistakes=englishQuizState.mistakes;renderScreen('result');}
 else englishQuizRender();
}
