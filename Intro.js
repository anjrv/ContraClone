// INTRO SCREEN
let startHighlight;
let shopHighlight;
let inShop;
let g_skipped;

function intro(ctx) {
  g_intro = false;
  g_playing = false;
  g_skip = false;
  g_skipped = false;
  introLoop(ctx);
}

function introLoop(ctx) {
  if (g_playing) return;
  ctx.drawImage(g_images.spaceScene, 0, 0);
  if (
    eatKey(KEY_LEFT) ||
    eatKey(KEY_RIGHT) ||
    eatKey(KEY_UP) ||
    eatKey(KEY_DOWN) ||
    eatKey(KEY_JUMP) ||
    eatKey(KEY_SHOOT)
  ) {
    m_Intro.play();
    // setTimeout(function() {m_Boom.play();}, 7000)
    spaceScene(ctx);

    setTimeout(function () {
      zoomLetters(g_canvas.width / 2, g_canvas.height * 1.3, 1700, ctx);
    }, 13500);
    setTimeout(function () {
      startOption(ctx);
    }, 18500);
    return;
  }
  setTimeout(function () {
    introLoop(ctx);
  }, 20);
}

let notStarted = true;
let endScene = false;

function spaceScene(ctx) {
  console.log('Drawing space scene');
  if (g_playing) return;
  let path = 1;
  let baseWidth = 70;
  let baseHeight = 70;
  drawSubScene(ctx, -100, 400, 80, path, baseWidth, baseHeight);
}

function drawSubScene(ctx, x, y, r, path, baseWidth, baseHeight) {
  console.log('Drawing subscene');
  if (g_playing) return;
  let curve = 0.002;
  let rotate = 0.015;
  if (path < -0.2) {
    curve = 0.1;
    rotate = 0.1 / curve;
    baseWidth -= 0.5;
    baseHeight -= 0.5;
  }
  if (endScene) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(g_images.spaceScene, 0, 0);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((r * Math.PI) / 180);
  ctx.drawImage(g_images.ship, -20, -20, baseWidth, baseHeight);
  ctx.restore();
  if (
    eatKey(KEY_LEFT) ||
    eatKey(KEY_RIGHT) ||
    eatKey(KEY_UP) ||
    eatKey(KEY_DOWN) ||
    eatKey(KEY_JUMP) ||
    eatKey(KEY_SHOOT)
  ) {
    g_skip = true;
    startOption(ctx);
    return;
  }
  setTimeout(function () {
    drawSubScene(
      ctx,
      x + 1.5,
      y - 0.5 * path,
      r + rotate,
      path - curve,
      baseWidth,
      baseHeight,
    );
  }, 15);
}

function zoomLetters(x, y, s, ctx) {
  console.log('Zoom letters');
  if (g_playing) return;
  if (g_skip) return;
  endScene = true;
  if (s > 60) {
    g_ZenFont
      .load()
      .then(function (font) {
        document.fonts.add(font);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(g_images.spaceScene, 0, 0);
        ctx.font = `${s}px ZenDots`;
        ctx.fillStyle = 'green';
        ctx.save();
        ctx.textAlign = `center`;
        ctx.fillText('SPACE CONTRA', x, y);
        ctx.restore();
      })
      .catch(function (error) {
        console.log("Something a' matter");
      });
    if (
      eatKey(KEY_LEFT) ||
      eatKey(KEY_RIGHT) ||
      eatKey(KEY_UP) ||
      eatKey(KEY_DOWN) ||
      eatKey(KEY_JUMP) ||
      eatKey(KEY_SHOOT)
    ) {
      g_skip = true;
      startOption(ctx);
      return;
    }
    setTimeout(function () {
      zoomLetters(x, y - 3.409090909, s - 7.454545455, ctx);
    }, 20);
  }
}

function startOption(ctx) {
  if (g_skipped) return;
  console.log('Start option');
  inShop = false;
  startHighlight = true;
  shopHighlight = false;
  if (g_playing) return;
  g_skip = true;
  g_intro = true;
  g_skipped = true;
  g_pressStartFont
    .load()
    .then(function (font) {
      document.fonts.add(font);
      ctx.font = '20px PressStart2P';
      ctx.fillStyle = 'white';
      ctx.save();
      ctx.textAlign = 'center';
      ctx.fillText('Start Game', x, 460);
      if (shop) ctx.fillText('Shop', x, 520);
      ctx.restore();
    })
    .catch(function (error) {
      console.log("Something a' matter");
    });
  setTimeout(function () {
    oscillateColors(ctx);
  }, 600);
  setTimeout(function () {
    checkInputs();
  }, 100);
}

let grey = false;
let white = true;

function oscillateColors(ctx) {
  if (g_playing) return;
  let x = g_canvas.width / 2;
  let y = 251.80909092899515;
  let s = 67.45454535499714;

  g_ZenFont
    .load()
    .then(function (font) {
      document.fonts.add(font);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(g_images.spaceScene, 0, 0);
      ctx.font = `${s}px ZenDots`;
      ctx.fillStyle = 'indigo';
      ctx.save();
      ctx.textAlign = `center`;
      ctx.fillText('SPACE CONTRA', x, y);
      ctx.restore();
    })
    .catch(function (error) {
      console.log("Something a' matter");
    });

  if (white) {
    g_pressStartFont
      .load()
      .then(function (font) {
        document.fonts.add(font);
        ctx.font = '20px PressStart2P';
        ctx.fillStyle = 'gray';
        ctx.save();
        ctx.textAlign = 'center';
        ctx.fillText('Start Game', x, 460);
        if (shop) ctx.fillText('Shop', x, 520);
        ctx.restore();
      })
      .catch(function (error) {
        console.log("Something a' matter");
      });
    grey = true;
    white = false;
    if (notStarted)
      setTimeout(function () {
        oscillateColors(ctx);
      }, 600);
    if (inShop)
      setTimeout(function () {
        mainShop.drawShop();
      }, 0);
    return;
  }

  if (grey) {
    g_pressStartFont
      .load()
      .then(function (font) {
        document.fonts.add(font);
        ctx.font = '20px PressStart2P';
        ctx.save();
        ctx.textAlign = 'center';
        ctx.fillStyle = startHighlight ? 'white' : 'grey';
        ctx.fillText('Start Game', x, 460);
        ctx.fillStyle = shopHighlight ? 'white' : 'grey';
        if (shop) ctx.fillText('Shop', x, 520);
        ctx.restore();
      })
      .catch(function (error) {
        console.log("Something a' matter");
      });
    grey = false;
    white = true;
    if (notStarted)
      setTimeout(function () {
        oscillateColors(ctx);
      }, 600);
    if (inShop)
      setTimeout(function () {
        mainShop.drawShop();
      }, 0);
    return;
  }
}

function checkInputs() {
  if (shop && !inShop && (eatKey(KEY_DOWN) || eatKey(KEY_UP)))
    toggleHighlights();
  if (startHighlight && (keys[KEY_JUMP] || keys[KEY_SHOOT])) {
    g_intro = false;
    notStarted = false;
    m_startGame.play();
    m_Intro.stop();
    setTimeout(function () {
      levelTransition.changeLevel();
    }, 1200);
    return;
  }
  if (!inShop && shopHighlight && (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT))) {
    inShop = true;
    mainShop.drawShop();
  }

  if (inShop && eatKey(KEY_EXIT)) {
    inShop = false;
    m_menuselect.play();
  }
  if (inShop && eatKey(KEY_DOWN)) {
    s_menuSelection = s_menuSelection === 8 ? 0 : s_menuSelection + 1;
    m_menuselect.play();
  }
  if (inShop && eatKey(KEY_UP)) {
    s_menuSelection = s_menuSelection === 0 ? 8 : s_menuSelection - 1;
    m_menuselect.play();
  }

  // Increase Base Lives
  if (
    inShop &&
    s_menuSelection === 0 &&
    (eatKey(KEY_SHOOT) || eatKey(KEY_JUMP)) &&
    s_baseLives !== s_livesMax &&
    !(s_coins < s_baseLives * 150)
  ) {
    s_coins -= s_baseLives * 150;
    s_baseLives++;
    s_lives = s_baseLives;
    m_purchase.play();
  }

  // Increase Fire Rate
  if (
    inShop &&
    s_menuSelection === 1 &&
    (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) &&
    !(s_fireRate === 10) &&
    !(s_coins < s_fireRatio * 500)
  ) {
    s_coins -= s_fireRatio * 500;
    s_fireRatio++;
    s_fireRate -= 4;
    m_purchase.play();
  }

  // Fire powerup
  if (
    inShop &&
    s_menuSelection === 2 &&
    (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) &&
    !(s_coins < 1000)
  ) {
    s_coins -= 1000;
    s_firePowerup = true;
    s_noPowerup = false;
    s_piercePowerup = false;
    s_triplePowerup = false;
    m_purchase.play();
  }

  // Triple Shot
  if (
    inShop &&
    s_menuSelection === 3 &&
    (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) &&
    !(s_coins < 1000)
  ) {
    s_coins -= 1000;
    s_firePowerup = false;
    s_noPowerup = false;
    s_piercePowerup = false;
    s_triplePowerup = true;
    m_purchase.play();
  }

  // Pierce Shot
  if (
    inShop &&
    s_menuSelection === 4 &&
    (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) &&
    !(s_coins < 1000)
  ) {
    s_coins -= 1000;
    s_firePowerup = false;
    s_noPowerup = false;
    s_piercePowerup = true;
    s_triplePowerup = false;
    m_purchase.play();
  }

  // Warp to Alien Base
  if (
    inShop &&
    s_menuSelection === 5 &&
    (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) &&
    !(s_coins < 2000)
  ) {
    s_coins -= 2000;
    currentLevel = 0;
    m_purchase.play();
  }

  // Warp to Level 3
  if (
    inShop &&
    s_menuSelection === 6 &&
    (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) &&
    !(s_coins < 3000)
  ) {
    s_coins -= 3000;
    currentLevel = 1;
    m_purchase.play();
  }

  // Warp to Level 4
  if (
    inShop &&
    s_menuSelection === 7 &&
    (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) &&
    !(s_coins < 4000)
  ) {
    s_coins -= 4000;
    currentLevel = 2;
    m_purchase.play();
  }

  // Double Jump
  if (
    inShop &&
    s_menuSelection === 8 &&
    (eatKey(KEY_JUMP) || eatKey(KEY_SHOOT)) &&
    Player.MAX_JUMPS !== 3 &&
    !(s_coins < Player.MAX_JUMPS * 1000)
  ) {
    s_coins -= Player.MAX_JUMPS * 1000;
    Player.MAX_JUMPS += 1;
    m_purchase.play();
  }
  setTimeout(function () {
    checkInputs();
  }, 0);
}

function toggleHighlights() {
  startHighlight = !startHighlight;
  shopHighlight = !shopHighlight;
  m_menuselect.play();
}

function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
