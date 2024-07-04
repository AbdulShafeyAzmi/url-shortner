import express, { urlencoded } from "express";
import URL from "./model/url.model.js";
import path from "path";
import { connectToDb } from "./connection.js";

import staticRoute from "./routes/staticRouter.js";
import urlRouter from "./routes/url.js";
import userRoute from "./routes/user.route.js";

const app = express();

connectToDb("mongodb://127.0.0.1:27017/url-shortner");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRouter);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  if (!entry) return;
  res.redirect(entry.redirectUrl);
});

app.listen(3002, () => {
  console.log("Server is running on 3002");
});
