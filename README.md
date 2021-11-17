# Space-contra
## Authors
* Árni Þór Sörensen
* Jaan Jaerving
* Jóhannes Kári Sólmundarson
* Þröstur Almar Þrastarson

## Contr(a)ols

| Action | Control
|  ---   |   ---      | 
| Move   | WASD       |
| Jump   | SPACE      |
| Shoot  | J          |
| Crouch | LEFT SHIFT |
-----------------------

### Dev controls
| Action | Control     | Effect | 
| ---    |  ---        | ---    |
| Fly up |  L          | Collision will not work in fly mode |
| Pause | P | 
| Single step | O (the letter) | only works in pause mode|
| Dev tools | 0 (zero) | Allows devs to set Character into specific states and render debug funcitonality | 

## Features
* Player can shoot in eight directions
* 3 collectable powerups for gun
* 7 enemy types with varying AI
* 3 unique levels
* Level maps consist of background-, collision- and foreground layers
* Enemies drop collectable powerups and coins upon death
* On Player death they can upgrade their character in the Shop with the currency they collected
  * Permanent firerate increase
  * Permanent increase of lives
  * Permanent increase of jumps for Player
  * Run specific starting powerup
  * Run specific starting level
* Sick music and sound effects

### Dev features
* Collision with the world for Player is fairly robust
  * if player collides with a roof with only a single tile space beneath it they can sometimes clip into the roof.
* A great level editor available at url/level_editor
* We had a record / replay system at one point that we stopped maintaining. The replay system (start with 9) still "works" in that it takes control of the clock and sets the user input, but the state that it starts playing from is wrong. The record system is broken. 