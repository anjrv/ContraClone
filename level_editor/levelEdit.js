g_canvas = document.querySelector('#mapCanvas');
ctx = g_canvas.getContext('2d')


const g_images = {};
const g_sprites = {};

// Makes sure everything is preloaded before initialization.
function requestPreloads() {
  const requiredImages = {
    palette       :   '../Sprites/palette.png',
    player        :   '../Sprites/char-sheet-alpha.png',
    impactWhite   :   '../Sprites/impacts-sheet-colour-1-alpha.png',
    impactAcid    :   '../Sprites/impacts-sheet-colour-2-alpha.png',
    impactFire    :   '../Sprites/impacts-sheet-colour-3-alpha.png',
    impactPlasma  :   '../Sprites/impacts-sheet-colour-4-alpha.png',
    impactSun     :   '../Sprites/impacts-sheet-colour-5-alpha.png',
    explosion     :   '../Sprites/explosion.png',
    powerups      :   '../Sprites/powerups-sheet-alpha.png',
    projectiles   :   '../Sprites/updated_projectiles-sheet-alpha.png',
    flashWhite    :   '../Sprites/weaponflash-sheet-colour-1-alpha.png',
    flashAcid     :   '../Sprites/weaponflash-sheet-colour-2-alpha.png',
    flashFire     :   '../Sprites/weaponflash-sheet-colour-3-alpha.png',
    flashPlasma   :   '../Sprites/weaponflash-sheet-colour-4-alpha.png',
    flashSun      :   '../Sprites/weaponflash-sheet-colour-5-alpha.png',
    enemies       :   '../Sprites/enemies/enemies-sheet-alpha.png',
    pursuer       :   '../Sprites/enemies/pursuer.png',
    charger       :   '../Sprites/enemies/charger.png',
    skully        :   '../Sprites/enemies/skully.png',
    airpatrol     :   '../Sprites/enemies/airpatrol.png',
    tanker        :   '../Sprites/enemies/tanker.png',
    crawler       :   '../Sprites/enemies/crawler.png',
    walker        :   '../Sprites/enemies/walker.png',
    turret        :   '../Sprites/enemies/turret.png',
    tilesheet     :   '../Sprites/tilesheet.png',
    spaceScene    :   '../Sprites/spacescene.jpg',
    ship          :   '../Sprites/ship_2.png',
    spaceman      :   '../Sprites/spaceman.png',
    bg_layer1     :   '../Backgrounds/bg_layer1.png',
    bg_layer2     :   '../Backgrounds/bg_layer2.png',
    bg_layer3     :   '../Backgrounds/bg_layer3.png',
    lives         :   '../Sprites/lives.png',
    basepower     :   '../Sprites/basepower.png',
    firepowerup   :   '../Sprites/firepowerup.png',
    triplepowerup :   '../Sprites/triplepowerup.png',
    piercepowerup :   '../Sprites/piercepowerup.png',
    coins         :   '../Sprites/coins.png'
  }
  imagesPreload(requiredImages, g_images, preloadDone);
}

function preloadDone() {
  g_sprites.bg_layer1    = new Sprite(g_images.bg_layer1);
  g_sprites.bg_layer2    = new Sprite(g_images.bg_layer2);
  g_sprites.bg_layer3    = new Sprite(g_images.bg_layer3);
  g_sprites.palette      = new Sprite(g_images.palette)
  g_sprites.player       = new Sprite(g_images.player, 6, 48, 46, 46);
  g_sprites.player.animations = {
    IDLE: [0],
    LOOK_DOWN: [216],
    LOOK_UP: [72],
    RUN_FORWARD: [2,3,4,5],
    RUN_FORWARD_UP: [38,39,40,41],
    RUN_FORWARD_DOWN: [260,261,262,263],
    CROUCH: [7],
    JUMP: [1]
  };
  g_sprites.lives        = new Sprite(g_images.lives)
  g_sprites.basepower    = new Sprite(g_images.basepower)
  g_sprites.firepowerup  = new Sprite(g_images.firepowerup)
  g_sprites.triplepowerup = new Sprite(g_images.triplepowerup)
  g_sprites.piercepowerup = new Sprite(g_images.piercepowerup)
  g_sprites.coins        = new Sprite(g_images.coins,12,4,16,16)
  g_sprites.coins.animations = {
    GREEN: [12,13,14,15,16,17,18,19,20,21,22,23],
    GOLD: [ 24,25,26,27,28,29,30,31,32,33,34,35]
  }
  g_sprites.powerups = new Sprite(g_images.coins, 18, 9, 32, 16)
  g_sprites.powerups.animations = {
    BLUE:  [72, 73, 74, 75, 76, 77, 78, 79, 80, 81,  82, 83, 84, 85, 86, 87, 88, 89],
    GREEN: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,101,102,103,104,105,106,107],
    RED:   [108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125],
    PLASMA:[126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143],
    GOLD:  [144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161]
  }
  g_sprites.impactWhite  = new Sprite(g_images.impactWhite)
  g_sprites.impactAcid   = new Sprite(g_images.impactAcid)
  g_sprites.impactFire   = new Sprite(g_images.impactFire)
  g_sprites.impactPlasma = new Sprite(g_images.impactPlasma)
  g_sprites.impactSun    = new Sprite(g_images.impactSun)
  g_sprites.explosion    = new Sprite(g_images.explosion, 12, 1, 96, 96)
  g_sprites.explosion.animations = {
    EXPLODE: [0,1,2,3,4,5,6,7,8,9,10,11],
  }
  g_sprites.projectiles  = new Sprite(g_images.projectiles, 13, 7, 28, 28)
  g_sprites.projectiles.animations = {
    LASER: [0],
    PLASMA: [13],
    FIRE: [26, 26, 26, 26, 39, 52, 65],
    PIERCE: [78,79,80,81]
  };
  g_sprites.flashWhite   = new Sprite(g_images.flashWhite)
  g_sprites.flashAcid    = new Sprite(g_images.flashAcid)
  g_sprites.flashFire    = new Sprite(g_images.flashFire)
  g_sprites.flashPlasma  = new Sprite(g_images.flashPlasma)
  g_sprites.flashSun     = new Sprite(g_images.flashSun)
  g_sprites.enemies      = new Sprite(g_images.enemies)
  g_sprites.patrol       = new Sprite(g_images.enemies, 16, 1, 26, 26)
  g_sprites.patrol.animations = {
    IDLE: [0],
    MOVE: [0,1,2,3,4,5,6,7],
    SHOOT: [0],
    DEATH: [6,14],
    HIT_MOVE: [8,9,10,11,12,13,14,15],
    HIT_SHOOT: [8],
  }
  g_sprites.airpatrol    = new Sprite(g_images.airpatrol, 8, 2, 28, 32)
  g_sprites.airpatrol.animations = {
    IDLE: [0],
    MOVE: [0,1,2,3,4,5,6,7],
    HIT_MOVE: [8,9,10,11,12,13,14,15],
    DEATH: [0, 8]
  }
  g_sprites.charger       = new Sprite(g_images.charger, 5, 2, 20, 23)
  g_sprites.charger.animations = {
    IDLE: [0],
    MOVE: [0,1,2,3],
    JUMP: [4],
    HIT_MOVE: [5,6,7,8],
    HIT_JUMP: [9],
    DEATH: [4, 9]
  }
  g_sprites.crawler       = new Sprite(g_images.crawler, 5, 2, 38, 40)
  g_sprites.crawler.animations = {
    IDLE: [0],
    MOVE: [0,1],
    SHOOT: [2,3,4],
    HIT_MOVE: [5,6],
    HIT_SHOOT: [7,8,9],
    DEATH: [4,9]
  }
  g_sprites.pursuer       = new Sprite(g_images.pursuer, 4, 2, 68, 60)
  g_sprites.pursuer.animations = {
    IDLE: [0,1],
    MOVE: [0,1],
    SHOOT: [2,3],
    HIT_MOVE: [4,5],
    HIT_SHOOT: [6,7],
    DEATH: [0,4]
  }
  g_sprites.skully       = new Sprite(g_images.skully, 4, 2, 16,16)
  g_sprites.skully.animations = {
    IDLE: [0,1],
    MOVE: [2,3],
    HIT_MOVE: [7,8],
    DEATH: [2,6]
  }
  g_sprites.turret       = new Sprite(g_images.turret, 6, 4, 32,32)
  g_sprites.turret.animations = {
    HIDLE: [0],
    HFIRE: [1,2,3,4],
    HHITIDLE: [12],
    HDEATH: [0,12],
    HDEAD: [5],
    VIDLE: [6],
    VFIRE: [7,8,9,10],
    VHITIDLE: [18],
    VDEATH: [6,18],
    VDEAD: [11]
  }
  g_sprites.walker       = new Sprite(g_images.walker, 7, 2, 30, 38)
  g_sprites.walker.animations = {
    IDLE: [0],
    MOVE: [0,1,2,3,4,5],
    SHOOT: [6],
    HIT_MOVE: [7,8,9,10,11,12],
    HIT_SHOOT: [13],
    DEATH: [3,10]
  }
  g_sprites.tilesheet    = new Sprite(g_images.tilesheet, 27, 44, 16, 16)
  g_sprites.tilesheet.animations = {
    AA: [0],   AB: [1],   AC: [2],   AD: [3],   AE: [4],   AF: [5],   AG: [6],   AH: [7],   AI: [8],   AJ: [9],   AK: [10],  AL: [11],  AM: [12],  AN: [13],  AO: [14],  AP: [15],  AQ: [16],  AR: [17],  AS: [18],  AT: [19],  AU: [20],  AV: [21],  AW: [22],  AX: [23],  AY: [24],  AZ: [25],  AÐ: [26],
    BA: [27],  BB: [28],  BC: [29],  BD: [30],  BE: [31],  BF: [32],  BG: [33],  BH: [34],  BI: [35],  BJ: [36],  BK: [37],  BL: [38],  BM: [39],  BN: [40],  BO: [41],  BP: [42],  BQ: [43],  BR: [44],  BS: [45],  BT: [46],  BU: [47],  BV: [48],  BW: [49],  BX: [50],  BY: [51],  BZ: [52],  BÐ: [53], 
    CA: [54],  CB: [55],  CC: [56],  CD: [57],  CE: [58],  CF: [59],  CG: [60],  CH: [61],  CI: [62],  CJ: [63],  CK: [64],  CL: [65],  CM: [66],  CN: [67],  CO: [68],  CP: [69],  CQ: [70],  CR: [71],  CS: [72],  CT: [73],  CU: [74],  CV: [75],  CW: [76],  CX: [77],  CY: [78],  CZ: [79],  CÐ: [80],
    DA: [81],  DB: [82],  DC: [83],  DD: [84],  DE: [85],  DF: [86],  DG: [87],  DH: [88],  DI: [89],  DJ: [90],  DK: [91],  DL: [92],  DM: [93],  DN: [94],  DO: [95],  DP: [96],  DQ: [97],  DR: [98],  DS: [99],  DT: [100], DU: [101] ,DV: [102], DW: [103], DX: [104], DY: [105], DZ: [106], DÐ: [107], 
    EA: [108], EB: [109], EC: [110], ED: [111], EE: [112], EF: [113], EG: [114], EH: [115], EI: [116], EJ: [117], EK: [118], EL: [119], EM: [120], EN: [121], EO: [122], EP: [123], EQ: [124], ER: [125], ES: [126], ET: [127], EU: [128], EV: [129], EW: [130], EX: [131], EY: [132], EZ: [133], EÐ: [134],
    FA: [135], FB: [136], FC: [137], FD: [138], FE: [139], FF: [140], FG: [141], FH: [142], FI: [143], FJ: [144], FK: [145], FL: [146], FM: [147], FN: [148], FO: [149], FP: [150], FQ: [151], FR: [152], FS: [153], FT: [154], FU: [155], FV: [156], FW: [157], FX: [158], FY: [159], FZ: [160], FÐ: [161],
    GA: [162], GB: [163], GC: [164], GD: [165], GE: [166], GF: [167], GG: [168], GH: [169], GI: [170], GJ: [171], GK: [172], GL: [173], GM: [174], GN: [175], GO: [176], GP: [177], GQ: [178], GR: [179], GS: [180], GT: [181], GU: [182], GV: [183], GW: [184], GX: [185], GY: [186], GZ: [187], GÐ: [188],
    HA: [189], HB: [190], HC: [191], HD: [192], HE: [193], HF: [194], HG: [195], HH: [196], HI: [197], HJ: [198], HK: [199], HL: [200], HM: [201], HN: [202], HO: [203], HP: [204], HQ: [205], HR: [206], HS: [207], HT: [208], HU: [209], HV: [210], HW: [211], HX: [212], HY: [213], HZ: [214], HÐ: [215],
    JA: [216], JB: [217], JC: [218], JD: [219], JE: [220], JF: [221], JG: [222], JH: [223], JI: [224], JJ: [225], JK: [226], JL: [227], JM: [228], JN: [229], JO: [230], JP: [231], JQ: [232], JR: [233], JS: [234], JT: [235], JU: [236], JV: [237], JW: [238], JX: [239], JY: [240], JZ: [241], JÐ: [242],
    KA: [243], KB: [244], KC: [245], KD: [246], KE: [247], KF: [248], KG: [249], KH: [250], KI: [251], KJ: [252], KK: [253], KL: [254], KM: [255], KN: [256], KO: [257], KP: [258], KQ: [259], KR: [260], KS: [261], KT: [262], KU: [263], KV: [264], KW: [265], KX: [266], KY: [267], KZ: [268], KÐ: [269],
    LA: [270], LB: [271], LC: [272], LD: [273], LE: [274], LF: [275], LG: [276], LH: [277], LI: [278], LJ: [279], LK: [280], LL: [281], LM: [282], LN: [283], LO: [284], LP: [285], LQ: [286], LR: [287], LS: [288], LT: [289], LU: [290], LV: [291], LW: [292], LX: [293], LY: [294], LZ: [295], LÐ: [296],
    MA: [297], MB: [298], MC: [299], MD: [300], ME: [301], MF: [302], MG: [303], MH: [304], MI: [305], MJ: [306], MK: [307], ML: [308], MM: [309], MN: [310], MO: [311], MP: [312], MQ: [313], MR: [314], MS: [315], MT: [316], MU: [317], MV: [318], MW: [319], MX: [320], MY: [321], MZ: [322], MÐ: [323],
    NA: [324], NB: [325], NC: [326], ND: [327], NE: [328], NF: [329], NG: [330], NH: [331], NI: [332], NJ: [333], NK: [334], NL: [335], NM: [336], NN: [337], NO: [338], NP: [339], NQ: [340], NR: [341], NS: [342], NT: [343], NU: [344], NV: [345], NW: [346], NX: [347], NY: [348], NZ: [349], NÐ: [350],
    OA: [351], OB: [352], OC: [353], OD: [354], OE: [355], OF: [356], OG: [357], OH: [358], OI: [359], OJ: [360], OK: [361], OL: [362], OM: [363], ON: [364], OO: [365], OP: [366], OQ: [367], OR: [368], OS: [369], OT: [370], OU: [371], OV: [372], OW: [373], OX: [374], OY: [375], OZ: [376], OÐ: [377],
    PA: [378], PB: [379], PC: [380], PD: [381], PE: [382], PF: [383], PG: [384], PH: [385], PI: [386], PJ: [387], PK: [388], PL: [389], PM: [390], PN: [391], PO: [392], PP: [393], PQ: [394], PR: [395], PS: [396], PT: [397], PU: [398], PV: [399], PW: [400], PX: [401], PY: [402], PZ: [403], PÐ: [404],
    QA: [405], QB: [406], QC: [407], QD: [408], QE: [409], QF: [410], QG: [411], QH: [412], QI: [413], QJ: [414], QK: [415], QL: [416], QM: [417], QN: [418], QO: [419], QP: [420], QQ: [421], QR: [422], QS: [423], QT: [424], QU: [425], QV: [426], QW: [427], QX: [428], QY: [429], QZ: [430], QÐ: [431],
    RA: [432], RB: [433], RC: [434], RD: [435], RE: [436], RF: [437], RG: [438], RH: [439], RI: [440], RJ: [441], RK: [442], RL: [443], RM: [444], RN: [445], RO: [446], RP: [447], RQ: [448], RR: [449], RS: [450], RT: [451], RU: [452], RV: [453], RW: [454], RX: [455], RY: [456], RZ: [457], RÐ: [458],
    SA: [459], SB: [460], SC: [461], SD: [462], SE: [463], SF: [464], SG: [465], SH: [466], SI: [467], SJ: [468], SK: [469], SL: [470], SM: [471], SN: [472], SO: [473], SP: [474], SQ: [475], SR: [476], SS: [477], ST: [478], SU: [479], SV: [480], SW: [481], SX: [482], SY: [483], SZ: [484], SÐ: [485],
    TA: [486], TB: [487], TC: [488], TD: [489], TE: [490], TF: [491], TG: [492], TH: [493], TI: [494], TJ: [495], TK: [496], TL: [497], TM: [498], TN: [499], TO: [500], TP: [501], TQ: [502], TR: [503], TS: [504], TT: [505], TU: [506], TV: [507], TW: [508], TX: [509], TY: [510], TZ: [511], TÐ: [512],
    UA: [513], UB: [514], UC: [515], UD: [516], UE: [517], UF: [518], UG: [519], UH: [520], UI: [521], UJ: [522], UK: [523], UL: [524], UM: [525], UN: [526], UO: [527], UP: [528], UQ: [529], UR: [530], US: [531], UT: [532], UU: [533], UV: [534], UW: [535], UX: [536], UY: [537], UZ: [538], UÐ: [539],
    VA: [540], VB: [541], VC: [542], VD: [543], VE: [544], VF: [545], VG: [546], VH: [547], VI: [548], VJ: [549], VK: [550], VL: [551], VM: [552], VN: [553], VO: [554], VP: [555], VQ: [556], VR: [557], VS: [558], VT: [559], VU: [560], VV: [561], VW: [562], VX: [563], VY: [564], VZ: [565], VÐ: [566],
    WA: [567], WB: [568], WC: [569], WD: [570], WE: [571], WF: [572], WG: [573], WH: [574], WI: [575], WJ: [576], WK: [577], WL: [578], WM: [579], WN: [580], WO: [581], WP: [582], WQ: [583], WR: [584], WS: [585], WT: [586], WU: [587], WV: [588], WW: [589], WX: [590], WY: [591], WZ: [592], WÐ: [593],
    XA: [594], XB: [595], XC: [596], XD: [597], XE: [598], XF: [599], XG: [600], XH: [601], XI: [602], XJ: [603], XK: [604], XL: [605], XM: [606], XN: [607], XO: [608], XP: [609], XQ: [610], XR: [611], XS: [612], XT: [613], XU: [614], XV: [615], XW: [616], XX: [617], XY: [618], XZ: [619], XÐ: [620],
    YA: [621], YB: [622], YC: [623], YD: [624], YE: [625], YF: [626], YG: [627], YH: [628], YI: [629], YJ: [630], YK: [631], YL: [632], YM: [633], YN: [634], YO: [635], YP: [636], YQ: [637], YR: [638], YS: [639], YT: [640], YU: [641], YV: [642], YW: [643], YX: [644], YY: [645], YZ: [646], YÐ: [647],
    ZA: [648], ZB: [649], ZC: [650], ZD: [651], ZE: [652], ZF: [653], ZG: [654], ZH: [655], ZI: [656], ZJ: [657], ZK: [658], ZL: [659], ZM: [660], ZN: [661], ZO: [662], ZP: [663], ZQ: [664], ZR: [665], ZS: [666], ZT: [667], ZU: [668], ZV: [669], ZW: [670], ZX: [671], ZY: [672], ZZ: [673], ZÐ: [674],
    ÞA: [675], ÞB: [676], ÞC: [677], ÞD: [678], ÞE: [679], ÞF: [680], ÞG: [681], ÞH: [682], ÞI: [683], ÞJ: [684], ÞK: [685], ÞL: [686], ÞM: [687], ÞN: [688], ÞO: [689], ÞP: [690], ÞQ: [691], ÞR: [692], ÞS: [693], ÞT: [694], ÞU: [695], ÞV: [696], ÞW: [697], ÞX: [698], ÞY: [699], ÞZ: [700], ÞÐ: [701],
    ÆA: [702], ÆB: [703], ÆC: [704], ÆD: [705], ÆE: [706], ÆF: [707], ÆG: [708], ÆH: [709], ÆI: [710], ÆJ: [711], ÆK: [712], ÆL: [713], ÆM: [714], ÆN: [715], ÆO: [716], ÆP: [717], ÆQ: [718], ÆR: [719], ÆS: [720], ÆT: [721], ÆU: [722], ÆV: [723], ÆW: [724], ÆX: [725], ÆY: [726], ÆZ: [727], ÆÐ: [728],
    ÖA: [729], ÖB: [730], ÖC: [731], ÖD: [732], ÖE: [733], ÖF: [734], ÖG: [735], ÖH: [736], ÖI: [737], ÖJ: [738], ÖK: [739], ÖL: [740], ÖM: [741], ÖN: [742], ÖO: [743], ÖP: [744], ÖQ: [745], ÖR: [746], ÖS: [747], ÖT: [748], ÖU: [749], ÖV: [750], ÖW: [751], ÖX: [752], ÖY: [753], ÖZ: [754], ÖÐ: [755],
    ÐA: [756], ÐB: [757], ÐC: [758], ÐD: [759], ÐE: [760], ÐF: [761], ÐG: [762], ÐH: [763], ÐI: [764], ÐJ: [765], ÐK: [766], ÐL: [767], ÐM: [768], ÐN: [769], ÐO: [770], ÐP: [771], ÐQ: [772], ÐR: [773], ÐS: [774], ÐT: [775], ÐU: [776], ÐV: [777], ÐW: [778], ÐX: [779], ÐY: [780], ÐZ: [781], ÐÐ: [782],
    aA: [783], aB: [784], aC: [785], aD: [786], aE: [787], aF: [788], aG: [789], aH: [790], aI: [791], aJ: [792], aK: [793], aL: [794], aM: [795], aN: [796], aO: [797], aP: [798], aQ: [799], aR: [800], aS: [801], aT: [802], aU: [803], aV: [804], aW: [805], aX: [806], aY: [807], aZ: [808], aÐ: [809],
    bA: [810], bB: [811], bC: [812], bD: [813], bE: [814], bF: [815], bG: [816], bH: [817], bI: [818], bJ: [819], bK: [820], bL: [821], bM: [822], bN: [823], bO: [824], bP: [825], bQ: [826], bR: [827], bS: [828], bT: [829], bU: [830], bV: [831], bW: [832], bX: [833], bY: [834], bZ: [835], bÐ: [836],
    cA: [837], cB: [838], cC: [839], cD: [840], cE: [841], cF: [842], cG: [843], cH: [844], cI: [845], cJ: [846], cK: [847], cL: [848], cM: [849], cN: [850], cO: [851], cP: [852], cQ: [853], cR: [854], cS: [855], cT: [856], cU: [857], cV: [858], cW: [859], cX: [860], cY: [861], cZ: [862], cÐ: [863],
    dA: [864], dB: [865], dC: [866], dD: [867], dE: [868], dF: [869], dG: [870], dH: [871], dI: [872], dJ: [873], dK: [874], dL: [875], dM: [876], dN: [877], dO: [878], dP: [879], dQ: [880], dR: [881], dS: [882], dT: [883], dU: [884], dV: [885], dW: [886], dX: [887], dY: [888], dZ: [889], dÐ: [890],
    eA: [891], eB: [892], eC: [893], eD: [894], eE: [895], eF: [896], eG: [897], eH: [898], eI: [899], eJ: [900], eK: [901], eL: [902], eM: [903], eN: [904], eO: [905], eP: [906], eQ: [907], eR: [908], eS: [909], eT: [910], eU: [911], eV: [912], eW: [913], eX: [914], eY: [915], eZ: [916], eÐ: [917],
    fA: [918], fB: [919], fC: [920], fD: [921], fE: [922], fF: [923], fG: [924], fH: [925], fI: [926], fJ: [927], fK: [928], fL: [929], fM: [930], fN: [931], fO: [932], fP: [933], fQ: [934], fR: [935], fS: [936], fT: [937], fU: [938], fV: [939], fW: [930], fX: [941], fY: [942], fZ: [943], fÐ: [944],
    gA: [945], gB: [946], gC: [947], gD: [948], gE: [949], gF: [950], gG: [951], gH: [952], gI: [953], gJ: [954], gK: [955], gL: [956], gM: [957], gN: [958], gO: [959], gP: [960], gQ: [961], gR: [962], gS: [963], gT: [964], gU: [965], gV: [966], gW: [967], gX: [968], gY: [969], gZ: [970], gÐ: [971],
    hA: [972], hB: [973], hC: [974], hD: [975], hE: [976], hF: [977], hG: [978], hH: [979], hI: [980], hJ: [981], hK: [982], hL: [983], hM: [984], hN: [985], hO: [986], hP: [987], hQ: [988], hR: [989], hS: [990], hT: [991], hU: [992], hV: [993], hW: [994], hX: [995], hY: [996], hZ: [997], hÐ: [998],
    jA: [999] ,jB: [1000],jC: [1001],jD: [1002],jE: [1003],jF: [1004],jG: [1005],jH: [1006],jI: [1007],jJ: [1008],jK: [1009],jL: [1010],jM: [1011],jN: [1012],jO: [1013],jP: [1014],jQ: [1015],jR: [1016],jS: [1017],jT: [1018],jU: [1019],jV: [1020],jW: [1021],jX: [1022],jY: [1023],jZ: [1024],jÐ: [1025],
    kA: [1026],kB: [1027],kC: [1028],kD: [1029],kE: [1030],kF: [1031],kG: [1032],kH: [1033],kI: [1034],kJ: [1035],kK: [1036],kL: [1037],kM: [1038],kN: [1039],kO: [1030],kP: [1041],kQ: [1042],kR: [1043],kS: [1044],kT: [1045],kU: [1046],kV: [1047],kW: [1048],kX: [1049],kY: [1050],kZ: [1051],kÐ: [1052],
    lA: [1053],lB: [1054],lC: [1055],lD: [1056],lE: [1057],lF: [1058],lG: [1059],lH: [1060],lI: [1061],lJ: [1062],lK: [1063],lL: [1064],lM: [1065],lN: [1066],lO: [1067],lP: [1068],lQ: [1069],lR: [1070],lS: [1071],lT: [1072],lU: [1073],lV: [1074],lW: [1075],lX: [1076],lY: [1077],lZ: [1078],lÐ: [1079],
    mA: [1080],mB: [1081],mC: [1082],mD: [1083],mE: [1084],mF: [1085],mG: [1086],mH: [1087],mI: [1088],mJ: [1089],mK: [1090],mL: [1091],mM: [1092],mN: [1093],mO: [1094],mP: [1095],mQ: [1096],mR: [1097],mS: [1098],mT: [1099],mU: [1100],mV: [1101],mW: [1102],mX: [1103],mY: [1104],mZ: [1105],mÐ: [1106],
    nA: [1107],nB: [1108],nC: [1109],nD: [1110],nE: [1111],nF: [1112],nG: [1113],nH: [1114],nI: [1115],nJ: [1116],nK: [1117],nL: [1118],nM: [1119],nN: [1120],nO: [1121],nP: [1122],nQ: [1123],nR: [1124],nS: [1125],nT: [1126],nU: [1127],nV: [1128],nW: [1129],nX: [1130],nY: [1131],nZ: [1132],nÐ: [1133],
    oA: [1134],oB: [1135],oC: [1136],oD: [1137],oE: [1138],oF: [1139],oG: [1130],oH: [1141],oI: [1142],oJ: [1143],oK: [1144],oL: [1145],oM: [1146],oN: [1147],oO: [1148],oP: [1149],oQ: [1150],oR: [1151],oS: [1152],oT: [1153],oU: [1154],oV: [1155],oW: [1156],oX: [1157],oY: [1158],oZ: [1159],oÐ: [1160],
    pA: [1161],pB: [1162],pC: [1163],pD: [1164],pE: [1165],pF: [1166],pG: [1167],pH: [1168],pI: [1169],pJ: [1170],pK: [1171],pL: [1172],pM: [1173],pN: [1174],pO: [1175],pP: [1176],pQ: [1177],pR: [1178],pS: [1179],pT: [1180],pU: [1181],pV: [1182],pW: [1183],pX: [1184],pY: [1185],pZ: [1186],pÐ: [1187]
  }
  start();
}


requestPreloads();