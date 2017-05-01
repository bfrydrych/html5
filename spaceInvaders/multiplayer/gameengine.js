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
	}
}
