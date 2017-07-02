'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING
  }, {});


  user.associate = function(models) {
    user.hasMany(models.post, { as: 'posts' })
  }



  return user;
};
