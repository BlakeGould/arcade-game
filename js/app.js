// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // set Enemy initial location
    this.x = -101;
    this.y = 83 * Math.floor(Math.random() * 3) + 65;

    // set Enemy initial speed
    this.speed = 60 * Math.floor(Math.random() * 3 + 1);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // update Enemy location to a new random lane preset and random speed preset after clearing the game board
    if (this.x > 505) {
        this.x = -100;
        this.y = 83 * Math.floor(Math.random() * 3) + 65;
        this.speed = 60 * Math.floor(Math.random() * 3 + 1);
    }
    // handle collision with Player
    if (
        player.x >= this.x - 83 &&
        player.x <= this.x + 83 &&
        player.y >= this.y - 20 &&
        player.y <= this.y + 80
        ) {
        level = 1; // Reset the level
        console.log('Current level is: ' + level);
        player.x = 202; //Return player to starting position
        player.y = 405;
        allEnemies = [new Enemy]; //Reset to one enemy
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update() (player update takes dt as an input just like enemy), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    //set Player initial location
    this.x = 202;
    this.y = 405;
}

var level = 1;

//Update for win
Player.prototype.update = function () {
    if (this.y === -10) {
        this.x = 202; // Reset player to beginning
        this.y = 405; // Reset player to beginning
        level += 1; // Increase level by 1
        allEnemies.push(new Enemy); //add a new enemy to the game
        console.log('CURRENT LEVEL IS: ' + level);
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Create move counter
var moves = -1;

//Handle key input
Player.prototype.handleInput = function (keys) {
    moves += 1;
    var mplRatio = Math.round(10 * (moves/level))/10
    console.log(mplRatio + ' moves per level so far...')
    switch(keys){
        case 'up':
            if (this.y >0) {
                this.y -= 83;
            };
            break;
        case 'down':
            if (this.y < 405) {
                this.y += 83;
            };
            break;
        case 'left':
            if (this.x >0) {
                this.x -= 101;
            };
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            };
            break;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy];
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
