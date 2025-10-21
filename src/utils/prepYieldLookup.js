const prepYields = {
  "trim": "95%",
  "peel": "90%",
  "chop": "100%",
  "slice": "100%",
  "cleaned": "85%",
  "fillet": "65%",
  "debone": "80%",
  "blanched": "98%",
  "grilled": "85%",
  "roasted": "80%",
  "seared": "90%",
  "boiled": "95%",
  "steamed": "96%",
  "baked": "92%",
  "julienne": 0.80,
  "brunoise": 0.75,
  "batonnet": 0.82,
  "dice small": 0.75,
  "dice medium": 0.77,
  "dice large": 0.80,
  "chiffonade": 0.85,
  "paysanne": 0.78,
  "tournée": 0.60,
  "mince": 0.85,
  "rondelle": 0.88,
  "concassé": 0.70
};

const prepYieldLookup = (method) => {
  const key = method.trim().toLowerCase();
  return prepYields[key] !== undefined ? prepYields[key] : "";
};

export default prepYieldLookup;
