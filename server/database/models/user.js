import helpers from "../../helpers";

const { hashPassword } = helpers;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      date_of_birth: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = !user.social
            ? await hashPassword(user.password)
            : null;
        },
      },
    }
  );

  User.associate = () => {
    // associations can be defined here
  };

  User.prototype.userResponse = function userResponse() {
    const userData = {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      gender: this.gender,
      date_of_birth: this.date_of_birth,
      date_created: this.createdAt,
      date_updated: this.updatedAt,
    };

    return userData;
  };
  return User;
};
