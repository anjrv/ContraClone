const cols = 48;

const level1 = {
  cols: 134,
  rows: 20,
  tilesize : p_realSize*0.4,
  playerSpawn: 11 * cols + g_playerEntryPos*2,
  layer1: g_sprites.bg_layer1,
  layer2: g_sprites.bg_layer2,
  layer3: g_sprites.bg_layer3,
  // Structure layers as single rows that can be queried with row/col info
  // This allows us to add additional background/foreground layers somewhat easily 
  layers: [
    [
      ['EN', 'EK', 'EL', 'EN', 'EK', 'EL', 'EN', 'EK', 'EL', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '], 
      ['FK', 'FL', 'FM', 'FK', 'FL', 'FM', 'FK', 'FL', 'FM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['GK', 'GL', 'GM', 'GK', 'GL', 'GM', 'GK', 'GL', 'GM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['HK', 'HL', 'HM', 'HK', 'HL', 'HM', 'HK', 'HL', 'HM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['FK', 'FL', 'FM', 'FK', 'FL', 'FM', 'FK', 'FL', 'FM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['GK', 'GL', 'GM', 'GK', 'GL', 'GM', 'GK', 'GL', 'GM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['HK', 'HL', 'HM', 'HK', 'HL', 'HM', 'HK', 'HL', 'HM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '1',  '  ', '  ', '  ', '1',  '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['FK', 'FL', 'FM', 'FK', 'FL', 'FM', 'FK', 'FL', 'FM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '1',  '  ', '  ', '1',  '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AA', '  ', 'AA', '  ', 'AA', '  ', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['GK', 'GL', 'GM', 'GK', 'GL', 'GM', 'GK', 'GL', 'GM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AG', 'AA', 'AA', 'AA', 'AA', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['HK', 'HL', 'HM', 'HK', 'HL', 'HM', 'HK', 'HL', 'HM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '1',  '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['FK', 'FL', 'FM', 'FK', 'FL', 'FM', 'FK', 'FL', 'FM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AA', 'AA', 'AA', 'AA', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['GK', 'GL', 'GM', 'GK', 'GL', 'GM', 'GK', 'GL', 'GM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '1',  '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '1',  '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['HK', 'HL', 'HM', 'HK', 'HL', 'HM', 'HK', 'HL', 'HM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AA', 'AA', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['FK', 'FL', 'FM', 'FK', 'FL', 'FM', 'FK', 'FL', 'FM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AA', '  ', '  ', '  ', '  ', 'AA', 'AA', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AA', 'AA', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['GK', 'GL', 'GM', 'GK', 'GL', 'GM', 'GK', 'GL', 'GM', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '5',  '  ', '  ', '  ', '  ', '5',  '  ', '6',  '  ', '  ', '7',  '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '1',  '  ', '  ', '  ', '  ', '  ', '  ', 'AA', '  ', 'AA', '  ', '  ', '  ', '  ', 'AA', 'AA', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'AA', 'AA', 'AA', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK', 'EL', 'EM', 'EN', 'EK'],
      ['FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK'],
      ['GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK'],
      ['HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK', 'HL', 'HM', 'HN', 'HK'],
      ['FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK', 'FL', 'FM', 'FN', 'FK'],
      ['GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK', 'GL', 'GM', 'GN', 'GK'],
    ]
  ]
  // NOTE: Currently using characters for environmental variables
  // and numbers as "character" entities, 0 being player spawn tile
}