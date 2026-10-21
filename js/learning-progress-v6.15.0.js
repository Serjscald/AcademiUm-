/* AcademiUm v6.15.0 — per-topic learning progress, device-only. */
(function(global){
'use strict';
var prefix='academium:learn:v1:';
function fingerprint(cards){
  var s=JSON.stringify(cards), h=2166136261;
  for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}
  return (h>>>0).toString(36)+':'+s.length;
}
function create(subject,topic,cards){
  var key=prefix+subject+':'+topic;
  var signature=fingerprint(cards);
  function clear(){try{global.localStorage.removeItem(key);}catch(e){}}
  function load(){
    try{
      var v=JSON.parse(global.localStorage.getItem(key));
      if(!v)return null;
      var valid=v.version===1 && v.signature===signature && Number.isInteger(v.index) &&
        v.index>=0 && v.index<cards.length && Array.isArray(v.order) &&
        v.order.length===cards.length && new Set(v.order).size===cards.length &&
        v.order.every(function(n){return Number.isInteger(n)&&n>=0&&n<cards.length;});
      if(!valid){clear();return null;}
      return v;
    }catch(e){return null;}
  }
  function save(order,index){
    if(!Array.isArray(order)||index<0||index>=cards.length)return;
    try{global.localStorage.setItem(key,JSON.stringify({version:1,signature:signature,index:index,order:order}));}catch(e){}
  }
  return {load:load,save:save,clear:clear};
}
global.AcademiumProgress={create:create};
})(window);
