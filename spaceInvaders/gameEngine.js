 var CANVAS = "fin";
 var c=document.getElementById(CANVAS);
 var CANVAS_WIDTH = c.width;
 var CANVAS_HEIGHT = c.height;
 var CTX=c.getContext("2d");
 var RES_PREFIX = '';
 var MAX_RETRIES = 1000000000;
 var TIME_PER_FRAME = 1000 / 30;
 var gameloop = 0;
 var GAME_OVER = false;
 var GAME_WON = false;

 function getRandomInt(min, max) {
 	return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 function collision(a, b) {
 	return (a.x < b.x + b.width &&
 			a.x + a.width > b.x &&
 			a.y < b.y + b.height &&
 			a.height + a.y > b.y);
 }

 function ImageLoader() {
 	this.img = null;
	this.loadImage = function(name) {
		this.img = new Image();
		this.img.ready = false;
		this.img.onload  = function() {
			this.ready = true;
		};
		this.img.src = RES_PREFIX + name;
		return this.img;
	}
}

var imgLoader = new ImageLoader();
var monsterImg = imgLoader.loadImage("monster.png");
var shipImg = imgLoader.loadImage("ship2.png");
var shipMissileImg = imgLoader.loadImage("shipMissile2.png");
var monsterMissileImg = imgLoader.loadImage("monsterMissile2.png");

function GameObject(img) {
	this.view = img;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;

	this.draw = function() {
		CTX.drawImage(this.view, this.x, this.y, this.width, this.height);
	}
}



function Monster() {
	GameObject.call(this, monsterImg);
	this.width = 92;
	this.height = 92;
	this.speed = 1;
}
Monster.prototype = new GameObject();


function Ship() {
	GameObject.call(this, shipImg);
	this.width = 92;
	this.height = 92;
	this.speed = 20;
}
Ship.prototype = new GameObject();

function ShipMissile() {
	GameObject.call(this, shipMissileImg);
	this.width = 32;
	this.height = 32;
	this.speed = 30;
}
ShipMissile.prototype = new GameObject();

function MonsterMissile() {
	GameObject.call(this, monsterMissileImg);
	this.width = 32;
	this.height = 32;
	this.speed = 15;
}
MonsterMissile.prototype = new GameObject();

function TimeIntervalMeasurer() {
	this.interval = 2000;
	this.lastElapsed = new Date().getTime();

	this.elapsed = function() {
		var currentTime = new Date().getTime();

		if((currentTime - this.lastElapsed) >= this.interval) {
			this.lastElapsed = currentTime;
			return true;
		} else {
			return false;
		}
	}
}

var monsterShotIntervalMeasurer = new TimeIntervalMeasurer();

var monsters = [];
var monster = new Monster();
monsters.push(monster);

function MonstersShephard() {
		this.moveDown = true;
		this.moveLeft = false;
		this.moveRight = false;

		this.nextTurn = monster.height;

		this.turnLeft = function() {
			this.moveDown = false;
			this.moveLeft = true;
			this.moveRight = false;
		}

		this.turnRight = function() {
			this.moveDown = false;
			this.moveLeft = false;
			this.moveRight = true;
		}

		this.turnDown = function() {
			this.moveDown = true;
			this.moveLeft = false;
			this.moveRight = false;
		}

		this.move = function() {
			if (this.moveDown) {
				var monster = monsters[0];
				if (monster.y >= this.nextTurn) {
					this.nextTurn = monster.y + monster.height;
					for(var i = monsters.length - 1; i >= 0; i--) {
						var monster = monsters[i];
						if (monster.x == 0) {
							this.turnRight();
							break;
						}
						if (monster.x + monster.width == CANVAS_WIDTH) {
							this.turnLeft();
							break;
						}
					}
				}
				return;
			}

			for(var i = monsters.length - 1; i >= 0; i--) {
				var monster = monsters[i];
				if (monster.x == 0) {
					this.turnDown();
					break;
				}
				if (monster.x + monster.width == CANVAS_WIDTH) {
					this.turnDown();
					break;
				}
			}
		}
	}


for (var i = 1; i < 40; i++) {
	if (i % 10 === 0 || i % 20 === 0 || i % 30 === 0) {
		var monster = new Monster();
		monster.y  = monsters[monsters.length - 1].y + monster.height;
		monsters.push(monster);
	} else {
		var monster = new Monster();
		monster.x  = monsters[monsters.length - 1].x + monster.width;
		monster.y = monsters[monsters.length - 1].y;
		monsters.push(monster);
	}
}

var ship = new Ship();
ship.y = CANVAS_HEIGHT - ship.height;

var shipMissiles = [];
var monsterMissiles = [];

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if (keyPressed == "A")
	{
		ship.moveLeft = true;
		ship.moveRight = false;
	}
	else if (keyPressed == "D")
	{
		ship.moveLeft = false;
		ship.moveRight = true;
	}
	else if (keyPressed == "W")
	{
		ship.shot = true;

	}
}

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	if (keyPressed == "A" || keyPressed == "D")
	{
		ship.moveLeft = false;
		ship.moveRight = false;
	}
	else if (keyPressed == "W")
	{
		ship.shot = false;

	}
}


var monsterShephard = new MonstersShephard();
function update() {
	CTX.clearRect(0, 0, 2000, 2000);

	// ship move
	if (ship.moveLeft) {
		ship.x = ship.x - ship.speed
	}
	if (ship.moveRight) {
		ship.x = ship.x + ship.speed
	}

	// ship shot
	if (ship.shot && shipMissiles.length < 1) {
		var shipMissile = new ShipMissile();
		shipMissile.y = ship.y - shipMissile.height + 45 ;
		shipMissile.x = (ship.x + ship.width / 2) - (shipMissile.width / 2)
		shipMissiles.push(shipMissile);
	}

	// monster shot
	if (monsterShotIntervalMeasurer.elapsed()) {
		var monster = monsters[getRandomInt(0, monsters.length -1)];
		var monserMissile = new MonsterMissile();
		monserMissile.y = monster.y - monserMissile.height + 45 ;
		monserMissile.x = (monster.x + monster.width / 2) - (monserMissile.width / 2)
		monsterMissiles.push(monserMissile);
	}

	monsterShephard.move();

	// move monsters
	monsters.forEach(function(monster) {
		if (monsterShephard.moveDown) {
			monster.y = monster.y + monster.speed;
		}
		if (monsterShephard.moveLeft) {
			monster.x = monster.x - monster.speed;
		}
		if (monsterShephard.moveRight) {
			monster.x = monster.x + monster.speed;
		}
	});

	// remove all ship missiles being out of board
	for(var i = shipMissiles.length - 1; i >= 0; i--) {
	    if(shipMissiles[i].y < 0) {
	    	shipMissiles.splice(i, 1);
	    }
	}

	// remove all monsters missiles being out of board
	for(var i = monsterMissiles.length - 1; i >= 0; i--) {
	    if(monsterMissiles[i].y > CANVAS_HEIGHT) {
	    	monsterMissiles.splice(i, 1);
	    }
	}

	// move missiles
	shipMissiles.forEach(function(shipMissile) {
		shipMissile.y = shipMissile.y - shipMissile.speed;
	});

	monsterMissiles.forEach(function(monsterMissile) {
		monsterMissile.y = monsterMissile.y + monsterMissile.speed;
	});


	// monster collide with missile
	shipMissiles.forEach(function(shipMissile) {
		for(var i = monsters.length - 1; i >= 0; i--) {
			var monster = monsters[i];

			if (collision(monster, shipMissile)) {
					    monster.hit = true;
					    shipMissile.hit = true;
					    break;
					}
		}
	});

	// monster collide with ship
	for(var i = monsterMissiles.length - 1; i >= 0; i--) {
		var monsterMissile = monsterMissiles[i];

		if (collision(monsterMissile, ship)) {
					ship.hit = true;
					monsterMissile.hit = true;
				    GAME_OVER = true;
				    break
				}
	}


	// remove all monsters being hit
	for(var i = monsters.length - 1; i >= 0; i--) {
	    if(monsters[i].hit) {
	    	monsters.splice(i, 1);
	    }
	}

	// remove all missiles hit the target
	for(var i = shipMissiles.length - 1; i >= 0; i--) {
	    if(shipMissiles[i].hit) {
	    	shipMissiles.splice(i, 1);
	    }
	}

	// detect monster crossing border
	monsters.forEach(function(monster) {
		if (monster.y + monster.width >= ship.y) {
				    GAME_OVER = true;
			}
	});

	//detect all monster killed
	if (monsters.length == 0) {
		GAME_WON = true;
	}
}

function draw() {

	monsterMissiles.forEach(function(monsterMissile) {
		monsterMissile.draw();
	});

	monsters.forEach(function(monster) {
		monster.draw();
	});

	ship.draw();

	shipMissiles.forEach(function(shipMissile) {
		shipMissile.draw();
	});

	if (GAME_OVER) {
		clearInterval(gameloop);
		alert("You lost. HAHAHAHAHAHA!!!!!!!!!");
	}
	if (GAME_WON) {
		clearInterval(gameloop);
		alert("You won. Bravo!!!!!!!!!");
	}
}


//Display Preloading
var preloader = setInterval(preloading, TIME_PER_FRAME);

function preloading()
{
	if (monsterImg.ready && shipImg.ready && shipMissileImg && monsterMissileImg)
	{
		clearInterval(preloader);

		gameloop = setInterval(function() {
			update();
			draw();
		}, TIME_PER_FRAME);
	}
}
