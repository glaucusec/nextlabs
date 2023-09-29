const { appDetailsScraper } = require("../util/helper/scraper");

const fetchAppDetails = async (req, res, next) => {
  const { appName, appLink } = req.body;
  try {
    const details = await appDetailsScraper(appLink);
    return res.status(200).json(details);
  } catch (error) {
    console.log(error);
  }
};

const addApp = (req, res, next) => {
  console.log(req.body);
  console.log(req.cookies)
};

module.exports = { fetchAppDetails, addApp };
