var levels = [];
var currentLevel = -1;

// const levelPaths = [
//   "https://notendur.hi.is/~jks21/Contra/Level%201%20Caves.jsonMaps/Level%201%20Caves.json",
//   "https://notendur.hi.is/~jks21/Contra/Level%201%20Caves.json/Level%202%20Alien%20Base.json"
// ];

// const loadLevels = async function() {
//   let id = 1;
//   for (const path of levelPaths) {
//     const result = await fetch(path)
//       .then(res => res.json())
//       .finally(data => data)
//       .catch((e) => console.error("Failed to load levels: " + e))
//     result.id = id;
//     result.tilesize = p_realSize * 0.4;
//     levels.push(result);
//     id++;
//   };
// }

const loadLevels = async function() {
  let id = 1;
  level1.id = id;
  level1.tilesize = p_realSize * 0.4;
  levels.push(level1);
  id++;
  level2.id = id;
  level2.tilesize = p_realSize * 0.4;
  levels.push(level2);
}