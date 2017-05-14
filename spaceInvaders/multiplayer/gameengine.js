"use strict";

function GameEngine() {
	this.GAME_OVER = false;
	this.GAME_WON = false;

	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	// rectangles collision detection
	this.collision = function(a, b) {
		return (a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.height + a.y > b.y);
	};
	this.collideWithAny = function(object, objects) {
		var _this = this;
		return objects.some(function (element, index, array) {
			return _this.collision(object, element);
		});
	};

	this.GameObject = function() {
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	};

	this.Fortification = function() {
		this.width = 92;
		this.x = 1;
		this.height = 92;
		this.stamina = 5;


		this.destroy = function() {

		}
	};
	this.Fortification.prototype = new this.GameObject();

	this.Monster = function() {
		this.width = 92;
		this.x = 1;
		this.height = 92;
		this.speed = 1;
	};
	this.Monster.prototype = new this.GameObject();


	this.Ship = function() {
		this.width = 92;
		this.height = 92;
		this.speed = 20;
	};
	this.Ship.prototype = new this.GameObject();

	this.ShipMissile = function() {
		this.width = 32;
		this.height = 32;
		this.speed = 30;
	};
	this.ShipMissile.prototype = new this.GameObject();

	this.MonsterMissile = function() {
		this.width = 32;
		this.height = 32;
		this.speed = 15;
	};
	this.MonsterMissile.prototype = new this.GameObject();

	this.MonstersShephard = function(monsters, CANVAS_HEIGHT, CANVAS_WIDTH) {
		this.moveDown = false;
		this.moveLeft = false;
		this.moveRight = true;

		this.nextTurn = monsters[0].height;
		this.distanceCovered = 0;

		this.turnLeft = function() {
			this.moveDown = false;
			this.moveLeft = true;
			this.moveRight = false;
		};

		this.turnRight = function() {
			this.moveDown = false;
			this.moveLeft = false;
			this.moveRight = true;
		};

		this.turnDown = function() {
			this.moveDown = true;
			this.moveLeft = false;
			this.moveRight = false;
		};

		this.move = function() {
			if (this.moveDown) {
				var monster = monsters[0];
				this.distanceCovered = this.distanceCovered + monster.speed;
				if (this.distanceCovered >= this.nextTurn) {
					this.distanceCovered = 0;
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
	};

	this.createMonstersMatrix = function() {
		var monsters = [];
		var monster = new this.Monster();
		monsters.push(monster);

		for (var i = 1; i < 40; i++) {
			if (i % 10 === 0 || i % 20 === 0 || i % 30 === 0) {
				var monster = new this.Monster();
				monster.y  = monsters[monsters.length - 1].y + monster.height;
				monsters.push(monster);
			} else {
				var monster = new this.Monster();
				monster.x  = monsters[monsters.length - 1].x + monster.width;
				monster.y = monsters[monsters.length - 1].y;
				monsters.push(monster);
			}
		}
		monsters.rowNumber = 4;
		return monsters;
	};

	this.createShip = function(CANVAS_HEIGHT) {
		var ship = new this.Ship();
		ship.y = CANVAS_HEIGHT - ship.height;
		return ship
	};

	this.fortifications = [];

	this.generateFortifiations = function(number, shipHeight, monsterHeight, monsters, CANVAS_HEIGHT) {
		var fort = new this.Fortification();
		var FORTIFICATION_MARGIN = 10;
		var floor = CANVAS_HEIGHT - shipHeight - FORTIFICATION_MARGIN - fort.height;
		var ceiling = floor - ((floor - (monsters.rowNumber * monsterHeight + FORTIFICATION_MARGIN)) / 2);
		for(var i = number - 1; i >= 0; i--) {
			var fortification = this.newFortification(floor, ceiling);
			while (this.collideWithAny(fortification, this.fortifications)) {
				fortification = this.newFortification(floor, ceiling);
			}
			this.fortifications.push(fortification);
		}
		return this.fortifications;
	};

	this.newFortification = function(floor, ceiling, CANVAS_WIDTH) {
		var fortification = new this.Fortification();
		var y = this.getRandomInt(ceiling, floor);
		var x = this.getRandomInt(0, CANVAS_WIDTH - fortification.width);
		fortification.y = y;
		fortification.x = x;
		return fortification;
	}
}
