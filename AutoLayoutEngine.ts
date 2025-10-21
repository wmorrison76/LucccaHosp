export const AutoLayoutEngine = {
  tile: (panes, containerWidth, containerHeight) => {
    const columns = Math.ceil(Math.sqrt(panes.length));
    const rows = Math.ceil(panes.length / columns);
    return panes.map((pane, i) => {
      const x = (i % columns) * (containerWidth / columns);
      const y = Math.floor(i / columns) * (containerHeight / rows);
      return { ...pane, x, y };
    });
  },
};