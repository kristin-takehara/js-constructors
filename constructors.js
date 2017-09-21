/**
 * Creates a generic spell that can be cast.
 *
 * @name Spell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {string} description
 * @method   getDetails
 */
var Spell = function(name, cost, description) {
   this.name = name;
   this.cost = cost;
   this.description = description;
     /**
   * Returns a string of all of the spell's details.
   * The format doesn't matter, as long as it contains the spell name, cost, and description.
   *
   * @name getDetails
   * @return {string} details containing all of the spells information.
   */
   this.getDetails = function() {
      return this.name + ' ' + this.cost + ' ' + this.description;
   };
};
/**
 * A spell that deals damage.
 * We want to keep this code DRY (Don't Repeat Yourself).
 *
 * So you should use `Spell.call()` to assign the spell name, cost, and description.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 *
 * In addition, you will also want to assign `DamageSpell.prototype`
 * a value so that it inherits from `Spell`.
 * Make sure to call this OUTSIDE of the function declaration.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype
 *
 * @name DamageSpell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {number} damage       The amount of damage this spell deals.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {number} damage
 * @property {string} description
 */

var DamageSpell = function(name, cost, damage, description) {
   Spell.call(this, name, cost, description);
   this.damage = damage;
};

DamageSpell.prototype = Object.create(Spell.prototype, {
   constructor : DamageSpell
}); //<<<---PROPER es5 syntax

/**
 * Now that you've created some spells, let's create
 * `Spellcaster` objects that can use them!
 *
 * @name Spellcaster
 * @param {string} name         The spellcaster's name.
 * @param {number} health       The spellcaster's health points.
 * @param {number} mana         The spellcaster's mana points, used for casting spells.
 * @property {string} name
 * @property {number} health
 * @property {mana} mana
 * @property {boolean} isAlive  Default value should be `true`.
 * @method  inflictDamage
 * @method  spendMana
 * @method  invoke
 */
var Spellcaster = function(name, health, mana) {
   this.name = name;
   this.health = health;
   this.mana = mana;
   this.isAlive = true;

  /**
   * @method inflictDamage
   *
   * The spellcaster loses health equal to `damage`.
   * Health should never be negative.
   * If the spellcaster's health drops to 0,
   * its `isAlive` property should be set to `false`.
   *
   * @param  {number} damage  Amount of damage to deal to the spellcaster
   */
   this.inflictDamage = function(damage) {
      if (this.health <= damage) { //health should never be negative.
         this.health = 0; //if the spellcaster's health drops to 0,
         this.isAlive = false; // 'isAlive' should be set to 'false'
      } else {
         this.health -= damage; //else, spellcaster loses health equal to 'damage'
      }
   };
  /**
   * @method spendMana
   *
   * Reduces the spellcaster's mana by `cost`.
   * Mana should only be reduced only if there is enough mana to spend.
   *
   * @param  {number} cost      The amount of mana to spend.
   * @return {boolean} success  Whether mana was successfully spent.
   */
   this.spendMana = function(cost) {
      if (this.mana < cost) { //if the spellcaster's mana is less than cost
         return false;
      } else {
         this.mana -= cost; //reduces the spellcaster's mana by 'cost'
         return true;
      }
   };
  /**
   * @method invoke
   *
   * Allows the spellcaster to cast spells.
   * The first parameter should either be a `Spell` or `DamageSpell`.
   * If it is a `DamageSpell`, the second parameter should be a `Spellcaster`.
   * The function should return `false` if the above conditions are not satisfied.
   *
   * You should use `instanceof` to check for these conditions.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
   *


   * Next check if the spellcaster has enough mana to cast the spell.
   * If it can cast a spell, it should lose mana  equal to the spell's cost.
   * If there is not enough mana, return `false`.
   *
   * If there is enough mana to cast the spell, return `true`.
   * In addition, if it is a `DamageSpell` reduce the target's health by the spell's damage value.
   *
   * Use functions you've previously created: (`inflictDamage`, `spendMana`)
   * to help you with this.
   *
   * @param  {(Spell|DamageSpell)} spell  The spell to be cast.
   * @param  {Spellcaster} target         The spell target to be inflicted.
   * @return {boolean}                    Whether the spell was successfully cast.
   */

///////////////////NATHAN'S ORIGINAL CODE/////////////////
this.invoke = function(spell, target) {
   if (!(spell instanceof Spell) && !(target instanceof Spellcaster)) {
      return false;
   } else {
      if (spell.cost > this.mana) {
         return false;
      } else {
         if (target === null) {
            return false;
         } else if (spell instanceof DamageSpell) {
            this.spendMana(spell.cost);
            if (target !== undefined) target.inflictDamage(spell.damage);
               else return false;
            } else {
               this.spendMana(spell.cost);
            }
            return true;
           }
         }
      };
 };


//////////////TEACHER CODE////////////////
//  this.invoke = function(spell, target) {
//    //GATEKEEPERS
//    if (!(spell instanceof Spell)) return false; //is this a spell?
//    if (spell.cost > this.mana) return false; //do we have enough mana?

//    if (spell instanceof DamageSpell) { //if you are a damage spell
//       if (target && target instanceof Spellcaster) { //i will check if you are a target and that you are a target that is a Spellcaster
//          target.inflictDamage(spell.damage); //damage spell will be inflicted on the target
//          return this.spendMana(spell.cost); //mana will be spent for the cost of the spell
//       } else {
//          return false;
//       }
//       return this.spendMana(spell.cost);
//       }
//    };
// };