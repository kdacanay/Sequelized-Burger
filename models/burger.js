module.exports = function (sequelize, Datatypes) {
    var Burger = sequelize.define('Burger', {
        burger_name: Datatypes.STRING,
        devoured: {
            type: Datatypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false
    });
    return Burger;
}