// SnapLogicEngine.js
// Provides logic to calculate snapping points for drag/drop alignment

export function calculateSnapGuides(elements, currentBox, threshold = 5) {
  const guides = [];

  elements.forEach((el) => {
    const deltaX = Math.abs(el.left - currentBox.left);
    const deltaY = Math.abs(el.top - currentBox.top);

    if (deltaX <= threshold) {
      guides.push({ orientation: "vertical", position: el.left });
    }

    if (deltaY <= threshold) {
      guides.push({ orientation: "horizontal", position: el.top });
    }
  });

  return guides;
}
export default calculateSnapGuides;
