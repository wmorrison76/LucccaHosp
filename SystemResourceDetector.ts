export const SystemResourceDetector = () => {
  const memory = navigator.deviceMemory || 4;
  const isLowPerf = memory <= 4 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return { isLowPerf, mode: isLowPerf ? 'light' : 'full' };
};