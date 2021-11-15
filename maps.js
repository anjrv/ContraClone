var levels = [];
var currentLevel = -1;

const levelPaths = [
  "/Maps/Level 1 Caves.json",
  "/Maps/Level 2 Alien Base.json"
];

const loadLevels = async function() {
  let id = 1;
  for (const path of levelPaths) {
    const result = await fetch(path)
      .then(res => res.json())
      .finally(data => data)
      .catch((e) => console.error("Failed to load levels: " + e))
    result.id = id;
    result.tilesize = p_realSize * 0.4;
    levels.push(result);
    id++;
  };
}

// 'NO', 'NP', 'NQ'
// 'OO', 'OP', 'OQ' doorway

// 'nV', 'nW',
// 'oV', 'oW',
// 'pV', 'pW', small tree

// 'lT', 'lU'
// 'mT', 'mU'
// 'nT', 'nU'
// 'oT', 'oU'
// 'pT', 'pU' big tree

// 'EK', 'EL', 'EM', 'EN', 'EK'
// 'FK', 'FL', 'FM', 'FN', 'FK'
// 'GK', 'GL', 'GM', 'GN', 'GK'
// 'HK', 'HL', 'HM', 'HN', 'HK'

