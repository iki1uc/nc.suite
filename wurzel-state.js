// wurzel-state.js - Fundament
window.WURZEL_STATE = (function(){
  let state = {HOME:'CLOSED',ORT:'LEER',PRUEF:'UNGEPRUEFT'};
  let cb=null;
  return {
    zustand: ()=>({...state}),
    set: function(k,v){
      state[k]=v;
      if(cb) cb(state);
      console.log('[WURZEL_STATE] set',k,'=',v,state);
      try{ localStorage.setItem('wurzel-state', JSON.stringify(state)); }catch(e){}
    },
    onRemote: null,
    get onRemoteSetter(){return null},
    set onRemote(fn){ cb=fn; this._cb=fn; },
    get _cb(){return cb}
  };
})();
// Restore
try{
  const s=localStorage.getItem('wurzel-state');
  if(s){ const o=JSON.parse(s); Object.assign(window.WURZEL_STATE.zustand(),o); }
}catch(e){}
console.log('[wurzel-state.js] ready', window.WURZEL_STATE.zustand());
