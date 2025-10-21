// src/modules/pastry/cake/index.js
// Central exports for the Cake module

// Your builder file on disk is CanvasBuilder.jsx.
// (If your file is named CakeCanvasBuilder.jsx instead, just change this line.)
export { default as CanvasBuilder } from "./CanvasBuilder.jsx";

// QA exporter is a NAMED export (no default)
export { CakeQAExporter } from "./CakeQAExporter.jsx";

// Optional top-level files (default exports)
export { default as CakeExportFinalizer } from "./CakeExportFinalizer.jsx";

// NOTE: folder is spelled "componets" in this module
export { default as WorkOrderBuilder } from "./componets/WorkOrderBuilder.jsx";
export { default as Cake360Viewer } from "./componets/Cake360Viewer.jsx";
export { default as WraparoundDecorationTool } from "./componets/WraparoundDecorationTool.jsx";
export { default as CakeSupportOverlay } from "./componets/CakeSupportOverlay.jsx";
export { default as DecorationPalette } from "./componets/DecorationPalette.jsx";
export { default as LayerBlock } from "./componets/LayerBlock.jsx";

// Utils
export { generateSupportMap } from "./utils/SupportMapEngine.js";
export { estimateBuildTime } from "./utils/TimeEstimator.js";
