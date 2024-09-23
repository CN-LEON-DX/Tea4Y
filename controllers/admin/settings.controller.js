const systemConfig = require("../../config/system");
const SettingsGeneral = require("../../models/setting-general.model");
module.exports.general = async (req, res) => {
  const settingGeneral = await SettingsGeneral.findOne({});

  console.log(settingGeneral);
  res.render("admin/pages/settings/general", {
    pageTitle: "Settings",
    prefixAdmin: systemConfig.prefixAdmin,
    settings: settingGeneral,
  });
};

module.exports.generalPatch = async (req, res) => {
  try {
  const settingGeneral = await SettingsGeneral.findOne({});
    if (settingGeneral){
      await SettingsGeneral.updateOne({_id: settingGeneral.id },req.body);
      
    }else {
      const record = new SettingsGeneral(req.body);
      await record.save();
    }

    req.flash("success", "Update successfully !");
    res.redirect("back");
  } catch (e) {
    console.log(e);
  }
};
