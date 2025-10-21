export function calculateCakeSupports({ diameter, height }) {
  let internalRods = 0;
  let baseBoards = 1;

  if (diameter >= 10) internalRods = Math.floor(diameter / 4);
  if (height >= 4) baseBoards = 2;

  return { internalRods, baseBoards };
}
