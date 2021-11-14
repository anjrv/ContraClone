'use strict';

const m_Intro = new Howl({
  src: ['./Audio/intro.mp3'],
  volume: 0.2,
});

const m_startGame = new Howl({
  src: ['./sounds/startGame.mp3'],
  volume: 0.2,
});

const m_laser = new Howl({
  src: ['./sounds/laser.wav'],
  volume: 0.05,
});

const m_explosion = new Howl({
  src: ['./sounds/explosion.wav'],
  volume: 0.05,
});

const m_collect = new Howl({
  src: ['./sounds/collect.mp3'],
  volume: 0.05,
});

const m_powerup = new Howl({
  src: ['./sounds/powerup.mp3'],
  volume: 0.05,
});

const m_gameover = new Howl({
  src: ['./sounds/gameover.mp3'],
  volume: 0.2,
});
