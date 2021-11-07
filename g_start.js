// INTRO SCREEN

let KEY_LEFT = "A".charCodeAt(0);
let KEY_RIGHT = "D".charCodeAt(0);
let KEY_UP = "W".charCodeAt(0);
let KEY_DOWN = "S".charCodeAt(0);
let KEY_JUMP = " ".charCodeAt(0);
let KEY_SHOOT = "J".charCodeAt(0);
let KEY_CROUCH = 16;

function g_start(ctx) {    
    g_intro = false;
    introLoop(ctx);
}

function introLoop(ctx) {
    ctx.drawImage(g_images.spaceScene, 0, 0)
    if (eatKey(KEY_LEFT) || eatKey(KEY_RIGHT) || eatKey(KEY_UP) || eatKey(KEY_DOWN) || eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) {
        m_Intro.play();
        // setTimeout(function() {m_Boom.play();}, 7000)
        spaceScene(ctx)

        setTimeout(function() { zoomLetters(g_canvas.width/2,g_canvas.height*1.3,1700,ctx); }, 13500);
        setTimeout(function() { startOption(ctx); }, 19000);
        return;
    }
    setTimeout(function() { introLoop(ctx); }, 20);
}

var notStarted = true;
var endScene = false;

function spaceScene(ctx) {
    let path = 1;
    let baseWidth = 70;
    let baseHeight = 70;
    drawSubScene(ctx,-100,400,80,path, baseWidth, baseHeight)
}

function drawSubScene(ctx, x, y, r, path, baseWidth, baseHeight) {
    let curve = 0.002
    let rotate = 0.015;
    if (path < -0.2) { curve = 0.1; rotate = 0.1 / curve; baseWidth -= 0.5; baseHeight -= 0.5; }
    if (endScene) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(g_images.spaceScene, 0, 0)
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(r*Math.PI/180)
    ctx.drawImage(g_images.ship, -20, -20, baseWidth, baseHeight)
    ctx.restore()
    if (eatKey(KEY_LEFT) || eatKey(KEY_RIGHT) || eatKey(KEY_UP) || eatKey(KEY_DOWN) || eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) {
        startOption(ctx); console.log("SKIP!")
        return;
    }
    setTimeout(function() { drawSubScene(ctx, x+1.5, y-0.5*path, r + rotate, path - curve, baseWidth, baseHeight); }, 15);
}

function zoomLetters(x,y,s,ctx) {
    if (g_skip) return;
    endScene = true;
    if (s > 60) {
        g_ZenFont.load().then(function(font) {
            document.fonts.add(font);

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(g_images.spaceScene, 0, 0)
            ctx.font = `${s}px ZenDots`;
            ctx.fillStyle = 'red';
            ctx.save();
            ctx.textAlign = `center`;
            ctx.fillText('SPACE CONTRA', x, y);
            ctx.restore();
        }).catch(function(error) {
            console.log("Something a' matter");
        });
        if (eatKey(KEY_LEFT) || eatKey(KEY_RIGHT) || eatKey(KEY_UP) || eatKey(KEY_DOWN) || eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) {
            startOption(ctx); console.log("SKIP!")
            return;
        }
        setTimeout(function() { zoomLetters(x,y-3.409090909,s-7.454545455,ctx); }, 25);
    }
}


function startOption(ctx) {
    if (g_skip) return;
    g_skip = true;
    g_intro = true;
    g_pressStartFont.load().then(function(font) {
        document.fonts.add(font);
        ctx.font = '20px PressStart2P';
        ctx.fillStyle = 'white';
        ctx.save();
        ctx.textAlign = 'center';
        ctx.fillText('Press Start', x, 500);
        ctx.restore();
    }).catch(function(error) {
        console.log("Something a' matter");
    });
    setTimeout(function() {oscillateColors(ctx)}, 600);
}

var grey = false;
var white = true;

function oscillateColors(ctx) {
    let x = g_canvas.width/2
    let y = 251.80909092899515 
    let s = 67.45454535499714

    g_ZenFont.load().then(function(font) {
        document.fonts.add(font);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(g_images.spaceScene, 0, 0)
        ctx.font = `${s}px ZenDots`;
        ctx.fillStyle = 'red';
        ctx.save();
        ctx.textAlign = `center`;
        ctx.fillText('SPACE CONTRA', x, y);
        ctx.restore();
    }).catch(function(error) {
        console.log("Something a' matter");
    });

    if (white) {
        g_pressStartFont.load().then(function(font) {
            document.fonts.add(font);
            ctx.font = '20px PressStart2P';
            ctx.fillStyle = 'gray';
            ctx.save();
            ctx.textAlign = 'center';
            ctx.fillText('Press Start', x, 500);
            ctx.restore();
        }).catch(function(error) {
            console.log("Something a' matter");
        });
        grey = true;
        white = false;
        if (notStarted) setTimeout(function() {oscillateColors(ctx)}, 600);
        return;
    }

    if (grey) {
        g_pressStartFont.load().then(function(font) {
            document.fonts.add(font);
            ctx.font = '20px PressStart2P';
            ctx.fillStyle = 'white';
            ctx.save();
            ctx.textAlign = 'center';
            ctx.fillText('Press Start', x, 500);
            ctx.restore();
        }).catch(function(error) {
            console.log("Something a' matter");
        });
        grey = false;
        white = true;
        if (notStarted) setTimeout(function() {oscillateColors(ctx)}, 600);
        return;
        }
}
function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }