/**
 * Created by Aleksander on 15.06.2017.
 */
/**
 * Created by Aleksander on 15.06.2017.
 */
var exports = {};
var spells = 
exports.damage = function(spellString) {
    //Verifies if string starts with fe, fe doesn't reapeat and ends with ai
    if(!(spellString.indexOf('fe')===spellString.lastIndexOf('fe') && spellString.lastIndexOf('fe')===0))    return  0;
    if(!(spellString.lastIndexOf('ai')===spellString.length-2))             return  0;

    return 5;
}
alert(
    String(exports.damage('feeai') == 2)+
    String(exports.damage('feaineain') == 7)+
    String(exports.damage('jee') == 0) +
    String(exports.damage('fefefefefeaiaiaiaiai') == 0)+
    String(exports.damage('fdafafeajain') == 1) +
    String(exports.damage('fexxxxxxxxxxai') == 0)
);