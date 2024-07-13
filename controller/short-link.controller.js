const shortid = require("shortid");
const shortLink = require("../Schema/short-link.schema");

const generateShortLinkURL = async (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({ error: "missing URL" });
  }

  const shortId = shortid();

  await shortLink.create({
    shortId,
    redirectId: req.body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
};

const redirectURL = async (req, res) => {
  const shortId = req.params.shortId;
  const redirect = await shortLink.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.status(200).json(redirect.redirectId);
};

const analytics = async (req, res) => {
  const shortId = req.params.shortId;

  const result = await shortLink.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = { generateShortLinkURL, redirectURL, analytics };
