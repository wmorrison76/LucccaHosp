import { emit, on } from "../core/bus";

// host broadcasts viewport changes; clients can follow.
const EVT = {
  FOLLOW_STATE: "follow:state",  // { hostId: string | null }
  VIEWPORT: "follow:viewport",   // { x,y,scale }
};

export function startHost(getViewport:()=>{x:number;y:number;scale:number}){
  const t = setInterval(() => emit({ type: EVT.VIEWPORT, payload: getViewport() }), 250);
  emit({ type: EVT.FOLLOW_STATE, payload: { hostId: "self" }, sticky: true });
  return () => { clearInterval(t); emit({ type: EVT.FOLLOW_STATE, payload: { hostId: null }, sticky: true }); };
}

export function onViewport(cb:(v:{x:number;y:number;scale:number})=>void){
  return on(EVT.VIEWPORT, (e)=> cb(e.payload));
}

export function onFollowState(cb:(p:{hostId:string|null})=>void){
  return on(EVT.FOLLOW_STATE, (e)=> cb(e.payload));
}

export default startHost;
