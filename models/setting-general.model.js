
const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,

  },
  {
    timestamps: true,
  }
);

const SettingsGeneral  = mongoose.model("Settings-general", settingSchema, "settings-general");
module.exports = SettingsGeneral;
