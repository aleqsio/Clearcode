/**
 * Created by Aleksander Mikucki on 15.06.2017.
 *
 * The way this code works:
 * 1. It divides spells by their length into separate arrays in spells_divided array
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


exports.damagesolver = function(spells_divided,spellString,maximum_gain,pos,length)
{
    if(pos<0)   return 0;   //no letters left, damage is 0

    if(pos in maximum_gain) return maximum_gain[pos]; //value already has been calculated

    var max_damage=-Infinity; //to find maximum

   for(var spl_len=pos+1;spl_len>1;spl_len--) { //itterate over every possible spell length not larger then position
       if(!(spells_divided[spl_len-1] instanceof Array)) continue;
       for(var i=0;i<spells_divided[spl_len-1].length;i++)
       {
           if(spellString.substring(pos-spl_len+1,pos+1)===spells_divided[spl_len-1][i].s)
           {
               max_damage=spells_divided[spl_len-1][i].d+damagesolver(spells_divided,spellString,maximum_gain,pos-spl_len,length);
               break;
           }
       }
   }
    if(-1+damagesolver(spells_divided,spellString,maximum_gain,pos-1,length)>max_damage) {
        max_damage = -1 + damagesolver(spells_divided,spellString, maximum_gain, pos - 1, length);
    }
    maximum_gain[pos] = max_damage;
    return max_damage;
}

exports.damage = function(spellString) {

    //reads spells and categorises them by value
    var spells_divided = [];
    for(var i=0;i<spells.length;i++)
    {
        if(!(spells_divided[spells[i].s.length-1] instanceof Array)) spells_divided[spells[i].s.length-1]=[];
        spells_divided[spells[i].s.length-1].push(spells[i]);
    }

    //Verifies if string starts with fe, fe doesn't repeat, trims letters preceding
    var beginning_pos = spellString.indexOf('fe');
    if(beginning_pos!==spellString.lastIndexOf('fe') || beginning_pos===-1) return 0;
    spellString=spellString.substring(beginning_pos,spellString.length);

    //trims letters after last ai
    spellString=spellString.substring(0,spellString.lastIndexOf('ai')+2);

    //dynamic programming gain table
    var maximum_gain=[];

    //comparision to avoid negative damage
    return Math.max(0,exports.damagesolver(spells_divided,spellString,maximum_gain,spellString.length-1,spellString.length-1));
}
