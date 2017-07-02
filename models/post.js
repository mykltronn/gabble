'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});

  // post.associate = function(models) {
  //   post.belongsTo(models.user, { as: 'user', foreignKey: 'userId'})
  // }
  post.associate = function(models) {
    post.hasMany(models.like, { as: 'likes' })
  }


  return post;
};
