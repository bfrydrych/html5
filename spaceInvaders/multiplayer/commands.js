"use strict";

function COMMANDS() {
    this.Queue = function () {
        this.elements = [];

        this.push = function (element) {
            this.elements.push(element);
        };

        this.poll = function () {
            return this.elements.shift();
        };
    };

    this.ShipMoveCommand = function (id, commandFunction) {
        this.id = id;
        this.commandFunction = commandFunction;
    };


    this.CreateShipCommand = function(CANVAS_HEIGHT) {
    	this.CANVAS_HEIGHT = CANVAS_HEIGHT;
    };

	this.createShip = function(CANVAS_HEIGHT) {

	};
}