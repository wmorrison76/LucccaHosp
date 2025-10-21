// src/modules/pastry/cake/utils/EdibleExportUtils.js

/**
 * Generates an export file for edible print layout
 * Accepts cake design name, decor elements, and a snapshot image
 */
export const generateEdiblePrinterFile = ({ cakeName, decorations, imageDataURL }) => {
  const exportData = {
    type: "edible-print",
    cakeName,
    timestamp: new Date().toISOString(),
    decorations,
    printPreview: imageDataURL,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });

  return URL.createObjectURL(blob);
};

export default generateEdiblePrinterFile;
