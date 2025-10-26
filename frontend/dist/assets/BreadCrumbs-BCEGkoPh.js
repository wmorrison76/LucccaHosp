import { r as reactExports } from "./index-DfBvRGLH.js";
function useBreadcrumbs(initial = []) {
  const [paths, setPaths] = reactExports.useState(initial);
  const updateBreadcrumbs = (newPaths) => {
    setPaths(newPaths);
  };
  return { paths, updateBreadcrumbs };
}
export {
  useBreadcrumbs
};
