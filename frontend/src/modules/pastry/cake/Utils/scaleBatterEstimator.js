// src/modules/pastry/utils/scaleBatterEstimator.js

export const scaleBatterEstimator = ({ cakeSize, cakeShape, layerCount, servings }) => {
  const baseVolumes = {
    round: {
      "6": 3,
      "8": 5,
      "10": 8,
      "12": 12
    },
    square: {
      "6": 4,
      "8": 6,
      "10": 9,
      "12": 14
    }
  };

  const volume = baseVolumes[cakeShape]?.[cakeSize] || 0;
  const totalVolume = volume * layerCount;

  const fillingRatio = 0.5; // Fillings typically 50% of batter volume
  const servingsEstimate = servings || totalVolume * 3;

  return {
    batterCups: totalVolume,
    fillingCups: totalVolume * fillingRatio,
    servingsEstimate
  };
};

export default scaleBatterEstimator;
