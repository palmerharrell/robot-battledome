"use strict";

function Weapon() {
	this.dmgRange = [0, 0];
	this.name = ``;
}

function Pistol() {
	this.dmgRange = [10, 25];
	this.name = `Pistol`;
}
Pistol.prototype = new Weapon();

function Rifle() {
	this.dmgRange = [15, 20];
	this.name = `Rifle`;
}
Rifle.prototype = new Weapon();

function RPG() {
	this.dmgRange = [5, 30];
	this.name = `RPG`;
}
RPG.prototype = new Weapon();

function Dagger() {
	this.dmgRange = [10, 25];
	this.name = `Dagger`;
}
Dagger.prototype = new Weapon();

function Sword() {
	this.dmgRange = [15, 20];
	this.name = `Sword`;
}
Sword.prototype = new Weapon();

function Axe() {
	this.dmgRange = [5, 30];
	this.name = `Axe`;
}
Axe.prototype = new Weapon();

