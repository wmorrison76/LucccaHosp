export function getPastryKnowledgeBase(req, res) {
  const knowledgeBase = {
    techniques: require('../data/pastry_techniques.json'),
    chocolateTempering: require('../data/chocolate_tempering.json'),
    sugarTempering: require('../data/sugar_tempering.json'),
    spiceTempering: require('../data/spice_tempering.json'),
    gelatoBases: require('../data/gelato_bases.json')
  };

  res.json(knowledgeBase);
}
