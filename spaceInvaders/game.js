var CANVAS = "game";
var c=document.getElementById(CANVAS);
var CANVAS_WIDTH = c.width;
var CANVAS_HEIGHT = c.height;
var CTX=c.getContext("2d");
var RES_PREFIX = 'file:///D:/devel/projects/html5/spaceInvaders/';
var MAX_RETRIES = 1000000000;
var TIME_PER_FRAME = 1000 / 30;

class ImageLoader {
	constructor() {
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
}

var imgLoader = new ImageLoader();
var monsterImg = imgLoader.loadImage("monster.png");
var shipImg = imgLoader.loadImage("ship.jpg");
var shipMissileImg = imgLoader.loadImage("shipMissile.png");

class GameObject {
	constructor(img) {
		this.view = img;
		this.x = 0;
		this.y = 0;
		
		this.draw = function() {
			CTX.drawImage(this.view, this.x, this.y);
		}
	}
}

class Monster extends GameObject {
	constructor() {
		super(monsterImg);
		
		this.width = 128;
		this.height = 128;
		this.speed = 1;
	}
}

class Ship extends GameObject {
	constructor() {
		super(shipImg);
		
		this.width = 256;
		this.height = 256;
		this.speed = 20;
	}
}

class ShipMissile extends GameObject {
	constructor() {
		super(shipMissileImg);
		
		this.width = 87;
		this.height = 84;
		this.speed = 30;
	}
}

var monsters = [];
var monster = new Monster();
monsters.push(monster);

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

document.addEventListener("keydown",keyDownHandler, false);	

function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if (keyPressed == "A")
	{		
		ship.x = ship.x - ship.speed;
	}
	else if (keyPressed == "D")
	{	
		ship.x = ship.x + ship.speed;		
	}
	else if (keyPressed == "W")
	{
		var shipMissile = new ShipMissile();
		shipMissile.y = ship.y - shipMissile.height + 45 ;
		shipMissile.x = (ship.x + ship.width / 2) - (shipMissile.width / 2)
		shipMissiles.push(shipMissile);
	}
}

function update() {
	CTX.clearRect(0, 0, 2000, 2000);
	
	monsters.forEach(function(monster) {
		monster.y = monster.y + monster.speed;
	});
	
	for(var i = shipMissiles.length - 1; i >= 0; i--) {
	    if(shipMissiles[i].y < 0) {
	    	shipMissiles.splice(i, 1);
	    }
	}
	
	shipMissiles.forEach(function(shipMissile) {
		shipMissile.y = shipMissile.y - shipMissile.speed;
	});
}

function draw() {
	monsters.forEach(function(monster) {
		monster.draw();
	});
	
	ship.draw();
	
	shipMissiles.forEach(function(shipMissile) {
		shipMissile.draw();
	});
}


//Display Preloading
var preloader = setInterval(preloading, TIME_PER_FRAME);

function preloading()
{	
	if (monsterImg.ready && shipImg.ready && shipMissileImg)
	{
		clearInterval(preloader);
		
		gameloop = setInterval(function() {
			update();
			draw();
		}, TIME_PER_FRAME);
	}
}
