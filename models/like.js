'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    title: DataTypes.STRING
  }, {});

  // like.associate = function(models) {
  //   like.belongsTo(models.post, { as: 'post', foreignKey: 'postId' })
  //   // like.belongsTo(models.user, { as: 'user', foreignKey: 'userId'})
  // }

  like.associate = function(models) {
    like.belongsTo(models.user, { as: 'user', foreignKey: 'userId'})
  }

  return like;
};
