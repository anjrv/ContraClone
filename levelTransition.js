const levelTransition = {
  changeLevel: function () {
    g_playing = true;
    currentLevel = currentLevel === levels.length - 1 ? 0 : currentLevel + 1;
    setTimeout(function () {
      levelTransition.drawLevel(g_ctx);
    }, 5);
    setTimeout(function () {
      levelTransition.startGame();
    }, 2500);
  },

  startGame: function () {
    entityManager.setStuff();
    entityManager.init();
    worldMap.init(levels[currentLevel]);
    main.restartGame();
    main.init();
    g_playing = true;
  },

<<<<<<< HEAD
    drawLevel: function(ctx) {
        ctx.clearRect(0,0,g_canvas.width, g_canvas.height);
        ctx.save()
        ctx.fillStyle = 'black'
        ctx.fillRect(0,0,g_canvas.width,g_canvas.height);
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.font = '30px PressStart2P'
        ctx.fillText(`Level ${currentLevel + 1}`, g_canvas.width/2, g_canvas.height/2 - g_canvas.height / 15);
        ctx.font = '40px ZenDots'
        ctx.fillStyle = levels[currentLevel].color
        ctx.fillText(levels[currentLevel].name, g_canvas.width/2, g_canvas.height/2 + g_canvas.height / 15);
        ctx.restore()
    },
=======
  drawLevel: function (ctx) {
    console.log('Drawing level transition');
    ctx.clearRect(0, 0, g_canvas.width, g_canvas.height);
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
    ctx.fillStyle = 'indigo';
    ctx.font = '50px ZenDots';
    ctx.textAlign = 'center';
    ctx.fillText(
      levels[currentLevel].name,
      g_canvas.width / 2,
      g_canvas.height / 2,
    );
    ctx.restore();
    console.log('Level transition');
  },
>>>>>>> ae2835c38b94f03c541476e1bac430c8c8da11d8

  nextLevel: function () {
    levelTransition.endLevel();
    levelTransition.changeLevel();
  },

<<<<<<< HEAD
    goToTitleScreen: function () {
        levelTransition.endLevel();
        levelTransition.restart();
      },
      
    shutDownManagers: function () {
      entityManager.wipeEntities();
      spatialManager.wipeCollision();
    },

    endLevel: function () {
        levelTransition.shutDownManagers();
        main.gameOver();
    },

    restart: function () {
        shop = true;
        notStarted = true;
        currentLevel = -1;
        m_gameover.play();
        setTimeout(function () {
          levelTransition.drawGameOver();
        }, 1000);
        setTimeout(function () {
          s_lives = s_baseLives;
          s_noPowerup = true;
          s_firePowerup = false;
          s_triplePowerup = false;
          s_piercePowerup = false;
          intro(g_ctx);
        }, 10000);
      },
    
      drawGameOver: function () {
        let offsetX = worldMap._offsetX + g_worldOffsetX;
        let offsetY = worldMap._offsetY - g_worldOffsetY;
        g_ctx.save();
        g_ctx.font = '40px PressStart2P';
        g_ctx.textAlign = 'center';
        g_ctx.fillText('Game over', g_canvas.width / 2, g_canvas.height / 2);
      },
=======
  goToTitleScreen: function () {
    levelTransition.endLevel();
    gameOver.restart();
  },

  shutDownManagers: function () {
    entityManager.wipeEntities();
    spatialManager.wipeCollision();
  },
>>>>>>> ae2835c38b94f03c541476e1bac430c8c8da11d8

  endLevel: function () {
    levelTransition.shutDownManagers();
    main.gameOver();
  },
};
