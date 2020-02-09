"use strict";
function Game() {
	var RES_PREFIX = '';
	this.ImageLoader = function() {
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
	};

	this.PresentableGameObject = function(img, gameObject) {
		this.view = img;
		this.draw = function() {
			CTX.drawImage(this.view, this.x, this.y, this.width, this.height);
		};
		this.x = gameObject.x;
		this.y = gameObject.y;
		this.width = gameObject.width;
		this.height = gameObject.height;
		this.speed = gameObject.speed; //TODO: to remove
	};


	this.TimeIntervalMeasurer = function() {
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
	};

	this.keyDownHandler = function(event)
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
	};

	this.ShipFortificationHitMeasurer = function() {
		this.measurer = new TimeIntervalMeasurer();
		this.measurer.interval = 700;
		this.isHit = false;

		this.canShot = function() {
			if (this.measurer == null) {
				return true;
			}
			if (this.measurer !== null && this.measurer.elapsed()) {
				return true;
			}
			return false;
		}
	};

// TODO: move to commands
	this.keyUpHandler = function(event)
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
	};





	this.newMonster = function(monster) {
		return new PresentableGameObject(monsterImg, monster)
	};
	this.newShip = function(ship) {
		return new PresentableGameObject(shipImg, ship)
	};
	this.newFortification = function(fortification) {
		return new PresentableGameObject(fortificationImg, fortification)
	};
	this.newShipMissile = function() {
		return new PresentableGameObject(shipMissileImg, new GAME_ENGINE.ShipMissile())
	};
	this.newMonsterMissile = function() {
		return new PresentableGameObject(monsterMissileImg, new GAME_ENGINE.MonsterMissile())
	};



	// TODO: move to commands
	this.update = function() {
		CTX.clearRect(0, 0, 2000, 2000);

		// ship move
		if (ship.moveLeft) {
			ship.x = ship.x - ship.speed
		}
		if (ship.moveRight) {
			ship.x = ship.x + ship.speed
		}

		// TODO: move to commands
		// ship shot
		// if (ship.shot && shipFortificationHitMeasurer.canShot()) {
		// 	var shipMissile = newShipMissile();
		// 	shipMissile.y = ship.y - shipMissile.height + 45 ;
		// 	shipMissile.x = (ship.x + ship.width / 2) - (shipMissile.width / 2)
		// 	shipMissiles.push(shipMissile);
		//
		// 	shipShotSound.stop();
		// 	shipShotSound.play();
		// }
		//
		// // monster shot
		// //TODO: move to commands
		// if (monsterShotIntervalMeasurer.elapsed()) {
		// 	var monster = monsters[GAME_ENGINE.getRandomInt(0, monsters.length -1)];
		// 	var monserMissile = newMonsterMissile();
		// 	monserMissile.y = monster.y - monserMissile.height + 45 ;
		// 	monserMissile.x = (monster.x + monster.width / 2) - (monserMissile.width / 2)
		// 	monsterMissiles.push(monserMissile);
		//
		// 	monsterShotSound.stop();
		// 	monsterShotSound.play();
		// }
		//
		// //TODO: move to commands
		// monsterShephard.move();
		//
		// // move monsters
		// //TODO: move to commands
		// monsters.forEach(function(monster) {
		// 	if (monsterShephard.moveDown) {
		// 		monster.y = monster.y + monster.speed;
		// 	}
		// 	if (monsterShephard.moveLeft) {
		// 		monster.x = monster.x - monster.speed;
		// 	}
		// 	if (monsterShephard.moveRight) {
		// 		monster.x = monster.x + monster.speed;
		// 	}
		// });
		//
		// // remove destroyed fortifications
		// // TODO: move to commands
		// for(var i = fortifications.length - 1; i >= 0; --i) {
		// 	var fortification = fortifications[i];
		// 	// reset hit mark
		// 	fortification.hit = false;
		// 	if (fortification.destroyed) {
		// 		fortifications.splice(i, 1);
		// 	}
		// }
		//
		// // remove all ship missiles being out of board
		// // TODO: move to commands
		// for(var i = shipMissiles.length - 1; i >= 0; i--) {
		// 	if(shipMissiles[i].y < 0) {
		// 		shipMissiles.splice(i, 1);
		// 	}
		// }
		//
		// // remove all monsters missiles being out of board
		// // TODO: move to commands
		// for(var i = monsterMissiles.length - 1; i >= 0; i--) {
		// 	if(monsterMissiles[i].y > CANVAS_HEIGHT || monsterMissiles[i].hit) {
		// 		monsterMissiles.splice(i, 1);
		// 	}
		// }
		//
		// // move missiles
		// // TODO: move to commands
		// shipMissiles.forEach(function(shipMissile) {
		// 	shipMissile.y = shipMissile.y - shipMissile.speed;
		// });
		//
		// monsterMissiles.forEach(function(monsterMissile) {
		// 	monsterMissile.y = monsterMissile.y + monsterMissile.speed;
		// });
		//
		//
		// // monster collide with missile
		// // TODO: move to commands
		// shipMissiles.forEach(function(shipMissile) {
		// 	for(var i = monsters.length - 1; i >= 0; i--) {
		// 		var monster = monsters[i];
		//
		// 		if (GAME_ENGINE.collision(monster, shipMissile)) {
		// 			monster.hit = true;
		// 			shipMissile.hit = true;
		// 			break;
		// 		}
		// 	}
		// });
		//
		// // ship missile collide with fortification
		// // TODO: move to commands
		// shipMissiles.forEach(function(shipMissile) {
		// 	for(var i = fortifications.length - 1; i >= 0; i--) {
		// 		var fortification = fortifications[i];
		//
		// 		if (GAME_ENGINE.collision(shipMissile, fortification)) {
		// 			shipFortificationHitMeasurer.hit();
		// 			shipMissile.hit = true;
		// 			fortification.stamina--;
		// 			if (fortification.stamina <= 0) {
		// 				fortification.destroyed = true;
		// 			}
		// 			fortification.hit = true;
		// 			break;
		// 		}
		// 	}
		// });
		//
		// // monster missile collide with fortification
		// // TODO: move to commands
		// monsterMissiles.forEach(function(monsterMissile) {
		// 	for(var i = fortifications.length - 1; i >= 0; i--) {
		// 		var fortification = fortifications[i];
		//
		// 		if (GAME_ENGINE.collision(monsterMissile, fortification)) {
		//
		// 			monsterMissile.hit = true;
		// 			fortification.stamina--;
		// 			if (fortification.stamina <= 0) {
		// 				fortification.destroyed = true;
		// 			}
		// 			fortification.hit = true;
		// 			break;
		// 		}
		// 	}
		// });
		//
		// // monster collide with ship
		// for(var i = monsterMissiles.length - 1; i >= 0; i--) {
		// 	var monsterMissile = monsterMissiles[i];
		//
		// 	if (GAME_ENGINE.collision(monsterMissile, ship)) {
		// 		ship.hit = true;
		// 		monsterMissile.hit = true;
		// 		GAME_ENGINE.GAME_OVER = true;
		// 		break
		// 	}
		// }
		//
		//
		//
		//
		// // remove all monsters being hit
		// for(var i = monsters.length - 1; i >= 0; i--) {
		// 	if(monsters[i].hit) {
		// 		monsters.splice(i, 1);
		// 	}
		// }
		//
		// // remove all missiles hit the target
		// for(var i = shipMissiles.length - 1; i >= 0; i--) {
		// 	if(shipMissiles[i].hit) {
		// 		shipMissiles.splice(i, 1);
		// 	}
		// }
		//
		// // monster collide with fortress
		// monsters.forEach(function(monster) {
		// 	for(var i = fortifications.length - 1; i >= 0; --i) {
		// 		var fortification = fortifications[i];
		// 		if(GAME_ENGINE.collision(fortification, monster)) {
		// 			fortification.destroyed = true;
		// 		}
		// 	}
		// });
		//
		//
		// // detect monster crossing border
		// monsters.forEach(function(monster) {
		// 	if (monster.y + monster.width >= ship.y) {
		// 		GAME_ENGINE.GAME_OVER = true;
		// 	}
		// });
		//
		// //detect all monster killed
		// if (monsters.length == 0) {
		// 	GAME_ENGINE.GAME_WON = true;
		// }
	}

	this.draw = function() {

		// monsterMissiles.forEach(function(monsterMissile) {
		// 	monsterMissile.draw();
		// });
		//
		// monsters.forEach(function(monster) {
		// 	monster.draw();
		// });

		ship.draw();

		// shipMissiles.forEach(function(shipMissile) {
		// 	shipMissile.draw();
		// });
		//
		// fortifications.forEach(function(fortification) {
		// 	fortification.draw();
		// });

		if (GAME_ENGINE.GAME_OVER) {
			clearInterval(gameloop);
			alert("Przegrales. HAHAHAHAHAHA!!!!!!!!!");
		}
		if (GAME_ENGINE.GAME_WON) {
			clearInterval(gameloop);
			alert("Wygrales. Brawo!!!!!!!!!");
		}
	};

	this.preloading = function()
	{
		if (monsterImg.ready && shipImg.ready && shipMissileImg.ready && monsterMissileImg.ready && shipShotSound.ready)
		{
			clearInterval(preloader);

			gameloop = setInterval(function() {
				update();
				draw();
			}, TIME_PER_FRAME);
		}
	};

	// AUDIO API
	var audioContext;
	this.initAudio = function() {
		try {
			window.AudioContext = window.AudioContext||window.webkitAudioContext;
			audioContext = new AudioContext();
			return new WebAudioSoundFactory();
		}
		catch(e) {
			//TODO: smart error handling
			//alert('Web Audio API is not supported in this browser. Sounds will not be played');
			return new NoSoundFactory();
		}
	};



	this.WebAudioSoundFactory = function() {
		this.createSound = function() {
			return new Sound();
		}
	};

	this.NoSoundFactory = function() {
		this.createSound = function() {
			return new NoSound();
		}
	};

	this.NoSound = function() {
		this.ready = true;
		this.load = function (url) {
		};
		this.play = function(from) {
		};
		this.stop = function() {
		};
	};

	this.Sound = function() {
		this.ready = false;
		this.buffer = null;
		this.playedSource = null;

		this.load = function (url) {
			var thisSound = this;
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';

			// Decode asynchronously
			request.onload = function() {

				audioContext.decodeAudioData(request.response, function(buffer) {
					//on decode finish, mark object as ready to play and keep audio buffer handy
					thisSound.ready = true;
					thisSound.buffer = buffer;
				}, function () {
					//TODO: smart error handling
				});
			};
			request.send();
		};
		this.play = function(from) {
			this.playedSource = audioContext.createBufferSource(); // creates a sound source
			this.playedSource.buffer = this.buffer;                    // tell the source which sound to play
			this.playedSource.connect(audioContext.destination);       // connect the source to the context's destination (the speakers)
			this.playedSource.start(0);                           // play the source now
		};

		this.stop = function() {
			if (this.playedSource !== null) {
				this.playedSource.stop();
				this.playedSource = null;
			}
		};
	};


	this.start = function() {
		var GAME_ENGINE = new GameEngine();
		var COMMANDS = new Commands();
		var CANVAS = "game";
		var c=document.getElementById(CANVAS);
		var CANVAS_WIDTH = c.width;
		var CANVAS_HEIGHT = c.height;
		var CTX=c.getContext("2d");
		var MAX_RETRIES = 1000000000;
		var TIME_PER_FRAME = 1000 / 30;
		var gameloop = 0;



		COMMANDS.establishConnection();

// load images
		var imgLoader = new this.ImageLoader();
		var monsterImg = imgLoader.loadImage("monster.png");
		var shipImg = imgLoader.loadImage("ship.jpg");
		var shipMissileImg = imgLoader.loadImage("shipMissile.png");
		var monsterMissileImg = imgLoader.loadImage("monsterMissile.png");
		var fortificationImg = imgLoader.loadImage("fortification.jpg");

//init audio system
		var soundFactory = initAudio();

// load sounds
		var shipShotSound = soundFactory.createSound();
		shipShotSound.load("shipShotSound.mp3");
		var monsterShotSound = soundFactory.createSound();
		monsterShotSound.load("monsterShotSound.mp3");



		var monsterShotIntervalMeasurer = new TimeIntervalMeasurer();

// todo: move to commands
		var monsterMatrix = GAME_ENGINE.createMonstersMatrix();
		var monsters = [];
		monsters.rowNumber = monsterMatrix.rowNumber;
		monsterMatrix.forEach(function (monster) { monsters.push(newMonster(monster)) });

//todo: move to commands


		COMMANDS.createShip(CANVAS_HEIGHT);
		var ship = this.newShip(GAME_ENGINE.createShip(CANVAS_HEIGHT));


		var fortifications = [];
		var gameFort = GAME_ENGINE.generateFortifiations(5, ship.height, monsters[0].height, monsters);
		gameFort.forEach(function (fortification) { fortifications.push(newFortification(fortification)) });


		var shipMissiles = [];
		var monsterMissiles = [];

		document.addEventListener("keydown",keyDownHandler, false);
		document.addEventListener("keyup",keyUpHandler, false);

		var shipFortificationHitMeasurer = new ShipFortificationHitMeasurer();
		var monsterShephard = new GAME_ENGINE.MonstersShephard(monsters, CANVAS_HEIGHT, CANVAS_WIDTH);


//Display Preloading
		var preloader = setInterval(preloading, TIME_PER_FRAME);
	};
}

