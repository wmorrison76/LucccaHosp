// src/modules/calendar/utils/tvRemoteListener.js
export const initTVRemoteNavigation = (listRef) => {
  let index = 0;

  const handleKeyDown = (e) => {
    const items = listRef.current?.querySelectorAll("li");
    if (!items?.length) return;

    if (e.key === "ArrowDown") {
      index = Math.min(index + 1, items.length - 1);
    } else if (e.key === "ArrowUp") {
      index = Math.max(index - 1, 0);
    } else if (e.key === "Enter") {
      items[index]?.click();
    }

    items.forEach((el, i) => {
      el.style.backgroundColor = i === index ? "#1e293b" : "transparent";
    });
  };

  window.addEventListener("keydown", handleKeyDown);
};

export default initTVRemoteNavigation;
