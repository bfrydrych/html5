"use strict";

function Commands() {
	this.gsconnection = null;

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
		var message = new this.NewShip().marshal(CANVAS_HEIGHT);
		this.gsconnection.send(message);
	};

	this.establishConnection = function(onConnected) {
		this.gsconnection = new WebSocket('ws://localhost:8080');

		this.gsconnection.onopen = function() {
			console.log("connection to ws://localhost:8080 established");
			if (onConnected != null) {
				onConnected();
			}
		};
	};

	this.findCommand = function(bytearray) {
		switch (bytearray[0]) {
			case NewShip.MESSAGE_ID:
				return new NewShip().unmarshal(bytearray);
			default:
				throw "Not known message type!";
		}
	};

	this.NewShip = function() {
		this.MESSAGE_ID = 0;
		this.MESSAGE_LENGHT = 2;

		this.canvasHeight = canvasHeight;

		this.marshal = function(canvasHeight) {
			var bytearray = new Uint8Array(this.MESSAGE_LENGHT);
			bytearray[0] = this.MESSAGE_ID;
			bytearray[1] = canvasHeight;
			return bytearray.buffer;
		};

		this.unmarshal = function(bytearray) {
			var newShip = new NewShip();
			newShip.canvasHeight = bytearray[1];
			return newShip;
		}
	}
}