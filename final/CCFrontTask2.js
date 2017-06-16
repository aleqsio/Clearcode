/**
 * Created by Aleksander Mikucki on 15.06.2017.
 *
 * The way this code works:
 * 1. It divides spells by their length into separate arrays in spellsdivided array
 * Assumption: No 1-letter spells - could be easily fixed but code is much clearer without it.
 *
 * 2. It verifies if spell is correct - If it doesn't contain more then one FE or doesn't end with AI, 0 is returned.
 * It also removes letters not being part of the spell.
 *
 * 3. It uses a dynamic programming based approach to solve the problem:
 * 3.1. It calls a damagesover function on a last letter of the spell
 * 3.2. The function checks each possible length of a spell, if it finds an existing spell of this length it calculates the maximum damage by adding
 * the spell damage and damage of the previous part of the spell (recursion call) It also includes a -1 penalty for a single stray letter.
 * 3.3. It returns a maximum of damages of every possible spell length.
 * 3.4. A gain table (maximum damage from letters 0 to position in the table) is used to limit the recursion stack.
 *
 * 4. Result is compared to 0 and maximum is returned.
 */

var spells = [{s: 'fe',d:1},{s:'je',d:2},{s:'ne',d:2},{s:'ai',d:2},{s:'jee',d:3},{s:'dai',d:5}];

exports.damage = function(spellString) {

    //reads spells and categorises them by value
    var spellsdivided = [];
    for (var i = 0; i < spells.length; i++) {
        if (!(spellsdivided[spells[i].s.length - 1] instanceof Array)) spellsdivided[spells[i].s.length - 1] = [];
        spellsdivided[spells[i].s.length - 1].push(spells[i]);
    }

    //Verifies if string starts with fe, fe doesn't repeat, trims letters preceding
    var beginningpos = spellString.indexOf('fe');
    if (beginningpos !== spellString.lastIndexOf('fe') || beginningpos === -1) return 0;
    spellString = spellString.substring(beginningpos, spellString.length);

    //trims letters after last ai
    spellString = spellString.substring(0, spellString.lastIndexOf('ai') + 2);

    //dynamic programming gain table
    var maximumgain = [];

    //comparision to avoid negative damage
    return Math.max(0, damagesolver(spellsdivided, spellString, maximumgain, spellString.length - 1, spellString.length - 1));
}

var damagesolver = function(spellsdivided,spellString,maximumgain,pos,length)
{
    if(pos<0)   return 0;   //no letters left, damage is 0

    if(pos in maximumgain) return maximumgain[pos]; //value already has been calculated

    var maxdamage=-Infinity; //to find maximum

    for(var spllen=pos+1;spllen>1;spllen--) { //itterate over every possible spell length not larger then position
        if(!(spellsdivided[spllen-1] instanceof Array)) continue;
        for(var i=0;i<spellsdivided[spllen-1].length;i++)
        {
            if(spellString.substring(pos-spllen+1,pos+1)===spellsdivided[spllen-1][i].s)
            {
                maxdamage=spellsdivided[spllen-1][i].d+damagesolver(spellsdivided,spellString,maximumgain,pos-spllen,length);
                break;
            }
        }
    }
    if(-1+damagesolver(spellsdivided,spellString,maximumgain,pos-1,length)>maxdamage) {
        maxdamage = -1 + damagesolver(spellsdivided,spellString, maximumgain, pos - 1, length);
    }
    maximumgain[pos] = maxdamage;
    return maxdamage;
}
