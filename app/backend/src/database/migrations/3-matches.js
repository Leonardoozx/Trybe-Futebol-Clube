"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("matches", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      homeTeam: {
        field: "home_team",
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "teams",
          key: "id",
        },
      },
      homeTeamGoals: {
        field: "home_team_goals",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        field: "away_team",
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "teams",
          key: "id",
        },
      },
      awayTeamGoals: {
        field: "away_team_goals",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      inProgress: {
        field: "in_progress",
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable("matches");
  },
};
