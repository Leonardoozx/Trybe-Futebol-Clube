"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("teams", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      team_name: {
        field: "team_name",
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable("teams");
  },
};
