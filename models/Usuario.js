import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Usuario = db.define(
  "Usuario",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nombre",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: "email",
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password",
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "confirmado",
    },

    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "token",
    },

    tokenRecovery: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "token_recuperacion",
    },
    tokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "token_expiracion",
    },

    regStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "reg_status",
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "ultimo_acceso",
    },
  },
  {
    tableName: "tb_users",
  }
);

export default Usuario;