"use strict";

let Player1;
let Player2;
let miss = false;
let gameOver = false;
let isP1turn = true;

$(document).ready(function() {
	
	$("#battle_screen").hide();
	$("#battle_header").hide();
	$("#player2_header").hide();
	$("#ready_button2").hide();
	loadWeaponDmg();
	$("#weapon_select").hide();
	$("#mod_select").hide();

	// Display weapon dmg ranges on Weapon Select buttons
	function loadWeaponDmg() {
		for (let i = 0; i < $(".weapon_group").children().length; i++) {
			let exampleObj = new window[$(".weapon_group").children()[i].id]();
			let optionDetail = $($(".weapon_group").children()[i]).children()[1];
			$(optionDetail).html(`Damage: ${exampleObj.dmgRange[0]} - `);
			$(optionDetail).append(`${exampleObj.dmgRange[1]}`);
		}
	}

	// Switch between Menu and Battle screens
	function changeView() {
		$("body").css("background", "url(../images/11_stages03.gif) no-repeat center center fixed");
		$("body").css("background-size", "cover");
		$("#battle_screen").toggle();
		$("#battle_header").toggle();
		$("#menu_screen").toggle();
		$("#menu_header").toggle();
		loadCharacters();
	}

	// Enable the Player Ready button if all options have been selected
	function readyPlayer() {
		if (typeof Player1 == "undefined") {
			if (!$("#ready_button1").hasClass("ready")) {
				$("#ready_button1").addClass("ready");
				$("#ready_button1").removeClass("notReady");
				$("#ready_button1").attr("disabled", false);
			}
		} else {
			if (!$("#ready_button2").hasClass("ready")) {
				$("#ready_button2").addClass("ready");
				$("#ready_button2").removeClass("notReady");
				$("#ready_button2").attr("disabled", false);
			}
		}
	}

	// Get selections from DOM, compose new Robot and apply modifiers
	function createPlayer() {
		let currentPlayer = {};
		// Get player's choices
		let robotChoice = $(".active")[0].id;
		let weaponChoice = $(".active")[1].id;
		let modChoice = $(".active")[2].id;
		// Set choices
		currentPlayer = new window[robotChoice]();
		currentPlayer.weapon = new window[weaponChoice]();
		currentPlayer.modification = new window[modChoice]();
		// Apply modifiers
		currentPlayer.weapon.dmgRange[1] += currentPlayer.modification.dmgUp;
		currentPlayer.shield += currentPlayer.modification.defUp;
		currentPlayer.evasion += currentPlayer.modification.evadeUp;
		currentPlayer.health = getFromRange(currentPlayer.hpRange) + currentPlayer.shield;
		currentPlayer.maxHP = currentPlayer.health;
		// Clear .active values for next player
		$(".btn").removeClass("active");
		$("#weapon_select").hide();
		$("#mod_select").hide();
		return currentPlayer;
	}

	// Display selected options for each player on Battle Screen
	function loadCharacters() {
		$("#player1 img").attr("src", Player1.imgUrl);
		$("#player1 .player_name h1").html(Player1.name);
		$("#player1 .weapon_detail").html(`${Player1.weapon.name} (damage: `);
		$("#player1 .weapon_detail").append(`${Player1.weapon.dmgRange[0]}-`);
		$("#player1 .weapon_detail").append(`${Player1.weapon.dmgRange[1]})`);
		$("#player1 .mod_detail").html(`${Player1.modification.name} (`);
		$("#player1 .mod_detail").append(`${Player1.modification.description})`);
		$("#player2 img").attr("src", Player2.imgUrl);
		$("#player2 .player_name h1").html(Player2.name);
		$("#player2 .weapon_detail").html(`${Player2.weapon.name} (damage: `);
		$("#player2 .weapon_detail").append(`${Player2.weapon.dmgRange[0]}-`);
		$("#player2 .weapon_detail").append(`${Player2.weapon.dmgRange[1]})`);
		$("#player2 .mod_detail").html(`${Player2.modification.name} (`);
		$("#player2 .mod_detail").append(`${Player2.modification.description})`);
	}

	// For randomly setting health at beginning & base damage for attacks
	function getFromRange(range) {
		let min = range[0];
		let max = range[1];
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	// Compare evasion property to random number between 1 and 100 (maybe 99?)
	function evadeCheck(evadeChance) {
		let diceRoll = Math.floor((Math.random()*100)+1);
		if (diceRoll > evadeChance) {
			return false;
		} else {
			return true;
		}
	}

	// One round of battle
	function round(bot1, bot2) {

		// Player 1 attacks
		let attackDamage = attack(bot1, bot2);
		if (bot2.health <= 0) {
			bot2.health = 0;
			$(".attack").addClass("disabled_attack");
			$(".disabled_attack").removeClass("attack");
			displayAttack(bot1, bot2, attackDamage);
			gameOver = true;
			setTimeout(function() {
				$("#player2 img").addClass("loser");
				$(".battle_log").append(`<div class="end_battle"><p>Battle Over! ${bot1.name} (P1) is the winner!</p></div>`);
				$(".battle_log").scrollTop($(".battle_log")[0].scrollHeight);
				$(".disabled_attack").html(`GAME OVER`);
				$(".disabled_attack").addClass("game_over");
				$(".disabled_attack").removeClass("disabled_attack");
			},1000);
			return;
		}
		$(".attack").addClass("disabled_attack");
		$(".disabled_attack").removeClass("attack");
		displayAttack(bot1, bot2, attackDamage);
		$(".disabled_attack").addClass("attack");
		$(".attack").removeClass("disabled_attack");
		isP1turn = false;

		// Player 2 attacks
		attackDamage = attack(bot2, bot1);
		if (bot1.health <= 0) {
			bot1.health = 0;
			$(".attack").addClass("disabled_attack");
			$(".disabled_attack").removeClass("attack");
			gameOver = true;
			setTimeout(function() {
				displayAttack(bot2, bot1, attackDamage);
				setTimeout(function() {
					$("#player1 img").addClass("loser");
					$(".battle_log").append(`<div class="end_battleP2"><p>Battle Over! ${bot2.name} (P2) is the winner!</p></div>`);
					$(".battle_log").scrollTop($(".battle_log")[0].scrollHeight);
					$(".disabled_attack").html(`GAME OVER`);
				$(".disabled_attack").addClass("game_over");
				$(".disabled_attack").removeClass("disabled_attack");
				},1000);
			},700);
			
			return;
		} else {
			$(".attack").addClass("disabled_attack");
			$(".disabled_attack").removeClass("attack");
			setTimeout(function() {
	   		displayAttack(bot2, bot1, attackDamage);
	   		$(".disabled_attack").addClass("attack");
				$(".attack").removeClass("disabled_attack");
			},700);
			return;
		}
	}

	// Individual attack
	function attack(attacker, victim) {
		let dmg = 0;
		miss = evadeCheck(victim.evasion);
		if (miss) {
			return dmg;
		} else {
			dmg = getFromRange(attacker.weapon.dmgRange);
			victim.health -= dmg;
		}
		return dmg;
	}

	// Write attack results to Battle Log
	function displayAttack(attacker, victim, dmg) {
		let attackLog = `<div class="log_entry"><p>`;
		let currVictim = ``;
		let currAttacker = ``;
		let attackerPrefix = ``;
		let victimPrefix = ``;
		let adjustedHP;
		if (isP1turn) {
			currVictim = `<p class="p1_attack">`;
			currAttacker = `<p class="p2_attack">`;
			attackerPrefix = `(P1)`;
			victimPrefix = `(P2)`;
			adjustedHP = Math.floor((Player2.health/Player2.maxHP) * 100);
			$("#p2health").css("width", `${adjustedHP}%`);
		} else {
			currVictim = `<p class="p2_attack">`;
			currAttacker = `<p class="p1_attack">`;
			attackerPrefix = `(P2)`;
			victimPrefix = `(P1)`;
			adjustedHP = Math.floor((Player1.health/Player1.maxHP) * 100);
			$("#p1health").css("width", `${adjustedHP}%`);
			isP1turn = true;
		}
		if (miss) {
			attackLog += `${currAttacker}<strong>${attacker.name} ${attackerPrefix}</strong> attacked with his ${attacker.weapon.name} and <strong>missed!</strong></p></div>`;
		} else {
			attackLog += `${currAttacker}<strong>${attacker.name} ${attackerPrefix}</strong> attacked with his ${attacker.weapon.name}.</p>`;
			attackLog += `${currVictim}<strong>${victim.name} ${victimPrefix}</strong> took <strong>${dmg}</strong> damage.</p></div>`;
		}
		$(".battle_log").append(attackLog);
		$(".battle_log").scrollTop($(".battle_log")[0].scrollHeight);
	}


	// ~~~~~~~~~~~~~~~~~~~~~
	// 		Event Listeners
	// ~~~~~~~~~~~~~~~~~~~~~


	// Select Robot Event Listener
	$("#char_buttons .btn").click((e) => {

		// Copy selected robot name to #selection_detail
		$("#botName").html(e.target.innerHTML);
		
		// Set Robot as the selected option
		$(e.target).addClass("active");
		$(e.target).siblings().removeClass("active");
		
		switch(e.target.id) {
			case "ASIMO":
				$("#selected_bot_img").attr("src","images/wAsimo.png");
				$("#botType").html(`Walker`);
				break;
			case "C3PO":
				$("#selected_bot_img").attr("src","images/wC3PO.png");
				$("#botType").html(`Walker`);
				break;
			case "Johnny5":
				$("#selected_bot_img").attr("src","images/rJohnny5.png");
				$("#botType").html(`Roller`);
				break;
			case "ProbeDroid":
				$("#selected_bot_img").attr("src","images/fImperialProbe2.png");
				$("#botType").html(`Flyer`);
				break;
			case "R2D2":
				$("#selected_bot_img").attr("src","images/rR2D2.png");
				$("#botType").html(`Roller`);
				break;
			case "Wasp":
				$("#selected_bot_img").attr("src","images/fWasp.png");
				$("#botType").html(`Flyer`);
				break;
			default:
	    	break;
		}
		$("#weapon_select").fadeIn("fast");
		if ($(".active").length >= 3) {
			readyPlayer();
		}
	}); // END Select Robot Event Listener

	// Select Weapon Event Listener
	$("#weapon_buttons .btn").click((e) => {

		// Set Weapon as the selected option
		$("#weapon_buttons .btn").removeClass("active");
		$(e.target).closest('button').toggleClass("active");

		let selectedWeapon = $(e.target).closest('button').attr('id');

		// Copy selected weapon to #selection_detail
		$("#botWeapon").html(selectedWeapon);
		
		switch(selectedWeapon) {
			case "Pistol":
				$("#botWeapon").append(` (damage: 10-25)`);
				break;
			case "Rifle":
				$("#botWeapon").append(` (damage: 15-20)`);
				break;
			case "RPG":
				$("#botWeapon").append(` (damage: 5-30)`);
				break;
			case "Dagger":
				$("#botWeapon").append(` (damage: 10-25)`);
				break;
			case "Sword":
				$("#botWeapon").append(` (damage: 15-20)`);
				break;
			case "Axe":
				$("#botWeapon").append(` (damage: 5-30)`);
				break;
			default:
	    	break;
		}
		$("#mod_select").fadeIn("fast");
		if ($(".active").length >= 3) {
			readyPlayer();
		}
	}); // END Select Weapon Event Listener

	// Select Modification Event Listener
	$("#mod_buttons .btn").click((e) => {

		let selectedMod = $(e.target).closest('button').attr('id');
		
		// Set Mod as the selected option
		$("#mod_buttons .btn").removeClass("active");
		$(e.target).closest('button').toggleClass("active");
		
		switch(selectedMod) {
			case "TargetingChip":
				$("#botModification").html(`Targeting Chip`);
				$("#botModification").append(` (Dmg++)`);
				break;
			case "HeavyShield":
				$("#botModification").html(`Heavy Shield`);
				$("#botModification").append(` (Def++)`);
				break;
			case "DodgeRockets":
				$("#botModification").html(`Dodge Rockets`);
				$("#botModification").append(` (Evade++)`);
				break;
			case "TacticalChip":
				$("#botModification").html(`Tactical Chip`);
				$("#botModification").append(` (Dmg+ Def+)`);
				break;
			case "BoosterRocket":
				$("#botModification").html(`Booster Rocket`);
				$("#botModification").append(` (Dmg+ Evade+)`);
				break;
			case "AgileShield":
				$("#botModification").html(`Agile Shield`);
				$("#botModification").append(` (Def+ Evade+)`);
				break;
			default:
	    	break;
		}
		if ($(".active").length >= 3) {
			readyPlayer();
		}
	}); // END Select Modification Event Listener

	// Ready Button Event Listener
	//  	Event delegation necessary because "ready" 
	//  	class is added after page loads.
	$("#menu_screen").on( "click", ".ready", ()=> {
		if (typeof Player1 === "undefined") {
			Player1 = createPlayer();
			// Set maximum health on character's health bar
			$("#p1health").attr("aria-valuemax", Player1.maxHP); // Probably does nothing useful
			$("#p1health").css("width", "100%");
			$("#player1_header").toggle();
			$("#player2_header").toggle();
			$("#ready_button1").hide();
			$("#ready_button2").show();
			$(".stat").html(`---`);
			$("#botName").html(`Robot`);
			$("#selected_bot_img").attr("src","images/group_shot.png");
			$("#selected_bot_img").addClass("flipped");
		} else {
			Player2 = createPlayer();
			// Set maximum health on character's health bar
			$("#p2health").attr("aria-valuemax", Player2.maxHP); // Probably does nothing useful
			$("#p2health").css("width", "100%");
			changeView();
		}
	}); // END Ready Button Event Listener

	// Start a round of battle on Attack Button click
	$(".attack").click(() => {
		if (!gameOver) {
		round(Player1, Player2);
		}
	});


}); // END $(document).ready
