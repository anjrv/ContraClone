let level = {
    cols: 100,
    rows: 20,
    playerSpawn: 0,
    name: "New level",
    levelTransitionX: 95,
    // Structure layers as single rows that can be queried with row/col info
    // This allows us to add additional background/foreground layers somewhat easily 
    layers: [
        new Array(20).fill([]).map(() => new Array(100).fill('  ')),
        new Array(20).fill([]).map(() => new Array(100).fill('  ')),
        new Array(20).fill([]).map(() => new Array(100).fill('  '))
    ]
    // NOTE: Currently using characters for environmental variables
    // and numbers as "character" entities, 0 being player spawn tile
  }

let click_flag = false;
let zoom = 1;
let all_tools = [
    "move",
    "draw",
    "erase",
    "pick",
    "move player",
    "clone",
    "stamp"
]
let tool = "move";
let selected_sprite = 'AA';
let stamp_sprite = [['AA']];
let enemySprites = {};
let selectedLayer = 1;
let onlyLayer = false;

const initial_position = { x: 0, y: 0 }

const last_translation = { x: 0, y: 0 }

const translation = { x: 0, y: 0 }

const ZOOM_IN = 'J'.charCodeAt(0);
const ZOOM_OUT = 'I'.charCodeAt(0);

const getMouseTile = function() {
    const mouseTile = {
        x: Math.floor((g_mouseX - translation.x) / (zoom * g_sprites.tilesheet.sWidth)),
        y: Math.floor((g_mouseY - translation.y) / (zoom * g_sprites.tilesheet.sHeight))
    }
    return mouseTile;
}

const EditorLoop = function() {
    update()
    render();
    window.requestAnimationFrame(EditorLoop);
}

const update = function() {
    if (tool == "move") {
        if (g_mouse_buttons[1]) {
            if (!click_flag) {
                initial_position.x = g_mouseX;
                initial_position.y = g_mouseY;
                click_flag = true;
            }
            translation.x = last_translation.x + (g_mouseX - initial_position.x);
            translation.y = last_translation.y + (g_mouseY - initial_position.y);
        } else {
            if (click_flag) {
                last_translation.x = translation.x;
                last_translation.y = translation.y
    
                click_flag = false;
            }
        }
    }

    if (tool == "draw" || tool == "erase") {
        if (g_mouse_buttons[1]) {
            const {x, y} = getMouseTile();
            if (x >= 0 && y >= 0 && x < level.cols && y < level.rows) {
                level.layers[selectedLayer][y][x] = tool === "erase" ? '  ' : selected_sprite;
            }
        }
    }

    if (tool == "pick") {
        if (g_mouse_buttons[1]) {
            const {x, y} = getMouseTile();
            if (x >= 0 && y >= 0 && x <= level.cols && y <= level.rows) {
                selected_sprite = level.layers[selectedLayer][y][x];
                tool = "draw"
            }
        }
    }

    if (tool == "move player") {
        if (g_mouse_buttons[1]) {
            const {x, y} = getMouseTile();
            if (x >= 0 && y >= 0 && x <= level.cols && y <= level.rows) {
                level.playerSpawn = x + y*level.cols; 
            }
        }
    }

    if (tool == "clone") {
        const {x, y} = getMouseTile();
        if (g_mouse_buttons[1]) {
            if (!click_flag) {
                initial_position.x = x;
                initial_position.y = y;
                click_flag = true;
            }
        } else {
            if (click_flag) {
                stamp_sprite = [];
                for (let i = Math.min(initial_position.y, y); i <= Math.max(initial_position.y, y); i++) {
                    stamp_sprite.push(level.layers[selectedLayer][i].slice(Math.min(initial_position.x, x), Math.max(initial_position.x, x) + 1))
                }
                click_flag = false;
            }
        }
    }

    if (tool == "stamp") {
        const {x, y} = getMouseTile();
        if (g_mouse_buttons[1]) {
            for (let j = 0; j < stamp_sprite.length; j++) {
                for (let i = 0; i < stamp_sprite[j].length; i++) {
                    if (y + j > level.rows || x + i + 1 > level.cols || x + j < 0 || y + j < 0) continue;
                    level.layers[selectedLayer][y + j][x + i] = stamp_sprite[j][i];
                }
            }
        }
    }

    if (eatKey(ZOOM_IN)) {
        zoom *= 1.1;
    }
    if (eatKey(ZOOM_OUT)) {
        zoom /= 1.1;
    }
}

const render = function() {
    const tilesheet = g_sprites.tilesheet;
    tilesheet.scale = 1;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(translation.x, translation.y);
    ctx.scale(zoom,zoom);
    for (let i = 0; i < level.layers.length; i++) {
        let layer = "";
        if (onlyLayer) {
            layer = level.layers[selectedLayer];
        } else {
            layer = level.layers[i];
        }
        for (let y = 0; y < layer.length; y++) {
            for (let x = 0; x < layer[y].length; x++) {
                if (layer[y][x] === '  ') {                
                    ctx.strokeRect(x * tilesheet.sWidth, y * tilesheet.sHeight, tilesheet.sWidth, tilesheet.sHeight);
                } else if (layer[y][x] === '1' ||
                    layer[y][x] === '2' ||
                    layer[y][x] === '3' ||
                    layer[y][x] === '4' ||
                    layer[y][x] === '5' ||
                    layer[y][x] === '6' ||
                    layer[y][x] === '7') {
                    let sprite = enemySprites[layer[y][x]];
                    const originalScale = sprite.scale;
                    sprite.scale = 0.5;
                    sprite.drawCentredAt(ctx, x * tilesheet.sWidth + tilesheet.sWidth / 2, y * tilesheet.sHeight + tilesheet.sHeight / 2, 0);
                    sprite.scale = originalScale;
                    continue
                } else {
                    tilesheet.animation = layer[y][x];
                    tilesheet.updateFrame(0);
                    tilesheet.drawCentredAt(ctx, x * tilesheet.sWidth + tilesheet.sWidth / 2, y * tilesheet.sHeight + tilesheet.sHeight / 2, 0);
                }
                if (x >= level.levelTransitionX) {
                    const fillStyle = ctx.fillStyle;
                    ctx.fillStyle = 'rgba(0,255,0,0.5)';
                    ctx.fillRect(x * tilesheet.sWidth, y * tilesheet.sHeight, tilesheet.sWidth, tilesheet.sHeight)
                    ctx.fillStyle = fillStyle;
                } 
            }
        }
        if (onlyLayer) break;
    }
    const player_x = level.playerSpawn % level.cols;
    const player_y = Math.floor(level.playerSpawn / level.cols);

    g_sprites.lives.scale = 0.4
    g_sprites.lives.drawCentredAt(ctx, player_x * tilesheet.sWidth + tilesheet.sWidth / 2, player_y * tilesheet.sHeight + tilesheet.sHeight / 2, 0)
    ctx.restore();
}

const createTools = function() {
    const toolContainer = document.querySelector('#tool_container');
    const toolCallback = function(e) {
        tool = e.target.dataset.action;
    }
    for (let tool_item of all_tools) {
        const tool_button = document.createElement('button');
        tool_button.innerText = tool_item.charAt(0).toUpperCase() + tool_item.slice(1);
        tool_button.dataset.action = tool_item;
        tool_button.addEventListener('click', toolCallback);
        toolContainer.appendChild(tool_button);
    }
}

const createPalette = function() {
    const paletteContainer = document.querySelector('#palette_container');
    const paletteCallback = function (e) {
        selected_sprite = e.target.dataset.sprite;
    }
    // Tilesheet sprites
    const paletteDetails = document.createElement('details');
    const paletteSummary = document.createElement('summary');
    const paletteDetailsScroll = document.createElement('div');
    const paletteDetailsContainer = document.createElement('div');

    paletteDetails.setAttribute('open', '')
    paletteDetailsContainer.style = `
        display: flex;
        flex-wrap: wrap;
        width: 864px;
    `;
    paletteDetailsScroll.style = `
        width: 300px;
        height: 300px;
        overflow: scroll;
    `
    paletteSummary.textContent = 'Palette options';
    paletteDetailsScroll.appendChild(paletteDetailsContainer);
    paletteDetails.appendChild(paletteSummary);
    paletteDetails.appendChild(paletteDetailsScroll);
    paletteContainer.appendChild(paletteDetails);
    const options = Object.keys(g_sprites.tilesheet.animations);
    for (let option of options) {
        const palette_image = document.createElement('canvas');
        palette_image.setAttribute('width', 30);
        palette_image.setAttribute('height', 30);
        palette_image.style = `
            margin: 0;
            border: 1px solid magenta;
        `
        palette_image.dataset.sprite = option;
        const paletteCTX = palette_image.getContext('2d');
        g_sprites.tilesheet.scale = 1.9;
        g_sprites.tilesheet.animation = option;
        g_sprites.tilesheet.updateFrame(0);
        g_sprites.tilesheet.drawCentredAt(paletteCTX, 15, 15)
        paletteDetailsContainer.addEventListener('click', paletteCallback);
        paletteDetailsContainer.appendChild(palette_image);
    }

    // Enemy sprites
    const enemyDetails = document.createElement('details');
    const enemySummary = document.createElement('summary');
    const enemyDetailsContainer = document.createElement('div');

    enemyDetails.setAttribute('open', '')
    enemyDetailsContainer.style = `
        width: 100%;
        height: 300px;
        overflow-y: scroll;
    `;
    enemySummary.textContent = "Enemy options";
    enemyDetails.appendChild(enemySummary);
    enemyDetails.appendChild(enemyDetailsContainer);
    paletteContainer.appendChild(enemyDetails);

    const enemyOptions = Object.keys(enemySprites);
    for (let option of enemyOptions) {
        const enemy_image = document.createElement('canvas');
        enemy_image.setAttribute('width', 32);
        enemy_image.setAttribute('height', 32);
        enemy_image.dataset.sprite = option;
        const paletteCTX = enemy_image.getContext('2d');
        enemySprites[option].animation = "IDLE";
        enemySprites[option].updateFrame(0);
        enemySprites[option].drawCentredAt(paletteCTX, 16, 16)
        enemyDetailsContainer.addEventListener('click', paletteCallback);
        enemyDetailsContainer.appendChild(enemy_image);
    }
}

const start = function() {
    enemySprites = {
        '1': g_sprites.patrol,
        '2': g_sprites.airpatrol,
        '3': g_sprites.charger,
        '4': g_sprites.pursuer,
        '5': g_sprites.walker,
        '6': g_sprites.walker,
        '7': g_sprites.crawler
    }
    const nameInput = document.querySelector('#levelName');
    nameInput.value = level.name;
    nameInput.addEventListener('input', (e) => { level.name = e.target.value; })

    const download = document.querySelector('#downloadLevel');
    download.addEventListener('click', (e) => { 
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(level))}`);
        element.setAttribute('download', `${level.name}.json`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    } );

    const upload = document.querySelector('#uploadLevel');
    upload.addEventListener('change', (e) => { 
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (function(thefile) {
            return function(e) {
                level = JSON.parse(e.target.result);
                document.querySelector('#levelRows').value = level.rows;
                document.querySelector('#levelColumns').value = level.cols;
                document.querySelector('#levelName').value = level.name;
                document.querySelector('#levelTransitionX').value = level.levelTransitionX;
            }
        })(file);
        reader.readAsText(file)
    })

    const rows = document.querySelector('#levelRows');
    rows.value = level.rows;
    rows.addEventListener('change', (e) => {
        level.rows = parseInt(e.target.value);
        for (let i = 0; i < level.layers.length; i++) {
            if (e.target.value < level.layers[i].length) {
                level.layers[i].splice(parseInt(e.target.value) + 1);
            } else {
                level.layers[i].push(...new Array(e.target.value - level.layers[i].length + 1).fill([]).map(() => new Array(level.cols).fill('  ')));
            }
        }
    });

    const cols = document.querySelector('#levelColumns');
    cols.value = level.cols;
    cols.addEventListener('change', (e) => {
        level.cols = parseInt(e.target.value);
        for (let j = 0; j < level.layers.length; j++) {
            for(let i = 0; i < level.layers[j].length; i++) {
                if (level.cols < level.layers[j][i].length) {
                    level.layers[j][i].splice(level.cols);
                } else {
                    level.layers[j][i].push(...new Array(level.cols - level.layers[j][i].length).fill('  '));
                }
            }
        }
    });

    const levelTransitionX = document.querySelector('#levelTransitionX');
    levelTransitionX.value = level.levelTransitionX;
    levelTransitionX.addEventListener('change', (e) => {
        level.levelTransitionX = parseInt(e.target.value);
    })

    const layerSelect = document.querySelector('#levelLayer');
    layerSelect.value = selectedLayer;
    layerSelect.addEventListener('change', (e) => {
        selectedLayer = parseInt(e.target.value);
    })

    const onlyLayerCheckbox = document.querySelector('#levelOnlyLayer');
    onlyLayerCheckbox.addEventListener('change', (e) => {
        onlyLayer = e.target.checked;
    })

    const clearLayer = document.querySelector('#levelClearLayer');
    clearLayer.addEventListener('click', (e) => {
        for (let i = 0; i < level.rows; i++) {
            for (let j = 0; j < level.cols; j++) {
                level.layers[selectedLayer][i][j] = '  ';
            }
        }
    });

    createTools();
    createPalette();
    window.requestAnimationFrame(EditorLoop);
}