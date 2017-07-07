'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});

  post.associate = function(models) {
    post.hasMany(models.like, { as: 'likes' })
  }

  return post;
};
