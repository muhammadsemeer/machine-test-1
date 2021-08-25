const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection");

const Table1 = sequelize.define("Table1", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  google_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  package_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  package_installed_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  client_ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Table1;
