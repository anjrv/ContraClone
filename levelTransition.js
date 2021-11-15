const levelTransition = {
    changeLevel: function() {
        g_playing = true;
        currentLevel = (currentLevel >= levels.length - 1) ? 0 : currentLevel + 1;
        setTimeout(function () { levelTransition.drawLevel(g_ctx); }, 5);
        setTimeout(function () { levelTransition.startGame() }, 2500);
    },

    startGame: function() {
        entityManager.setStuff();
        entityManager.init();
        worldMap.init(levels[currentLevel]);
        main.restartGame();
        main.init();
        g_playing = true;
    },

    drawLevel: function(ctx) {
        console.log("Drawing level transition")
        ctx.clearRect(0,0,g_canvas.width, g_canvas.height);
        ctx.save()
        ctx.fillStyle = 'black'
        ctx.fillRect(0,0,g_canvas.width,g_canvas.height);
        ctx.fillStyle = 'indigo'
        ctx.font = '50px ZenDots'
        ctx.textAlign = 'center'
        ctx.fillText(levels[currentLevel].name, g_canvas.width/2, g_canvas.height/2)
        ctx.restore()
        console.log("Level transition")
    },

    nextLevel: function () {
        levelTransition.endLevel()
        levelTransition.changeLevel()
    },

    goToTitleScreen: function () {
        levelTransition.endLevel();
        gameOver.restart();
      },
      
    shutDownManagers: function () {
      entityManager.wipeEntities();
      spatialManager.wipeCollision();
    },

    endLevel: function () {
        levelTransition.shutDownManagers();
        main.gameOver();
    }

}