const SettingsGeneral = require("../../models/setting-general.model");

module.exports.settingGeneral = async (req, res, next) => {
  const settingGeneral = await SettingsGeneral.findOne({});
  res.locals.settingGeneral = settingGeneral;
  next();
};
