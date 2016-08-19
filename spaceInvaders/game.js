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
	}
}

var frames = 0;
var monster = new Monster();
monster.direction = true;
function update() {
	CTX.clearRect(0, 0, 2000, 2000);
	frames++;
	
	
	if (monster.direction) {
		monster.y++;
	} else if(!monster.direction) {
		monster.y--;
	} 
	
	if (monster.y > 30 ) {
		monster.direction = false;
	}
	if (monster.y == 0) {
		monster.direction = true;
	}
}

function draw() {
	monster.draw();
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
