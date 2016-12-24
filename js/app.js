var PLAYER_VERTICAL_INCREMENT = 20;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    // Enemies loop to the left hand side of the canvas when reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    // Checks for collision with barrier walls or enemies
    checkForCollision(this);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';

    // Displays player's score
    this.displayStats = function(aScore, aLevel) {
        var canvas = document.getElementsByTagName('canvas');
        var firstCanvasTag = canvas[0];

        // Adds player score and level to div element created
        scoreLevelDiv.innerHTML = 'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;
        document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
    };
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y -= this.speed - PLAYER_VERTICAL_INCREMENT;
            break;
        case 'right':
            this.x += this.speed;
            break;
        case 'down':
            this.y += this.speed - PLAYER_VERTICAL_INCREMENT;
            break;
        case 'left':
            this.x -= this.speed;
            break;
    }
};

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.displayStats(score, gameLevel);
};

Player.prototype.update = function() {
    // If you remove this function the game won't start up
}

var checkForCollision = function(enemy) {
    // Check for collision between enemy and player
    if (
        player.y + 131 >= enemy.y + 90
        && player.x + 25 <= enemy.x + 88
        && player.y + 73 <= enemy.y + 135
        && player.x + 76 >= enemy.x + 11) {
        player.x = 202.5;
        player.y = 383;
    }

    // Checks for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y + 63 <= 0) {        
        player.x = 202.5;
        player.y = 383;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        increaseDifficulty(score);
    }

    // Checks if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // Removes previous enemies from canvas
    allEnemies.length = 0;

    // Sets up new enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
};

var createEnemies = function() {
    var enemy = new Enemy(0, 184 * Math.random() + 50, 256 * Math.random());

    // Place all enemy objects in an array called allEnemies
    allEnemies.push(enemy);
}

// Now instantiate your objects.
var allEnemies = [];
createEnemies();

// Place the player object in a variable called player
var player = new Player(202.5, 383, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');

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
