var Voldemort = {
    health: 100,
    damageMultiplier: 1.5,
    shieldMultiplier: 1

}
var Dumbledore = {
    health: 100,
    damageMultiplier: 1.4,
    shieldMultiplier: .7,

}
var Severus = {
    health: 100,
    damageMultiplier: 1,
    shieldMultiplier: .9,
    
}
var Harry = {
    health: 100,
    damageMultiplier: 1.2,
    shieldMultiplier: .8,

}

/**
 * @return false Character dided
 * @return true Character lived
 */
function damageCharacter(character, damage) {
    character.health -= damage;
    return (character.health <= 0);
}