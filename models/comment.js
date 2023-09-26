"use strict";
const { Model } = require("sequelize");
const db = require('./index');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId"})
    }
  }
  Comment.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  // Define the association with User model
  // Comment.belongsTo(db.user, { foreignKey: "userId", as: "user" });
  return Comment;
};
