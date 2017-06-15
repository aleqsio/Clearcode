/**
 * Created by Aleksander Mikucki on 15.06.2017.
 */
var exports = {};
var spells2 = [{s: 'fe',d:1},{s:'je',d:2},{s:'ne',d:2},{s:'ai',d:2}];
var spells3 = [{s:'jee',d:3},{s:'dai',d:5}];

exports.damage = function(spellString) {
    //Verifies if string starts with fe, fe doesn't repeat, trims letters preceding
    var beginning_pos = spellString.indexOf('fe');
    if(beginning_pos!==spellString.lastIndexOf('fe') || beginning_pos===-1) return 0;
    spellString=spellString.substring(beginning_pos,spellString.length);

    //trims letters after last ai
    spellString=spellString.substring(0,spellString.lastIndexOf('ai')+2);

    var maximum_gain_ref = { v: [] };

    return Math.max(0,damagesolver(spellString,maximum_gain_ref,spellString.length-1,spellString.length-1));
}

function damagesolver(spellString,maximum_gain_ref,pos,length)
{
    if(pos<0)   return 0;   //no letters left, damage is 0
    if(pos in maximum_gain_ref.v) return maximum_gain_ref.v[pos];
    var max_damage=-Infinity;
  //  var max_damage_letter_count=NaN;
    switch(pos){
        default:
            //there are 3 or more letters, try all combinations
            for(var i=0;i<spells3.length;i++)
            {
                if(spellString.substring(pos-2,pos+1)===spells3[i].s)
                {
                    max_damage=spells3[i].d+damagesolver(spellString,maximum_gain_ref,pos-3,length);
                  //  max_damage_letter_count=3;
                    break;
                }
            }
        case 1:
            //there are two letters, save damage best two letter
            for(var i=0;i<spells2.length;i++)
            {
                if(spellString.substring(pos-1,pos+1)===spells2[i].s && spells2[i].d+damagesolver(spellString,maximum_gain_ref,pos-2,length)>max_damage)
                {
                    max_damage=spells2[i].d+damagesolver(spellString,maximum_gain_ref,pos-2,length);    //repeat call doesn't matter as result stored in array
                 //   max_damage_letter_count=2;
                    break;
                }
            }

        case 0:
        //there is one more letter, damage is -1 as there are no 1-letter spells
            if(-1+damagesolver(spellString,maximum_gain_ref,pos-1,length)>max_damage) {
                max_damage = -1 + damagesolver(spellString, maximum_gain_ref, pos - 1, length);
            }
    }
    maximum_gain_ref.v[pos] = max_damage;
    return max_damage;

}


alert(
    String(exports.damage('xxxfeeaixxx') == 2)+
    String(exports.damage('feeai') == 2)+
    String(exports.damage('feaineain') == 7)+
    String(exports.damage('jee') == 0) +
    String(exports.damage('fefefefefeaiaiaiaiai') == 0)+
    String(exports.damage('fdafafeajain') == 1) +
    String(exports.damage('fexxxxxxxxxxai') == 0)
);