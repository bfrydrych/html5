var CANVAS = "game";
var c=document.getElementById(CANVAS);
var CTX=c.getContext("2d");

var img = new Image();
img.onload  = function() {
	CTX.drawImage(img, 0, 0);
};
img.src='file:///D:/devel/projects/html5/spaceInvaders/szalonyMlody.png';
