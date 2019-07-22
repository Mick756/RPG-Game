$(document).ready(function () {

    /**
     * BEGIN VARIABLES
     */

    var buttonLinks = ["assets/images/Dumbledore.jpg", "assets/images/Harry.jpg", "assets/images/Severus.jpg", "assets/images/Voldemort.jpg", "assets/images/Luna.jpg", "assets/images/Cedric.jpg", "assets/images/Lucius.jpg", "assets/images/Bellatrix.jpg", "assets/images/Draco.jpg", "assets/images/Hermione.jpg"];
    var buttons = [];
    var tempSelectedCharacter = null;
    var damagePerAttack = 15;

    var game = {
        over: false,
        characterSelected: null,
        currentEnemy: null,
        characterConfirmed: false,
        enemySelected: null,
        shieldsLeft: 1,
        shielded: false,
        healsLeft: 2,
        healing: false,
        started: false,
        waitingForComputer: false,
        enemyIndex: 0,
        Voldemort: {
            id: "voldemort",
            fullname: "Lord Voldemort",
            house: "DeathEater",
            health: 100,
            damageMultiplier: 1.2,
            shieldMultiplier: 0.8,
            enemies: ["dumbledore", "harry", "cedric", "luna", "hermione", "severus"],
            selectionMessage: "I was ripped from my body, I was less than spirit, less than the meanest ghost... But still, I was alive."
        },
        Bellatrix: {
            id: "bellatrix",
            fullname: "Belltrix Lestrange",
            house: "DeathEater",
            health: 100,
            damageMultiplier: 1.3,
            shieldMultiplier: .95,
            enemies: ["dumbledore", "harry", "cedric", "luna", "hermione", "severus"],
            selectionMessage: "Oh, he knows how to play, little bitty baby Potter."

        },
        Lucius: {
            id: "lucius",
            fullname: "Lucius Malfoy",
            house: "DeathEater",
            health: 100,
            damageMultiplier: 1.1,
            shieldMultiplier: 1,
            enemies: ["dumbledore", "harry", "cedric", "luna", "hermione", "severus"],
            selectionMessage: "It does not do to dwell on dreams and forget to live."

        },
        Dumbledore: {
            id: "dumbledore",
            fullname: "Albus Dumbeldore",
            house: "Gryffindor",
            health: 100,
            damageMultiplier: 1.2,
            shieldMultiplier: .75,
            enemies: ["voldemort", "bellatrix", "lucius", "severus", "draco"],
            selectionMessage: "It does not do to dwell on dreams and forget to live."

        },
        Severus: {
            id: "severus",
            fullname: "Severus Snape",
            house: "Slytherin",
            health: 100,
            damageMultiplier: 1.1,
            shieldMultiplier: .9,
            enemies: ["dumbledore", "harry", "cedric", "luna", "hermione"],
            selectionMessage: "It may have escaped your notice, but life isn't fair."

        },
        Harry: {
            id: "harry",
            fullname: "Harry Potter",
            house: "Gryffindor",
            health: 100,
            damageMultiplier: 1.25,
            shieldMultiplier: .8,
            enemies: ["voldemort", "bellatrix", "lucius", "severus", "draco"],
            selectionMessage: "I solemnly swear I am up to no good."

        },
        Cedric: {
            id: "cedric",
            fullname: "Cedric Diggory",
            house: "Hufflepuff",
            health: 100,
            damageMultiplier: 1.1,
            shieldMultiplier: .85,
            enemies: ["voldemort", "bellatrix", "lucius", "severus", "draco"],
            selectionMessage: "For a moment there, I thought you were going to let it get me."

        },
        Luna: {
            id: "luna",
            fullname: "Luna Lovegood",
            house: "Ravenclaw",
            health: 100,
            damageMultiplier: 1.1,
            shieldMultiplier: .7,
            enemies: ["voldemort", "bellatrix", "lucius", "severus", "draco"],
            selectionMessage: "Oh, I’ve interrupted a deep thought, haven’t I? I can see it growing smaller in your eyes."

        },
        Draco: {
            id: "draco",
            fullname: "Draco Malfoy",
            house: "Slytherin",
            health: 100,
            damageMultiplier: 1.2,
            shieldMultiplier: .8,
            enemies: ["voldemort", "bellatrix", "lucius", "severus", "draco"],
            selectionMessage: "I don't care what you did or who you saved, you are a constant curse on my family, Harry Potter."

        },
        Hermione: {
            id: "hermione",
            fullname: "Hermione Granger",
            house: "Gryffindor",
            health: 100,
            damageMultiplier: 1.2,
            shieldMultiplier: 0.8,
            enemies: ["voldemort", "bellatrix", "lucius", "severus", "draco"],
            selectionMessage: "Now, if you two don't mind, I'm going to bed, before either of you come up with another clever idea to get us killed — or worse, expelled."
        },
        start: function (reset) {
            if (reset) {

            } else {
                rotateToNextEnemy();
            }
        },
    }

    /**
     * END VARIABLES
     * 
     * BEGIN BUTTON CREATION
     */

    generateButtons();
    function generateButtons() {
        buttons = [];
        // Create the buttons and store them in 'buttons'
        buttonLinks.forEach(function (src) {
            var characterName = src.split("/")[2].split(".")[0].toLowerCase();
            var $newButton = $("<button>");
            var $newImage = $("<img>");
            var $health = $("<p>");
            var $fullName = $("<p>");
            var character = getCharacterFromString(characterName);
            $newButton.addClass("characterButton");
            $newImage.attr("src", src).addClass("characterImage");
            $health.addClass("characterHealth");
            $health.attr("id", characterName + "Health");
            $fullName.addClass("characterFullName");
            $newButton.addClass("house" + character.house);
            $newButton.attr("id", characterName);
            $health.text(character.health);
            $fullName.text(character.fullname);
            buttons.push($newButton.append($fullName).append($newImage).append($health));
        });

        var $characters = $("#characters");
        $characters.empty();

        // Appends buttons to the #character div
        buttons.forEach(function (button) {
            $characters.append(button);
        });
    }

    /**
     * END BUTTON CREATION
     * 
     * BEGIN EVENTS
     */

    var $buttonRow1 = $("#buttonRow1");
    var $buttonRow2 = $("#buttonRow2");
    var $buttonRow3 = $("#buttonRow3");
    var $buttonAttack = $("<button>").addClass("actionButton buttonAttack").text("Attack!");
    var $buttonHeal = $("<button>").addClass("actionButton buttonHeal").text("Heal up!  [" + game.healsLeft + "]");
    var $buttonShield = $("<button>").addClass("actionButton buttonShield").text("Shield up!  [" + game.shieldsLeft + "]");
    var $buttonYes = $("<button>").addClass("actionButton").attr("id", "buttonYes").text("Yes");
    var $buttonNo = $("<button>").addClass("actionButton").attr("id", "buttonNo").text("No");
    $(".characterButton").on("click", function () {
        if (!game.characterConfirmed) {
            if (tempSelectedCharacter == null) {
                tempSelectedCharacter = this;
                moveElement(tempSelectedCharacter, "#player");
            } else {
                moveElement(tempSelectedCharacter, "#characters");
                tempSelectedCharacter = this;
                moveElement(tempSelectedCharacter, "#player");
            }
            $buttonRow1.empty();
            $buttonYes.detach();
            $buttonNo.detach();
            $buttonRow1.append($("<div>").addClass("actionButton characterConfirm").text("Do you want this character?"));
            $buttonRow2.append($buttonYes);
            $buttonRow3.append($buttonNo);
        }
    });

    $buttonHeal.on("click", function () {
        if (game.over) return;
        console.log("CLICKED");
        if (!game.healing) {
            if (game.healsLeft > 0) {
                game.healsLeft -= 1;
                $buttonHeal.text("Heal up! [" + game.healsLeft + "]")
            } else {
                return;
            }
            game.healing = true;
            var timer = setInterval(() => {
                game.characterSelected.health += (2 * Math.round((game.characterSelected.health/10)));
                updateCharacterHealth();
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                game.healing = false;
            }, 7000);
        }
    });

    $buttonAttack.on("click", function () {
        if (game.over) return;
        if (game.waitingForComputer) {
            logAction("Wait your turn!")
        } else {
            var enemyIsDead = attack(game.characterSelected, game.currentEnemy);
            game.waitingForComputer = true;
            if (enemyIsDead) {
                logAction("You killed " + game.currentEnemy.fullname);
                rotateToNextEnemy();
                game.waitingForComputer = false;
            } else {
                setTimeout(() => {
                    var playerIsDead = attack(game.currentEnemy, game.characterSelected);
                    if (playerIsDead) {
                        game.over = true;
                        alert("You were killed by " + game.currentEnemy.fullname + "!");
                    }
                }, 500);
                setTimeout(() => {
                    game.waitingForComputer = false;
                }, 550);
            }
        }
    });

    $buttonShield.on("click", function () {
        if (game.over) return;
        if (!game.shielded) {
            if (game.shieldsLeft > 0) {
                game.shieldsLeft -= 1;
                $buttonShield.text("Shield up! [" + game.shieldsLeft + "]")
            } else {
                return;
            }
            game.shielded = true;
            setTimeout(() => {
                game.shielded = false;
            }, 10000);
        }
    });

    $buttonYes.on("click", function () {
        $buttonRow1.empty();
        $buttonYes.detach();
        $buttonNo.detach();
        game.characterConfirmed = true;
        game.characterSelected = getCharacterFromString($(tempSelectedCharacter).attr("id"));
        logAction(game.characterSelected.selectionMessage);
        $buttonRow1.append($buttonHeal);
        $buttonRow1.append($buttonAttack);
        $buttonRow1.append($buttonShield);
        game.start(false);
    });

    $buttonNo.on("click", function () {
        moveElement(tempSelectedCharacter, "#characters");
        tempSelectedCharacter = null;
        $buttonRow1.empty();
        $buttonYes.detach();
        $buttonNo.detach();
    });

    /**
     * END EVENTS
     * 
     * BEGIN UTIL FUNCTIONS
     */

    /**
     * Update the health of the selected character on screen
     */
    function updateCharacterHealth() {
        buttonLinks.forEach(src => {
            var characterName = src.split("/")[2].split(".")[0].toLowerCase();
            $("#" + characterName + "Health").text(getCharacterFromString(characterName).health);
        });
    }

    /**
    * @description Detaches element from current element and appends it to 'to'.
    */
    function moveElement(element, to) {
        var $element = $(element);
        $element.detach();
        $(to).append($element);
    }

    /**
     * @param name Goes off most well known name in lowercase
     */
    function getCharacterFromString(name) {
        switch (name) {
            case "dumbledore": return game.Dumbledore; break;
            case "harry": return game.Harry; break;
            case "severus": return game.Severus; break;
            case "voldemort": return game.Voldemort; break;
            case "luna": return game.Luna; break;
            case "cedric": return game.Cedric; break;
            case "bellatrix": return game.Bellatrix; break;
            case "lucius": return game.Lucius; break;
            case "draco": return game.Draco; break;
            case "hermione": return game.Hermione; break;
        }
    }

    /**
     * @return if the player has slected a character(true) or not(false).
     */
    function playerIsSelected() {
        return (game.characterSelected == null);
    }

    /**
     * Rotates to the next enemy based on 'game.enemyIndex'
     */
    function rotateToNextEnemy() {
        var nextEnemy = getCharacterFromString(game.characterSelected.enemies[(Math.floor(Math.random() * game.characterSelected.enemies.length))]);
        if (nextEnemy.health === 0) {
            var allDead = true;
            for (var i = 0; i < game.characterSelected.enemies.length; i++) {
                if (getCharacterFromString(game.characterSelected.enemies[i]).health > 0) {
                    allDead = false;
                }
            }
            if (allDead) {
                game.over = true;
                alert("Wow you killed everyone.. you monster..")
                return;
            }
            rotateToNextEnemy();
            return;
        }
        if (game.currentEnemy !== null) {
            moveElement("#" + game.currentEnemy.id, "#characters");
        }
        moveElement("#" + nextEnemy.id, "#enemy");
        game.currentEnemy = nextEnemy;
        game.enemyIndex += 1;
    }

    /**
     * Attack a character 
     * This method calculates damage and returns the value of 'damgeCharacter'
     */
    function attack(attacker, attacked) {
        var dmgMultiplier = attacker.damageMultiplier;
        var shieldMultiplier = 1;
        if (game.shielded) {
            shieldMultiplier = attacked.shieldMultiplier;
        }
        var finalDamage = Math.round(variate(damagePerAttack) * dmgMultiplier * shieldMultiplier);
        return damageCharacter(attacked, finalDamage);
    }

    /**
     * Adds variation to each attack
     */
    function variate(damage) {
        return (damage + (Math.random() + (damage * Math.random())));
    }

    /**
     * @return false Character died
     * @return true Character lived
     */
    function damageCharacter(character, damage) {
        character.health -= damage;
        if (character.health < 0) {
            character.health = 0;
        }
        updateCharacterHealth();
        logAction(character.fullname + " was damaged for " + damage + "!")
        return (character.health <= 0);
    }

    /**
     * @param message Log an action to the user. Overwrites all text in box.
     */
    function logAction(message) {
        var $log = $("#actionLog");
        $log.empty();
        var $msg = $("<div>");
        $msg.addClass("actionMessage");
        $msg.text(message);
        $log.prepend($msg);
    }
});