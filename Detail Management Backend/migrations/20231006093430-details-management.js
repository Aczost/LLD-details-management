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

    cutting: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    plywood: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    creasing: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    isCompleted: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdBy: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    designBy: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    designStartedAt : {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    designEndedAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    laserBy: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    laserStartedAt : {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    laserEndedAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    benderBy: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    benderStartedAt : {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    benderEndedAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    fittingBy: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    fittingStartedAt : {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    fittingEndedAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    creasingBy: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    creasingStartedAt : {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    creasingEndedAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    deliveryBy: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    deliveryStartedAt : {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    deliveryEndedAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    startedAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    endedAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    inProcess: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DataTypes.STRING,
    }
  })
}

async function down({ context: queryInterface }) {
  return queryInterface.dropTable("detailsManagement")
}

module.exports = { up, down }


