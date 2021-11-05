const cols = 48;

const level1 = {
  cols: 48,
  rows: 10,
  tilesize : p_realSize / 2,
  playerSpawn: 4 * cols + g_playerEntryPos,
  // Structure layers as single rows that can be queried with row/col info
  // This allows us to add additional background/foreground layers somewhat easily 
  layers: [
    [
      ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"], 
      ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "G", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "G", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "G", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "G", "E"],
      ["E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "G", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "G", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "G", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "G", "E"],
      ["E", "E", "E", "E", "G", "G", "E", "F", "F", "F", "G", "E", "E", "E", "E", "E", "G", "G", "E", "F", "F", "F", "G", "E", "E", "E", "E", "E", "G", "G", "E", "F", "F", "F", "G", "E", "E", "E", "E", "E", "G", "G", "E", "F", "F", "F", "G", "E"],
      ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
      ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
      ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"]
    ]
  ]
  // NOTE: Currently using characters for environmental variables
  // and numbers as "character" entities, 0 being player spawn tile
}