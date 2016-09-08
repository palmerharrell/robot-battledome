"use strict";

// Base Robot Class
function Robot() {
	this.maxHP = 0;
	this.health = 0;
	this.hpRange = [0,0];
	this.shield = 0;
	this.evasion = 5;
	this.name = ``;
	this.type = ``;
	this.imgUrl = ``;
	this.modification = {};
	this.weapon = {name:`none`};
}

// ~~~ Roller Type ~~~
function Roller() {
	this.type = `Roller`;
	this.shield = 5;
	this.evasion = 8;
}
Roller.prototype = new Robot();

// Roller Models
function R2D2() {
	this.name = `R2D2`;
	this.imgUrl = `images/rR2D2.png`;
	this.hpRange = [80, 110];
}
R2D2.prototype = new Roller();

function Johnny5() {
	this.name = `Johnny Five`;
	this.imgUrl = `images/rJohnny5.png`;
	this.hpRange = [85, 95];
}
Johnny5.prototype = new Roller();

// ~~~ Walker Type ~~~
function Walker() {
	this.type = `Walker`;
	this.shield = 10;
}
Walker.prototype = new Robot();

// Walker Models
function C3PO() {
	this.name = `C3PO`;
	this.imgUrl = `images/wC3PO.png`;
	this.hpRange = [80, 90];
	this.evasion = 1;
}
C3PO.prototype = new Walker();

function ASIMO() {
	this.name = `ASIMO`;
	this.imgUrl = `images/wAsimo.png`;
	this.hpRange = [75, 110];
}
ASIMO.prototype = new Walker();

// ~~~ Flyer Type ~~~
function Flyer() {
	this.type = `Flyer`;
	this.evasion = 12;
}
Flyer.prototype = new Robot();

// Flyer Models
function Wasp() {
	this.name = `Wasp`;
	this.imgUrl = `images/fWasp.png`;
	this.hpRange = [90, 100];
}
Wasp.prototype = new Flyer();

function ProbeDroid() {
	this.name = `Imperial Probe Droid`;
	this.imgUrl = `images/fImperialProbe2.png`;
	this.hpRange = [85, 95];
	this.shield = 2;
}
ProbeDroid.prototype = new Flyer();


