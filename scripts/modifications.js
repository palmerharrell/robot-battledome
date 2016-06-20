"use strict";

function Modification() {
	this.defUp = 0;
	this.dmgUp = 0;
	this.evadeUp = 0;
	this.name = ``;
	this.description = ``;
}

function TargetingChip() {
	this.dmgUp = 15;
	this.name = `Targeting Chip`;
	this.description = `Dmg++`;
}
TargetingChip.prototype = new Modification();

function HeavyShield() {
	this.defUp = 20;
	this.name = `Heavy Shield`;
	this.description = `Def++`;
}
HeavyShield.prototype = new Modification();

function DodgeRockets() {
	this.evadeUp = 25;
	this.name = `Dodge Rockets`;
	this.description = `Evade++`;
}
DodgeRockets.prototype = new Modification();

function TacticalChip() {
	this.dmgUp = 10;
	this.defUp = 15;
	this.name = `Tactical Chip`;
	this.description = `Dmg+ Def+`;
}
TacticalChip.prototype = new Modification();

function BoosterRocket() {
	this.dmgUp = 10;
	this.evadeUp = 15;
	this.name = `Boster Rocket`;
	this.description = `Dmg+ Evade+`;
}
BoosterRocket.prototype = new Modification();

function AgileShield() {
	this.defUp = 15;
	this.evadeUp = 15;
	this.name = `Agile Shield`;
	this.description = `Def+ Evade+`;
}
AgileShield.prototype = new Modification();



