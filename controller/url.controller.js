import { nanoid } from "nanoid";
import Url from "../model/url.model.js";

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ err: "url is required" });
  }
  const shortId = nanoid(10);
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home", {
    id: shortId,
  });
};

export { handleGenerateNewShortUrl };
