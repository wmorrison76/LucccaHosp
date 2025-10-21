/**
 * Odin Spear
 * Tree-walk and system summary builder.
 */
import { SystemMapGenerator } from './SystemMapGenerator';

export const OdinSpear = {
  analyze(rootPath: string) {
    return SystemMapGenerator.generate(rootPath);
  }
};
