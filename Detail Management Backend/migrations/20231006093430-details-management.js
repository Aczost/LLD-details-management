'use strict';
const { Sequelize, fn } = require('sequelize');
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
async function up({ context: queryInterface }) {
  return queryInterface.createTable("detailsManagement", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DataTypes.DATE,
    }
  })
}

async function down({ context: queryInterface }) {
  return queryInterface.dropTable("detailsManagement")
}

module.exports = { up, down }


