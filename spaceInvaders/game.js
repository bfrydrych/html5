var CANVAS = "game";
var c=document.getElementById(CANVAS);
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
	}
}

var frames = 0;

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

monster.direction = true;



function update() {
	CTX.clearRect(0, 0, 2000, 2000);
	
	monsters.forEach(function(monster) {
		monster.y = monster.y + 1;
	});
}

function draw() {
	monsters.forEach(function(monster) {
		monster.draw();
	});
}


//Display Preloading
var preloader = setInterval(preloading, TIME_PER_FRAME);

function preloading()
{	
	if (monsterImg.ready)
	{
		clearInterval(preloader);
		
		gameloop = setInterval(function() {
			update();
			draw();
		}, TIME_PER_FRAME);
	}
}
