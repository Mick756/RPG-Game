$(document).ready(function () {

    /**
     * BEGIN VARIABLES
     */

    var buttonLinks = ["assets/images/Dumbledore.jpg", "assets/images/Harry.jpg", "assets/images/Severus.jpg", "assets/images/Voldemort.jpg", "assets/images/Luna.jpg", "assets/images/Cedric.jpg", "assets/images/Lucius.jpg", "assets/images/Bellatrix.jpg", "assets/images/Draco.jpg", "assets/images/Hermione.jpg"];
    var buttons = [];
    var tempSelectedCharacter = null;

    var game = {
        characterSelected: null,
        characterConfirmed: false,
        enemySelected: null,
        shieldsLeft: 1,
        shielded: false,
        healsLeft: 1,
        started: false,
        enemyIndex: 0,
        Voldemort: {
            id: "voldemort",
            fullname: "Lord Voldemort",
            house: "DeathEater",
            health: 100,
            damageMultiplier: 1.5,
            shieldMultiplier: 1,
            enemies: [this.Dumbledore, this.Harry, this.Cedric, this.Luna, this.Hermione, this.Severus],
            slectionMessage: ""
        },
        Bellatrix: {
            id: "bellatrix",
            fullname: "Belltrix Lestrange",
            house: "DeathEater",
            health: 100,
            damageMultiplier: 1.5,
            shieldMultiplier: 1,
            enemies: [this.Dumbledore, this.Harry, this.Cedric, this.Luna, this.Hermione],
            slectionMessage: ""

        },
        Lucius: {
            id: "lucius",
            fullname: "Lucius Malfoy",
            house: "DeathEater",
            health: 100,
            damageMultiplier: 1.5,
            shieldMultiplier: 1,
            enemies: [this.Dumbledore, this.Harry, this.Cedric, this.Luna, this.Hermione, this.Severus],
            slectionMessage: ""

        },
        Dumbledore: {
            id: "dumbledore",
            fullname: "Albus Dumbeldore",
            house: "Gryffindor",
            health: 100,
            damageMultiplier: 1.4,
            shieldMultiplier: .7,
            enemies: [this.Voldemort, this.Bellatrix, this.Lucius, this.Severus],
            slectionMessage: ""

        },
        Severus: {
            id: "severus",
            fullname: "Severus Snape",
            house: "Slytherin",
            health: 100,
            damageMultiplier: 1,
            shieldMultiplier: .9,
            enemies: [this.Dumbledore, this.Harry, this.Cedric, this.Luna],
            slectionMessage: ""

        },
        Harry: {
            id: "harry",
            fullname: "Harry Potter",
            house: "Gryffindor",
            health: 100,
            damageMultiplier: 1.3,
            shieldMultiplier: .8,
            enemies: [this.Voldemort, this.Bellatrix, this.Lucius, this.Severus],
            slectionMessage: ""

        },
        Cedric: {
            id: "cedric",
            fullname: "Cedric Diggory",
            house: "Hufflepuff",
            health: 100,
            damageMultiplier: 1,
            shieldMultiplier: 1.3,
            enemies: [this.Voldemort, this.Bellatrix, this.Lucius, this.Severus],
            slectionMessage: ""

        },
        Luna: {
            id: "luna",
            fullname: "Luna Lovegood",
            house: "Ravenclaw",
            health: 100,
            damageMultiplier: 1.1,
            shieldMultiplier: .7,
            enemies: [this.Voldemort, this.Bellatrix, this.Lucius, this.Severus],
            slectionMessage: ""

        },
        Draco: {
            id: "draco",
            fullname: "Draco Malfoy",
            house: "Slytherin",
            health: 100,
            damageMultiplier: 1,
            shieldMultiplier: 1.3,
            enemies: [this.Voldemort, this.Bellatrix, this.Lucius, this.Severus],
            slectionMessage: ""

        },
        Hermione: {
            id: "hermione",
            fullname: "Hermione Granger",
            house: "Gryffindor",
            health: 100,
            damageMultiplier: 1,
            shieldMultiplier: 1.3,
            enemies: [this.Voldemort, this.Bellatrix, this.Lucius, this.Severus],
            slectionMessage: ""

        },
        start: function(reset) {
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

    $buttonYes.on("click", function () {
        $buttonRow1.empty();
        $buttonYes.detach();
        $buttonNo.detach();
        $buttonRow1.append($buttonHeal);
        $buttonRow1.append($buttonAttack);
        $buttonRow1.append($buttonShield);
        game.characterConfirmed = true;
        game.characterSelected = getCharacterFromString($(tempSelectedCharacter).attr("id"));
        console.log(getCharacterFromString($(tempSelectedCharacter).attr("id")));
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

    function rotateToNextEnemy() {
        var nextEnemy = game.characterSelected.enemies[game.enemyIndex];
        console.log(game.characterSelected.enemies);
        if (false) {
            console.log(nextEnemy);
            moveElement("#" + nextEnemy.id, "#enemy");
        }
    }

    /**
     * @return false Character died
     * @return true Character lived
     */
    function damageCharacter(character, damage) {
        character.health -= damage;
        return (character.health <= 0);
    }

    /**
     * @param message Log an action to the user. Overwrites all text in box.
     */
    function logAction(message) {
        var $log = $("#actionLog");
        $log.empty();
        var $message = $("<div>");
        $message.addClass("actionMessage");
        $message.text(message);
        $log.prepend($message);
    }
});