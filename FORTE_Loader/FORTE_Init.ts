import FORTELoader from './FORTE_Loader';

export function startFORTE(onComplete) {
  return <FORTELoader onComplete={onComplete} />;
}