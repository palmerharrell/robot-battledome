describe("The specification for Robot Battledome", function() {

// Base Robot function and properties
  it("There should be a Robot function", function() {
    expect(Robot).toBeDefined();
  });

  var robot1 = new Robot();

  it("There should be a health property on the Robot function", function() {
    expect(robot1.health).toBeDefined();
  });
  it("There should be an hpRange property on the Robot function", function() {
    expect(robot1.hpRange).toBeDefined();
  });
  it("There should be a type property on the Robot function", function() {
    expect(robot1.type).toBeDefined();
  });
  it("There should be a name property on the Robot function", function() {
    expect(robot1.name).toBeDefined();
  });
  it("There should be a shield property on the Robot function", function() {
    expect(robot1.shield).toBeDefined();
  });
  it("There should be an evasion property on the Robot function", function() {
    expect(robot1.evasion).toBeDefined();
  });
  it("There should be a modification property on the Robot function", function() {
    expect(robot1.modification).toBeDefined();
  });
  it("There should be a weapon property on the Robot function", function() {
    expect(robot1.weapon).toBeDefined();
  });
  it("There should be a type property on the Robot function", function() {
    expect(robot1.type).toBeDefined();
  });
  it("There should be an imgUrl property on the Robot function", function() {
    expect(robot1.imgUrl).toBeDefined();
  });

// Model functions
  it("There should be an R2D2 function", function() {
    expect(R2D2).toBeDefined();
  });  
  it("There should be a C3PO function", function() {
    expect(C3PO).toBeDefined();
  });  
  it("There should be a Johnny5 function", function() {
    expect(Johnny5).toBeDefined();
  });  
  it("There should be a Wasp function", function() {
    expect(Wasp).toBeDefined();
  });  
  it("There should be a ProbeDroid function", function() {
    expect(ProbeDroid).toBeDefined();
  });  
  it("There should be an ASIMO function", function() {
    expect(ASIMO).toBeDefined();
  });


// Modification functions and properties
  it("There should be a Modification function", function() {
    expect(Modification).toBeDefined();
  });

  var modification1 = new Modification();

  it("There should be a dmgUp property on Modification", function() {
    expect(modification1.dmgUp).toBeDefined();
  });
  it("There should be a defUp property on Modification", function() {
    expect(modification1.defUp).toBeDefined();
  });
  it("There should be an evadeUp property on Modification", function() {
    expect(modification1.evadeUp).toBeDefined();
  });
  it("There should be a name property on Modification", function() {
    expect(modification1.name).toBeDefined();
  });
  it("There should be a description property on Modification", function() {
    expect(modification1.description).toBeDefined();
  });

// Specific Modifications
  it("There should be a BoosterRocket function", function() {
    expect(BoosterRocket).toBeDefined();
  });
  it("There should be a TargetingChip function", function() {
    expect(TargetingChip).toBeDefined();
  });
  it("There should be a DodgeRockets function", function() {
    expect(DodgeRockets).toBeDefined();
  });
  it("There should be a HeavyShield function", function() {
    expect(HeavyShield).toBeDefined();
  });
  it("There should be a AgileShield function", function() {
    expect(AgileShield).toBeDefined();
  });
  it("There should be a TacticalChip function", function() {
    expect(TacticalChip).toBeDefined();
  });


// Weapon functions and properties
  it("There should be a Weapon function", function() {
    expect(Weapon).toBeDefined();
  });

  var weapon1 = new Weapon();

  it("There should be a dmgRange property on Weapon", function() {
    expect(weapon1.dmgRange).toBeDefined();
  });

// Specific Weapons
  it("There should be a Pistol function", function() {
    expect(Pistol).toBeDefined();
  });
  it("There should be a Rifle function", function() {
    expect(Rifle).toBeDefined();
  });
  it("There should be an RPG function", function() {
    expect(RPG).toBeDefined();
  });
  it("There should be a Dagger function", function() {
    expect(Dagger).toBeDefined();
  });
  it("There should be a Sword function", function() {
    expect(Sword).toBeDefined();
  });
  it("There should be an Axe function", function() {
    expect(Axe).toBeDefined();
  });


// Attack function
  it("There should be an attack function (disable $(document).ready(function() for this to pass)", function() {
    expect(attack).toBeDefined();
  });

// getFromRange function
  it("There should be a getFromRange function (disable $(document).ready(function() for this to pass)", function() {
    expect(getFromRange).toBeDefined();
  });

// calcDMG function
  it("There should be an evadeCheck function (disable $(document).ready(function() for this to pass)", function() {
    expect(evadeCheck).toBeDefined();
  });

// displayAttack function
  it("There should be a displayAttack function (disable $(document).ready(function() for this to pass)", function() {
    expect(displayAttack).toBeDefined();
  });

});


