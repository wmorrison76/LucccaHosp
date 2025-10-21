export function activateEasterEgg(callback) {
  window.addEventListener('keydown', (e) => {
    if (e.key === ';' && e.metaKey) {
      callback();
    }
  });
}